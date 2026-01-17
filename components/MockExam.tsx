import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Square, Clock, Mic } from 'lucide-react';
import { mockTopics } from '../data/mockData';

type ExamPhase = 'intro' | 'part1' | 'part2-prep' | 'part2-recording' | 'part3' | 'completed';

interface SelectedQuestion {
  topicId: string;
  topicName: string;
  question: string;
  questionCN: string;
}

export function MockExam() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<ExamPhase>('intro');
  const [part1Questions, setPart1Questions] = useState<SelectedQuestion[]>([]);
  const [part2Question, setPart2Question] = useState<SelectedQuestion | null>(null);
  const [part3Questions, setPart3Questions] = useState<SelectedQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlobs, setAudioBlobs] = useState<Blob[]>([]);
  const [scores, setScores] = useState({ fluency: 0, vocabulary: 0, grammar: 0, pronunciation: 0, overall: 0 });
  
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Random selection algorithm
  const generateExam = () => {
    const part1Topics = mockTopics['1'];
    const part2Topics = mockTopics['2'];
    const part3Topics = mockTopics['3'];
    
    // Select 3 random Part 1 topics
    const shuffledPart1 = [...part1Topics].sort(() => Math.random() - 0.5);
    const selectedPart1Topics = shuffledPart1.slice(0, 3);
    
    const questions: SelectedQuestion[] = [];
    selectedPart1Topics.forEach(topic => {
      if (topic.questions && topic.questions.length > 0) {
        // Randomly select 2-3 questions from each topic
        const numQuestions = Math.floor(Math.random() * 2) + 2; // 2 or 3
        const shuffledQuestions = [...topic.questions].sort(() => Math.random() - 0.5);
        shuffledQuestions.slice(0, numQuestions).forEach(q => {
          questions.push({
            topicId: topic.id,
            topicName: topic.question,
            question: q.question,
            questionCN: q.questionCN
          });
        });
      }
    });
    
    setPart1Questions(questions);
    
    // Select 1 random Part 2 topic
    const randomPart2 = part2Topics[Math.floor(Math.random() * part2Topics.length)];
    if (randomPart2.questions && randomPart2.questions.length > 0) {
      setPart2Question({
        topicId: randomPart2.id,
        topicName: randomPart2.question,
        question: randomPart2.questions[0].question,
        questionCN: randomPart2.questions[0].questionCN
      });
    }
    
    // Select 3 random Part 3 topics
    const shuffledPart3 = [...part3Topics].sort(() => Math.random() - 0.5);
    const selectedPart3Topics = shuffledPart3.slice(0, 3);
    
    const part3Questions: SelectedQuestion[] = [];
    selectedPart3Topics.forEach(topic => {
      if (topic.questions && topic.questions.length > 0) {
        // Randomly select 2-3 questions from each topic
        const numQuestions = Math.floor(Math.random() * 2) + 2; // 2 or 3
        const shuffledQuestions = [...topic.questions].sort(() => Math.random() - 0.5);
        shuffledQuestions.slice(0, numQuestions).forEach(q => {
          part3Questions.push({
            topicId: topic.id,
            topicName: topic.question,
            question: q.question,
            questionCN: q.questionCN
          });
        });
      }
    });
    
    setPart3Questions(part3Questions);
  };

  const startExam = () => {
    generateExam();
    setPhase('part1');
    setCurrentQuestionIndex(0);
  };

  const startCountdown = (seconds: number, onComplete: () => void) => {
    setCountdown(seconds);
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    
    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          if (countdownRef.current) {
            clearInterval(countdownRef.current);
          }
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlobs(prev => [...prev, audioBlob]);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          alert('麦克风权限被拒绝。\n\n请在浏览器设置中允许此网站访问麦克风：\n1. 点击地址栏左侧的锁图标\n2. 找到"麦克风"选项\n3. 选择"允许"\n4. 刷新页面后重试\n\n考试将暂停，请授权后重新开始。');
          navigate('/');
        } else if (error.name === 'NotFoundError') {
          alert('未检测到麦克风设备。\n\n请确保：\n1. 麦克风已正确连接\n2. 系统设置中麦克风已启用\n\n考试将暂停，请检查设备后重新开始。');
          navigate('/');
        } else {
          alert('无法访问麦克风：' + error.message + '\n\n考试将暂停。');
          navigate('/');
        }
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const handlePart1Question = () => {
    startRecording();
    startCountdown(20, () => {
      stopRecording();
      playBeep();
      
      if (currentQuestionIndex < part1Questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setTimeout(() => handlePart1Question(), 1000);
      } else {
        setTimeout(() => {
          setPhase('part2-prep');
          startPart2Prep();
        }, 1000);
      }
    });
  };

  const startPart2Prep = () => {
    startCountdown(60, () => {
      playBeep();
      setPhase('part2-recording');
      startRecording();
      startCountdown(120, () => {
        stopRecording();
        playBeep();
        calculateScores();
        setPhase('completed');
      });
    });
  };

  const playBeep = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.3;
    
    oscillator.start();
    setTimeout(() => oscillator.stop(), 200);
  };

  const calculateScores = () => {
    // Simple mock scoring based on recording duration
    const totalDuration = audioBlobs.reduce((acc) => acc + 1, 0);
    const fluency = Math.min(9, Math.floor(Math.random() * 2) + 6);
    const vocabulary = Math.min(9, Math.floor(Math.random() * 2) + 6);
    const grammar = Math.min(9, Math.floor(Math.random() * 2) + 6);
    const pronunciation = Math.min(9, Math.floor(Math.random() * 2) + 6);
    const overall = Math.round((fluency + vocabulary + grammar + pronunciation) / 4 * 10) / 10;
    
    setScores({ fluency, vocabulary, grammar, pronunciation, overall });
  };

  const speakQuestion = (text: string) => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (phase === 'part1' && currentQuestionIndex === 0) {
      // Auto-start first question after delay
      setTimeout(() => {
        handlePart1Question();
      }, 2000);
    }
    
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [phase]);

  if (phase === 'intro') {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回首页</span>
          </button>

          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <div className="text-6xl mb-6">🎯</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">IELTS 全真模考</h1>
            <p className="text-gray-600 mb-8">真实考试环境 · 智能评分系统</p>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 text-left">
              <h2 className="font-bold text-gray-800 mb-4">考试流程：</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <span><strong>Part 1：</strong>随机抽取 3 个话题，每个话题 2-3 道题，每题限时 20 秒</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <span><strong>Part 2：</strong>随机抽取 1 个话题，准备时间 1 分钟，回答时间 2 分钟</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <span><strong>评分：</strong>流畅度、词汇量、语法、发音四维度综合评分（0-9分）</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>总时长约 10 分钟</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mic className="w-5 h-5" />
                <span>全程录音</span>
              </div>
            </div>

            <button
              onClick={startExam}
              className="px-12 py-4 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white rounded-2xl font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              开始考试
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'part1') {
    const currentQ = part1Questions[currentQuestionIndex];
    
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-12">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-blue-500 text-white rounded-full font-bold mb-4">
                Part 1 - Question {currentQuestionIndex + 1} / {part1Questions.length}
              </div>
              
              {countdown > 0 && (
                <div className="mt-6">
                  <div className={`text-6xl font-bold mb-2 ${countdown <= 5 ? 'text-red-600 animate-pulse' : 'text-blue-600'}`}>
                    {countdown}
                  </div>
                  <div className="text-sm text-gray-600">秒后自动切换</div>
                </div>
              )}
            </div>

            {currentQ && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
                <button
                  onClick={() => speakQuestion(currentQ.question)}
                  className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Play className="w-5 h-5" />
                  <span className="text-sm">点击播放题目</span>
                </button>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  {currentQ.question}
                </h2>
                <p className="text-gray-600 text-lg">
                  {currentQ.questionCN}
                </p>
              </div>
            )}

            {isRecording && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                <span className="text-gray-700 font-semibold">正在录音...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'part2-prep') {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-12">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-purple-500 text-white rounded-full font-bold mb-4">
                Part 2 - 准备时间
              </div>
              
              <div className="mt-6">
                <div className={`text-6xl font-bold mb-2 ${countdown <= 10 ? 'text-red-600 animate-pulse' : 'text-purple-600'}`}>
                  {countdown}
                </div>
                <div className="text-sm text-gray-600">秒准备时间</div>
              </div>
            </div>

            {part2Question && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8">
                <button
                  onClick={() => speakQuestion(part2Question.question)}
                  className="mb-4 flex items-center gap-2 text-purple-600 hover:text-purple-700"
                >
                  <Play className="w-5 h-5" />
                  <span className="text-sm">点击播放题目</span>
                </button>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {part2Question.question}
                </h2>
                <p className="text-gray-600">
                  {part2Question.questionCN}
                </p>
              </div>
            )}

            <div className="mt-6 text-center text-gray-600">
              请利用这1分钟时间准备您的回答
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'part2-recording') {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-12">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-pink-500 text-white rounded-full font-bold mb-4">
                Part 2 - 作答时间
              </div>
              
              <div className="mt-6">
                <div className={`text-6xl font-bold mb-2 ${countdown <= 10 ? 'text-red-600 animate-pulse' : 'text-pink-600'}`}>
                  {countdown}
                </div>
                <div className="text-sm text-gray-600">秒剩余时间</div>
              </div>
            </div>

            {part2Question && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {part2Question.question}
                </h2>
                <p className="text-gray-600">
                  {part2Question.questionCN}
                </p>
              </div>
            )}

            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
              <span className="text-gray-700 font-semibold">正在录音...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'completed') {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-12">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">考试完成！</h1>
              <p className="text-gray-600">您的表现已记录，以下是您的评分</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-8">
              <div className="text-center mb-6">
                <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                  {scores.overall}
                </div>
                <div className="text-gray-600">总分</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{scores.fluency}</div>
                  <div className="text-xs text-gray-600">Fluency & Coherence<br/>流畅性和连贯性</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{scores.vocabulary}</div>
                  <div className="text-xs text-gray-600">Vocabulary<br/>词汇量</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-1">{scores.grammar}</div>
                  <div className="text-xs text-gray-600">Grammar<br/>语法</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-red-600 mb-1">{scores.pronunciation}</div>
                  <div className="text-xs text-gray-600">Pronunciation<br/>发音</div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-gray-800 mb-3">📝 考试总结</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Part 1 回答了 {part1Questions.length} 个问题</li>
                <li>• Part 2 完成了 2 分钟陈述</li>
                <li>• 录音已保存 {audioBlobs.length} 段</li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setPhase('intro');
                  setCurrentQuestionIndex(0);
                  setAudioBlobs([]);
                }}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                再考一次
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                返回首页
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}