import { useState, useEffect, useRef } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

type PenguinState = 'idle' | 'correct1' | 'correct2' | 'wrong';

interface Question {
  question: string;
  questionCN: string;
  answer: Array<{
    text: string;
    keywords: string[];
  }>;
  translation: string;
}

// Reorder Mode Component - 句子重组
export function ReorderMode({ 
  questions, 
  topicQuestion, 
  onExperienceUpdate, 
  totalScore, 
  setTotalScore, 
  playCorrectSound, 
  playWrongSound,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  onShowExitConfirm,
  onComplete
}: any) {
  const currentQuestion = questions[currentQuestionIndex];
  const [shuffledSentences, setShuffledSentences] = useState<Array<{ text: string; originalIndex: number }>>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [xpNotification, setXpNotification] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [questionAudioUrl, setQuestionAudioUrl] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Shuffle sentences when question changes
  useEffect(() => {
    if (currentQuestion && currentQuestion.answer) {
      const sentences = currentQuestion.answer.map((sent: any, idx: number) => ({
        text: sent.text,
        originalIndex: idx
      }));
      
      // Ensure shuffled order is different from original
      let shuffled = [...sentences];
      let attempts = 0;
      do {
        shuffled = [...sentences].sort(() => Math.random() - 0.5);
        attempts++;
      } while (
        shuffled.every((s, i) => s.originalIndex === i) && 
        attempts < 50
      );
      
      setShuffledSentences(shuffled);
      setSubmitted(false);
      setIsCorrect(false);
    }
  }, [currentQuestion]);

  const handleDragStart = (index: number) => {
    if (submitted) return;
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    setDragOverIndex(targetIndex);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || submitted) return;
    
    // Create new array with reordered items
    const newSentences = [...shuffledSentences];
    const [draggedItem] = newSentences.splice(draggedIndex, 1);
    
    // Insert at the drop position
    const insertIndex = draggedIndex < dropIndex ? dropIndex : dropIndex;
    newSentences.splice(insertIndex, 0, draggedItem);
    
    setShuffledSentences(newSentences);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleSubmit = () => {
    const correct = shuffledSentences.every((sent, idx) => sent.originalIndex === idx);
    setIsCorrect(correct);
    setSubmitted(true);
    
    if (correct) {
      playCorrectSound();
      setTotalScore((prev: number) => prev + 2);
      onExperienceUpdate(2);
      setXpNotification(true);
      
      setTimeout(() => {
        setXpNotification(false);
      }, 1500);
    } else {
      playWrongSound();
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleRetry = () => {
    // Re-shuffle sentences
    const sentences = currentQuestion.answer.map((sent: any, idx: number) => ({
      text: sent.text,
      originalIndex: idx
    }));
    
    let shuffled = [...sentences];
    let attempts = 0;
    do {
      shuffled = [...sentences].sort(() => Math.random() - 0.5);
      attempts++;
    } while (
      shuffled.every((s, i) => s.originalIndex === i) && 
      attempts < 50
    );
    
    setShuffledSentences(shuffled);
    setSubmitted(false);
    setIsCorrect(false);
  };

  const handlePlayAudio = () => {
    if (questionAudioUrl) {
      const audio = audioRef.current;
      if (audio) {
        audio.play();
        setIsPlayingAudio(true);
      }
    }
  };

  const handlePauseAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-sky-50 rounded-2xl p-6 shadow-md relative">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Q{currentQuestionIndex + 1}: {currentQuestion.question}</h3>
        <p className="text-sm text-gray-600">{currentQuestion.questionCN}</p>
      </div>

      {/* Sentences to reorder */}
      <div className="space-y-3">
        {shuffledSentences.map((sentence, idx) => (
          <div 
            key={idx} 
            className="relative"
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, idx)}
          >
            {/* Visual indicator when dragging over */}
            {dragOverIndex === idx && draggedIndex !== idx && (
              <div className="absolute inset-0 bg-blue-300 rounded-xl opacity-30 pointer-events-none z-10" />
            )}
            
            {/* Sentence */}
            <div 
              draggable={!submitted}
              onDragStart={() => handleDragStart(idx)}
              className={`relative p-5 rounded-xl transition-all text-lg ${
                submitted 
                  ? (sentence.originalIndex === idx 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 shadow-md cursor-default' 
                      : 'bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-400 shadow-md cursor-default')
                  : 'bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 hover:border-purple-400 hover:shadow-lg cursor-move'
              } ${draggedIndex === idx ? 'opacity-40 scale-95' : ''}`}
            >
              <div className="flex items-center gap-3">
                {!submitted && (
                  <span className="text-gray-400">☰</span>
                )}
                <p className="text-gray-800 leading-relaxed flex-1">{sentence.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit/Retry Button */}
      <div className="flex flex-col items-center gap-3 pt-4">
        {submitted && isCorrect && (
          <div className="text-green-600 text-lg font-bold">
            ✅ 完全正确
          </div>
        )}
        {submitted && !isCorrect && (
          <div className="text-red-500 text-lg font-medium">
            ❌ 顺序错误
          </div>
        )}
        
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={shuffledSentences.length === 0}
            className="px-12 py-4 bg-gradient-to-r from-purple-400 via-purple-500 to-pink-400 text-white rounded-2xl font-bold text-lg hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            提交答案
          </button>
        ) : isCorrect ? (
          <button
            onClick={currentQuestionIndex + 1 < questions.length ? handleNext : () => onComplete()}
            className="px-8 py-3 bg-gradient-to-r from-purple-300 via-purple-400 to-pink-300 text-white rounded-xl font-semibold text-base hover:shadow-lg transition-all hover:scale-105"
          >
            {currentQuestionIndex + 1 < questions.length ? '下一小问' : 'OK'}
          </button>
        ) : (
          <button
            onClick={handleRetry}
            className="px-12 py-4 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 text-white rounded-2xl font-bold text-lg hover:shadow-lg transition-all hover:scale-105"
          >
            再试一次
          </button>
        )}
      </div>
    </div>
  );
}

