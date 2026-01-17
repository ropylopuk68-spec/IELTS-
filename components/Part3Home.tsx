import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, Layers, HelpCircle, BookOpen } from 'lucide-react';

export function Part3Home() {
  const navigate = useNavigate();
  const audioContextRef = useRef<AudioContext | null>(null);
  const [showNote, setShowNote] = useState(false);

  // Initialize AudioContext
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

  const modules = [
    {
      id: 'classifications',
      title: '4大分类',
      subtitle: 'Classifications',
      description: '人物类、地点类、事件类、事物类',
      icon: Layers,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50/80 to-cyan-50/80',
      borderColor: 'border-blue-200/50'
    },
    {
      id: 'question-types',
      title: '6大题型',
      subtitle: 'Question Types',
      description: '优缺点、影响、原因、方式、对比、预测',
      icon: HelpCircle,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50/80 to-pink-50/80',
      borderColor: 'border-purple-200/50'
    },
    {
      id: 'themes',
      title: '9大主题',
      subtitle: 'Themes',
      description: '教育、科技、环境、媒体等',
      icon: BookOpen,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50/80 to-red-50/80',
      borderColor: 'border-orange-200/50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header with back button */}
      <div className="bg-white/50 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => {
              playSound(600, 100);
              navigate('/');
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>返回首页</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Title - centered, purple gradient, no background */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-pink-400 bg-clip-text text-transparent mb-4">
            口语素材库 - IELTS Part3 Topics
          </h1>
        </div>

        {/* Three Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => {
                  playSound(900 + index * 100, 120);
                  navigate(`/part/3/${module.id}`);
                }}
                className={`group relative overflow-hidden bg-gradient-to-br ${module.bgGradient} backdrop-blur-xl border-2 ${module.borderColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-left`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${module.gradient} opacity-20 rounded-full -mr-16 -mt-16 group-hover:opacity-30 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${module.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg transform group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{module.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{module.subtitle}</p>
                  <p className="text-base text-gray-600">{module.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Note Section - at bottom, slightly larger */}
        <div>
          <div className="bg-gradient-to-br from-yellow-50/30 to-amber-50/30 backdrop-blur-xl rounded-2xl shadow-xl border border-yellow-100/50">
            <button
              onClick={() => {
                playSound(700, 100);
                setShowNote(!showNote);
              }}
              className="w-full flex items-center justify-between p-5 hover:bg-yellow-50/30 transition-colors"
            >
              <h2 className="text-lg font-bold text-gray-800">📌 Note</h2>
              {showNote ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
            </button>
            
            {showNote && (
              <div className="px-5 pb-5 space-y-2.5">
                <div className="bg-white/60 rounded-xl p-3 border border-yellow-100/50">
                  <p className="text-gray-700 text-base"><strong>📝 考试方式：</strong>在Part2题目和回答基础上考官进行提问，一问一答</p>
                </div>
                
                <div className="bg-white/60 rounded-xl p-3 border border-yellow-100/50">
                  <p className="text-gray-700 text-base"><strong>✨ 考试特点：</strong>问题随机性强，表达词汇和逻辑要求更高</p>
                </div>
                
                <div className="bg-white/60 rounded-xl p-3 border border-yellow-100/50">
                  <p className="text-gray-700 text-base">
                    <strong>🎯 得分要点 - Simon考官：</strong>"给出长的、详细的答案，是给考官留下印象的最后机会，要做最后的努力"
                  </p>
                </div>

                <div className="bg-white/60 rounded-xl p-3 border border-yellow-100/50">
                  <h3 className="font-bold text-gray-800 mb-1.5 text-base">✅ 题库内容</h3>
                  <div className="space-y-1 text-gray-700 text-sm">
                    <p><strong>1. 【4大分类】</strong> - 人物类、地点类、事件类、事物类 · 覆盖1-4月所有新题+保留题 [待题库稳定后更新]</p>
                    <p><strong>2. 【6大题型】</strong> - 6类题型 · 分步骤给出万能回答模板</p>
                    <p><strong>3. 【9大主题】</strong> - 9大主题 · 每个主题下细分不同方向 [不包括新题哦]</p>
                  </div>
                </div>

                <div className="bg-amber-50/50 rounded-xl p-3 border border-amber-200/50">
                  <p className="text-gray-600 text-sm">
                    <strong>注：</strong>Part 3 随机性大，抽到题库内原题的概率小于P1P2 · 重点是积累了解不同方向的观点+不同题型的回答思路，不要死记硬背
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}