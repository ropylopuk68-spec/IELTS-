import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { part2PeopleTopics } from '../data/part2PeopleData';
import { part2PlaceTopics } from '../data/part2PlaceData';
import { part2EventTopics } from '../data/part2EventData';
import { useState, useEffect, useRef, Fragment } from 'react';

export function Part2TopicList() {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const [examTakers, setExamTakers] = useState<Record<string, number>>({});
  const [hoveredStory, setHoveredStory] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

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
    if (!audioContextRef.current) return;
    
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
    
    gainNode.gain.setValueAtTime(0.2, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
  };

  // Get topics based on category
  const getTopicsByCategory = () => {
    if (category === 'people') {
      return part2PeopleTopics;
    } else if (category === 'place') {
      return part2PlaceTopics;
    } else if (category === 'event') {
      return part2EventTopics;
    }
    return [];
  };

  const topics = getTopicsByCategory();

  // Get category info
  const getCategoryInfo = () => {
    switch (category) {
      case 'people':
        return { name: '人物类', icon: '👥' };
      case 'place':
        return { name: '地点类', icon: '📍' };
      case 'event':
        return { name: '事件类&事物类', icon: '🎯' };
      default:
        return { name: '未知类别', icon: '❓' };
    }
  };

  const categoryInfo = getCategoryInfo();

  // Initialize exam takers from localStorage or topics data
  useEffect(() => {
    const savedExamTakers = localStorage.getItem(`part2-exam-takers-${category}`);
    if (savedExamTakers) {
      setExamTakers(JSON.parse(savedExamTakers));
    } else {
      const initialExamTakers: Record<string, number> = {};
      topics.forEach(topic => {
        initialExamTakers[topic.id] = topic.examTakers;
      });
      setExamTakers(initialExamTakers);
    }
  }, [category]);

  // Handle exam takers change and save to localStorage
  const handleExamTakersChange = (topicId: string, value: string) => {
    const numValue = parseInt(value) || 0;
    const newExamTakers = { ...examTakers, [topicId]: numValue };
    setExamTakers(newExamTakers);
    localStorage.setItem(`part2-exam-takers-${category}`, JSON.stringify(newExamTakers));
  };

  // Group topics by story group
  const groupedTopics = topics.reduce((acc, topic) => {
    const group = topic.storyGroup || 'no-group';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(topic);
    return acc;
  }, {} as Record<string, typeof topics>);

  // Get background color for story group
  const getStoryGroupBg = (groupName: string, isHovered: boolean = false) => {
    // People category
    if (groupName.includes('泰勒')) return isHovered ? 'bg-yellow-100/90' : 'bg-yellow-50/80';
    if (groupName.includes('马龙')) return isHovered ? 'bg-orange-100/90' : 'bg-orange-50/80';
    if (groupName.includes('外国朋友')) return isHovered ? 'bg-blue-100/90' : 'bg-blue-50/80';
    if (groupName.includes('好朋友')) return isHovered ? 'bg-green-100/90' : 'bg-green-50/80';
    if (groupName.includes('怪朋友')) return isHovered ? 'bg-pink-100/90' : 'bg-pink-50/80';
    if (groupName.includes('李邻居')) return isHovered ? 'bg-red-100/90' : 'bg-red-50/80';
    
    // Place category
    if (groupName.includes('海滩')) return isHovered ? 'bg-cyan-100/90' : 'bg-cyan-50/80';
    if (groupName.includes('城市')) return isHovered ? 'bg-purple-100/90' : 'bg紫-50/80';
    if (groupName.includes('公共场所')) return isHovered ? 'bg-pink-100/90' : 'bg-pink-50/80';
    if (groupName.includes('自然风光')) return isHovered ? 'bg-emerald-100/90' : 'bg-emerald-50/80';
    
    // Event category - 按照新数据结构
    if (groupName.includes('跑马拉松')) return isHovered ? 'bg-amber-100/90' : 'bg-amber-50/80';
    if (groupName.includes('电影')) return isHovered ? 'bg-purple-100/90' : 'bg紫-50/80';
    if (groupName.includes('乐高玩具')) return isHovered ? 'bg-amber-100/90' : 'bg-amber-50/80';
    if (groupName.includes('AI工具')) return isHovered ? 'bg-pink-100/90' : 'bg-pink-50/80';
    if (groupName.includes('画画')) return isHovered ? 'bg-amber-100/90' : 'bg-amber-50/80';
    if (groupName.includes('海底捞')) return isHovered ? 'bg-green-100/90' : 'bg-green-50/80';
    if (groupName.includes('看书')) return isHovered ? 'bg-purple-100/90' : 'bg紫-50/80';
    if (groupName.includes('爆区遗憾')) return isHovered ? 'bg-green-100/90' : 'bg-green-50/80';
    if (groupName.includes('花木兰')) return isHovered ? 'bg-red-100/90' : 'bg-red-50/80';
    
    return isHovered ? 'bg-gray-100/90' : 'bg-gray-50/80';
  };

  // Get border color for story group
  const getBorderColor = (groupName: string) => {
    // People category
    if (groupName.includes('泰勒')) return 'border-yellow-300/40';
    if (groupName.includes('马龙')) return 'border-orange-300/40';
    if (groupName.includes('外国朋友')) return 'border-blue-300/40';
    if (groupName.includes('好朋友')) return 'border-green-300/40';
    if (groupName.includes('怪朋友')) return 'border-pink-300/40';
    if (groupName.includes('李邻居')) return 'border-red-300/40';
    
    // Place category
    if (groupName.includes('海滩')) return 'border-cyan-300/40';
    if (groupName.includes('城市')) return 'border-purple-300/40';
    if (groupName.includes('公共场所')) return 'border-pink-300/40';
    if (groupName.includes('自然风光')) return 'border-emerald-300/40';
    
    // Event category
    if (groupName.includes('跑马拉松')) return 'border-amber-300/40';
    if (groupName.includes('电影')) return 'border-purple-300/40';
    if (groupName.includes('乐高玩具')) return 'border-amber-300/40';
    if (groupName.includes('AI工具')) return 'border-pink-300/40';
    if (groupName.includes('画画')) return 'border-amber-300/40';
    if (groupName.includes('海底捞')) return 'border-green-300/40';
    if (groupName.includes('看书')) return 'border-purple-300/40';
    if (groupName.includes('爆区遗憾')) return 'border-green-300/40';
    if (groupName.includes('花木兰')) return 'border-red-300/40';
    
    return 'border-gray-300/40';
  };

  // Get sound frequency for story group
  const getStoryGroupSound = (groupName: string) => {
    // People category
    if (groupName.includes('泰勒')) return 500;
    if (groupName.includes('马龙')) return 550;
    if (groupName.includes('外国朋友')) return 650;
    if (groupName.includes('好朋友')) return 800;
    if (groupName.includes('怪朋友')) return 950;
    if (groupName.includes('李邻居')) return 1100;
    
    // Place category
    if (groupName.includes('海滩')) return 450;
    if (groupName.includes('城市')) return 750;
    if (groupName.includes('公共场所')) return 850;
    if (groupName.includes('自然风光')) return 600;
    
    // Event category - 按照新数据结构
    if (groupName.includes('跑马拉松')) return 500;
    if (groupName.includes('电影')) return 600;
    if (groupName.includes('乐高玩具')) return 700;
    if (groupName.includes('AI工具')) return 800;
    if (groupName.includes('画画')) return 900;
    if (groupName.includes('海底捞')) return 1000;
    if (groupName.includes('看书')) return 550;
    if (groupName.includes('爆区遗憾')) return 650;
    if (groupName.includes('花木兰')) return 1100;
    
    return 700;
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50/40 via-purple-50/40 to-pink-50/40">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify之间 mb-6">
          <button
            onClick={() => navigate('/part/2')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>返回分类</span>
          </button>
        </div>

        {/* Category Title - Deeper purple gradient for better visibility */}
        <div className="text-center mb-6">
          <h1 
            className="text-3xl font-bold bg-gradient-to-r from-purple-500 via紫-400 to-pink-400 bg-clip-text text-transparent inline-block"
          >
            {categoryInfo.name}
          </h1>
        </div>

        {/* Table - Compact spacing with frosted glass borders */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-purple-200/50">
          <table className="w-full border-separate" style={{ borderSpacing: 0 }}>
            <thead className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 backdrop-blur-sm">
              <tr>
                <th className="py-5 text-center text-base font-bold text-gray-700" style={{ width: '30%' }}>
                  题目名称
                </th>
                <th className="py-5 text-center text-base font-bold text-gray-700" style={{ width: '25%' }}>
                  串题故事
                </th>
                <th className="py-5 text-center text-base font-bold text-gray-700" style={{ width: '25%' }}>
                  题目类型
                </th>
                <th className="py-5 text-center text-base font-bold text-gray-700" style={{ width: '20%' }}>
                  近期考试人数
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedTopics).map(([groupName, groupTopics], groupIndex) => {
                const rowCount = groupTopics.length;
                const isHovered = hoveredStory === groupName;
                const borderColor = getBorderColor(groupName);
                
                return (
                  <Fragment key={groupName}>
                    {/* Story Group Wrapper with minimal spacing (1-2mm = ~3-6px) */}
                    <tr>
                      <td colSpan={4} className="px-0.5 py-0.5">
                        <div 
                          className={`rounded-2xl border-4 ${borderColor} backdrop-blur-md overflow-hidden transition-all duration-300 ${
                            isHovered ? 'shadow-xl scale-[1.01]' : 'shadow-sm'
                          }`}
                          onMouseEnter={() => setHoveredStory(groupName)}
                          onMouseLeave={() => setHoveredStory(null)}
                        >
                          <table className="w-full" style={{ borderSpacing: 0 }}>
                            <tbody>
                              {groupTopics.map((topic, index) => (
                                <tr key={topic.id}>
                                  {/* 题目名称 */}
                                  <td className="py-3 text-center bg-white/40 backdrop-blur-sm transition-all duration-300" style={{ width: '30%' }}>
                                    <span className="text-base font-semibold text-gray-800">
                                      {topic.title}
                                    </span>
                                  </td>

                                  {/* 串题故事 - Only show in the first row */}
                                  {index === 0 && (
                                    <td 
                                      rowSpan={rowCount}
                                      className="py-3 text-center align-middle cursor-pointer transition-all duration-300 bg-white/40 backdrop-blur-sm hover:bg-purple-50/50"
                                      style={{ width: '25%' }}
                                      onClick={() => {
                                        playSound(getStoryGroupSound(groupName), 120);
                                        navigate(`/part/2/${category}/topic/${groupTopics[0].id}`);
                                      }}
                                    >
                                      {groupName !== 'no-group' && (
                                        <span className={`inline-flex items-center gap-1 text-base font-bold transition-all duration-300 ${
                                          isHovered ? 'text紫-700 scale-105' : 'text-gray-800'
                                        }`}>
                                          {groupName}
                                        </span>
                                      )}
                                    </td>
                                  )}

                                  {/* 题目类型 */}
                                  <td className="py-3 text-center bg-white/40 backdrop-blur-sm transition-all duration-300" style={{ width: '25%' }}>
                                    <span className={`inline-block px-3 py-1 rounded-full text-base font-bold shadow-sm ${
                                      topic.topicType.includes('新题') 
                                        ? 'bg-red-100/80 text-red-700 backdrop-blur-sm' 
                                        : topic.topicType.includes('9-12月')
                                        ? 'bg-gray-100/80 text-gray-700 backdrop-blur-sm'
                                        : 'bg-purple-100/80 text紫-700 backdrop-blur-sm'
                                    }`}>
                                      {topic.topicType}
                                    </span>
                                  </td>

                                  {/* 近期考试人数 */}
                                  <td className="py-3 text-center bg-white/40 backdrop-blur-sm transition-all duration-300" style={{ width: '20%' }} onClick={(e) => e.stopPropagation()}>
                                    {examTakers[topic.id] > 0 ? (
                                      <input
                                        type="number"
                                        value={examTakers[topic.id] || topic.examTakers}
                                        onChange={(e) => handleExamTakersChange(topic.id, e.target.value)}
                                        className="w-20 px-3 py-1.5 text-center border border紫-300/50 rounded-xl focus:outline-none focus:border紫-500 focus:ring-2 focus:ring紫-200 text-base font-bold text紫-700 bg白/80 backdrop-blur-sm shadow-sm transition-all"
                                        min="0"
                                      />
                                    ) : (
                                      <span className="text-gray-400 text-base font-semibold">暂无</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
