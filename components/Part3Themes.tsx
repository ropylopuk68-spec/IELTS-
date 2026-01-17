import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function Part3Themes() {
  const navigate = useNavigate();
  const audioContextRef = useRef<AudioContext | null>(null);

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

  const themes = [
    {
      id: 'work-study',
      emoji: '💼',
      titleCN: '工作与学习',
      titleEN: 'Work & Study',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50/80 to-cyan-50/80',
      borderColor: 'border-blue-200/50'
    },
    {
      id: 'children-family',
      emoji: '👨‍👩‍👧‍👦',
      titleCN: '儿童与家庭',
      titleEN: 'Children & Family',
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-50/80 to-rose-50/80',
      borderColor: 'border-pink-200/50'
    },
    {
      id: 'tech-media',
      emoji: '📱',
      titleCN: '科技与媒体',
      titleEN: 'Technology & Media',
      gradient: 'from-purple-500 to-indigo-500',
      bgGradient: 'from-purple-50/80 to-indigo-50/80',
      borderColor: 'border-purple-200/50'
    },
    {
      id: 'culture-arts',
      emoji: '🎨',
      titleCN: '文化与艺术',
      titleEN: 'Culture & Arts',
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-50/80 to-amber-50/80',
      borderColor: 'border-orange-200/50'
    },
    {
      id: 'environment-nature',
      emoji: '🌿',
      titleCN: '环境与自然',
      titleEN: 'Environment & Nature',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50/80 to-emerald-50/80',
      borderColor: 'border-green-200/50'
    },
    {
      id: 'health-lifestyle',
      emoji: '💪',
      titleCN: '健康与生活方式',
      titleEN: 'Health & Lifestyle',
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-50/80 to-pink-50/80',
      borderColor: 'border-red-200/50'
    },
    {
      id: 'society-relationships',
      emoji: '🤝',
      titleCN: '社会与人际',
      titleEN: 'Society & Relationships',
      gradient: 'from-teal-500 to-cyan-500',
      bgGradient: 'from-teal-50/80 to-cyan-50/80',
      borderColor: 'border-teal-200/50'
    },
    {
      id: 'consumption-economy',
      emoji: '💰',
      titleCN: '消费与经济',
      titleEN: 'Consumption & Economy',
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50/80 to-orange-50/80',
      borderColor: 'border-yellow-200/50'
    },
    {
      id: 'cities-architecture',
      emoji: '🏙️',
      titleCN: '城市与建筑',
      titleEN: 'Cities & Architecture',
      gradient: 'from-gray-500 to-slate-500',
      bgGradient: 'from-gray-50/80 to-slate-50/80',
      borderColor: 'border-gray-200/50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/50 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => {
              playSound(600, 100);
              navigate('/part/3');
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>返回Part3</span>
          </button>
        </div>
      </div>

      {/* Title Section */}
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-pink-400 bg-clip-text text-transparent mb-3">
            9大主题
          </h1>
          <p className="text-xl bg-gradient-to-r from-purple-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
            9 Major Themes
          </p>
        </div>
      </div>

      {/* Themes Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, index) => {
            // Different sound frequencies for each theme (more varied)
            const soundFrequencies = [700, 850, 1000, 1150, 800, 950, 1100, 1250, 900];
            
            return (
              <button
                key={theme.id}
                onClick={() => {
                  playSound(soundFrequencies[index], 120);
                  // Navigate to theme detail page (to be implemented)
                  // navigate(`/part/3/themes/${theme.id}`);
                }}
                className={`group relative overflow-hidden bg-gradient-to-br ${theme.bgGradient} backdrop-blur-xl border-2 ${theme.borderColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-left`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${theme.gradient} opacity-20 rounded-full -mr-16 -mt-16 group-hover:opacity-30 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{theme.emoji}</div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{theme.titleCN}</h3>
                  <p className="text-base text-gray-600">{theme.titleEN}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}