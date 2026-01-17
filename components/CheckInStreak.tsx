import { useState, useEffect } from 'react';

interface CheckInStreakProps {
  onCheckIn?: (days: number) => void;
}

export function CheckInStreak({ onCheckIn }: CheckInStreakProps) {
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

  // Check if today is already checked in
  const isCheckedInToday = () => {
    const today = new Date().toISOString().split('T')[0];
    return checkInDates.includes(today);
  };

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
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-orange-200">
      {/* Streak Display */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="text-3xl">🔥</span>
        <span className="text-xl font-bold text-gray-800">
          您已连续打卡
        </span>
        <span className="text-3xl font-bold text-orange-500">
          {streakDays}
        </span>
        <span className="text-xl font-bold text-gray-800">天</span>
      </div>

      {/* Calendar */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            ←
          </button>
          <h3 className="text-lg font-semibold text-gray-800">{getMonthName()}</h3>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            →
          </button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} />;
            }

            const checkedIn = isDateCheckedIn(date);
            const today = isToday(date);

            return (
              <div
                key={index}
                className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                  checkedIn
                    ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-md'
                    : today
                    ? 'bg-white border-2 border-orange-300 text-gray-800'
                    : 'bg-white/50 text-gray-600'
                }`}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-4 text-center text-sm text-gray-600">
        {isCheckedInToday() ? (
          <p className="text-green-600 font-medium">✓ 今天已打卡</p>
        ) : (
          <p>完成题目闯关或录音评分即可打卡</p>
        )}
      </div>
    </div>
  );
}

// Function to handle check-in when user completes an exercise
export function recordCheckIn() {
  const today = new Date().toISOString().split('T')[0];
  
  // Get existing data
  const savedDates = localStorage.getItem('check-in-dates');
  const checkInDates: string[] = savedDates ? JSON.parse(savedDates) : [];
  
  // Check if already checked in today
  if (checkInDates.includes(today)) {
    return; // Already checked in today
  }
  
  // Add today's check-in
  checkInDates.push(today);
  checkInDates.sort();
  
  // Calculate streak
  let streak = 0;
  const todayDate = new Date();
  
  for (let i = 0; i <= 365; i++) {
    const checkDate = new Date(todayDate);
    checkDate.setDate(checkDate.getDate() - i);
    const checkDateStr = checkDate.toISOString().split('T')[0];
    
    if (checkInDates.includes(checkDateStr)) {
      streak++;
    } else {
      break;
    }
  }
  
  // Save to localStorage
  localStorage.setItem('check-in-dates', JSON.stringify(checkInDates));
  localStorage.setItem('check-in-streak', streak.toString());
  
  return streak;
}
