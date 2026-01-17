import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, Play, Pause, SkipBack, SkipForward, Upload, Mic } from 'lucide-react';
import { part2PeopleTopics, Part2Topic as PeopleTopic } from '../data/part2PeopleData';
import { part2PlaceTopics, Part2Topic as PlaceTopic } from '../data/part2PlaceData';
import { part2EventTopics, Part2Topic as EventTopic } from '../data/part2EventData';

// Union type for all Part2 topics
type Part2Topic = PeopleTopic | PlaceTopic | EventTopic;

export function Part2StoryDetail() {
  const navigate = useNavigate();
  const { category, topicId } = useParams();
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showAnswers, setShowAnswers] = useState(true);
  const [showVoiceFollow, setShowVoiceFollow] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showKeywords, setShowKeywords] = useState(false);
  const [showRecording, setShowRecording] = useState(false);
  const [examTakers, setExamTakers] = useState<Record<string, number>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string | null>(null);
  const [isPlayingUploadedAudio, setIsPlayingUploadedAudio] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const uploadedAudioRef = useRef<HTMLAudioElement | null>(null);

  // Get all topics based on category
  const getAllTopics = (): Part2Topic[] => {
    if (category === 'people') {
      return part2PeopleTopics;
    } else if (category === 'place') {
      return part2PlaceTopics;
    } else if (category === 'event') {
      return part2EventTopics;
    }
    return [];
  };

  // Find all topics in the same story group
  const allTopics = getAllTopics();
  const currentTopic = allTopics.find(t => t.id === topicId);
  const storyGroup = currentTopic?.storyGroup;
  const storyTopics = allTopics.filter(t => t.storyGroup === storyGroup);

  // Load exam takers from localStorage
  useEffect(() => {
    const savedExamTakers = localStorage.getItem(`part2-exam-takers-${category}`);
    if (savedExamTakers) {
      setExamTakers(JSON.parse(savedExamTakers));
    } else {
      const initialExamTakers: Record<string, number> = {};
      storyTopics.forEach(topic => {
        initialExamTakers[topic.id] = topic.examTakers;
      });
      setExamTakers(initialExamTakers);
    }
  }, [category, storyGroup]);

  // Initialize AudioContext
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playSound = async (frequency: number, duration: number = 150) => {
    if (!audioContextRef.current) return;
    
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.2, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
  };

  // Get frequency for story group (450Hz-1100Hz range)
  const getFrequencyForStoryGroup = (storyGroup: string): number => {
    const frequencies: Record<string, number> = {
      '🏃‍♂️ 马龙': 450,
      '👭 发小 Lily': 550,
      '🎤 泰勒': 650,
      '🇩🇪 外国朋友 Leo': 750,
      '👘 穿汉服的朋友': 850,
      '🌸 李奶奶': 950,
      '🌲 森林公园': 450,
      '🏛️ 鸟巢': 550,
      '🦁 动物园': 650,
      '🏡 朋友的家': 750,
      '🏀 运动场': 850,
      '🏛️ 泉州': 950,
      '🛍️ 宜家': 1050,
      '🏇 跑马拉松': 450,
      '🎬 电影': 650
    };
    return frequencies[storyGroup] || 600;
  };

  const speakSentence = (text: string, index: number) => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = playbackSpeed;
      
      utterance.onstart = () => {
        setCurrentParagraphIndex(index);
        if (paragraphRefs.current[index]) {
          paragraphRefs.current[index]?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      };
      
      utterance.onend = () => {
        if (index < currentTopic!.answer.length - 1) {
          setTimeout(() => {
            speakSentence(currentTopic!.answer[index + 1].text, index + 1);
          }, 300);
        } else {
          setIsPlaying(false);
          setCurrentParagraphIndex(-1);
        }
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const playFullAnswer = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentParagraphIndex(-1);
      return;
    }

    setIsPlaying(true);
    speakSentence(currentTopic!.answer[0].text, 0);
  };

  const highlightKeywords = (text: string, keywords: string[]) => {
    if (!keywords || keywords.length === 0) return text;
    
    let result = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      result = result.replace(regex, '<span class="font-bold text-purple-600">$1</span>');
    });
    
    return result;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsTimerRunning(true);
      timerIntervalRef.current = window.setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('无法访问麦克风，请检查权限设置');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        // Here you can handle the recorded audio
        console.log('Recording completed', audioBlob);
      };
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setIsTimerRunning(false);
    setRecordingTime(0);
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedAudioUrl(url);
    }
  };

  const playUploadedAudio = () => {
    if (uploadedAudioRef.current) {
      uploadedAudioRef.current.play();
      setIsPlayingUploadedAudio(true);
    }
  };

  const pauseUploadedAudio = () => {
    if (uploadedAudioRef.current) {
      uploadedAudioRef.current.pause();
      setIsPlayingUploadedAudio(false);
    }
  };

  if (!currentTopic || !storyGroup) {
    return <div>Topic not found</div>;
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-5xl mx-auto pb-32">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(`/part/2/${category}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回列表</span>
          </button>
        </div>

        {/* Story Name */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            {storyGroup}
          </h1>
        </div>

        {/* Topics List - Simple single border, no nested borders */}
        <div className="space-y-1 mb-6">
          {storyTopics.map((topic) => (
            <div key={topic.id} className="bg-white/40 backdrop-blur-sm border border-purple-100/30 rounded-xl overflow-hidden shadow-sm">
              {/* Topic Header */}
              <button
                onClick={() => {
                  playSound(getFrequencyForStoryGroup(storyGroup), 100);
                  setExpandedTopicId(expandedTopicId === topic.id ? null : topic.id);
                }}
                className="w-full flex items-center justify-between p-4 hover:bg-purple-50/20 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-lg font-semibold text-gray-800 text-left flex-1">
                    {topic.title}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    topic.topicType.includes('新题') 
                      ? 'bg-red-100/80 text-red-700' 
                      : topic.topicType.includes('9-12月')
                      ? 'bg-gray-100/80 text-gray-700'
                      : 'bg-purple-100/80 text-purple-700'
                  }`}>
                    {topic.topicType}
                  </span>
                  <span className="text-purple-700 font-bold min-w-[60px] text-right">
                    {examTakers[topic.id] > 0 ? `${examTakers[topic.id]}人` : '暂无'}
                  </span>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-600 transition-transform ml-2 ${
                    expandedTopicId === topic.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Topic Content - Question Points in 2 columns */}
              {expandedTopicId === topic.id && topic.questionPoints && (
                <div className="px-4 pb-4 bg-purple-50/20">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {topic.questionPoints.map((point, index) => (
                      <div key={index} className="text-sm">
                        <span className="text-gray-800 font-medium">{point.en}</span>
                        <span className="text-gray-600"> {point.cn}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* High Score Answer Section - Collapsible */}
        <div className="bg-gradient-to-br from-purple-50/30 to-pink-50/30 backdrop-blur-xl rounded-2xl shadow-xl border border-purple-100/50 mb-6">
          <button
            onClick={() => {
              playSound(500, 100);
              setShowAnswers(!showAnswers);
            }}
            className="w-full flex items-center justify-between p-6 hover:bg-purple-50/30 transition-colors"
          >
            <h2 className="text-xl font-bold text-gray-800">📖 高分回答</h2>
            {showAnswers ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
          </button>
          
          {showAnswers && (
            <div className="px-6 pb-6">
              {/* Answer Sentences */}
              <div className="space-y-4 mb-6">
                {currentTopic.answer.map((paragraph, index) => (
                  <div
                    key={index}
                    ref={el => paragraphRefs.current[index] = el}
                    className={`p-5 rounded-lg transition-all duration-300 ${
                      currentParagraphIndex === index
                        ? 'bg-purple-100/80 shadow-md scale-[1.01]'
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                  >
                    <p
                      className={`text-gray-800 text-left text-lg leading-relaxed mb-3 ${
                        currentParagraphIndex === index ? 'font-medium' : ''
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: highlightKeywords(paragraph.text, paragraph.keywords)
                      }}
                    />
                    <p className="text-gray-500 text-left text-base leading-relaxed italic border-l-2 border-gray-300 pl-3">
                      {paragraph.translation}
                    </p>
                  </div>
                ))}
              </div>

              {/* Control Bar */}
              <div className="pt-4 border-t border-purple-200/50">
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={playFullAnswer}
                    className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all"
                    title={isPlaying ? '暂停' : '播放完整答案'}
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8" />
                    ) : (
                      <Play className="w-8 h-8" />
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">倍速：</span>
                    {[0.5, 0.75, 1, 1.25, 1.5].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => setPlaybackSpeed(speed)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          playbackSpeed === speed
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Voice Follow Module */}
        <div className="bg-gradient-to-br from-green-50/30 to-emerald-50/30 backdrop-blur-xl rounded-2xl shadow-xl border border-green-100/50 mb-6">
          <button
            onClick={() => {
              playSound(600, 100);
              setShowVoiceFollow(!showVoiceFollow);
            }}
            className="w-full flex items-center justify-between p-6 hover:bg-green-50/30 transition-colors"
          >
            <h2 className="text-xl font-bold text-gray-800">🗣️ 语音跟读</h2>
            {showVoiceFollow ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
          </button>
          
          {showVoiceFollow && (
            <div className="px-6 pb-6">
              <div className="flex items-center gap-4 mb-4">
                <label htmlFor="audio-upload" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all cursor-pointer">
                  <Upload className="w-5 h-5" />
                  <span className="font-medium">上传音频</span>
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  id="audio-upload"
                  onChange={handleAudioUpload}
                />
              </div>
              <p className="text-gray-600 text-sm">上传您的录音进行对比练习</p>
              {uploadedAudioUrl && (
                <div className="mt-4">
                  <audio
                    ref={uploadedAudioRef}
                    src={uploadedAudioUrl}
                    controls
                    className="w-full"
                  >
                    Your browser does not support the audio element.
                  </audio>
                  <div className="mt-2 flex items-center justify-center">
                    <button
                      onClick={isPlayingUploadedAudio ? pauseUploadedAudio : playUploadedAudio}
                      className="p-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg transition-all"
                      title={isPlayingUploadedAudio ? '暂停' : '播放'}
                    >
                      {isPlayingUploadedAudio ? (
                        <Pause className="w-8 h-8" />
                      ) : (
                        <Play className="w-8 h-8" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Analysis Module */}
        {currentTopic.analysis && (
          <div className="bg-gradient-to-br from-yellow-50/30 to-orange-50/30 backdrop-blur-xl rounded-2xl shadow-xl border border-yellow-100/50 mb-6">
            <button
              onClick={() => {
                playSound(700, 100);
                setShowAnalysis(!showAnalysis);
              }}
              className="w-full flex items-center justify-between p-6 hover:bg-yellow-50/30 transition-colors"
            >
              <h2 className="text-xl font-bold text-gray-800">💡 思路解读</h2>
              {showAnalysis ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
            </button>
            
            {showAnalysis && (
              <div className="px-6 pb-6">
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: currentTopic.analysis }}
                />
              </div>
            )}
          </div>
        )}

        {/* Keywords Memo Module */}
        {currentTopic.keywordsMemo && currentTopic.keywordsMemo.length > 0 && (
          <div className="bg-gradient-to-br from-pink-50/30 to-rose-50/30 backdrop-blur-xl rounded-2xl shadow-xl border border-pink-100/50 mb-6">
            <button
              onClick={() => {
                playSound(800, 100);
                setShowKeywords(!showKeywords);
              }}
              className="w-full flex items-center justify-between p-6 hover:bg-pink-50/30 transition-colors"
            >
              <h2 className="text-xl font-bold text-gray-800">⚡ 关键词速记</h2>
              {showKeywords ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
            </button>
            
            {showKeywords && (
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentTopic.keywordsMemo.map((keyword, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                      <span className="text-2xl">{keyword.emoji}</span>
                      <div>
                        <p className="font-bold text-gray-800">{keyword.en}</p>
                        <p className="text-sm text-gray-600">{keyword.cn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Recording & Scoring Module */}
        <div className="bg-gradient-to-br from-indigo-50/30 to-purple-50/30 backdrop-blur-xl rounded-2xl shadow-xl border border-indigo-100/50 mb-6">
          <button
            onClick={() => setShowRecording(!showRecording)}
            className="w-full flex items-center justify-between p-6 hover:bg-indigo-50/30 transition-colors"
          >
            <h2 className="text-xl font-bold text-gray-800">🎙️ 录音评分</h2>
            {showRecording ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
          </button>
          
          {showRecording && (
            <div className="px-6 pb-6 relative">
              {/* Timer Display - Top Right */}
              <div className="absolute top-0 right-6 flex items-center gap-2 text-2xl font-bold text-indigo-600">
                <span>⏰</span>
                <span>{Math.floor(recordingTime / 60).toString().padStart(2, '0')}:{(recordingTime % 60).toString().padStart(2, '0')}</span>
              </div>

              {/* Press to Start Timer Button */}
              <div className="flex justify-center pt-8">
                <button
                  onClick={() => {
                    if (!isTimerRunning) {
                      startRecording();
                    } else {
                      stopRecording();
                    }
                  }}
                  className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${
                    isTimerRunning
                      ? 'bg-red-500 text-white scale-105 shadow-red-300'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-xl'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Mic className="w-6 h-6" />
                    <span>{isTimerRunning ? '停止计时' : '按住开始计时'}</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}