import { useState } from 'react';

interface TargetScorePickerProps {
  onConfirm: (score: number) => void;
  onCancel: () => void;
}

export function TargetScorePicker({ onConfirm, onCancel }: TargetScorePickerProps) {
  // Generate scores from 4.5 to 9.0 with 0.5 intervals
  const scores = [];
  for (let i = 4.5; i <= 9.0; i += 0.5) {
    scores.push(i);
  }
  
  const [selectedScore, setSelectedScore] = useState(7.0);

  const handleConfirm = () => {
    onConfirm(selectedScore);
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
          <h3 className="text-gray-800 font-semibold text-lg">选择目标分数</h3>
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white font-semibold text-lg px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            确定
          </button>
        </div>

        {/* Picker */}
        <div className="p-8">
          <div className="flex items-center justify-center">
            {/* Score Picker */}
            <div className="w-32">
              <div className="h-64 overflow-y-auto scrollbar-hide">
                <div className="py-24">
                  {scores.map((score) => (
                    <div
                      key={score}
                      onClick={() => setSelectedScore(score)}
                      className={`text-center py-4 cursor-pointer transition-all ${
                        score === selectedScore
                          ? 'text-4xl font-bold text-blue-600'
                          : 'text-2xl text-gray-400'
                      }`}
                    >
                      {score.toFixed(1)}
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
