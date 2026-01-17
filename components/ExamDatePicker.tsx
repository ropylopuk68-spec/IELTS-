import { useState } from 'react';

interface ExamDatePickerProps {
  onConfirm: (date: Date) => void;
  onCancel: () => void;
}

export function ExamDatePicker({ onConfirm, onCancel }: ExamDatePickerProps) {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());

  // Generate year options (current year and next 2 years)
  const years = [currentDate.getFullYear(), currentDate.getFullYear() + 1, currentDate.getFullYear() + 2];
  
  // Generate month options (1-12)
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  
  // Generate day options based on selected month/year
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };
  
  const days = Array.from({ length: getDaysInMonth(selectedYear, selectedMonth) }, (_, i) => i + 1);

  const handleConfirm = () => {
    const date = new Date(selectedYear, selectedMonth - 1, selectedDay);
    onConfirm(date);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <button
            onClick={onCancel}
            className="text-blue-500 font-semibold text-lg px-6 py-2 rounded-full hover:bg-blue-50 transition-colors"
          >
            取消
          </button>
          <h3 className="text-gray-800 font-semibold text-lg">选择考试时间</h3>
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white font-semibold text-lg px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            确定
          </button>
        </div>

        {/* Picker */}
        <div className="p-8">
          <div className="flex items-center justify-center gap-4">
            {/* Year Picker */}
            <div className="flex-1">
              <div className="h-48 overflow-y-auto scrollbar-hide">
                <div className="py-16">
                  {years.map((year) => (
                    <div
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`text-center py-3 cursor-pointer transition-all ${
                        year === selectedYear
                          ? 'text-3xl font-bold text-gray-900'
                          : 'text-xl text-gray-400'
                      }`}
                    >
                      {year}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Month Picker */}
            <div className="flex-1">
              <div className="h-48 overflow-y-auto scrollbar-hide">
                <div className="py-16">
                  {months.map((month) => (
                    <div
                      key={month}
                      onClick={() => setSelectedMonth(month)}
                      className={`text-center py-3 cursor-pointer transition-all ${
                        month === selectedMonth
                          ? 'text-3xl font-bold text-gray-900'
                          : 'text-xl text-gray-400'
                      }`}
                    >
                      {month}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Day Picker */}
            <div className="flex-1">
              <div className="h-48 overflow-y-auto scrollbar-hide">
                <div className="py-16">
                  {days.map((day) => (
                    <div
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`text-center py-3 cursor-pointer transition-all ${
                        day === selectedDay
                          ? 'text-3xl font-bold text-gray-900'
                          : 'text-xl text-gray-400'
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </div>
  );
}
