import { useState, useEffect } from 'react';

interface CompletionScreenProps {
  title: string;
  totalXP: number;
  correctCount: number;
  totalQuestions: number;
  timeTaken: number;
  onRestart: () => void;
  onExit: () => void;
}

const messages = [
  '真厉害！原来你就是记忆大师？',
  '现在的你，真的很像考场里的高分选手。',
  '继续保持！你离雅思高分又近了一步。',
  '太棒了！这个状态去考试一定没问题。'
];

const randomMessage = messages[Math.floor(Math.random() * messages.length)];

export function CompletionScreen({
  title,
  totalXP,
  correctCount,
  totalQuestions,
  timeTaken,
  onRestart,
  onExit
}: CompletionScreenProps) {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  
  const accuracy = Math.round((correctCount / totalQuestions) * 100);
  
  // Format time taken - timeTaken is in seconds
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  // Animate cards appearing one by one
  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleCards([0]), 200),
      setTimeout(() => setVisibleCards([0, 1]), 500),
      setTimeout(() => setVisibleCards([0, 1, 2]), 800)
    ];
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-white/70">
      <div className="bg-gradient-to-br from-purple-100 via-purple-50 to-pink-50 rounded-3xl shadow-2xl max-w-3xl w-full p-8 border border-purple-200">
        {/* Title */}
        <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {title}
        </h2>
        
        {/* Subtitle - Random Message */}
        <p className="text-gray-600 text-center mb-8 text-base font-medium">
          {randomMessage}
        </p>

        {/* Stats Grid - Centered */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {/* Total XP */}
          <div 
            className={`transition-all duration-500 ${
              visibleCards.includes(0) 
                ? 'translate-x-0 opacity-100 animate-shake' 
                : '-translate-x-full opacity-0'
            }`}
            style={{ animationDelay: '0ms' }}
          >
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-2 border-2 border-purple-300 shadow-lg">
              <div className="text-purple-600 text-xs font-bold mb-1 px-2 text-center">总经验</div>
              <div className="bg-white rounded-xl px-5 py-3 flex items-center justify-center gap-2">
                <span className="text-3xl">💎</span>
                <span className="text-3xl font-bold text-purple-600">{totalXP}</span>
              </div>
            </div>
          </div>

          {/* Accuracy */}
          <div 
            className={`transition-all duration-500 ${
              visibleCards.includes(1) 
                ? 'translate-x-0 opacity-100 animate-shake' 
                : '-translate-x-full opacity-0'
            }`}
            style={{ animationDelay: '100ms' }}
          >
            <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl p-2 border-2 border-emerald-300 shadow-lg">
              <div className="text-emerald-600 text-xs font-bold mb-1 px-2 text-center">准确率</div>
              <div className="bg-white rounded-xl px-5 py-3 flex items-center justify-center gap-2">
                <span className="text-3xl">🎯</span>
                <span className="text-3xl font-bold text-emerald-600">{accuracy}%</span>
              </div>
            </div>
          </div>

          {/* Time */}
          <div 
            className={`transition-all duration-500 ${
              visibleCards.includes(2) 
                ? 'translate-x-0 opacity-100 animate-shake' 
                : '-translate-x-full opacity-0'
            }`}
            style={{ animationDelay: '200ms' }}
          >
            <div className="bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-2xl p-2 border-2 border-cyan-300 shadow-lg">
              <div className="text-cyan-600 text-xs font-bold mb-1 px-2 text-center">回答用时</div>
              <div className="bg-white rounded-xl px-5 py-3 flex items-center justify-center gap-2">
                <span className="text-3xl">⏱️</span>
                <span className="text-3xl font-bold text-cyan-600">{formatTime(timeTaken)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onRestart}
            className="flex-1 px-8 py-3 bg-gradient-to-r from-gray-200 to-gray-100 text-gray-700 rounded-2xl font-bold text-base hover:shadow-lg hover:from-gray-300 hover:to-gray-200 transition-all hover:scale-105 border border-gray-300"
          >
            再试一次
          </button>
          <button
            onClick={onExit}
            className="flex-1 px-8 py-3 bg-gradient-to-r from-gray-200 to-gray-100 text-gray-700 rounded-2xl font-bold text-base hover:shadow-lg hover:from-gray-300 hover:to-gray-200 transition-all hover:scale-105 border border-gray-300"
          >
            练练别的
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}