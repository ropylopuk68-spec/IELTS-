import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function StreakPage() {
  const navigate = useNavigate();
  const [currentStreak, setCurrentStreak] = useState(0);
  const [streakGoal, setStreakGoal] = useState(7);
  const [streakData, setStreakData] = useState<Record<string, boolean>>({});
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    // Load streak data from localStorage
    const saved = localStorage.getItem('streak-data');
    if (saved) {
      const data = JSON.parse(saved);
      setStreakData(data.dates || {});
      setCurrentStreak(data.currentStreak || 0);
    }
  }, []);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const hasStreak = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return streakData[formatDate(date)] || false;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentDay = isToday(day);
      const hasStreakDay = hasStreak(day);

      days.push(
        <div
          key={day}
          className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium ${
            isCurrentDay
              ? 'bg-orange-500 text-white'
              : hasStreakDay
              ? 'bg-orange-100 text-orange-600'
              : 'text-gray-400'
          }`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-amber-500">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">连胜</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 pb-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <button className="flex-1 text-white font-semibold py-2 border-b-2 border-white">
            个人连胜
          </button>
          <button className="flex-1 text-white/70 font-semibold py-2">
            友情连胜
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Current Streak */}
        <div className="bg-gradient-to-br from-orange-400 to-amber-400 rounded-3xl p-8 mb-6 flex items-center justify-between">
          <div>
            <div className="text-6xl font-bold text-white mb-2">{currentStreak}</div>
            <div className="text-white text-xl">天连胜！</div>
          </div>
          <div className="relative">
            <div className="w-32 h-32 flex items-center justify-center">
              {/* Flame icon */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50 10 C30 30, 20 50, 30 70 Q40 85, 50 90 Q60 85, 70 70 C80 50, 70 30, 50 10 Z"
                  fill="#FCD34D"
                  stroke="white"
                  strokeWidth="3"
                />
                <ellipse cx="50" cy="60" rx="15" ry="20" fill="#F59E0B" />
              </svg>
            </div>
          </div>
        </div>

        {/* Motivation Card */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 flex items-start gap-4">
          <div className="text-4xl">💎</div>
          <div className="flex-1 text-white">
            <p className="font-bold">恭喜你开启连胜！快收下这 <span className="text-blue-400">2 个</span></p>
            <p className="font-bold">连胜激冻吧！</p>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6">
          <h2 className="text-white text-xl font-bold mb-4">连胜日历</h2>
          
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={previousMonth} className="text-white p-2">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-white font-semibold">
              {currentMonth.getFullYear()}年{currentMonth.getMonth() + 1}月
            </div>
            <button onClick={nextMonth} className="text-white p-2">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['一', '二', '三', '四', '五', '六', '日'].map((day) => (
              <div key={day} className="text-center text-gray-400 text-sm">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {renderCalendar()}
          </div>
        </div>

        {/* Goal */}
        <div className="bg-gray-800 rounded-2xl p-6">
          <h2 className="text-white text-xl font-bold mb-4">连胜目标</h2>
          <div className="flex items-center justify-between bg-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📅</div>
              <div className="text-white font-semibold">{streakGoal} 天</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-3xl">🔥</div>
              <div className="text-white text-2xl font-bold">{streakGoal}</div>
            </div>
          </div>
          <div className="mt-4 text-gray-400 text-sm">
            {currentStreak}/{streakGoal} 天
          </div>
          <div className="mt-2 bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-400 to-amber-400 h-full transition-all"
              style={{ width: `${Math.min((currentStreak / streakGoal) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
