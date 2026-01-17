import { useNavigate } from 'react-router-dom';
import { BookOpen, MessageCircle, Users, Gamepad2, Target } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ExamDatePicker } from './ExamDatePicker';
import { TargetScorePicker } from './TargetScorePicker';
import { CheckInModal } from './CheckInModal';

export function HomePage() {
  const navigate = useNavigate();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showScorePicker, setShowScorePicker] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [examDate, setExamDate] = useState<Date | null>(null);
  const [targetScore, setTargetScore] = useState<number>(7.0);
  const [streakDays, setStreakDays] = useState(0);
  const [practiceCount, setPracticeCount] = useState(0);
  const [experience, setExperience] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize AudioContext
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Load data from localStorage
  useEffect(() => {
    const savedExamDate = localStorage.getItem('exam-date');
    const savedTargetScore = localStorage.getItem('target-score');
    const savedStreak = localStorage.getItem('check-in-streak');
    const savedDates = localStorage.getItem('check-in-dates');
    const savedExperience = localStorage.getItem('experience');

    if (savedExamDate) {
      setExamDate(new Date(savedExamDate));
    }
    if (savedTargetScore) {
      setTargetScore(parseFloat(savedTargetScore));
    }
    if (savedStreak) {
      setStreakDays(parseInt(savedStreak));
    }
    if (savedDates) {
      const dates = JSON.parse(savedDates);
      setPracticeCount(dates.length);
    }
    if (savedExperience) {
      setExperience(parseInt(savedExperience));
    }
  }, [showCheckInModal]);

  // Calculate days until exam
  const getDaysUntilExam = () => {
    if (!examDate) return '--';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const exam = new Date(examDate);
    exam.setHours(0, 0, 0, 0);
    const diff = Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  // Play click sound
  const playClickSound = () => {
    if (!audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.1);
  };

  // Play click sound for different parts
  const playPartSound = (partNumber: number) => {
    if (!audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    // Different frequencies for different parts
    const frequencies = {
      1: 600,  // Part 1 - lower tone
      2: 800,  // Part 2 - mid tone
      3: 1000  // Part 3 - higher tone
    };
    
    oscillator.frequency.value = frequencies[partNumber as 1 | 2 | 3] || 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.15, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.15);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.15);
  };

  const handlePartNavigation = (partNumber: number, path: string) => {
    playPartSound(partNumber);
    setTimeout(() => navigate(path), 100);
  };

  const handleNavigation = (path: string) => {
    playClickSound();
    setTimeout(() => navigate(path), 100);
  };

  const handleExamDateConfirm = (date: Date) => {
    setExamDate(date);
    localStorage.setItem('exam-date', date.toISOString());
    setShowDatePicker(false);
  };

  const handleTargetScoreConfirm = (score: number) => {
    setTargetScore(score);
    localStorage.setItem('target-score', score.toString());
    setShowScorePicker(false);
  };

  const parts = [
    {
      number: 1,
      title: 'Part1口语素材库',
      subtitle: 'IELTS Part1 Topics',
      description: '日常生活话题，4-5分钟问答',
      icon: MessageCircle,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      number: 2,
      title: 'Part2口语素材库',
      subtitle: 'IELTS Part2 Topics',
      description: '个人陈述话题，3-4分钟独白',
      icon: BookOpen,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      number: 3,
      title: 'Part3口语素材库',
      subtitle: 'IELTS Part3 Topics',
      description: '深度讨论话题，4-5分钟问答',
      icon: Users,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50'
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Stats Module - Top Left Corner - No Background */}
        <div className="fixed top-6 left-6 z-50">
          <div className="flex items-center gap-6">
            {/* Target Score */}
            <button
              onClick={() => setShowScorePicker(true)}
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <span className="text-3xl">🎯</span>
              <span className="text-gray-800 text-base font-bold">{targetScore.toFixed(1)}</span>
            </button>

            {/* Days Until Exam */}
            <button
              onClick={() => setShowDatePicker(true)}
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <span className="text-3xl">📅</span>
              <span className="text-gray-800 text-base font-bold">{getDaysUntilExam()}</span>
            </button>

            {/* Experience/Gems */}
            <div className="flex items-center gap-2">
              <span className="text-3xl">💎</span>
              <span className="text-blue-600 text-base font-bold">{experience}</span>
            </div>

            {/* Streak Days */}
            <button
              onClick={() => setShowCheckInModal(true)}
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <span className="text-3xl">🔥</span>
              <span className="text-orange-600 text-base font-bold">{streakDays}</span>
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-4 mt-16">
          <div className="relative inline-block mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight pb-2">
              IELTS Speaking Test Topics
            </h1>
            {/* Current Season Badge - Top Right Corner - Smaller */}
            <div className="absolute -top-2 -right-20 inline-flex items-center gap-1 bg-purple-100 rounded-full px-3 py-1 shadow-sm">
              <span className="text-xs font-bold text-gray-700">1-4月</span>
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">新</span>
            </div>
          </div>
        </div>

        {/* Part Cards with Background Frame */}
        <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-xl border border-white/10" style={{ boxShadow: '0 0 40px rgba(147, 197, 253, 0.1)' }}>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {parts.map((part) => (
              <button
                key={part.number}
                onClick={() => handlePartNavigation(part.number, part.number === 2 ? '/part/2' : `/part/${part.number}`)}
                className={`group relative overflow-hidden bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white/70 text-left`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${part.gradient} opacity-20 rounded-full -mr-16 -mt-16 group-hover:opacity-30 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${part.gradient} rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                    <part.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {part.title}
                  </h2>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {part.subtitle}
                  </p>
                  
                  <p className="text-sm text-gray-700 font-medium">
                    {part.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mock Exam Button */}
        <div className="mb-12 text-center">
          <button
            onClick={() => handleNavigation('/mock-exam')}
            className="group relative inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-400 via紫 to-pink-400 text白 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="text-2xl">🎯</span>
            <span>开始全真模考</span>
            <span className="text-sm font正常 opacity-90">Mock Exam</span>
          </button>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <div className="text-gray-500 text-sm">
          </div>
        </div>

        {/* Modals */}
        {showDatePicker && (
          <ExamDatePicker
            onConfirm={handleExamDateConfirm}
            onCancel={() => setShowDatePicker(false)}
          />
        )}
        {showScorePicker && (
          <TargetScorePicker
            onConfirm={handleTargetScoreConfirm}
            onCancel={() => setShowScorePicker(false)}
          />
        )}
        {showCheckInModal && (
          <CheckInModal onClose={() => setShowCheckInModal(false)} />
        )}
      </div>
    </div>
  );
}
