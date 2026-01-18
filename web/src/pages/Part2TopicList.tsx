import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { part2PeopleTopics } from '../data/part2PeopleData';
import { part2PlaceTopics } from '../data/part2PlaceData';
import { part2EventTopics } from '../data/part2EventData';
import { useState, useEffect, useRef, Fragment } from 'react';

export default function Part2TopicList() {
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

  // Group by storyGroup
  const grouped = topics.reduce((acc: Record<string, typeof topics>, topic) => {
    const key = topic.storyGroup;
    acc[key] = acc[key] || [];
    acc[key].push(topic);
    return acc;
  }, {});

  // Load exam takers from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`part2-exam-takers-${category}`);
    if (saved) {
      setExamTakers(JSON.parse(saved));
    } else {
      const initial: Record<string, number> = {};
      topics.forEach(t => {
        initial[t.id] = t.examTakers;
      });
      setExamTakers(initial);
    }
  }, [category]);

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

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify之间 mb-8">
          <button
            onClick={() => navigate('/part/2')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回分类</span>
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">
            {category === 'people' ? '人物类' : category === 'place' ? '地点类' : '事件&事物类'}
          </h1>
          <p className="text-gray-600 mt-2">点击故事组展开题目列表</p>
        </div>

        {/* Story Groups */}
        <div className="space-y-2">
          {Object.entries(grouped).map(([storyGroup, items]) => (
            <div key={storyGroup} className="bg-white/40 backdrop-blur border border-purple-100/30 rounded-xl overflow-hidden">
              {/* Group Header */}
              <button
                onClick={() => {
                  playSound(getFrequencyForStoryGroup(storyGroup), 100);
                  setHoveredStory(hoveredStory === storyGroup ? null : storyGroup);
                }}
                className="w-full flex items-center justify-between p-4 hover:bg-purple-50/30 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-800">{storyGroup}</span>
                <span className="text-purple-700 font-bold">
                  {items.reduce((sum, t) => sum + (examTakers[t.id] || 0), 0)}人
                </span>
              </button>

              {/* Topics when expanded */}
              {hoveredStory === storyGroup && (
                <div className="px-4 pb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {items.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => navigate(`/part/2/${category}/topic/${topic.id}`)}
                        className="group bg-white/60 rounded-lg p-4 text-left hover:bg-white/80 border border-purple-100/50"
                      >
                        <div className="flex items-center justify之间">
                          <span className="font-semibold text-gray-800">{topic.title}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            topic.topicType.includes('新题') 
                              ? 'bg-red-100/80 text-red-700' 
                              : topic.topicType.includes('9-12月')
                              ? 'bg-gray-100/80 text-gray-700'
                              : 'bg-purple-100/80 text-purple-700'
                          }`}>
                            {topic.topicType}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
