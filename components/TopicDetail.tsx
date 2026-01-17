import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Volume2, Mic, Square, BookOpen, Edit3, Upload, Settings } from 'lucide-react';
import { mockTopics } from '../data/mockData';
import { part2PeopleTopics } from '../data/part2PeopleData';
import { DictationModeEnhanced } from './DictationModeEnhanced';
import { RecordingScoreMode } from './RecordingScoreMode';
import { TimestampConfig } from './TimestampConfig';
import { CheckInStreak } from './CheckInStreak';
import { motion, AnimatePresence } from 'framer-motion';

export function TopicDetail() {
  const navigate = useNavigate();
  const { partNumber, topicId, category } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(-1);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showDictation, setShowDictation] = useState(false);
  const [showRecordingMode, setShowRecordingMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'answers' | 'challenge' | 'recording'>('answers');
  const [experience, setExperience] = useState(() => {
    const saved = localStorage.getItem('user-experience');
    return saved ? parseInt(saved) : 0;
  });
  const [scores, setScores] = useState({ fluency: 0, vocabulary: 0, grammar: 0, pronunciation: 0, overall: 0 });
  const [showScores, setShowScores] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);
  const [useCustomAudio, setUseCustomAudio] = useState(false);
  const [questionAudioUrl, setQuestionAudioUrl] = useState<string | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [showTimestampConfig, setShowTimestampConfig] = useState(false);
  const [sentenceTimestamps, setSentenceTimestamps] = useState<Array<{ start: number; end: number }>>([]);
  const [isPlayingQuestion, setIsPlayingQuestion] = useState(false);
  const [pausedSentenceIndex, setPausedSentenceIndex] = useState(-1);
  const [pausedAudioTime, setPausedAudioTime] = useState(0);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showAnswers, setShowAnswers] = useState(true);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showKeywords, setShowKeywords] = useState(false);
  const [showKeywordTip, setShowKeywordTip] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [tabTouchStart, setTabTouchStart] = useState<number | null>(null);
  const [tabTouchEnd, setTabTouchEnd] = useState<number | null>(null);
  const questionAudioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const sentenceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onQuestionTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onQuestionTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onQuestionTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && currentQuestionIndex < topic.questions.length - 1) {
      // Swipe left - next question
      const nextIndex = currentQuestionIndex + 1;
      const questionFrequencies = [500, 650, 800, 950];
      playSound(questionFrequencies[nextIndex % 4] || 650, 150);
      setCurrentQuestionIndex(nextIndex);
      setCurrentSentenceIndex(-1);
      setIsPlaying(false);
      window.speechSynthesis.cancel();
    }
    if (isRightSwipe && currentQuestionIndex > 0) {
      // Swipe right - previous question
      const prevIndex = currentQuestionIndex - 1;
      const questionFrequencies = [500, 650, 800, 950];
      playSound(questionFrequencies[prevIndex % 4] || 650, 150);
      setCurrentQuestionIndex(prevIndex);
      setCurrentSentenceIndex(-1);
      setIsPlaying(false);
      window.speechSynthesis.cancel();
    }
  };

  const onTabTouchStart = (e: React.TouchEvent) => {
    setTabTouchEnd(null);
    setTabTouchStart(e.targetTouches[0].clientX);
  };

  const onTabTouchMove = (e: React.TouchEvent) => {
    setTabTouchEnd(e.targetTouches[0].clientX);
  };

  const onTabTouchEnd = () => {
    if (!tabTouchStart || !tabTouchEnd) return;
    const distance = tabTouchStart - tabTouchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    const tabs: Array<'answers' | 'challenge' | 'recording'> = ['answers', 'challenge', 'recording'];
    const currentTabIndex = tabs.indexOf(activeTab);
    
    if (isLeftSwipe && currentTabIndex < tabs.length - 1) {
      // Swipe left - next tab
      const nextTab = tabs[currentTabIndex + 1];
      playSound(500 + (currentTabIndex + 1) * 200, 150);
      setActiveTab(nextTab);
    }
    if (isRightSwipe && currentTabIndex > 0) {
      // Swipe right - previous tab
      const prevTab = tabs[currentTabIndex - 1];
      playSound(500 + (currentTabIndex - 1) * 200, 150);
      setActiveTab(prevTab);
    }
  };

  const topics = partNumber === '2' && category === 'people' ? part2PeopleTopics : mockTopics[partNumber as '1' | '2' | '3'] || [];
  
  // For Part 2, always try to find in part2PeopleTopics if we have a category or if partNumber is 2
  let topic = topics.find(t => t.id === topicId);
  if (!topic && (partNumber === '2' || category)) {
    // Try to find in part2PeopleTopics
    topic = part2PeopleTopics.find(t => t.id === topicId);
  }

  // Initialize AudioContext for sound effects
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playSound = (frequency: number, duration: number = 150) => {
    if (!audioContextRef.current) return;
    
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

  // Save experience to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('user-experience', experience.toString());
  }, [experience]);

  const handleExperienceGain = (points: number) => {
    setExperience(prev => prev + points);
  };

  useEffect(() => {
    // Cleanup speech synthesis on unmount
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Scroll to current sentence
    if (currentSentenceIndex >= 0 && sentenceRefs.current[currentSentenceIndex]) {
      sentenceRefs.current[currentSentenceIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentSentenceIndex]);

  if (!topic) {
    return <div>Topic not found</div>;
  }

  const currentQuestion = topic.questions?.[currentQuestionIndex];
  const currentAnswer = currentQuestion ? currentQuestion.answer : topic.answer;

  const speakSentence = (text: string, index: number) => {
    // Check if custom audio is available
    if (useCustomAudio && customAudioUrl) {
      playCustomAudio(index);
      return;
    }

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = playbackSpeed;
      
      utterance.onstart = () => {
        setCurrentSentenceIndex(index);
      };
      
      utterance.onend = () => {
        // Continue to next sentence without pausing
        if (index < currentAnswer.length - 1) {
          setTimeout(() => {
            speakSentence(currentAnswer[index + 1].text, index + 1);
          }, 300);
        } else {
          setIsPlaying(false);
          setCurrentSentenceIndex(-1);
        }
      };
      
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const playCustomAudio = (index: number, resumeTime?: number) => {
    if (!customAudioUrl) return;
    
    // Stop any existing audio
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    // Cancel any pending animation frame
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
    
    const audio = new Audio(customAudioUrl);
    audioRef.current = audio;
    
    // Apply playback speed
    audio.playbackRate = playbackSpeed;
    
    setCurrentSentenceIndex(index);
    
    // If timestamps are configured, play specific segment
    if (sentenceTimestamps && sentenceTimestamps.length > index) {
      const timestamp = sentenceTimestamps[index];
      
      // If resuming from pause, use the saved time; otherwise start from timestamp
      audio.currentTime = resumeTime !== undefined ? resumeTime : timestamp.start;
      
      const checkTime = () => {
        if (!audio.paused && audio.currentTime >= timestamp.end) {
          audio.pause();
          // Continue to next sentence
          if (index < currentAnswer.length - 1) {
            setTimeout(() => {
              playCustomAudio(index + 1);
            }, 300);
          } else {
            setIsPlaying(false);
            setCurrentSentenceIndex(-1);
          }
        } else if (!audio.paused) {
          animationFrameIdRef.current = requestAnimationFrame(checkTime);
        }
      };
      
      audio.play();
      animationFrameIdRef.current = requestAnimationFrame(checkTime);
    } else {
      // No timestamps, play full audio for this sentence
      if (resumeTime !== undefined) {
        audio.currentTime = resumeTime;
      }
      
      audio.onended = () => {
        if (index < currentAnswer.length - 1) {
          setTimeout(() => {
            playCustomAudio(index + 1);
          }, 300);
        } else {
          setIsPlaying(false);
          setCurrentSentenceIndex(-1);
        }
      };
      
      audio.play();
    }
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      const url = URL.createObjectURL(file);
      setCustomAudioUrl(url);
      setUseCustomAudio(true);
      
      // Save to localStorage
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        localStorage.setItem(`audio-${partNumber}-${topicId}-${currentQuestionIndex}`, base64);
      };
      reader.readAsDataURL(file);
      
      // Get audio duration to help with timestamp configuration
      const audio = new Audio(url);
      audio.addEventListener('loadedmetadata', () => {
        setAudioDuration(audio.duration);
      });
    }
  };

  const handleQuestionAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      const url = URL.createObjectURL(file);
      setQuestionAudioUrl(url);
      
      // Save to localStorage
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        localStorage.setItem(`question-audio-${partNumber}-${topicId}-${currentQuestionIndex}`, base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeQuestionAudio = () => {
    if (questionAudioUrl) {
      URL.revokeObjectURL(questionAudioUrl);
    }
    setQuestionAudioUrl(null);
    localStorage.removeItem(`question-audio-${partNumber}-${topicId}-${currentQuestionIndex}`);
  };

  const playQuestionAudio = () => {
    if (!questionAudioUrl) return;
    
    if (questionAudioRef.current) {
      questionAudioRef.current.pause();
    }
    
    const audio = new Audio(questionAudioUrl);
    questionAudioRef.current = audio;
    
    audio.onended = () => {
      setIsPlayingQuestion(false);
    };
    
    audio.play();
    setIsPlayingQuestion(true);
  };

  const handleTimestampSave = (timestamps: Array<{ start: number; end: number }>) => {
    setSentenceTimestamps(timestamps);
    localStorage.setItem(
      `timestamps-${partNumber}-${topicId}-${currentQuestionIndex}`,
      JSON.stringify(timestamps)
    );
    setShowTimestampConfig(false);
    alert('✅ 时间戳配置已保存！');
  };

  const removeCustomAudio = () => {
    if (customAudioUrl) {
      URL.revokeObjectURL(customAudioUrl);
    }
    setCustomAudioUrl(null);
    setUseCustomAudio(false);
    setSentenceTimestamps([]);
    localStorage.removeItem(`audio-${partNumber}-${topicId}-${currentQuestionIndex}`);
    localStorage.removeItem(`timestamps-${partNumber}-${topicId}-${currentQuestionIndex}`);
  };

  // Load custom audio on mount
  useEffect(() => {
    // Clear previous audio state when switching questions
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (questionAudioRef.current) {
      questionAudioRef.current.pause();
      questionAudioRef.current = null;
    }
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setCurrentSentenceIndex(-1);
    setPausedSentenceIndex(-1);
    
    // Reset audio states
    if (customAudioUrl && customAudioUrl.startsWith('blob:')) {
      URL.revokeObjectURL(customAudioUrl);
    }
    if (questionAudioUrl && questionAudioUrl.startsWith('blob:')) {
      URL.revokeObjectURL(questionAudioUrl);
    }
    setCustomAudioUrl(null);
    setUseCustomAudio(false);
    setSentenceTimestamps([]);
    setQuestionAudioUrl(null);
    
    // Load saved audio for current question (stored as base64)
    const savedAudio = localStorage.getItem(`audio-${partNumber}-${topicId}-${currentQuestionIndex}`);
    if (savedAudio) {
      setCustomAudioUrl(savedAudio);
      setUseCustomAudio(true);
      
      // Set audio duration for timestamp config
      const audio = new Audio(savedAudio);
      audio.addEventListener('loadedmetadata', () => {
        setAudioDuration(audio.duration);
      });
    }
    
    // Load timestamps
    const savedTimestamps = localStorage.getItem(`timestamps-${partNumber}-${topicId}-${currentQuestionIndex}`);
    if (savedTimestamps) {
      try {
        setSentenceTimestamps(JSON.parse(savedTimestamps));
      } catch (e) {
        console.error('Failed to parse timestamps:', e);
      }
    }
    
    // Load question audio (stored as base64)
    const savedQuestionAudio = localStorage.getItem(`question-audio-${partNumber}-${topicId}-${currentQuestionIndex}`);
    if (savedQuestionAudio) {
      setQuestionAudioUrl(savedQuestionAudio);
    }
  }, [partNumber, topicId, currentQuestionIndex]);

  const playFullAnswer = () => {
    if (isPlaying) {
      // Pause playback and save position
      if (audioRef.current) {
        // Save the current playback time
        setPausedAudioTime(audioRef.current.currentTime);
        audioRef.current.pause();
      }
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
      window.speechSynthesis.pause();
      setIsPlaying(false);
      setPausedSentenceIndex(currentSentenceIndex);
      return;
    }

    // Resume or start playback
    setIsPlaying(true);
    
    // If we have a paused position, resume from there
    if (pausedSentenceIndex >= 0 && pausedSentenceIndex < currentAnswer.length) {
      if (useCustomAudio && customAudioUrl) {
        // Resume custom audio from saved time
        playCustomAudio(pausedSentenceIndex, pausedAudioTime);
      } else {
        // Resume TTS
        speakSentence(currentAnswer[pausedSentenceIndex].text, pausedSentenceIndex);
      }
      setPausedSentenceIndex(-1);
      setPausedAudioTime(0);
    } else {
      // Start from beginning
      speakSentence(currentAnswer[0].text, 0);
    }
  };

  const playPreviousSentence = () => {
    const prevIndex = Math.max(0, currentSentenceIndex - 1);
    setIsPlaying(true);
    speakSentence(currentAnswer[prevIndex].text, prevIndex);
  };

  const playNextSentence = () => {
    const nextIndex = Math.min(currentAnswer.length - 1, currentSentenceIndex + 1);
    setIsPlaying(true);
    speakSentence(currentAnswer[nextIndex].text, nextIndex);
  };

  const changeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    
    // If audio is currently playing, apply speed change immediately
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.playbackRate = speed;
    }
    
    // If TTS is playing, restart current sentence with new speed
    if (isPlaying && currentSentenceIndex >= 0 && !useCustomAudio) {
      window.speechSynthesis.cancel();
      speakSentence(currentAnswer[currentSentenceIndex].text, currentSentenceIndex);
    }
  };

  const speakQuestion = (text: string) => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.onend = () => {
        setIsPlayingQuestion(false);
      };
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlayingQuestion(true);
    }
  };

  const visualizeAudio = (stream: MediaStream) => {
    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    const source = audioContextRef.current.createMediaStreamSource(stream);
    source.connect(analyserRef.current);
    analyserRef.current.fftSize = 256;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    const updateLevel = () => {
      if (analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(average);
        animationFrameIdRef.current = requestAnimationFrame(updateLevel);
      }
    };
    
    updateLevel();
  };

  const startRecording = async () => {
    try {
      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('您的浏览器不支持录音功能。\n\n使用最新版本的Chrome、Firefox、Safari或Edge浏览器。');
        return;
      }

      console.log('正在请求麦克风权限...');
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      console.log('麦克风权限已授予，音轨数量：', stream.getAudioTracks().length);
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        console.log('录音数据块大小：', event.data.size);
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        console.log('录音停止，总数据块数量：', audioChunksRef.current.length);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        console.log('录音文件大小：', audioBlob.size, 'bytes');
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
        if (animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current);
        }
        setAudioLevel(0);
        
        // Generate scores
        calculateScores();
      };

      mediaRecorder.start();
      console.log('录音已开始，状态：', mediaRecorder.state);
      setIsRecording(true);
      setRecordingTime(0);
      setShowScores(false);
      visualizeAudio(stream);
      
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('麦克风访问错误详情：', error);
      if (error instanceof Error) {
        console.error('错误名称：', error.name);
        console.error('错误信息：', error.message);
        
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          alert('❌ 麦克风权限被拒绝\n\n请按以下步骤操作：\n\n1️⃣ 点击浏览器地址栏左侧的 🔒 或 ⓘ 图标\n2️⃣ 找到"麦克风"或"Microphone"选项\n3️⃣ 选择"允许"\n4️⃣ 刷新页面（按F5或Ctrl+R）\n5️⃣ 重新点击"开始录音"\n\n💡 提示：确保您的电脑系统也允许浏览器访问麦克风');
        } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
          alert('❌ 未检测到麦克风设备\n\n请检查：\n\n1️⃣ 麦克风是否已连接到电脑\n2️⃣ 系统设置中麦克风是否已启用\n3️⃣ 尝试拔插麦克风重新连接\n4️⃣ 在系统设置中测试麦克风是否正常工作');
        } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
          alert('❌ 无法启动麦克风\n\n可能的原因：\n\n1️⃣ 麦克风正被其他应用程序占用\n2️⃣ 麦克风硬件故障\n3️⃣ 尝试关闭其他正在使用麦克风的程序\n4️⃣ 重启浏览器后重试');
        } else if (error.name === 'OverconstrainedError') {
          alert('❌ 麦克风配置错误\n\n您的麦克风不支持所需的音频设置。\n\n请尝试使用他麦克风设备。');
        } else if (error.name === 'SecurityError') {
          alert('❌ 安全错误\n\n请确保：\n\n1️⃣ 您正在使用 HTTPS 或 localhost\n2️⃣ 浏览器版本是最新的\n3⃣ 没有安装阻止麦克风的浏览器扩展');
        } else {
          alert('❌ 无法访问麦克风\n\n错误信息：' + error.message + '\n\n请尝试：\n1️⃣ 刷新页面\n2️⃣ 重启浏览器\n3️⃣ 使用其他浏览器（Chrome推荐）');
        }
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
  };

  const playRecording = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsPlayingRecording(false);
      };
      
      audio.play();
      setIsPlayingRecording(true);
    }
  };

  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlayingRecording(false);
    }
  };

  const deleteRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setAudioBlob(null);
    setIsPlayingRecording(false);
    setRecordingTime(0);
    setShowScores(false);
  };

  const calculateScores = () => {
    // Mock scoring algorithm
    const fluency = Math.min(9, Math.floor(Math.random() * 2) + 6);
    const vocabulary = Math.min(9, Math.floor(Math.random() * 2) + 6);
    const grammar = Math.min(9, Math.floor(Math.random() * 2) + 6);
    const pronunciation = Math.min(9, Math.floor(Math.random() * 2) + 6);
    const overall = Math.round((fluency + vocabulary + grammar + pronunciation) / 4 * 10) / 10;
    
    setScores({ fluency, vocabulary, grammar, pronunciation, overall });
    setShowScores(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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

  const getSentenceTranslation = (sentenceText: string): string => {
    if (!currentQuestion?.translation) return '';
    
    const sentences = currentQuestion.translation.split('。').filter(s => s.trim());
    const index = currentAnswer.findIndex(s => s.text === sentenceText);
    return sentences[index] ? sentences[index] + '。' : '';
  };

  if (showDictation) {
    return (
      <DictationModeEnhanced
        topic={topic}
        currentQuestion={currentQuestion}
        currentAnswer={currentAnswer}
        onBack={() => setShowDictation(false)}
        partNumber={partNumber}
        onComplete={handleExperienceGain}
        onExperienceUpdate={handleExperienceGain}
      />
    );
  }

  if (showRecordingMode) {
    return (
      <RecordingScoreMode
        topic={topic}
        currentQuestion={currentQuestion}
        onBack={() => setShowRecordingMode(false)}
        onComplete={handleExperienceGain}
      />
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-5xl mx-auto pb-32">
        {/* Header - only back button */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              // If it's Part 2 with category, go back to category list
              if (partNumber === '2' && category) {
                navigate(`/part/2/${category}`);
              } else {
                navigate(`/part/${partNumber}`);
              }
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回列表</span>
          </button>
        </div>

        {/* Topic Title */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md p-6 mb-[8px] border border-gray-200 px-[24px] py-[9px] mt-[-1px] mr-[0px] ml-[-1px]">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-6 h-6 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              {topic.storyGroup || topic.question}
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium">
              {topic.topicType}
            </span>
            {topic.questionCN && (
              <span className="text-gray-600">{topic.questionCN}</span>
            )}
          </div>
          
          {/* Question Points */}
          {topic.questionPoints && topic.questionPoints.length > 0 && (
            <div className="mt-4 bg-purple-50/50 rounded-xl p-4 border border-purple-100">
              <h3 className="text-base font-bold text-purple-800 mb-3">题目要点</h3>
              <div className="space-y-2">
                {topic.questionPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-purple-600 font-bold text-sm mt-0.5">●</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800">{point.en}</div>
                      <div className="text-sm text-gray-600">{point.cn}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div 
          className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 mb-4 border border-indigo-100/50 px-[1px] py-[0px]"
          onTouchStart={onTabTouchStart}
          onTouchMove={onTabTouchMove}
          onTouchEnd={onTabTouchEnd}
        >
          <div className="flex gap-3 mx-[0px] my-[5px]">
            <button
              onClick={() => {
                playSound(500, 150);
                setActiveTab('answers');
              }}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-lg transition-all ${
                activeTab === 'answers'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-white/50 text-gray-700 hover:bg-white/80'
              }`}
            >
              <span className="text-2xl">📖</span>
              <span>题库回答</span>
            </button>
            <button
              onClick={() => {
                playSound(700, 150);
                setActiveTab('challenge');
              }}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-lg transition-all ${
                activeTab === 'challenge'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                  : 'bg-white/50 text-gray-700 hover:bg-white/80'
              }`}
            >
              <span className="text-2xl">📝</span>
              <span>题目闯关</span>
            </button>
            <button
              onClick={() => {
                playSound(900, 150);
                setActiveTab('recording');
              }}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-lg transition-all ${
                activeTab === 'recording'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/50 text-gray-700 hover:bg-white/80'
              }`}
            >
              <span className="text-2xl">🗣️</span>
              <span>录音评分</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'answers' && (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-xl p-8 border border-blue-100 backdrop-blur-sm px-[11px] py-[1px] mx-[-10px] my-[-7px]">
            {/* Question Tabs */}
            {topic.questions && topic.questions.length > 0 && (
              <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 mb-[24px] border border-indigo-100/50 mt-[4px] mr-[0px] ml-[0px]">
                <div className="flex gap-2 overflow-x-auto">
                  {topic.questions.map((q, index) => {
                    // Define different colors for each question
                    const questionColors = [
                      'from-blue-500 to-cyan-500',
                      'from-purple-500 to-pink-500',
                      'from-green-500 to-emerald-500',
                      'from-orange-500 to-red-500',
                      'from-indigo-500 to-purple-500',
                      'from-rose-500 to-pink-500',
                    ];
                    const colorGradient = questionColors[index % questionColors.length];
                    
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          // Play different sound for each question
                          const questionFrequencies = [500, 650, 800, 950];
                          playSound(questionFrequencies[index % 4] || 650, 150);
                          setCurrentQuestionIndex(index);
                          setCurrentSentenceIndex(-1);
                          setIsPlaying(false);
                          window.speechSynthesis.cancel();
                        }}
                        className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                          currentQuestionIndex === index
                            ? `bg-gradient-to-r ${colorGradient} text-white shadow-md`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        问题 {index + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question Card */}
            <div 
              className="bg-gradient-to-br from-blue-50/30 to-purple-50/30 rounded-2xl shadow-xl p-8 mb-[24px] border border-blue-100/50 backdrop-blur-sm px-[32px] py-[16px] mt-[-14px] mr-[0px] ml-[0px]"
              onTouchStart={onQuestionTouchStart}
              onTouchMove={onQuestionTouchMove}
              onTouchEnd={onQuestionTouchEnd}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => {
                    if (questionAudioUrl) {
                      playQuestionAudio();
                    } else {
                      speakQuestion(currentQuestion?.question || topic.question);
                    }
                  }}
                  className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center hover:shadow-lg hover:scale-110 transition-all cursor-pointer mt-1"
                  title="播放问题"
                >
                  <Volume2 className="w-4 h-4 text-white" />
                </button>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {currentQuestion?.question || topic.question}
                  </h2>
                  {currentQuestion?.questionCN && (
                    <p className="text-gray-600">{currentQuestion.questionCN}</p>
                  )}
                </div>
                
                {/* Question Audio Upload */}
                <div className="flex items-center gap-2">
                  {!questionAudioUrl ? (
                    <label className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors text-sm font-medium" title="上传题目真人发音">
                      <Upload className="w-4 h-4" />
                      <span>上传题目音频</span>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleQuestionAudioUpload}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                        <Volume2 className="w-4 h-4" />
                        <span>✓ 题目音频</span>
                      </span>
                      <button
                        onClick={removeQuestionAudio}
                        className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors text-xs"
                      >
                        删除
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Answer Sentences */}
            <div className="space-y-3">
              {/* Collapsible Reference Answer */}
              <div className="bg-gradient-to-br from-purple-50/30 to-pink-50/30 rounded-2xl shadow-xl p-6 border border-purple-100/50 backdrop-blur-sm">
                <button
                  onClick={() => {
                    playSound(500, 100);
                    setShowAnswers(!showAnswers);
                  }}
                  className="w-full flex items-center justify-between mb-4"
                >
                  <h2 className="text-xl font-bold text-gray-800 whitespace-nowrap">📖 高分回答</h2>
                  <span className="text-xl text-gray-600">{showAnswers ? '▼' : '▶'}</span>
                </button>
                
                {showAnswers && (
                  <>
                    {/* Audio Upload Section */}
                    <div className="flex items-center gap-3 mb-6">
                      {!useCustomAudio ? (
                        <label className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold cursor-pointer hover:shadow-lg transition-all">
                          <Volume2 className="w-5 h-5" />
                          <span>上传真人发音</span>
                          <input
                            type="file"
                            accept="audio/*"
                            onChange={handleAudioUpload}
                            className="hidden"
                          />
                        </label>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl font-medium">
                            <Volume2 className="w-5 h-5" />
                            <span>✓ 真人发音已启用</span>
                          </span>
                          <button
                            onClick={() => setShowTimestampConfig(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                            title="配置时间戳以实现分句播放"
                          >
                            <Settings className="w-4 h-4" />
                            <span>配置时间戳</span>
                            {sentenceTimestamps && sentenceTimestamps.length > 0 && (
                              <span className="px-2 py-0.5 bg-white text-purple-600 rounded-full text-xs font-bold">
                                ✓
                              </span>
                            )}
                          </button>
                          <button
                            onClick={removeCustomAudio}
                            className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm"
                          >
                            删除
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-1">{currentAnswer.map((sentence, index) => (
                      <div
                        key={index}
                        ref={el => sentenceRefs.current[index] = el}
                        className={`p-4 rounded-lg transition-all duration-300 ${
                          currentSentenceIndex === index
                            ? 'bg-purple-100/80 shadow-md backdrop-blur-sm'
                            : 'bg-gradient-to-r from-blue-50/60 to-purple-50/60 backdrop-blur-sm hover:from-blue-50/80 hover:to-purple-50/80'
                        }`}
                      >
                        <p
                          className={`text-gray-800 text-center text-[20px] leading-relaxed mb-2 ${
                            currentSentenceIndex === index ? 'font-medium' : ''
                          }`}
                          dangerouslySetInnerHTML={{
                            __html: highlightKeywords(sentence.text, sentence.keywords).replace(
                              /font-bold text-purple-600/g,
                              'font-extrabold text-purple-600 text-[22px]'
                            )
                          }}
                        />
                        <p className="text-gray-500 text-center leading-relaxed text-[17px]">{getSentenceTranslation(sentence.text)}</p>
                      </div>
                    ))}</div>

                    {/* Control Bar */}
                    <div className="mt-6 pt-4 border-t border-purple-200/50">
                      <div className="flex items-center justify-center gap-6">
                        <button
                          onClick={playPreviousSentence}
                          disabled={currentSentenceIndex <= 0}
                          className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          title="上一句"
                        >
                          <ArrowLeft className="w-6 h-6" />
                        </button>

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

                        <button
                          onClick={playNextSentence}
                          disabled={currentSentenceIndex >= currentAnswer.length - 1}
                          className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          title="下一句"
                        >
                          <ArrowLeft className="w-6 h-6 rotate-180" />
                        </button>

                        <div className="flex items-center gap-2 ml-4">
                          <span className="text-sm text-gray-600">倍速：</span>
                          {[0.5, 0.75, 1, 1.25, 1.5].map((speed) => (
                            <button
                              key={speed}
                              onClick={() => changeSpeed(speed)}
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
                  </>
                )}
              </div>

              {/* Collapsible Analysis */}
              <div className="bg-gradient-to-br from-blue-50/30 to-cyan-50/30 rounded-2xl shadow-xl p-6 border border-blue-100/50 backdrop-blur-sm">
                <button
                  onClick={() => {
                    playSound(650, 100);
                    setShowAnalysis(!showAnalysis);
                  }}
                  className="w-full flex items-center justify-between"
                >
                  <h2 className="text-xl font-bold text-gray-800">💡 思路解读</h2>
                  <span className="text-xl text-gray-600">{showAnalysis ? '▼' : '▶'}</span>
                </button>
                
                {showAnalysis && (
                  <div className="mt-4 space-y-3">
                    <div className="bg-white/60 rounded-xl p-4">
                      {/* Load analysis from topic data or localStorage or show default */}
                      {(() => {
                        // Check if topic has analysis property
                        if (topic.analysis) {
                          return <div dangerouslySetInnerHTML={{ __html: topic.analysis }} />;
                        }
                        
                        const savedAnalysis = localStorage.getItem(`analysis-${partNumber}-${topicId}-${currentQuestionIndex}`);
                        if (savedAnalysis) {
                          return <div dangerouslySetInnerHTML={{ __html: savedAnalysis }} />;
                        }
                        return (
                          <>
                            <p className="text-gray-700 leading-relaxed">
                              这道题的核心思路是通过<span className="font-bold text-blue-600">具体例子</span>来支撑你的观点。建议采用<span className="font-bold text-blue-600">"总-分-总"</span>结构：
                            </p>
                            <ul className="mt-3 space-y-2 text-gray-700">
                              <li className="flex gap-2">
                                <span className="text-blue-500 font-bold">①</span>
                                <span>开门见山回答问题（Yes/No + 简短理由）</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="text-blue-500 font-bold">②</span>
                                <span>举具体例子支撑观点（个人经历或普遍现象）</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="text-blue-500 font-bold">③</span>
                                <span>总结升华（再次强调观点或展望未来）</span>
                              </li>
                            </ul>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>

              {/* Collapsible Keywords */}
              <div className="bg-gradient-to-br from-green-50/30 to-emerald-50/30 rounded-2xl shadow-xl p-6 border border-green-100/50 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      playSound(800, 100);
                      setShowKeywords(!showKeywords);
                    }}
                    className="flex-1 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-gray-800">🔑 关键词速记</h2>
                      <div
                        className="relative inline-flex items-center"
                        onMouseEnter={() => setShowKeywordTip(true)}
                        onMouseLeave={() => setShowKeywordTip(false)}
                      >
                        <span className="text-xs px-3 py-1.5 bg-purple-50/80 text-purple-700 rounded-full cursor-help font-medium border border-purple-200">💡使用技巧</span>
                        {showKeywordTip && (
                          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-10 whitespace-nowrap px-3 py-2 bg-purple-50/95 text-purple-900 text-sm rounded-lg shadow-lg border border-purple-200">
                            记住这些关键词，尝试用它们串联起完整的回答。这样既能保证内容完整性，又能避免死记硬背。
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-xl text-gray-600">{showKeywords ? '▼' : '▶'}</span>
                  </button>
                </div>
                
                {showKeywords && (
                  <div className="mt-4 space-y-3">
                    <div className="bg-white/60 rounded-xl p-4">
                      <div className="grid grid-cols-2 gap-3">
                        {/* Use topic's keywordsMemo if available, otherwise use hardcoded examples */}
                        {(topic.keywordsMemo && topic.keywordsMemo.length > 0 ? topic.keywordsMemo : [
                          { emoji: '⚖️', en: 'Depends on the trip', cn: '取决旅程' },
                          { emoji: '🚌', en: 'Daily commute', cn: '日常通勤' },
                          { emoji: '🔄', en: 'Scroll through', cn: '刷/翻阅' },
                          { emoji: '⏳', en: 'Pass the time', cn: '打发时间' },
                          { emoji: '📍', en: 'Somewhere new', cn: '新地方' },
                          { emoji: '🏞️', en: 'Scenery', cn: '风景' },
                          { emoji: '🚿', en: 'Clear my head', cn: '清醒头脑' },
                        ]).map((keyword, index) => (
                          <div key={index} className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-200 to-pink-200 text-purple-900 rounded-lg">
                            <span className="text-xl">{keyword.emoji}</span>
                            <span className="text-base font-semibold">
                              {keyword.en} <span className="opacity-90">({keyword.cn})</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'challenge' && (
          <DictationModeEnhanced
            topic={topic}
            currentQuestion={currentQuestion}
            currentAnswer={currentAnswer}
            onBack={() => setActiveTab('answers')}
            partNumber={partNumber}
            onComplete={handleExperienceGain}
            onExperienceUpdate={handleExperienceGain}
          />
        )}

        {activeTab === 'recording' && (
          <RecordingScoreMode
            topic={topic}
            currentQuestion={currentQuestion}
            onBack={() => setActiveTab('answers')}
            onComplete={handleExperienceGain}
          />
        )}
      </div>

      {/* Timestamp Configuration Modal */}
      {showTimestampConfig && customAudioUrl && (
        <TimestampConfig
          audioUrl={customAudioUrl}
          sentenceCount={currentAnswer.length}
          onSave={handleTimestampSave}
          onClose={() => setShowTimestampConfig(false)}
          existingTimestamps={sentenceTimestamps.length > 0 ? sentenceTimestamps : undefined}
        />
      )}
    </div>
  );
}