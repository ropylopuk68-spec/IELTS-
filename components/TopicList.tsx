import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockTopics } from '../data/mockData';
import { part2Topics } from '../data/part2Data';
import { useState, useEffect, useRef } from 'react';

type MasteryLevel = 'not-started' | 'practicing' | 'mastered';

export function TopicList() {
  const { partNumber, category } = useParams();
  const [masteryLevels, setMasteryLevels] = useState<Record<string, MasteryLevel>>({});
  const [totalXP, setTotalXP] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [examTakers, setExamTakers] = useState<Record<string, number>>({});
  const [showStreakPopup, setShowStreakPopup] = useState(false);
  const [streakDays, setStreakDays] = useState<number[]>([]);
  const navigate = useNavigate();
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
  
  // Play sound effect
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
  
  const playMasterySound = (level: MasteryLevel) => {
    switch (level) {
      case 'not-started':
        playSound(400, 100);
        break;
      case 'practicing':
        playSound(600, 120);
        break;
      case 'mastered':
        playSound(800, 100);
        setTimeout(() => playSound(1000, 150), 100);
        break;
    }
  };
  
  // Get topics based on part number and category
  let topics: any[] = [];
  let storageKey = '';
  
  if (partNumber === '2' && category) {
    topics = part2Topics[category as 'people' | 'place' | 'event'] || [];
    storageKey = `part2-${category}`;
  } else {
    topics = mockTopics[partNumber as '1' | '2' | '3'] || [];
    storageKey = `part${partNumber}`;
  }

  // Debug: Log to check topics data
  useEffect(() => {
    console.log('Topics loaded:', topics.length, 'topics');
    console.log('Part Number:', partNumber, 'Category:', category);
  }, [topics, partNumber, category]);

  useEffect(() => {
    // Load mastery levels from localStorage
    const saved = localStorage.getItem(`mastery-levels-${storageKey}`);
    if (saved) {
      setMasteryLevels(JSON.parse(saved));
    }
    
    // Load exam takers from localStorage
    const savedExamTakers = localStorage.getItem(`exam-takers-${storageKey}`);
    if (savedExamTakers) {
      setExamTakers(JSON.parse(savedExamTakers));
    }
  }, [storageKey]);

  const toggleMasteryLevel = (topicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentLevel = masteryLevels[topicId] || 'not-started';
    const levels: MasteryLevel[] = ['not-started', 'practicing', 'mastered'];
    const currentIndex = levels.indexOf(currentLevel);
    const nextLevel = levels[(currentIndex + 1) % levels.length];
    
    const newLevels = {
      ...masteryLevels,
      [topicId]: nextLevel
    };
    setMasteryLevels(newLevels);
    localStorage.setItem(`mastery-levels-${storageKey}`, JSON.stringify(newLevels));
    playMasterySound(nextLevel);
  };

  const handleExamTakersChange = (topicId: string, value: string) => {
    const numValue = parseInt(value) || 0;
    const newExamTakers = {
      ...examTakers,
      [topicId]: numValue
    };
    setExamTakers(newExamTakers);
    localStorage.setItem(`exam-takers-${storageKey}`, JSON.stringify(newExamTakers));
  };

  const getExamTakers = (topicId: string, defaultValue: number) => {
    return examTakers[topicId] !== undefined ? examTakers[topicId] : defaultValue;
  };

  const getMasteryIcon = (level: MasteryLevel) => {
    switch (level) {
      case 'not-started':
        return { icon: '🔴', text: '未开始', color: 'text-red-600' };
      case 'practicing':
        return { icon: '🟡', text: '磨合中', color: 'text-yellow-600' };
      case 'mastered':
        return { icon: '🟢', text: '已通关', color: 'text-green-600' };
    }
  };
  
  const partInfo = {
    '1': { title: '口语素材库', subtitle: 'IELTS Part1 Topics', color: 'blue' },
    '2': { title: '口语素材库', subtitle: 'IELTS Part2 Topics', color: 'purple' },
    '3': { title: '口语素材库', subtitle: 'IELTS Part3 Topics', color: 'orange' }
  }[partNumber as '1' | '2' | '3'];

  // Calculate total XP for current part only
  const calculatePartXP = () => {
    let totalXP = 0;
    
    // For Part 2, we need to sum XP from all three categories
    if (partNumber === '2') {
      ['part2-people', 'part2-place', 'part2-event'].forEach(key => {
        const xp = localStorage.getItem(`experience-${key}`);
        if (xp) {
          totalXP += parseInt(xp) || 0;
        }
      });
    } else {
      // For Part 1 and Part 3, just get the direct XP
      const xp = localStorage.getItem(`experience-part${partNumber}`);
      if (xp) {
        totalXP = parseInt(xp) || 0;
      }
    }
    
    return totalXP;
  };

  // Listen for XP changes
  useEffect(() => {
    const handleStorageChange = () => {
      setTotalXP(calculatePartXP());
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Check XP changes periodically
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [partNumber]);

  const colorClasses = {
    blue: {
      gradient: 'from-blue-500 to-cyan-500',
      text: 'text-blue-600',
      bg: 'bg-blue-50',
      hover: 'hover:bg-blue-50'
    },
    purple: {
      gradient: 'from-purple-500 to-pink-500',
      text: 'text-purple-600',
      bg: 'bg-purple-50',
      hover: 'hover:bg-purple-50'
    },
    orange: {
      gradient: 'from-orange-500 to-red-500',
      text: 'text-orange-600',
      bg: 'bg-orange-50',
      hover: 'hover:bg-orange-50'
    }
  }[partInfo?.color || 'blue'];

  // Load current streak from localStorage
  useEffect(() => {
    const savedStreak = localStorage.getItem('current-streak');
    const savedStreakDays = localStorage.getItem('streak-days');
    if (savedStreak) {
      setCurrentStreak(parseInt(savedStreak) || 0);
    }
    if (savedStreakDays) {
      setStreakDays(JSON.parse(savedStreakDays));
    }
  }, []);

  // Update streak when practice is done
  const updateStreak = () => {
    const today = new Date().toDateString();
    const lastPracticeDate = localStorage.getItem('last-practice-date');
    
    if (lastPracticeDate !== today) {
      // It's a new day with practice
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      localStorage.setItem('current-streak', newStreak.toString());
      localStorage.setItem('last-practice-date', today);
      
      // Update streak days
      const newStreakDays = [...streakDays, new Date().getDate()];
      setStreakDays(newStreakDays);
      localStorage.setItem('streak-days', JSON.stringify(newStreakDays));
    }
  };

  // Get current month calendar
  const getCurrentMonthCalendar = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const calendar = [];
    for (let i = 0; i < firstDay; i++) {
      calendar.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(day);
    }
    return calendar;
  };

  const calendar = getCurrentMonthCalendar();

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <button
            onClick={() => navigate(partNumber === '2' && category ? '/part/2' : '/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base font-medium">{partNumber === '2' && category ? '返回分类选择' : '返回首页'}</span>
          </button>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              {partInfo?.title} - {partInfo?.subtitle}
            </h1>
          </div>
        </div>

        {/* Topics Table - Glass Morphism */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 max-w-4xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-100/80 to-pink-100/80 backdrop-blur-sm border-b-2 border-purple-200/50">
                  <th className="px-4 py-4 text-center text-sm font-bold text-gray-700 whitespace-nowrap w-24">
                    掌握度
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold text-gray-700">
                    题目
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold text-gray-700 whitespace-nowrap w-48">
                    类型
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold text-gray-700 whitespace-nowrap w-24">
                    题目数量
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold text-gray-700 whitespace-nowrap w-28">
                    考试人数
                  </th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic, index) => {
                  const level = masteryLevels[topic.id] || 'not-started';
                  const masteryInfo = getMasteryIcon(level);
                  
                  return (
                    <tr
                      key={topic.id}
                      className={`border-b border-white/20 transition-all hover:bg-white/30 hover:shadow-lg hover:scale-[1.01] cursor-pointer backdrop-blur-sm bg-white/10 mb-2`}
                      onClick={() => {
                        playSound(700, 150);
                        setTimeout(() => {
                          navigate(partNumber === '2' && category ? `/part/2/${category}/topic/${topic.id}` : `/part/${partNumber}/topic/${topic.id}`);
                        }, 100);
                      }}
                      style={{ display: 'table-row' }}
                    >
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={(e) => toggleMasteryLevel(topic.id, e)}
                          className="inline-flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl hover:bg-white/40 transition-all hover:scale-110 backdrop-blur-sm group"
                          title="点击切换掌握度"
                        >
                          <span className="text-xl group-hover:animate-bounce">{masteryInfo.icon}</span>
                          <span className={`text-xs font-bold ${masteryInfo.color}`}>
                            {masteryInfo.text}
                          </span>
                        </button>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-lg">{topic.question.split(' ')[0]}</span>
                          <span className="text-gray-800 font-semibold text-base hover:text-purple-600 transition-colors">
                            {topic.question.substring(topic.question.indexOf(' ') + 1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {topic.topicType ? (
                            <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm min-w-[90px] ${
                              topic.topicType.includes('新题') && topic.topicType.includes('非大陆')
                                ? 'bg-gradient-to-r from-yellow-100/90 to-amber-100/90 text-yellow-800 border border-yellow-300'
                                : topic.topicType.includes('新题')
                                ? 'bg-gradient-to-r from-red-100/90 to-pink-100/90 text-red-800 border border-red-300'
                                : topic.topicType.includes('保留题')
                                ? 'bg-gradient-to-r from-blue-100/90 to-cyan-100/90 text-blue-800 border border-blue-300'
                                : topic.topicType.includes('非大陆')
                                ? 'bg-gradient-to-r from-yellow-100/90 to-amber-100/90 text-yellow-800 border border-yellow-300'
                                : 'bg-gradient-to-r from-gray-100/90 to-gray-200/90 text-gray-800 border border-gray-300'
                            }`}>
                              {topic.topicType}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span className="text-gray-800 font-bold text-base">{topic.questionCount}</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex justify-center">
                          <input
                            type="number"
                            value={getExamTakers(topic.id, topic.examTakers)}
                            onChange={(e) => handleExamTakersChange(topic.id, e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-20 text-center text-gray-800 font-semibold text-base bg-white/60 backdrop-blur-sm border-2 border-white/40 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent shadow-sm hover:border-purple-300 transition-colors"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          共 <span className={`font-bold ${colorClasses.text}`}>{topics.length}</span> 个话题
        </div>
      </div>
    </div>
  );
}