// Fill Mode Component - 选词填空（按小问）
export function FillMode({ 
  questions, 
  topicQuestion, 
  onExperienceUpdate, 
  totalScore, 
  setTotalScore, 
  playCorrectSound, 
  playWrongSound,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  onComplete
}: any) {
  const [allBlanks, setAllBlanks] = useState<Array<{ word: string; index: number }>>([]);
  const [processedSentences, setProcessedSentences] = useState<Array<{ parts: string[]; keywords: string[] }>>([]);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [lockedBlanks, setLockedBlanks] = useState<Record<number, boolean>>({});
  const [questionCompleted, setQuestionCompleted] = useState(false);
  const [xpNotification, setXpNotification] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Helper function to ensure options are truly shuffled
  const ensureShuffled = (arr: string[]) => {
    let shuffled = [...arr];
    let attempts = 0;
    const maxAttempts = 100;
    
    do {
      shuffled = [...arr].sort(() => Math.random() - 0.5);
      attempts++;
      
      const differentPositions = arr.filter((word, index) => word !== shuffled[index]).length;
      const differentPercentage = differentPositions / arr.length;
      
      if (differentPercentage >= 0.5 || attempts >= maxAttempts) {
        break;
      }
    } while (attempts < maxAttempts);
    
    return shuffled;
  };

  // Process answer and create blanks when question changes
  useEffect(() => {
    if (currentQuestion && currentQuestion.answer) {
      const blanks: Array<{ word: string; index: number }> = [];
      const processed: Array<{ parts: string[]; keywords: string[] }> = [];
      let blankIndex = 0;
      
      currentQuestion.answer.forEach((sent: any) => {
        const keywords = sent.keywords || [];
        const parts: string[] = [];
        let lastIndex = 0;
        const text = sent.text;
        
        keywords.forEach((keyword: string) => {
          const keywordIndex = text.toLowerCase().indexOf(keyword.toLowerCase(), lastIndex);
          if (keywordIndex !== -1) {
            if (keywordIndex > lastIndex) {
              parts.push(text.substring(lastIndex, keywordIndex));
            }
            parts.push(`__BLANK_${blankIndex}__`);
            blanks.push({ word: keyword, index: blankIndex });
            blankIndex++;
            lastIndex = keywordIndex + keyword.length;
          }
        });
        
        if (lastIndex < text.length) {
          parts.push(text.substring(lastIndex));
        }
        
        processed.push({ parts, keywords });
      });
      
      setAllBlanks(blanks);
      setProcessedSentences(processed);
      
      const words = blanks.map(b => b.word);
      setShuffledOptions(ensureShuffled(words));
      
      setSelectedAnswers({});
      setLockedBlanks({});
      setXpNotification(false);
      setQuestionCompleted(false);
    }
  }, [currentQuestion]);

  const handleSelectWord = (blankIndex: number, word: string) => {
    if (lockedBlanks[blankIndex] || questionCompleted) return;
    
    // Check if clicking on already selected word in a blank - remove it
    if (selectedAnswers[blankIndex] === word) {
      setSelectedAnswers(prev => {
        const newAnswers = { ...prev };
        delete newAnswers[blankIndex];
        return newAnswers;
      });
      return;
    }
    
    const correctWord = allBlanks[blankIndex].word;
    const isCorrect = word.toLowerCase().trim() === correctWord.toLowerCase().trim();
    
    setSelectedAnswers(prev => ({
      ...prev,
      [blankIndex]: word
    }));
    
    if (isCorrect) {
      setLockedBlanks(prev => ({
        ...prev,
        [blankIndex]: true
      }));
      
      // Play sound for this blank
      playCorrectSound();
      
      // Check if all blanks are filled correctly
      const allFilled = allBlanks.every((b, idx) => 
        idx === blankIndex || lockedBlanks[idx]
      );
      
      if (allFilled) {
        // All blanks filled correctly - award XP for the whole question
        setQuestionCompleted(true);
        setTotalScore((prev: number) => prev + 2);
        onExperienceUpdate(2);
        
        // Show XP notification
        setXpNotification(true);
        setTimeout(() => {
          setXpNotification(false);
        }, 1500);
      }
    } else {
      playWrongSound();
    }
  };

  const renderSentenceWithBlanks = (sentenceData: { parts: string[]; keywords: string[] }, sentenceIndex: number) => {
    return (
      <div key={sentenceIndex} className="mb-6">
        <div className="text-gray-800 leading-relaxed text-lg flex flex-wrap items-center gap-2">
          {sentenceData.parts.map((part, partIndex) => {
            const blankMatch = part.match(/__BLANK_(\d+)__/);
            if (blankMatch) {
              const blankIdx = parseInt(blankMatch[1]);
              const isLocked = lockedBlanks[blankIdx];
              const selectedWord = selectedAnswers[blankIdx];
              const correctWord = allBlanks[blankIdx].word;
              const isCorrect = selectedWord?.toLowerCase().trim() === correctWord.toLowerCase().trim();
              
              return (
                <span key={partIndex} className="relative inline-block">
                  <span 
                    onClick={() => {
                      // Allow clicking to remove word if it's wrong and not locked
                      if (selectedWord && !isLocked && !isCorrect) {
                        setSelectedAnswers(prev => {
                          const newAnswers = { ...prev };
                          delete newAnswers[blankIdx];
                          return newAnswers;
                        });
                      }
                    }}
                    className={`inline-block min-w-[80px] px-3 py-1 rounded-lg text-center transition-all ${
                    isLocked && isCorrect
                      ? 'bg-green-100 text-green-700 font-semibold'
                      : selectedWord && !isCorrect
                      ? 'bg-red-100 text-red-600 cursor-pointer hover:bg-red-200'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {selectedWord || '_____'}
                  </span>
                </span>
              );
            }
            return <span key={partIndex}>{part}</span>;
          })}
        </div>
      </div>
    );
  };

  const availableOptions = shuffledOptions.filter(word => {
    const isUsed = Object.values(selectedAnswers).some(selected => selected === word);
    const isLocked = Object.keys(lockedBlanks).some(idx => selectedAnswers[parseInt(idx)] === word && lockedBlanks[parseInt(idx)]);
    return !isLocked;
  });

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="bg-gradient-to-r from-purple-100 via-purple-50 to-pink-100 rounded-2xl p-6 shadow-md relative">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{currentQuestion.question}</h3>
        <p className="text-sm text-gray-600">{currentQuestion.questionCN}</p>
        
        {/* XP Notification - positioned at top right */}
        {xpNotification && (
          <div className="absolute top-4 right-4 text-4xl font-bold text-purple-600 animate-bounce">
            +2💎
          </div>
        )}
      </div>

      {/* Sentences with blanks */}
      <div className="bg-gradient-to-br from-purple-50/40 via-pink-50/40 to-orange-50/40 rounded-2xl p-6 border border-purple-100">
        {processedSentences.map((sentenceData, idx) => renderSentenceWithBlanks(sentenceData, idx))}
      </div>

      {/* Word options - without title, without boxes, with border and shadow */}
      <div className="flex flex-wrap gap-3 justify-center">
        {availableOptions.map((word, idx) => (
          <button
            key={idx}
            onClick={() => {
              const nextBlank = allBlanks.findIndex((b, i) => !lockedBlanks[i]);
              if (nextBlank !== -1) {
                handleSelectWord(nextBlank, word);
              }
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-white to-purple-50 text-gray-700 rounded-lg font-medium hover:scale-105 transition-all border border-purple-200 shadow-md hover:shadow-lg hover:border-purple-400 hover:from-purple-50 hover:to-pink-50"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6">
        <button
          onClick={() => {
            if (currentQuestionIndex > 0) {
              setCurrentQuestionIndex(currentQuestionIndex - 1);
            }
          }}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          上一小问
        </button>
        
        <div className="text-gray-600 font-semibold">
          {currentQuestionIndex + 1} / {questions.length}
        </div>
        
        <button
          onClick={() => {
            if (!questionCompleted) {
              // Not completed yet, just move to next question
              if (currentQuestionIndex + 1 < questions.length) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              }
            } else {
              // Completed - move to next or show completion screen
              if (currentQuestionIndex + 1 < questions.length) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              } else {
                onComplete();
              }
            }
          }}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
        >
          {currentQuestionIndex + 1 < questions.length ? '下一小问' : '完成'}
        </button>
      </div>
    </div>
  );
}

// Matching Mode - placeholder (not used currently)
export function MatchingMode({ questions, topicQuestion, onExperienceUpdate, totalScore, setTotalScore, playCorrectSound, playWrongSound }: any) {
  return <div>Matching Mode - Coming Soon</div>;
}

// Flashcard Mode Component - 翻转词卡
export function FlashcardMode({ 
  questions, 
  topicQuestion, 
  currentQuestionIndex, 
  setCurrentQuestionIndex,
  onExperienceUpdate,
  totalScore,
  setTotalScore,
  onShowExitConfirm,
  onComplete
}: any) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [hasFlipped, setHasFlipped] = useState(false);
  const [xpNotification, setXpNotification] = useState(false);
  const [allCompleted, setAllCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Reset hasFlipped when question changes
  useEffect(() => {
    setHasFlipped(false);
    setShowAnswer(false);
  }, [currentQuestionIndex]);

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev: number) => prev + 1);
    } else {
      // Last question - call completion
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev: number) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAllCompleted(false);
    setShowAnswer(false);
    setHasFlipped(false);
  };

  const handleToggle = () => {
    const willShow = !showAnswer;
    setShowAnswer(willShow);
    
    // Award XP only the first time showing the answer
    if (willShow && !hasFlipped) {
      setHasFlipped(true);
      setTotalScore((prev: number) => prev + 2);
      onExperienceUpdate(2);
      // Remove notification - XP will update in top right corner only
    }
  };

  // Helper to render text with bold keywords
  const renderTextWithKeywords = (text: string, keywords: string[]) => {
    if (!keywords || keywords.length === 0) {
      return <span>{text}</span>;
    }

    let result: JSX.Element[] = [];
    let lastIndex = 0;
    const lowerText = text.toLowerCase();

    // Find all keyword positions
    const keywordPositions: Array<{ start: number; end: number; keyword: string }> = [];
    keywords.forEach(keyword => {
      let index = 0;
      while ((index = lowerText.indexOf(keyword.toLowerCase(), index)) !== -1) {
        keywordPositions.push({
          start: index,
          end: index + keyword.length,
          keyword: text.substring(index, index + keyword.length)
        });
        index += keyword.length;
      }
    });

    // Sort by position
    keywordPositions.sort((a, b) => a.start - b.start);

    // Remove overlapping keywords
    const filtered = keywordPositions.filter((kw, idx) => {
      if (idx === 0) return true;
      return kw.start >= keywordPositions[idx - 1].end;
    });

    // Build the text with bold keywords
    filtered.forEach((kw, idx) => {
      if (kw.start > lastIndex) {
        result.push(<span key={`text-${idx}`}>{text.substring(lastIndex, kw.start)}</span>);
      }
      result.push(<strong key={`keyword-${idx}`} className="font-bold">{kw.keyword}</strong>);
      lastIndex = kw.end;
    });

    if (lastIndex < text.length) {
      result.push(<span key="text-end">{text.substring(lastIndex)}</span>);
    }

    return <>{result}</>;
  };

  // Split Chinese translation into sentences
  const chineseSentences = currentQuestion.translation?.split('。').filter((s: string) => s.trim()).map((s: string) => s.trim() + '。') || [];

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="bg-gradient-to-r from-purple-100 via-purple-50 to-pink-100 rounded-2xl p-6 shadow-md relative">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Q{currentQuestionIndex + 1}: {currentQuestion.question}</h3>
        <p className="text-sm text-gray-600">{currentQuestion.questionCN}</p>
      </div>

      {/* Flashcard */}
      <div 
        className="min-h-[400px] bg-amber-50 rounded-3xl p-10 shadow-xl flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-2xl relative"
        onClick={handleToggle}
      >
        {xpNotification && (
          <div className="absolute top-4 right-4 text-2xl font-bold text-purple-600 animate-bounce">
            +2💎
          </div>
        )}
        {!showAnswer ? (
          <div className="text-center space-y-4">
            <p className="text-xl text-gray-700 font-medium">请主动回忆说出答案</p>
            <p className="text-sm text-gray-500">点击查看英文回答</p>
          </div>
        ) : (
          <div className="text-center space-y-6 max-w-3xl">
            {currentQuestion.answer?.map((sent: any, idx: number) => (
              <div key={idx} className="mb-6">
                {/* English sentence */}
                <p className="text-xl leading-relaxed text-gray-800 mb-2">
                  {renderTextWithKeywords(sent.text, sent.keywords || [])}
                </p>
                {/* Corresponding Chinese translation */}
                {chineseSentences[idx] && (
                  <p className="text-base text-gray-600 leading-relaxed">
                    {chineseSentences[idx]}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4">
        {!allCompleted ? (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              上一小问
            </button>
            <div className="text-gray-600 font-semibold">
              {currentQuestionIndex + 1} / {questions.length}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              {currentQuestionIndex === questions.length - 1 ? '已完成' : '下一小问'}
            </button>
          </>
        ) : (
          <div className="w-full flex flex-col items-center gap-6">
            {/* Celebration Effect */}
            <div className="text-6xl animate-bounce">🎉🎊</div>
            <h2 className="text-3xl font-bold text-gray-800">已完成</h2>
            <button
              onClick={handleRestart}
              className="text-purple-600 hover:text-purple-800 font-semibold text-lg transition-colors"
            >
              再来一次
            </button>
          </div>
        )}
      </div>

      {/* Completion Message */}
      {allCompleted && (
        <div className="text-center mt-6">
          <h3 className="text-xl font-bold text-gray-800">恭喜！你已经完成了所有问题。</h3>
          <p className="text-sm text-gray-600">你可以选择重新开始或退出。</p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              重新开始
            </button>
            <button
              onClick={onShowExitConfirm}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              退出
            </button>
          </div>
        </div>
      )}
    </div>
  );
}