import { useState, useEffect } from 'react';

interface CheckInModalProps {
  onClose: () => void;
}

export function CheckInModal({ onClose }: CheckInModalProps) {
  const [streakDays, setStreakDays] = useState(0);
  const [checkInDates, setCheckInDates] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Load streak data from localStorage
  useEffect(() => {
    const savedStreak = localStorage.getItem('check-in-streak');
    const savedDates = localStorage.getItem('check-in-dates');
    
    if (savedStreak) {
      setStreakDays(parseInt(savedStreak));
    }
    
    if (savedDates) {
      setCheckInDates(JSON.parse(savedDates));
    }
  }, []);

  // Check if a specific date is checked in
  const isDateCheckedIn = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return checkInDates.includes(dateStr);
  };

  // Get calendar days for current month
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days: (Date | null)[] = [];
    
    // Add empty cells for days before the first day
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  // Check if date is today
  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Format month name
  const getMonthName = () => {
    return currentMonth.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' });
  };

  // Navigate to previous month
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const calendarDays = getCalendarDays();

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-5" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-xl">🔥</span>
          <span className="text-sm font-medium text-gray-700">您已打卡</span>
          <span className="text-sm font-bold text-yellow-500">{streakDays}</span>
          <span className="text-sm font-medium text-gray-700">天</span>
        </div>

        {/* Calendar */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-3">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={previousMonth}
              className="p-1.5 hover:bg-white/50 rounded-lg transition-colors text-lg"
            >
              ←
            </button>
            <h3 className="text-sm font-semibold text-gray-800">{getMonthName()}</h3>
            <button
              onClick={nextMonth}
              className="p-1.5 hover:bg-white/50 rounded-lg transition-colors text-lg"
            >
              →
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1.5 mb-1.5">
            {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1.5">
            {calendarDays.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} />;
              }

              const checkedIn = isDateCheckedIn(date);
              const today = isToday(date);

              return (
                <div
                  key={index}
                  className={`aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-all ${
                    checkedIn
                      ? 'bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-sm'
                      : today
                      ? 'bg-white border border-purple-300 text-gray-800'
                      : 'bg-white/50 text-gray-600'
                  }`}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}