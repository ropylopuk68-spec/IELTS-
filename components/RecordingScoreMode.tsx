import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Volume2, Upload, X } from 'lucide-react';
import { recordCheckIn } from './CheckInStreak';

interface RecordingScoreModeProps {
  topic: any;
  currentQuestion: any;
  onBack: () => void;
  onComplete: (score: number) => void;
}

export function RecordingScoreMode({ topic, currentQuestion, onBack, onComplete }: RecordingScoreModeProps) {
  const questions = topic.questions || [{ question: topic.question, answer: currentQuestion?.answer || topic.answer }];
  
  const [questionStates, setQuestionStates] = useState(questions.map(() => ({
    isRecording: false,
    audioLevel: 0,
    recordingTime: 20,
    showScore: false,
    scores: { fluency: 0, vocabulary: 0, grammar: 0, pronunciation: 0, overall: 0 },
    questionAudioUrl: null as string | null,
    hasPlayed: false
  })));

  const [totalXP, setTotalXP] = useState(0);
  
  const mediaRecorderRefs = useRef<(MediaRecorder | null)[]>(questions.map(() => null));
  const audioContextRefs = useRef<(AudioContext | null)[]>(questions.map(() => null));
  const analyserRefs = useRef<(AnalyserNode | null)[]>(questions.map(() => null));
  const animationFrameRefs = useRef<(number | null)[]>(questions.map(() => null));
  const timerRefs = useRef<(NodeJS.Timeout | null)[]>(questions.map(() => null));
  const questionAudioRefs = useRef<(HTMLAudioElement | null)[]>(questions.map(() => null));

  // Load saved question audios
  useEffect(() => {
    const newStates = [...questionStates];
    questions.forEach((_, index) => {
      const savedAudio = localStorage.getItem(`recording-mode-q-audio-${topic.id}-${index}`);
      if (savedAudio) {
        newStates[index].questionAudioUrl = savedAudio;
      }
    });
    setQuestionStates(newStates);
    
    return () => {
      audioContextRefs.current.forEach(ctx => ctx?.close());
      animationFrameRefs.current.forEach(id => id && cancelAnimationFrame(id));
      timerRefs.current.forEach(timer => timer && clearInterval(timer));
    };
  }, []);

  const playQuestionAudio = (index: number) => {
    const questionAudioUrl = questionStates[index].questionAudioUrl;
    const question = questions[index];
    
    if (questionAudioUrl) {
      if (questionAudioRefs.current[index]) {
        questionAudioRefs.current[index]!.pause();
      }
      const audio = new Audio(questionAudioUrl);
      questionAudioRefs.current[index] = audio;
      audio.play();
    } else if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(question.question);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
    
    const newStates = [...questionStates];
    newStates[index].hasPlayed = true;
    setQuestionStates(newStates);
  };

  const handleQuestionAudioUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        localStorage.setItem(`recording-mode-q-audio-${topic.id}-${index}`, base64);
        const newStates = [...questionStates];
        newStates[index].questionAudioUrl = base64;
        setQuestionStates(newStates);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeQuestionAudio = (index: number) => {
    localStorage.removeItem(`recording-mode-q-audio-${topic.id}-${index}`);
    const newStates = [...questionStates];
    newStates[index].questionAudioUrl = null;
    setQuestionStates(newStates);
  };

  const visualizeAudio = (stream: MediaStream, index: number) => {
    audioContextRefs.current[index] = new AudioContext();
    analyserRefs.current[index] = audioContextRefs.current[index]!.createAnalyser();
    const source = audioContextRefs.current[index]!.createMediaStreamSource(stream);
    source.connect(analyserRefs.current[index]!);
    analyserRefs.current[index]!.fftSize = 256;
    
    const dataArray = new Uint8Array(analyserRefs.current[index]!.frequencyBinCount);
    
    const updateLevel = () => {
      if (analyserRefs.current[index]) {
        analyserRefs.current[index]!.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        const newStates = [...questionStates];
        newStates[index].audioLevel = average;
        setQuestionStates(newStates);
        animationFrameRefs.current[index] = requestAnimationFrame(updateLevel);
      }
    };
    
    updateLevel();
  };

  const handleMouseDown = async (index: number) => {
    const state = questionStates[index];
    if (state.isRecording || state.showScore) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRefs.current[index] = mediaRecorder;
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        if (audioContextRefs.current[index]) {
          audioContextRefs.current[index]!.close();
        }
        if (animationFrameRefs.current[index]) {
          cancelAnimationFrame(animationFrameRefs.current[index]!);
        }
        const newStates = [...questionStates];
        newStates[index].audioLevel = 0;
        setQuestionStates(newStates);
        
        // Calculate scores
        calculateScores(index);
      };

      mediaRecorder.start();
      const newStates = [...questionStates];
      newStates[index].isRecording = true;
      newStates[index].recordingTime = 20;
      setQuestionStates(newStates);
      
      visualizeAudio(stream, index);
      
      // Start countdown
      timerRefs.current[index] = setInterval(() => {
        setQuestionStates(prev => {
          const updated = [...prev];
          if (updated[index].recordingTime <= 1) {
            handleMouseUp(index);
            return updated;
          }
          updated[index].recordingTime = updated[index].recordingTime - 1;
          return updated;
        });
      }, 1000);
    } catch (error) {
      console.error('Microphone error:', error);
      alert('❌ 无法访问麦克风，请检查权限设置');
    }
  };

  const handleMouseUp = (index: number) => {
    if (!questionStates[index].isRecording) return;

    if (mediaRecorderRefs.current[index] && mediaRecorderRefs.current[index]!.state !== 'inactive') {
      mediaRecorderRefs.current[index]!.stop();
    }
    if (timerRefs.current[index]) {
      clearInterval(timerRefs.current[index]!);
    }
    const newStates = [...questionStates];
    newStates[index].isRecording = false;
    setQuestionStates(newStates);
  };

  const calculateScores = (index: number) => {
    // Mock scoring algorithm
    const fluency = Math.min(9, Math.floor(Math.random() * 2) + 6);
    const vocabulary = Math.min(9, Math.floor(Math.random() * 2) + 6);
    const grammar = Math.min(9, Math.floor(Math.random() * 2) + 6);
    const pronunciation = Math.min(9, Math.floor(Math.random() * 2) + 6);
    const overall = Math.round((fluency + vocabulary + grammar + pronunciation) / 4 * 10) / 10;
    
    const newStates = [...questionStates];
    newStates[index].scores = { fluency, vocabulary, grammar, pronunciation, overall };
    newStates[index].showScore = true;
    setQuestionStates(newStates);
    
    setTotalXP(prev => prev + 20);
  };

  const handleComplete = () => {
    onComplete(totalXP);
    onBack();
    recordCheckIn();
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        {/* Top right stats - Small size with light background */}
        <div className="fixed top-6 right-6 z-50 bg-purple-50/60 backdrop-blur-md rounded-full shadow-sm px-3 py-2 border-0">
          <div className="flex items-center gap-3">
            {/* Days/Exam Date */}
            <div className="flex items-center gap-1">
              <span className="text-lg">📅</span>
              <span className="text-gray-700 text-xs font-semibold">--</span>
            </div>
            {/* Experience */}
            <div className="flex items-center gap-1">
              <span className="text-lg">💎</span>
              <span className="text-purple-600 text-xs font-semibold">{totalXP}</span>
            </div>
          </div>
        </div>

        {/* All Questions */}
        <div className="space-y-6 mt-4">
          {questions.map((question, index) => {
            const state = questionStates[index];
            
            return (
              <div key={index} className="bg-white rounded-3xl shadow-xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <button
                    onClick={() => playQuestionAudio(index)}
                    className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center hover:shadow-lg hover:scale-110 transition-all cursor-pointer"
                  >
                    <Volume2 className="w-6 h-6 text-white" />
                  </button>
                  <div className="flex-1">
                    <div className="text-sm text-blue-600 mb-1 font-semibold">Question {index + 1}</div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {question.question}
                    </h2>
                  </div>
                  
                  {/* Question Audio Upload */}
                  <div className="flex items-center gap-2">
                    {!state.questionAudioUrl ? (
                      <label className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors text-sm" title="上传题目音频">
                        <Upload className="w-4 h-4" />
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={(e) => handleQuestionAudioUpload(index, e)}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <button
                        onClick={() => removeQuestionAudio(index)}
                        className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors text-sm"
                      >
                        <Volume2 className="w-4 h-4" />
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Recording Button */}
                {!state.showScore && (
                  <div className="text-center mt-6">
                    <button
                      onMouseDown={() => handleMouseDown(index)}
                      onMouseUp={() => handleMouseUp(index)}
                      onMouseLeave={() => handleMouseUp(index)}
                      onTouchStart={() => handleMouseDown(index)}
                      onTouchEnd={() => handleMouseUp(index)}
                      className={`relative w-full max-w-md mx-auto px-8 py-4 rounded-xl font-bold text-base transition-all ${
                        state.isRecording
                          ? 'bg-gradient-to-r from-red-400 to-pink-400 text-white shadow-lg'
                          : 'bg-white text-purple-600 hover:shadow-md hover:scale-102 border-2 border-purple-300'
                      } ${state.showScore ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      disabled={state.showScore}
                    >
                      {state.isRecording ? (
                        <div>
                          <div className="text-3xl font-bold mb-2">{state.recordingTime}s</div>
                          {/* Audio Visualizer */}
                          <div className="max-w-sm mx-auto h-12 flex items-center gap-1 px-4">
                            {Array.from({ length: 30 }).map((_, i) => (
                              <div
                                key={i}
                                className="flex-1 bg-white/80 rounded-full transition-all duration-100"
                                style={{
                                  height: `${Math.max(5, (state.audioLevel * (Math.random() * 0.5 + 0.75)) / 2.55)}%`
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 bg-purple-600 rounded-full" />
                          </div>
                          <span>按住开始录音</span>
                        </div>
                      )}
                    </button>
                  </div>
                )}

                {/* Scores Display */}
                {state.showScore && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mt-6">
                    <h3 className="font-bold text-gray-800 mb-4 text-center text-xl">智能评分</h3>
                    
                    <div className="text-center mb-6">
                      <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                        {state.scores.overall}
                      </div>
                      <div className="text-lg text-gray-600">总分</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div className="text-3xl font-bold text-blue-600 mb-1">{state.scores.fluency}</div>
                        <div className="text-xs text-gray-600">Fluency<br/>流畅性</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div className="text-3xl font-bold text-purple-600 mb-1">{state.scores.vocabulary}</div>
                        <div className="text-xs text-gray-600">Vocabulary<br/>词汇量</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div className="text-3xl font-bold text-pink-600 mb-1">{state.scores.grammar}</div>
                        <div className="text-xs text-gray-600">Grammar<br/>语法</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div className="text-3xl font-bold text-red-600 mb-1">{state.scores.pronunciation}</div>
                        <div className="text-xs text-gray-600">Pronunciation<br/>发音</div>
                      </div>
                    </div>
                    
                    <div className="text-center mt-4 text-green-600 font-bold">
                      +20 XP
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Complete Button */}
        {questionStates.every(s => s.showScore) && (
          <div className="mt-8 text-center">
            <button
              onClick={handleComplete}
              className="px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold text-xl hover:shadow-lg transition-all hover:scale-105"
            >
              完成 (+{totalXP} XP)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}