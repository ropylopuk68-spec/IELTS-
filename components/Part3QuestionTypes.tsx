import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

interface QuestionType {
  id: string;
  emoji: string;
  title: string;
  steps: Array<{
    stepNumber: string;
    stepTitle: string;
    content: Array<{
      type: 'subtitle' | 'bullet';
      text: string;
      translation?: string;
    }>;
  }>;
}

export function Part3QuestionTypes() {
  const navigate = useNavigate();
  const audioContextRef = useRef<AudioContext | null>(null);
  const [expandedTypes, setExpandedTypes] = useState<Set<string>>(new Set());

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playSound = (frequency: number, duration: number = 150) => {
    if (!audioContextRef.current) return;
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.2, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000);
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
  };

  const toggleExpanded = (id: string) => {
    playSound(800, 100);
    setExpandedTypes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const questionTypes: QuestionType[] = [
    {
      id: 'reason',
      emoji: '❓',
      title: '原因类',
      steps: [
        {
          stepNumber: 'Step1',
          stepTitle: '直接复述题目/现象/背景➕说明"原因很多"',
          content: [
            { type: 'subtitle', text: '（这一步是套话不涉及观点、留出一些思考的时间）' },
            { type: 'bullet', text: 'I believe there are several reasons why people...', translation: '我认为人们之所以……有几个原因。' },
            { type: 'bullet', text: 'Personally, I think there are a number of contributing factors to this situation.', translation: '我个人认为造成这种情况有几个因素。' },
            { type: 'bullet', text: "Nowadays, it's quite common to see that...", translation: '现在很常见的一个现象是……' },
            { type: 'bullet', text: 'This trend has become more noticeable in recent years because...', translation: '这个趋势近几年变得更加明显，因为……' },
            { type: 'bullet', text: "It's not hard to understand why more and more people...", translation: '越来越多的人……，其实不难理解。' }
          ]
        },
        {
          stepNumber: 'Step2',
          stepTitle: '原因1➕解释➕举例→原因2➕解释➕举例......',
          content: [
            { type: 'subtitle', text: '📌 原因1：' },
            { type: 'bullet', text: 'The main reason is that...', translation: '主要原因是……' },
            { type: 'bullet', text: 'One key reason is that...', translation: '一个关键原因是……' },
            { type: 'bullet', text: 'For example, when people..., they often...', translation: '比如说，当人们……，他们往往会……' },
            { type: 'bullet', text: 'This is especially true for...', translation: '这一点在……中尤为明显。' },
            { type: 'subtitle', text: '📌 原因2：' },
            { type: 'bullet', text: 'Another contributing factor is that...', translation: '另一个因素是……' },
            { type: 'bullet', text: "It's also worth mentioning that...", translation: '值得一提的是……' },
            { type: 'bullet', text: 'Take ... as an example.', translation: '比如说……' },
            { type: 'bullet', text: 'In many cases, people... because...', translation: '在很多情况下，人们……是因为……' }
          ]
        },
        {
          stepNumber: 'Step3',
          stepTitle: '总结：以上原因→导致了现象/背景',
          content: [
            { type: 'bullet', text: 'So these are the major reasons behind this trend.', translation: '所以这就是造成这个趋势的主要原因。' },
            { type: 'bullet', text: 'In short, all these factors contribute to the fact that...', translation: '简而言之，所有这些因素共同导致了……' },
            { type: 'bullet', text: "That's why this has become more and more common these days.", translation: '这就是为什么这种现象现在变得越来越普遍。' },
            { type: 'bullet', text: "Overall, it's a combination of convenience, lifestyle and social habits.", translation: '总的来说，这是由便利性、生活方式和社会习惯共同造成的。' }
          ]
        }
      ]
    },
    {
      id: 'opinion',
      emoji: '💭',
      title: '观点类',
      steps: [
        {
          stepNumber: 'Step1',
          stepTitle: '开头-提出明确的观点',
          content: [
            { type: 'bullet', text: 'I personally believe that…', translation: '我个人认为……' },
            { type: 'bullet', text: 'From my perspective, I would say that…', translation: '从我的角度来看，我会说……' },
            { type: 'bullet', text: 'In my opinion, the best choice is… because…', translation: '在我看来，最好的选择是……因为……' },
            { type: 'bullet', text: "As far as I'm concerned, I agree/disagree with the idea that…", translation: '就我而言，我同意/不同意……这个观点。' }
          ]
        },
        {
          stepNumber: 'Step2',
          stepTitle: '展开-观点➕理由1➕理由2➕举例（参考原因类题目）',
          content: [
            { type: 'bullet', text: 'One main reason is that…', translation: '一个主要的原因是……' },
            { type: 'bullet', text: "This is because… / That's mainly because…", translation: '这是因为……' },
            { type: 'bullet', text: 'For example / For instance, …', translation: '比如……' },
            { type: 'bullet', text: 'Another reason is… which means that…', translation: '另一个原因是……，这意味着……' },
            { type: 'bullet', text: 'Take … as an example. It clearly shows that…', translation: '以……为例，这清楚地说明了……' },
            { type: 'bullet', text: 'This not only… but also…', translation: '这不仅……而且……' }
          ]
        },
        {
          stepNumber: 'Step3',
          stepTitle: '再次总结/重申',
          content: [
            { type: 'bullet', text: 'So overall, I strongly believe that…', translation: '所以总的来说，我坚信……' },
            { type: 'bullet', text: "To sum up, that's why I hold the opinion that…", translation: '总之，这就是我持有……观点的原因。' },
            { type: 'bullet', text: 'In conclusion, I think this is the better choice because…', translation: '总的来说，我认为这是更好的选择，因为……' },
            { type: 'bullet', text: "That's why I would always prefer…", translation: '这就是为什么我总是更倾向于……' }
          ]
        }
      ]
    },
    {
      id: 'pros-cons',
      emoji: '⚖️',
      title: '优缺点类',
      steps: [
        {
          stepNumber: 'Step1',
          stepTitle: '引入主题，明确表达"有利有弊"',
          content: [
            { type: 'subtitle', text: '明确这个事物/行为有正面和负面影响-简单过渡，引出后文' },
            { type: 'bullet', text: 'Everything has two sides, and ... is no exception.', translation: '万事皆有两面，……也不例外。' },
            { type: 'bullet', text: "There are both benefits and drawbacks to ..., depending on how it's used.", translation: '……有利有弊，取决于它是如何使用的。' },
            { type: 'bullet', text: "I think it has some clear advantages, but also a few downsides that shouldn't be ignored.", translation: '我认为它有明显的优点，但也有一些不容忽视的缺点。' }
          ]
        },
        {
          stepNumber: 'Step2',
          stepTitle: '分别陈述优点和缺点（各配上解释或例子）',
          content: [
            { type: 'subtitle', text: '优点（advantage）：解释它的好处，最好举个例子或具体场景' },
            { type: 'subtitle', text: '缺点（disadvantage）：说明它可能带来的问题或风险，也举例说明' },
            { type: 'subtitle', text: '优点类表达：' },
            { type: 'bullet', text: 'One big advantage is that it helps people to...', translation: '一个主要优点是它能帮助人们……' },
            { type: 'bullet', text: "It's convenient / efficient / affordable, which is especially useful for...", translation: '它很方便/高效/价格合理，对……特别有用' },
            { type: 'bullet', text: 'For example, ... (举例子)', translation: '' },
            { type: 'subtitle', text: '缺点类表达：' },
            { type: 'bullet', text: 'On the negative side, it might cause...', translation: '不过从消极面看，它可能会引发……' },
            { type: 'bullet', text: 'One drawback is that it can lead to...', translation: '一个缺点是它可能导致……' },
            { type: 'bullet', text: 'In some cases, people may become too dependent on it.', translation: '在某些情况下，人们可能会过度依赖它' }
          ]
        },
        {
          stepNumber: 'Step3',
          stepTitle: '总结观点或倾向',
          content: [
            { type: 'subtitle', text: '表达你更倾向于哪一方（如利大于弊、要看具体情况、如何平衡）' },
            { type: 'bullet', text: "Overall, I think the pros outweigh the cons, as long as it's used properly.", translation: '总体来看，我认为只要使用得当，它的好处超过了坏处。' },
            { type: 'bullet', text: "In my opinion, it's important to strike a balance.", translation: '在我看来，关键是找到一个平衡点。' },
            { type: 'bullet', text: "That's why I believe it should be encouraged, but with certain limits or rules.", translation: '所以我认为这值得鼓励，但也要有一些限制或规范。' }
          ]
        }
      ]
    },
    {
      id: 'trend',
      emoji: '📈',
      title: '趋势变化类',
      steps: [
        {
          stepNumber: 'Step1',
          stepTitle: '描述趋势背景',
          content: [
            { type: 'subtitle', text: '→ 说明某种行为、现象或态度发生了变化（上升/下降/变化方式）' },
            { type: 'bullet', text: 'Recently, there has been a noticeable change in how people…', translation: '最近，人们在……方面出现了明显变化。' },
            { type: 'bullet', text: 'Over the past few years, more and more people have started to…', translation: '过去几年，越来越多的人开始……' },
            { type: 'bullet', text: 'Compared to the past, nowadays people tend to…', translation: '与过去相比，如今人们更倾向于……' },
            { type: 'bullet', text: "It's becoming increasingly common for people to…", translation: '越来越多的人开始……' }
          ]
        },
        {
          stepNumber: 'Step2',
          stepTitle: '分析原因与影响（参考原因类）',
          content: [
            { type: 'subtitle', text: '→ 解释为什么会发生这种趋势，从技术、经济、社会习惯、教育等角度展开' },
            { type: 'subtitle', text: '→ 加入例子或现象支持观点' },
            { type: 'bullet', text: 'One possible reason for this trend is that…', translation: '造成这种趋势的一个可能原因是……' },
            { type: 'bullet', text: 'This may be because of improvements in… / changes in…', translation: '这可能是由于……的进步 / ……的变化。' },
            { type: 'bullet', text: 'Another reason could be that…', translation: '另一个原因可能是……' },
            { type: 'bullet', text: 'For example, in the past… but now…', translation: '例如，过去……，但现在……' },
            { type: 'bullet', text: 'This shift has had both positive and negative effects.', translation: '这种转变带来了积极和消极的影响。' }
          ]
        },
        {
          stepNumber: 'Step3',
          stepTitle: '总结或展望未来',
          content: [
            { type: 'subtitle', text: '→ 总结这种变化可能带来的长期影响' },
            { type: 'subtitle', text: '→ 或者预测未来趋势（是否会持续、是否会被取代等）' },
            { type: 'bullet', text: 'I think this trend will probably continue in the future.', translation: '我认为这种趋势很可能会持续。' },
            { type: 'bullet', text: "It's hard to say if this is a good or bad thing, but it's definitely changing people's lives.", translation: '很难说这是好是坏，但它确实正在改变人们的生活。' },
            { type: 'bullet', text: 'In the long run, this might lead to…', translation: '从长远来看，这可能会导致……' },
            { type: 'bullet', text: 'I believe things will continue to evolve as technology and society keep changing.', translation: '我认为随着科技和社会的发展，这种趋势还会持续演变' }
          ]
        }
      ]
    },
    {
      id: 'comparison',
      emoji: '🔄',
      title: '比较类',
      steps: [
        {
          stepNumber: 'Step1',
          stepTitle: '明确比较对象，说明它们之间的共同点或差异背景',
          content: [
            { type: 'subtitle', text: '（或者直接到Step2开始比较也可以）' },
            { type: 'bullet', text: 'Both A and B are... but they differ in terms of...', translation: 'A和B有相似点，但它们在……方面有所不同。' },
            { type: 'bullet', text: 'There are some clear differences between A and B, especially when it comes to...', translation: 'A和B之间有一些明显的差异，尤其是在……方面。' },
            { type: 'bullet', text: 'Compared to A, B tends to...', translation: '和A相比，B更倾向于……' },
            { type: 'bullet', text: 'While A is more..., B is more...', translation: 'A更……，而B则更……' }
          ]
        },
        {
          stepNumber: 'Step2',
          stepTitle: '逐项进行比较（可按一个标准分别比较两者），举例说明',
          content: [
            { type: 'bullet', text: 'A is usually... For example, ... On the other hand, B tends to...', translation: 'A通常是……，比如……。而相对的，B则……' },
            { type: 'bullet', text: 'In terms of ..., A offers ..., whereas B provides...', translation: '就……而言，A提供……，而B则……' },
            { type: 'bullet', text: 'One advantage of A is..., but B has the benefit of...', translation: 'A的一个优势是……，但B的优点是……' },
            { type: 'bullet', text: "Take ... for example — it's something B can do better than A.", translation: '举个例子，比如……，这是B比A更强的地方。' }
          ]
        },
        {
          stepNumber: 'Step3',
          stepTitle: '总结观点或表达偏好��可以说��喜欢哪一个，或两者适用场景不同）',
          content: [
            { type: 'bullet', text: 'Personally, I prefer A because...', translation: '就我个人而言，我更喜欢A，因为……' },
            { type: 'bullet', text: 'I think both have their pros and cons, depending on the situation.', translation: '我认为两者都有优缺点，要看具体情况。' },
            { type: 'bullet', text: 'Overall, it really depends on personal needs and preferences.', translation: '总体来说，这真的取决于个人的需求和喜好' }
          ]
        }
      ]
    },
    {
      id: 'solution',
      emoji: '🔧',
      title: '解决方法类',
      steps: [
        {
          stepNumber: 'Step1',
          stepTitle: '引出问题背景 → 简要说明当前存在的问题或挑战',
          content: [
            { type: 'bullet', text: 'Nowadays, many people are facing the problem of …', translation: '如今，很多人正在面临……的问题。' },
            { type: 'bullet', text: 'One common challenge in … is that …', translation: '在……方面一个普遍的挑战是……' },
            { type: 'bullet', text: 'It has become increasingly difficult for people to … because …', translation: '由于……，人们越来越难以……' }
          ]
        },
        {
          stepNumber: 'Step2',
          stepTitle: '提出一个或多个解决方法',
          content: [
            { type: 'subtitle', text: '→ 每个方法包含：解决方式 + 为什么有效 + 例子' },
            { type: 'bullet', text: 'One possible solution is to …', translation: '一个可能的解决方法是……' },
            { type: 'bullet', text: 'To solve this issue, people/authorities could consider …', translation: '为了解决这个问题，人们/政府可以考虑……' },
            { type: 'bullet', text: 'Another way to deal with this is by …', translation: '另一个解决的办法是……' },
            { type: 'subtitle', text: '解释句：' },
            { type: 'bullet', text: 'This can help because …', translation: '这有帮助是因为……' },
            { type: 'bullet', text: 'The reason is that …', translation: '原因是……' },
            { type: 'bullet', text: 'It works well in situations where …', translation: '在……的情况下，这种方法很有效。' },
            { type: 'subtitle', text: '例子句：' },
            { type: 'bullet', text: 'For example, in my city/at my school, …', translation: '比如在我所在的城市/学校……' },
            { type: 'bullet', text: 'I once tried this and found that …', translation: '我曾经试过这个，发现……' },
            { type: 'bullet', text: 'A good example of this is …', translation: '一个很好的例子是……' }
          ]
        },
        {
          stepNumber: 'Step3',
          stepTitle: '总结或评价解决方式的有效性或未来可能改进的方向',
          content: [
            { type: 'subtitle', text: '→ 总结解决方法带来的积极影响，或指出仍需改进的方面' },
            { type: 'bullet', text: 'Overall, these methods can be quite effective in …', translation: '总体来说，这些方法在……方面是很有效的。' },
            { type: 'bullet', text: "Although there's no perfect solution, doing … can already make a big difference.", translation: '尽管没有完美的解决方法，做……已经能带来很大改变。' },
            { type: 'bullet', text: 'Hopefully, with continuous effort, the problem of … will gradually be solved.', translation: '希望通过持续努力，……的问题能逐渐得到解决。' }
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header - no background */}
      <div className="bg-white/50 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => {
              playSound(600, 100);
              navigate('/part/3');
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>返回Part3</span>
          </button>
        </div>
      </div>

      {/* Title Section - moved down with light background */}
      <div className="max-w-5xl mx-auto px-4 pt-12 pb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-pink-400 bg-clip-text text-transparent mb-3 text-[32px]">
            6大题型 - 回答模板
          </h1>
          <p className="text-xl bg-gradient-to-r from-purple-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
            Question Types & Answer Templates
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 pb-12">
        <div className="space-y-4">
          {questionTypes.map((type) => {
            const isExpanded = expandedTypes.has(type.id);
            
            return (
              <div
                key={type.id}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-purple-100/50 overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                {/* Header - Clickable */}
                <button
                  onClick={() => toggleExpanded(type.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-purple-50/50 transition-colors px-[22px] py-[16px] mx-[-2px] my-[-1px]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{type.emoji}</span>
                    <h2 className="text-2xl font-bold text-gray-800 text-[24px]">{type.title}</h2>
                  </div>
                  
                  <div className="flex-shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-6 h-6 text-purple-600" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-purple-600" />
                    )}
                  </div>
                </button>

                {/* Content - Expandable */}
                {isExpanded && (
                  <div className="px-6 pb-6 space-y-4 border-t border-purple-100/30">
                    {type.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="space-y-2">
                        {/* Step Header - light gradient background */}
                        <div className="bg-gradient-to-r from-purple-100/80 to-pink-100/80 rounded-lg px-4 py-3">
                          <h3 className="font-bold text-lg text-gray-800">
                            {step.stepNumber} {step.stepTitle}
                          </h3>
                        </div>

                        {/* Step Content */}
                        <div className="pl-4 space-y-2">
                          {step.content.map((item, itemIndex) => {
                            if (item.type === 'subtitle') {
                              return (
                                <p key={itemIndex} className="text-purple-700 font-semibold text-base mt-2 first:mt-0">
                                  {item.text}
                                </p>
                              );
                            } else {
                              return (
                                <div key={itemIndex} className="flex flex-col gap-0.5 py-0.5">
                                  <div className="flex items-start gap-2">
                                    <span className="text-purple-500 mt-1 flex-shrink-0">•</span>
                                    <div className="flex-1">
                                      <p className="text-gray-800 font-medium text-lg">{item.text}</p>
                                      {item.translation && (
                                        <p className="text-gray-600 text-lg mt-0.5">{item.translation}</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}