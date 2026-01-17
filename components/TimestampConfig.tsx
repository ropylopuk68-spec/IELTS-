import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Save, X, Zap } from 'lucide-react';

interface Timestamp {
  start: number;
  end: number;
}

interface TimestampConfigProps {
  audioUrl: string;
  sentenceCount: number;
  onSave: (timestamps: Timestamp[]) => void;
  onClose: () => void;
  existingTimestamps?: Timestamp[];
}

export function TimestampConfig({ 
  audioUrl, 
  sentenceCount, 
  onSave, 
  onClose,
  existingTimestamps 
}: TimestampConfigProps) {
  const [timestamps, setTimestamps] = useState<Timestamp[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDetecting, setIsDetecting] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (existingTimestamps && existingTimestamps.length > 0) {
      setTimestamps(existingTimestamps);
    } else {
      // Initialize with empty timestamps
      const initial = Array.from({ length: sentenceCount }, () => ({
        start: 0,
        end: 0
      }));
      setTimestamps(initial);
    }
  }, [sentenceCount, existingTimestamps]);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
      
      // Auto-distribute if no existing timestamps
      if (!existingTimestamps || existingTimestamps.length === 0) {
        const segmentDuration = audio.duration / sentenceCount;
        const autoTimestamps = Array.from({ length: sentenceCount }, (_, i) => ({
          start: parseFloat((i * segmentDuration).toFixed(2)),
          end: parseFloat(((i + 1) * segmentDuration).toFixed(2))
        }));
        setTimestamps(autoTimestamps);
      }
    });

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audioUrl, sentenceCount, existingTimestamps]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleTimestampChange = (index: number, field: 'start' | 'end', value: string) => {
    const newTimestamps = [...timestamps];
    const numValue = parseFloat(value) || 0;
    newTimestamps[index] = {
      ...newTimestamps[index],
      [field]: Math.min(Math.max(0, numValue), duration)
    };
    setTimestamps(newTimestamps);
  };

  const handleSetCurrentTime = (index: number, field: 'start' | 'end') => {
    const newTimestamps = [...timestamps];
    newTimestamps[index] = {
      ...newTimestamps[index],
      [field]: parseFloat(currentTime.toFixed(2))
    };
    setTimestamps(newTimestamps);
  };

  const handleSave = () => {
    // Validate timestamps
    const isValid = timestamps.every((ts, i) => {
      if (ts.start >= ts.end) return false;
      if (i > 0 && ts.start < timestamps[i - 1].end) return false;
      return true;
    });

    if (!isValid) {
      alert('⚠️ 时间戳配置错误！\n\n请确保：\n1. 每句的结束时间 > 开始时间\n2. 下一句的开始时间 >= 上一句的结束时间');
      return;
    }

    onSave(timestamps);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(2);
    return `${mins}:${secs.padStart(5, '0')}`;
  };

  const handleAutoDetect = async () => {
    if (!audioRef.current) {
      alert('音频未加载完成，请稍后再试');
      return;
    }

    setIsDetecting(true);

    try {
      // Create audio context
      const audioContext = new AudioContext();
      
      // Fetch and decode audio data
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      // Get audio data from first channel
      const channelData = audioBuffer.getChannelData(0);
      const sampleRate = audioBuffer.sampleRate;
      
      // Parameters for silence detection
      const silenceThreshold = 0.02; // Amplitude threshold for silence
      const minSilenceDuration = 1.0; // Minimum 1 second pause
      const minSegmentDuration = 2.0; // Minimum 2 seconds per segment
      
      // Detect silence regions
      const silenceRegions: Array<{ start: number; end: number }> = [];
      let silenceStart = -1;
      
      for (let i = 0; i < channelData.length; i++) {
        const amplitude = Math.abs(channelData[i]);
        const currentTime = i / sampleRate;
        
        if (amplitude < silenceThreshold) {
          if (silenceStart === -1) {
            silenceStart = currentTime;
          }
        } else {
          if (silenceStart !== -1) {
            const silenceDuration = currentTime - silenceStart;
            if (silenceDuration >= minSilenceDuration) {
              silenceRegions.push({
                start: silenceStart,
                end: currentTime
              });
            }
            silenceStart = -1;
          }
        }
      }
      
      // Create segments based on silence regions
      const segments: Timestamp[] = [];
      let segmentStart = 0;
      
      for (const silence of silenceRegions) {
        const segmentDuration = silence.start - segmentStart;
        if (segmentDuration >= minSegmentDuration) {
          segments.push({
            start: parseFloat(segmentStart.toFixed(2)),
            end: parseFloat(silence.start.toFixed(2))
          });
          segmentStart = silence.end;
        }
      }
      
      // Add final segment
      if (duration - segmentStart >= minSegmentDuration) {
        segments.push({
          start: parseFloat(segmentStart.toFixed(2)),
          end: parseFloat(duration.toFixed(2))
        });
      }
      
      // Adjust segments to match sentence count
      if (segments.length === 0) {
        // Fallback: equal distribution
        const segmentDuration = duration / sentenceCount;
        const fallbackTimestamps = Array.from({ length: sentenceCount }, (_, i) => ({
          start: parseFloat((i * segmentDuration).toFixed(2)),
          end: parseFloat(((i + 1) * segmentDuration).toFixed(2))
        }));
        setTimestamps(fallbackTimestamps);
        alert('⚠️ 未检测到明显的停顿，已使用平均分配');
      } else if (segments.length === sentenceCount) {
        // Perfect match
        setTimestamps(segments);
        alert('✅ 成功检测到 ' + segments.length + ' 个句子分段！');
      } else if (segments.length < sentenceCount) {
        // Too few segments - split largest ones
        while (segments.length < sentenceCount) {
          let maxIndex = 0;
          let maxDuration = 0;
          
          segments.forEach((seg, i) => {
            const duration = seg.end - seg.start;
            if (duration > maxDuration) {
              maxDuration = duration;
              maxIndex = i;
            }
          });
          
          const toSplit = segments[maxIndex];
          const midPoint = (toSplit.start + toSplit.end) / 2;
          
          segments.splice(maxIndex, 1, 
            { start: toSplit.start, end: parseFloat(midPoint.toFixed(2)) },
            { start: parseFloat(midPoint.toFixed(2)), end: toSplit.end }
          );
        }
        setTimestamps(segments);
        alert('✅ 检测到 ' + silenceRegions.length + ' 个停顿，已调整为 ' + sentenceCount + ' 个分段');
      } else {
        // Too many segments - merge smallest ones
        while (segments.length > sentenceCount) {
          let minIndex = 0;
          let minDuration = Infinity;
          
          for (let i = 0; i < segments.length - 1; i++) {
            const combinedDuration = segments[i + 1].end - segments[i].start;
            if (combinedDuration < minDuration) {
              minDuration = combinedDuration;
              minIndex = i;
            }
          }
          
          segments.splice(minIndex, 2, {
            start: segments[minIndex].start,
            end: segments[minIndex + 1].end
          });
        }
        setTimestamps(segments);
        alert('✅ 检测到 ' + silenceRegions.length + ' 个停顿，已合并为 ' + sentenceCount + ' 个分段');
      }
      
    } catch (error) {
      console.error('Auto detection error:', error);
      alert('❌ 自动检测失败：' + (error instanceof Error ? error.message : '未知错误'));
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">音频时间戳配置</h2>
            <p className="text-sm text-gray-600 mt-1">为每个句子设置开始和结束时间（单位：秒）</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Audio Player */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handlePlayPause}
              className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <div className="flex-1">
              <div className="text-sm text-gray-600 mb-1">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
              <input
                type="range"
                min="0"
                max={duration}
                step="0.01"
                value={currentTime}
                onChange={(e) => handleSeek(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(currentTime / duration) * 100}%, #d1d5db ${(currentTime / duration) * 100}%, #d1d5db 100%)`
                }}
              />
            </div>
            <button
              onClick={handleAutoDetect}
              disabled={isDetecting}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                isDetecting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:shadow-lg'
              }`}
            >
              <Zap className={`w-5 h-5 ${isDetecting ? 'animate-pulse' : ''}`} />
              {isDetecting ? '分析中...' : '智能检测'}
            </button>
          </div>
          <p className="text-xs text-gray-500">
            💡 提示：使用"智能检测"自动识别句子间停顿，或手动播放音频并点击"设为开始/结束"
          </p>
        </div>

        {/* Timestamps List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {timestamps.map((ts, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="text-lg font-bold text-purple-600">句 {index + 1}</div>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    {/* Start Time */}
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">开始时间（秒）</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max={duration}
                          value={ts.start}
                          onChange={(e) => handleTimestampChange(index, 'start', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => handleSetCurrentTime(index, 'start')}
                          className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm whitespace-nowrap"
                        >
                          设为开始
                        </button>
                      </div>
                    </div>

                    {/* End Time */}
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">结束时间（秒）</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max={duration}
                          value={ts.end}
                          onChange={(e) => handleTimestampChange(index, 'end', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => handleSetCurrentTime(index, 'end')}
                          className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm whitespace-nowrap"
                        >
                          设为结束
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Duration Display */}
                  <div className="flex-shrink-0 w-24 text-center">
                    <div className="text-xs text-gray-600 mb-1">时长</div>
                    <div className="text-sm font-semibold text-gray-800">
                      {(ts.end - ts.start).toFixed(2)}s
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Save className="w-5 h-5" />
            保存配置
          </button>
        </div>
      </div>
    </div>
  );
}