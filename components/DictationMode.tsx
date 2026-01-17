import { useState } from 'react';
import { ArrowLeft, Check, X, Eye, EyeOff, RotateCw } from 'lucide-react';

interface DictationModeProps {
  topic: any;
  currentQuestion: any;
  currentAnswer: any[];
  onBack: () => void;
  partNumber: string | undefined;
}

export function DictationMode({ topic, currentQuestion, currentAnswer, onBack, partNumber }: DictationModeProps) {
  const [userAnswers, setUserAnswers] = useState<Record<number, Record<number, string>>>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Extract words to fill in the blank from keywords
  const getSentenceWithBlanks = (sentence: any, sentenceIndex: number) => {
    const { text, keywords } = sentence;
    const blanks: Array<{ word: string; index: number }> = [];
    let result = text;
    
    // Replace keywords with blanks
    keywords.forEach((keyword: string) => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
      const matches = text.match(regex);
      if (matches) {
        matches.forEach((match: string) => {
          const index = blanks.length;
          blanks.push({ word: match, index });
          result = result.replace(match, `___BLANK_${index}___`);
        });
      }
    });

    return { result, blanks };
  };

  const handleInputChange = (sentenceIndex: number, blankIndex: number, value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [sentenceIndex]: {
        ...prev[sentenceIndex],
        [blankIndex]: value
      }
    }));
  };

  const checkAnswer = (sentenceIndex: number, blankIndex: number, correctWord: string) => {
    const userAnswer = userAnswers[sentenceIndex]?.[blankIndex] || '';
    return userAnswer.toLowerCase().trim() === correctWord.toLowerCase().trim();
  };

  const resetDictation = () => {
    setUserAnswers({});
    setSubmitted(false);
    setShowAnswers(false);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;

    currentAnswer.forEach((sentence, sentenceIndex) => {
      const { blanks } = getSentenceWithBlanks(sentence, sentenceIndex);
      blanks.forEach((blank) => {
        total++;
        if (checkAnswer(sentenceIndex, blank.index, blank.word)) {
          correct++;
        }
      });
    });

    return { correct, total, percentage: total > 0 ? Math.round((correct / total) * 100) : 0 };
  };

  const score = submitted ? calculateScore() : null;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回学习模式</span>
        </button>

        {/* Title Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">默写模式</h1>
              <p className="text-gray-600">填写空格中的单词，检验学习效果</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAnswers(!showAnswers)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {showAnswers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showAnswers ? '隐藏答案' : '显示答案'}</span>
              </button>
              <button
                onClick={resetDictation}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <RotateCw className="w-4 h-4" />
                <span>重置</span>
              </button>
            </div>
          </div>

          {/* Question */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
            <div className="text-sm font-semibold text-gray-700 mb-1">Part {partNumber} Question</div>
            <p className="text-lg font-semibold text-gray-800">{currentQuestion?.question || topic.question}</p>
            {currentQuestion?.questionCN && (
              <p className="text-gray-600 mt-1">{currentQuestion.questionCN}</p>
            )}
          </div>
        </div>

        {/* Score Card */}
        {submitted && score && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                <span className={score.percentage >= 80 ? 'text-green-600' : score.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}>
                  {score.percentage}%
                </span>
              </div>
              <p className="text-gray-600">
                正确率：{score.correct} / {score.total} 个单词正确
              </p>
              <div className="mt-4">
                {score.percentage >= 80 && (
                  <p className="text-green-600 font-semibold">🎉 太棒了！继续保持！</p>
                )}
                {score.percentage >= 60 && score.percentage < 80 && (
                  <p className="text-yellow-600 font-semibold">💪 不错！再接再厉！</p>
                )}
                {score.percentage < 60 && (
                  <p className="text-red-600 font-semibold">📚 需要多加练习哦！</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Dictation Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">完成默写</h2>

          <div className="space-y-6">
            {currentAnswer.map((sentence, sentenceIndex) => {
              const { result, blanks } = getSentenceWithBlanks(sentence, sentenceIndex);
              const parts = result.split(/___BLANK_\d+___/);

              return (
                <div key={sentenceIndex} className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {sentenceIndex + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-lg leading-relaxed">
                        {parts.map((part, partIndex) => (
                          <span key={partIndex}>
                            {part}
                            {partIndex < blanks.length && (
                              <span className="inline-flex items-center mx-1">
                                <input
                                  type="text"
                                  value={userAnswers[sentenceIndex]?.[blanks[partIndex].index] || ''}
                                  onChange={(e) => handleInputChange(sentenceIndex, blanks[partIndex].index, e.target.value)}
                                  disabled={submitted}
                                  className={`px-3 py-1 border-2 rounded-lg text-center font-semibold transition-all ${
                                    submitted
                                      ? checkAnswer(sentenceIndex, blanks[partIndex].index, blanks[partIndex].word)
                                        ? 'border-green-500 bg-green-50 text-green-700'
                                        : 'border-red-500 bg-red-50 text-red-700'
                                      : 'border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                                  }`}
                                  style={{ width: `${Math.max(blanks[partIndex].word.length * 12, 80)}px` }}
                                  placeholder={showAnswers ? blanks[partIndex].word : '______'}
                                />
                                {submitted && (
                                  <span className="ml-2">
                                    {checkAnswer(sentenceIndex, blanks[partIndex].index, blanks[partIndex].word) ? (
                                      <Check className="w-5 h-5 text-green-600" />
                                    ) : (
                                      <X className="w-5 h-5 text-red-600" />
                                    )}
                                  </span>
                                )}
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                      {submitted && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm text-gray-600">
                            正确答案：
                            <span className="font-semibold text-gray-800 ml-2">
                              {sentence.text}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          {!submitted && (
            <div className="mt-8 text-center">
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                提交答案
              </button>
            </div>
          )}

          {/* Try Again Button */}
          {submitted && (
            <div className="mt-8 text-center">
              <button
                onClick={resetDictation}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                再试一次
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
