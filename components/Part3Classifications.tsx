import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function Part3Classifications() {
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

  const classifications = [
    {
      id: 'people',
      emoji: '👨‍💼',
      titleCN: '人物类',
      titleEN: 'People',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50/80 to-cyan-50/80',
      borderColor: 'border-blue-200/50'
    },
    {
      id: 'places',
      emoji: '🏛️',
      titleCN: '地点类',
      titleEN: 'Places',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50/80 to-emerald-50/80',
      borderColor: 'border-green-200/50'
    },
    {
      id: 'events',
      emoji: '🎉',
      titleCN: '事件类',
      titleEN: 'Events',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50/80 to-pink-50/80',
      borderColor: 'border-purple-200/50'
    },
    {
      id: 'things',
      emoji: '📦',
      titleCN: '事物类',
      titleEN: 'Things',
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-50/80 to-amber-50/80',
      borderColor: 'border-orange-200/50'
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-pink-400 bg-clip-text text-transparent mb-3 text-[32px]">
            4大分类
          </h1>
          <p className="text-xl bg-gradient-to-r from-purple-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
            Four Classifications
          </p>
        </div>
      </div>

      {/* Classifications Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classifications.map((classification, index) => {
            // Different sound frequencies for each classification
            const soundFrequencies = [800, 950, 1100, 1250];
            
            return (
              <button
                key={classification.id}
                onClick={() => {
                  playSound(soundFrequencies[index], 120);
                  // Navigate to classification detail page (to be implemented)
                  // navigate(`/part/3/classifications/${classification.id}`);
                }}
                className={`group relative overflow-hidden bg-gradient-to-br ${classification.bgGradient} backdrop-blur-xl border-2 ${classification.borderColor} rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-left`}
              >
                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${classification.gradient} opacity-20 rounded-full -mr-20 -mt-20 group-hover:opacity-30 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="text-6xl mb-5">{classification.emoji}</div>
                  
                  <h3 className="text-3xl font-bold text-gray-800 mb-3">{classification.titleCN}</h3>
                  <p className="text-xl text-gray-600">{classification.titleEN}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}