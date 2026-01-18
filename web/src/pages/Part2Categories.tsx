import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, MapPin, Calendar, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Part2Categories() {
  const navigate = useNavigate();
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Initialize AudioContext for sound effects
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playSound = async (frequency: number, duration: number = 150) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      // Resume AudioContext if it's suspended
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000);
      
      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
      
      // Wait for the sound to finish
      await new Promise(resolve => setTimeout(resolve, duration));
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const categories = [
    { 
      id: 'people', 
      name: '人物类', 
      emoji: '👥',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      description: '关于人物描述的话题',
      sound: 500
    },
    { 
      id: 'place', 
      name: '地点类', 
      emoji: '📍',
      color: 'from-green-400 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      description: '关于地点场所的话题',
      sound: 700
    },
    { 
      id: 'event', 
      name: '事件类&事物类', 
      emoji: '🎯',
      color: 'from-purple-400 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      description: '关于事件经历和事物的话题',
      sound: 900
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify之间 mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回首页</span>
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            口语素材库 - IELTS Part2 Topics
          </h1>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={async () => {
                console.log('Clicking category:', category.name, 'with sound:', category.sound);
                await playSound(category.sound, 150);
                navigate(`/part/2/${category.id}`);
              }}
              className={`relative overflow-hidden bg-gradient-to-br ${category.bgColor} rounded-2xl shadow-lg p-10 transition-all duration-300 hover:shadow-xl hover:scale-105 group border border-purple-100`}
            >
              <div className="flex flex-col items-center text-center space-y-5">
                {/* Icon with lighter background */}
                <div className="w-24 h-24 rounded-full bg-white/80 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <span className="text-5xl leading-none flex items-center justify中心">{category.emoji}</span>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-800">
                  {category.name}
                </h2>

                {/* Action hint */}
                <div className="text-sm text-gray-500 group-hover:text-purple-600 transition-colors">
                  点击进入 →
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Info Card - Collapsible, matching category cards width */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-md border border-purple-200 overflow-hidden">
          {/* Header - Always visible, left aligned */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg紫-100/50 transition-colors text-left"
          >
            <h3 className="text-base font-bold text-gray-800">⭐️ Part 2 备考提示【必看】</h3>
            <ChevronDown 
              className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
          
          {/* Content - Expandable */}
          <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
            <div className="px-6 pb-6 space-y-4 text-gray-700 text-base">{/* 增大文字 */}
              {/* 1. 换题季影响 */}
              <div>
                <h4 className="font-bold text-black mb-2">1. 换题季影响</h4>
                <div className="ml-4 space-y-2">
                  <p className="leading-relaxed">
                    <span className="font-medium text-blue-600">1月初</span>新题增多 题库变动频繁  至<span className="font-medium text-blue-600">1月中下旬</span>题库稳定
                  </p>
                  <p className="leading-relaxed">
                    由于Part 2不断有新题出现 <span className="font-medium text紫-600">串题故事</span>也暂不稳定  需要根据新题随时修改
                  </p>
                  <ul className="ml-6 space-y-1 mt-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">-</span>
                      <span><span className="font-medium text-blue-600">1月考试:</span> 实时准备</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">-</span>
                      <span><span className="font-medium text-blue-600">1月后考试:</span> 优先准备Part1、 Part2等题库稳定后再准备</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 2. 串题注意事项 */}
              <div>
                <h4 className="font-bold text黑 mb-2">2. 串题注意事项</h4>
                <div className="ml-4 space-y-2">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text紫-600">-</span>
                      <span>题目名称列内 <span className="font-medium text紫-600">多个方框同一色彩</span> 代表互相串题 共用素材</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text紫-600">-</span>
                      <span><span className="font-medium text紫-600">串题</span>这种形式优点是<span className="font-medium text紫-600">备考压力小</span>，但缺点不可避免有<span className="font-medium text紫-600">主题不唯一/素材堆砌</span>的情况<br />
                      大家考场上根据抽到的题目灵活使用素材 [eg:跳过/省略说不相关的主题 重点说你抽到的]</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text紫-600">-</span>
                      <span>串题但主题方向差别大的题目 需要单独在<span className="font-medium text紫-600">开头句</span>根据不同题目先扣题 [尤其<span className="font-medium text紫-600">事件事物类</span>]</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 3. 回答补充内容 */}
              <div>
                <h4 className="font-bold text黑 mb-2">3. 回答中标有 [  ] 表示补充内容</h4>
                <p className="ml-4 leading-relaxed">
                  可根据能力/目标分数选择性学习 <span className="font-medium text紫-600">不说不影响核心回答</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-16"></div>
      </div>
    </div>
  );
}
