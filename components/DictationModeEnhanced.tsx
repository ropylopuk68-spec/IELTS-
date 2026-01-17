import { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ReorderMode, FillMode, FlashcardMode } from './DictationModes';
import { CompletionScreen } from './CompletionScreen';
import { CheckInStreak, recordCheckIn } from './CheckInStreak';

export function DictationModeEnhanced({ topic, currentQuestion, currentAnswer, onBack, partNumber, onComplete, onExperienceUpdate }: any) {
  const [mode, setMode] = useState<'reorder' | 'fill' | 'flashcard' | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [experience, setExperience] = useState(() => {
    const saved = localStorage.getItem('experience');
    return saved ? parseInt(saved) : 0;
  });
  const [examDate, setExamDate] = useState<Date | null>(null);
  const [targetScore, setTargetScore] = useState<number>(7.0);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Use topic.questions if available, otherwise create a single question from currentQuestion
  const questions = topic.questions || (currentQuestion ? [currentQuestion] : []);

  // Timer for tracking elapsed time - reset when mode changes
  useEffect(() => {
    if (mode && !showCompletion) {
      // Reset timer when entering a mode
      setStartTime(Date.now());
      setElapsedTime(0);
    }
  }, [mode]);

  useEffect(() => {
    if (mode && !showCompletion && startTime) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [mode, showCompletion, startTime]);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playSound = (frequency: number, duration: number = 200) => {
    if (!audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
  };

  const playCorrectSound = () => {
    playSound(523, 100); // C5
    setTimeout(() => playSound(659, 100), 100); // E5
    setTimeout(() => playSound(784, 150), 200); // G5
  };

  const playWrongSound = () => {
    playSound(300, 150);
    setTimeout(() => playSound(250, 200), 150);
  };

  const getCurrentQuestion = () => {
    return questions[currentQuestionIndex];
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 >= questions.length) {
      // All questions completed
      onComplete(totalScore);
      onBack();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswer(null);
    setShowResult(false);
    setTotalScore(0);
  };

  if (!mode) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50/30 via-purple-50/30 to-blue-50/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto w-full">
          {/* Title Section - Move up */}
          <div className="text-center mb-6 mt-4">
            <p className="text-2xl text-gray-800 font-bold mb-1">欢迎来到闯关模式</p>
            <p className="text-sm text-gray-500">收集更多💎 解锁更多关卡！</p>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto mt-2">
            {/* Reorder Mode - 句子重组 - 蓝色 */}
            <button
              onClick={() => {
                playSound(800, 150);
                setTimeout(() => setMode('reorder'), 100);
              }}
              className="group relative bg-gradient-to-br from-blue-100/80 via-blue-50/80 to-cyan-50/80 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] border-2 border-white/50 hover:border-blue-400"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="text-7xl">🔀</div>
                <h2 className="text-2xl font-bold text-gray-800">句子重组</h2>
                <p className="text-gray-600 text-sm">将回答句子重新排序</p>
              </div>
            </button>

            {/* Fill Mode - 选词填空 - 紫色 */}
            <button
              onClick={() => {
                playSound(800, 150);
                setTimeout(() => setMode('fill'), 100);
              }}
              className="group relative bg-gradient-to-br from-purple-100/80 via-purple-50/80 to-pink-50/80 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] border-2 border-white/50 hover:border-purple-400"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="text-7xl">📝</div>
                <h2 className="text-2xl font-bold text-gray-800">选词填空</h2>
                <p className="text-gray-600 text-sm">选择正确词语补全回答</p>
              </div>
            </button>

            {/* Flashcard Mode - 翻转词卡 - 粉红色 */}
            <button
              onClick={() => {
                playSound(800, 150);
                setTimeout(() => setMode('flashcard'), 100);
              }}
              className="group relative bg-gradient-to-br from-pink-100/80 via-pink-50/80 to-rose-50/80 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] border-2 border-white/50 hover:border-pink-400"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="text-7xl">🎴</div>
                <h2 className="text-2xl font-bold text-gray-800">翻转词卡</h2>
                <p className="text-gray-600 text-sm">看中文/关键词翻译英文</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const current = getCurrentQuestion();
  if (!current) return null;

  const remainingQuestions = questions.length - currentQuestionIndex - 1;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-100/40 via-purple-100/40 to-blue-100/40 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => {
              if (currentQuestionIndex > 0 || totalScore > 0) {
                setShowExitConfirm(true);
              } else {
                setMode(null);
                setCurrentQuestionIndex(0);
                setUserAnswer(null);
                setShowResult(false);
                setTotalScore(0);
              }
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </button>

          {/* Stats Display */}
          <div className="flex items-center gap-2">
            {/* Timer Display */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 backdrop-blur-md rounded-full shadow-sm">
              <span className="text-2xl">⏰</span>
              <span className="text-base font-bold text-blue-700">
                {Math.floor(elapsedTime / 60)}:{String(elapsedTime % 60).padStart(2, '0')}
              </span>
            </div>
            
            {/* Total XP Display - with XP notification */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 backdrop-blur-md rounded-full shadow-sm relative">
              <span className="text-2xl">💎</span>
              <span className="text-base font-bold text-purple-700">{totalScore}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              问题 {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 rounded-full"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl mb-6 border border-white/50">
          <div className="text-lg font-bold text-purple-600 mb-6">
            {mode === 'reorder' && '🔀 句子重组'}
            {mode === 'fill' && '📝 选词填空'}
            {mode === 'flashcard' && '🎴 翻转词卡'}
          </div>

          {mode === 'reorder' && <ReorderMode questions={questions} topicQuestion={topic.question} onExperienceUpdate={onExperienceUpdate} totalScore={totalScore} setTotalScore={setTotalScore} playCorrectSound={playCorrectSound} playWrongSound={playWrongSound} currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex} onComplete={() => {
            setCorrectCount(questions.length);
            setShowCompletion(true);
          }} />}
          {mode === 'fill' && <FillMode questions={questions} topicQuestion={topic.question} onExperienceUpdate={onExperienceUpdate} totalScore={totalScore} setTotalScore={setTotalScore} playCorrectSound={playCorrectSound} playWrongSound={playWrongSound} currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex} onComplete={() => {
            setCorrectCount(questions.length);
            setShowCompletion(true);
          }} />}
          {mode === 'flashcard' && <FlashcardMode questions={questions} topicQuestion={topic.question} currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex} onExperienceUpdate={onExperienceUpdate} totalScore={totalScore} setTotalScore={setTotalScore} onComplete={() => {
            setCorrectCount(questions.length);
            setShowCompletion(true);
          }} />}
        </div>

        {/* Action Buttons - removed for fill mode as requested */}
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              别走🥹马上完成这个训练了！
            </h3>
            
            <div className="space-y-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold text-lg hover:shadow-lg transition-all hover:scale-105"
              >
                再坚持一下
              </button>
              
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  setMode(null);
                  setCurrentQuestionIndex(0);
                  setUserAnswer(null);
                  setShowResult(false);
                  setTotalScore(0);
                }}
                className="w-full py-3 text-red-500 font-semibold hover:text-red-700 transition-colors"
              >
                退出
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Screen */}
      {showCompletion && (
        <>
          {/* Record check-in when completing */}
          {(() => {
            recordCheckIn();
            return null;
          })()}
          
          <CompletionScreen
            title={mode === 'reorder' ? "真厉害！原来你就是雅思高手？" : "真厉害！原来你就是记忆大师？"}
            totalXP={totalScore}
            correctCount={correctCount}
            totalQuestions={questions.length}
            timeTaken={elapsedTime}
            onRestart={() => {
              setShowCompletion(false);
              setCurrentQuestionIndex(0);
              setCorrectCount(0);
              setStartTime(Date.now());
              setTotalScore(0);
            }}
            onExit={() => {
              setShowCompletion(false);
              setMode(null);
              setCurrentQuestionIndex(0);
              setTotalScore(0);
            }}
          />
        </>
      )}
    </div>
  );
}