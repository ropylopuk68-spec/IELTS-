export interface Topic {
  id: string;
  question: string;
  topicType?: string;
  questionCount?: number;
  examTakers?: number;
  answerCount: number;
  duration: string;
  isNew?: boolean;
  questions?: Array<{
    question: string;
    questionCN: string;
    answer: Array<{
      text: string;
      keywords: string[];
    }>;
    translation: string;
    audioUrl?: string;
    keyPoints?: string[];
  }>;
  answer: Array<{
    text: string;
    keywords: string[];
  }>;
}

export const mockTopics: Record<'1' | '2' | '3', Topic[]> = {
  '1': [
    {
      id: '1-1',
      question: '🌄 Scenery-风景',
      topicType: '1-4月新题',
      questionCount: 4,
      examTakers: 217,
      answerCount: 4,
      duration: '1-2分钟',
      isNew: true,
      questions: [
        {
          question: 'Do you look out the window at the scenery when travelling by bus or car?',
          questionCN: '乘坐公共汽车或汽车时，你会不会看向窗外看风景？',
          answer: [
            {
              text: 'It depends on the trip.',
              keywords: ['depends on the trip']
            },
            {
              text: "If I'm taking a bus for my commute, I usually just scroll through social media to pass the time.",
              keywords: ['scroll through', 'social media', 'pass the time']
            },
            {
              text: "But if I'm in a car going somewhere new, I prefer to look at the scenery because it helps me relax and clear my head.",
              keywords: ['somewhere new', 'scenery', 'relax', 'clear my head']
            }
          ],
          translation: '这取决于旅程。如果我坐公车通勤，我通常只是刷社交媒体来打发时间。但如果我坐在去往新地方的汽车里，我更喜欢看风景，因为这能帮我放松并清醒头脑。',
          keyPoints: ['Depends on the trip', 'Scroll through', 'Pass the time', 'Somewhere new', 'Clear my head']
        },
        {
          question: 'Do you prefer the mountains or the sea?',
          questionCN: '你更喜欢山还是海？',
          answer: [
            {
              text: 'I definitely prefer the sea.',
              keywords: ['prefer the sea']
            },
            {
              text: "I find the sound of the waves really relaxing, and it's a great place to clear my head.",
              keywords: ['sound of the waves', 'relaxing', 'clear my head']
            },
            {
              text: 'The mountains are nice, but climbing them is too exhausting for me.',
              keywords: ['mountains', 'too exhausting']
            },
            {
              text: "I'd much rather just sit on the beach and chill out.",
              keywords: ['beach', 'chill out']
            }
          ],
          translation: '我肯定更喜欢大海。我觉得海浪的声音非常解压，是清醒头脑的好地方。山也不错，但爬山对我来说太累了。我宁愿坐在沙滩上放松休息。',
          keyPoints: ['Prefer the sea', 'Sound of waves', 'Clear my head', 'Too exhausting', 'Chill out']
        },
        {
          question: 'Do you like to take scenery pictures?',
          questionCN: '你喜欢拍风景照吗？',
          answer: [
            {
              text: "Yes, I do, especially when I'm on a trip.",
              keywords: ['on a trip']
            },
            {
              text: 'Whenever I see an amazing view, I just want to capture the moment.',
              keywords: ['amazing view', 'capture the moment']
            },
            {
              text: 'I like to keep them so I can look at them later and relive the memories of the journey.',
              keywords: ['keep them', 'look at them later', 'relive the memories']
            }
          ],
          translation: '是的，我喜欢，尤其是在旅行时。每当我看到特别美的风景，我就想捕捉那个瞬间。我喜欢把它们存下来，这样以后翻看时能重温旅途中的回忆。',
          keyPoints: ['On a trip', 'Amazing view', 'Capture the moment', 'Relive the memories']
        },
        {
          question: 'What are the most beautiful sights you have seen while travelling?',
          questionCN: '你在旅行中看到过最美丽的景色是什么？',
          answer: [
            {
              text: 'I recently went to a coastal city and saw the ocean for the first time.',
              keywords: ['coastal city', 'first time']
            },
            {
              text: "The water was so vast and calm that it didn't even look real.",
              keywords: ['vast and calm', "didn't look real"]
            },
            {
              text: 'It was much bigger than I imagined, and just standing there made me feel extremely peaceful.',
              keywords: ['bigger than I imagined', 'extremely peaceful']
            }
          ],
          translation: '我最近去了一个沿海城市，那是第一次看到大海。海面如此广阔而平静，以至于看起来都不真实。它比我想象的要大得多，只是站在那儿就让我感到极其安宁。',
          keyPoints: ['Coastal city', 'Vast and calm', 'Bigger than I imagined', 'Extremely peaceful']
        }
      ],
      answer: [
        {
          text: 'It depends on the trip.',
          keywords: ['depends on the trip']
        },
        {
          text: "If I'm taking a bus for my commute, I usually just scroll through social media to pass the time.",
          keywords: ['scroll through', 'pass the time']
        },
        {
          text: "But if I'm in a car going somewhere new, I prefer to look at the scenery because it helps me relax and clear my head.",
          keywords: ['somewhere new', 'scenery', 'relax', 'clear my head']
        }
      ]
    },
    {
      id: '1-2',
      question: '📖 Reading-阅读',
      topicType: '1-4月新题',
      questionCount: 4,
      examTakers: 156,
      answerCount: 4,
      duration: '1-2分钟',
      isNew: true,
      questions: [
        {
          question: 'Do you like reading?',
          questionCN: '你喜欢阅读吗？',
          answer: [
            {
              text: "Yes, I'm a big fan of reading.",
              keywords: ["big fan of reading"]
            },
            {
              text: "I try to read almost every day, even if it's just for ten minutes before sleep.",
              keywords: ["almost every day", "ten minutes before sleep"]
            },
            {
              text: "It's a great way to clear my head and build up my source of ideas at the same time.",
              keywords: ["clear my head", "build up my source of ideas"]
            },
            {
              text: "For me, books are like a bridge to different worlds.",
              keywords: ["bridge to different worlds"]
            }
          ],
          translation: '是的，我非常喜欢阅读。我几乎每天都尝试阅读，即使只是在睡前读十分钟。这是一种既能让我头脑清醒，又能积累灵感的好方法。对我来说，书籍就像通往不同世界的桥梁。',
          keyPoints: ['Big fan of reading', 'Almost every day', 'Clear my head', 'Build up source of ideas', 'Bridge to different worlds']
        },
        {
          question: 'Do you prefer to read on paper or on a screen?',
          questionCN: '你更喜欢在纸上还是在屏幕上阅读？',
          answer: [
            {
              text: "I definitely prefer reading on a screen.",
              keywords: ["prefer reading on a screen"]
            },
            {
              text: "The main reason is convenience.",
              keywords: ["convenience"]
            },
            {
              text: "Since I have a busy life, I can't always carry heavy books with me.",
              keywords: ["busy life", "can't always carry heavy books"]
            },
            {
              text: "However, with my phone, I can read and build up my source of ideas whenever I have a few minutes.",
              keywords: ["with my phone", "build up my source of ideas", "whenever I have a few minutes"]
            },
            {
              text: "It just fits my schedule perfectly.",
              keywords: ["fits my schedule perfectly"]
            }
          ],
          translation: '我肯定更喜欢在屏幕上阅读。最主要的原因是方便。因为我的生活很忙碌，我不能总是随身携带沉重的书。但是，有了手机，我可以在任何有空的时候阅读并积累创意源泉。它完美地契合了我的时间表。',
          keyPoints: ['Prefer reading on screen', 'Convenience', 'Busy life', 'With my phone', 'Fits schedule perfectly']
        },
        {
          question: 'When do you need to read carefully, and when not?',
          questionCN: '什么时候需要仔细阅读，什么时候不需要？',
          answer: [
            {
              text: "I think it depends on the content.",
              keywords: ["depends on the content"]
            },
            {
              text: "I need to read carefully when I'm looking at official information, because I don't want to miss any key details.",
              keywords: ["read carefully", "official information", "don't want to miss any key details"]
            },
            {
              text: "On the other hand, I don't need to be so focused when I'm just scrolling through social media.",
              keywords: ["don't need to be so focused", "scrolling through social media"]
            },
            {
              text: "I usually do that just to relax and clear my head.",
              keywords: ["relax", "clear my head"]
            }
          ],
          translation: '我认为这取决于内容。当我在看正式信息时，我需要仔细阅读，因为我不想错过任何关键细节。另一方面，当我只是刷社交媒体时，我不需要那么专注。我通常这样做只是为了放松并清醒头脑。',
          keyPoints: ['Depends on content', 'Read carefully', 'Official information', 'Key details', 'Scrolling social media', 'Clear my head']
        },
        {
          question: 'Do you prefer scanning or detailed reading?',
          questionCN: '你更喜欢扫读还是精读？',
          answer: [
            {
              text: "It really depends on the situation.",
              keywords: ["depends on the situation"]
            },
            {
              text: "I prefer scanning when I'm scrolling through social media just for fun.",
              keywords: ["prefer scanning", "scrolling through social media", "just for fun"]
            },
            {
              text: "However, for official information, I definitely go for detailed reading to avoid missing any key details.",
              keywords: ["official information", "detailed reading", "avoid missing any key details"]
            },
            {
              text: "I think using both ways helps me manage my time more efficiently.",
              keywords: ["using both ways", "manage my time more efficiently"]
            }
          ],
          translation: '这确实取决于情况。当我在刷社交媒体消遣时，我更喜欢扫读。然而，对于正式信息，我肯定会选择精读，以避免错过任何关键细节。我认为这两种方式结合使用能帮我更高效地管理时间。',
          keyPoints: ['Depends on situation', 'Prefer scanning', 'Social media', 'Detailed reading', 'Manage time efficiently']
        }
      ],
      answer: [
        {
          text: "Yes, I'm a big fan of reading.",
          keywords: ["big fan of reading"]
        },
        {
          text: "I try to read almost every day, even if it's just for ten minutes before sleep.",
          keywords: ["almost every day", "ten minutes before sleep"]
        },
        {
          text: "It's a great way to clear my head and build up my source of ideas at the same time.",
          keywords: ["clear my head", "build up my source of ideas"]
        },
        {
          text: "For me, books are like a bridge to different worlds.",
          keywords: ["bridge to different worlds"]
        }
      ]
    },
    {
      id: '1-3',
      question: '🏀 Sports team-运动队',
      topicType: '1-4月新题',
      questionCount: 4,
      examTakers: 135,
      answerCount: 4,
      duration: '1-2分钟',
      isNew: true,
      questions: [
        {
          question: 'Have you ever been part of a sports team?',
          questionCN: '你曾经是某个运动队的一员吗？',
          answer: [
            {
              text: "Yes, I used to be on the school basketball team, and we practiced almost every day after class.",
              keywords: ["school basketball team", "practiced almost every day after class"]
            },
            {
              text: "Even though I wasn't the star player, I loved working together with my teammates.",
              keywords: ["wasn't the star player", "loved working together with my teammates"]
            },
            {
              text: "It was a new experience for me and I really enjoyed that time.",
              keywords: ["new experience", "really enjoyed that time"]
            }
          ],
          translation: '是的，我以前是学校篮球队的一员，我们几乎每天放学后都练习。虽然我不是明星球员，但我喜欢和队友们一起工作。这对我是全新的体验，我真的很享受那段时光。',
          keyPoints: ['School basketball team', 'Practiced every day', 'Working together', 'New experience', 'Enjoyed that time']
        },
        {
          question: 'Are team sports popular in your culture?',
          questionCN: '你们的文化中团队运动是否流行？',
          answer: [
            {
              text: "Yes, team sports are really popular in my culture, especially basketball and football.",
              keywords: ["team sports are really popular", "basketball and football"]
            },
            {
              text: "You can see people playing them in schools and parks almost every day.",
              keywords: ["schools and parks", "almost every day"]
            },
            {
              text: "I think people love them because they are a great way to work together and make friends.",
              keywords: ["great way to work together", "make friends"]
            }
          ],
          translation: '是的，团队运动在我们的文化中非常流行，尤其是篮球和足球。你几乎每天都能看到人们在学校和公园里打球。我认为人��喜欢它们是因为它们是共同努力和交朋友的好方法。',
          keyPoints: ['Team sports popular', 'Basketball and football', 'Schools and parks', 'Work together', 'Make friends']
        },
        {
          question: 'Do you like watching team games? why?',
          questionCN: '你喜欢看团队比赛吗？为什么？',
          answer: [
            {
              text: "Yes, I really enjoy watching team games, especially basketball matches.",
              keywords: ["really enjoy watching team games", "basketball matches"]
            },
            {
              text: "It is so exciting to see how players work together to win.",
              keywords: ["exciting to see", "players work together to win"]
            },
            {
              text: "I love the atmosphere and the team spirit, which always make me feel very inspired.",
              keywords: ["atmosphere", "team spirit", "feel very inspired"]
            }
          ],
          translation: '是的，我��喜欢看团队比赛，尤其是篮球比赛。看到球员们为了获胜而共同努力是非常令人兴奋的。我喜欢那种氛围和团队精神，这总能让我感到备受启发。',
          keyPoints: ['Enjoy watching', 'Basketball matches', 'Exciting', 'Team spirit', 'Feel inspired']
        },
        {
          question: 'What are the differences between team sports and individual sports?',
          questionCN: '团队运动和个体运动有什么区别？',
          answer: [
            {
              text: "I think the main difference is the way of working.",
              keywords: ["main difference", "way of working"]
            },
            {
              text: "In team sports, you must work together and help your teammates to win.",
              keywords: ["work together", "help your teammates to win"]
            },
            {
              text: "However, in individual sports, you rely on yourself and need a lot of self-discipline.",
              keywords: ["rely on yourself", "a lot of self-discipline"]
            },
            {
              text: "It's more about personal challenge and focus.",
              keywords: ["personal challenge", "focus"]
            }
          ],
          translation: '我认为主要的区别在于工作方式。在团队运动中，你必须共同努力并帮助队友获胜。然而，在个人运动中，你依靠自己，需要极大的自律。这更多是关于个人挑战和专注。',
          keyPoints: ['Main difference', 'Way of working', 'Work together', 'Rely on yourself', 'Self-discipline', 'Personal challenge']
        }
      ],
      answer: [
        {
          text: "Yes, I used to be on the school basketball team, and we practiced almost every day.",
          keywords: ["school basketball team", "practiced almost every day"]
        },
        {
          text: "Even though I wasn't the star player, I loved working together.",
          keywords: ["wasn't the star player", "working together"]
        },
        {
          text: "It was a new experience for me and I really enjoyed that time.",
          keywords: ["new experience", "enjoyed that time"]
        }
      ]
    },
    {
      id: '1-4',
      question: '🚶 Walking-散步',
      topicType: '1-4月新题',
      questionCount: 4,
      examTakers: 408,
      answerCount: 4,
      duration: '1-2分钟',
      isNew: true,
      questions: [
        {
          question: 'Do you walk a lot?',
          questionCN: '你经常散步吗？',
          answer: [
            {
              text: "Yes, I do.",
              keywords: ["Yes, I do"]
            },
            {
              text: "I really love going for a walk after dinner.",
              keywords: ["really love going for a walk", "after dinner"]
            },
            {
              text: "Since I sit all day to work / study, it's a great way for me to relax and get some fresh air.",
              keywords: ["sit all day to work / study", "great way", "relax", "get some fresh air"]
            },
            {
              text: "It's a simple habit that helps me clear my head.",
              keywords: ["simple habit", "clear my head"]
            }
          ],
          translation: '是的，我会。我非常喜欢在饭后去散步。因为我一整天都坐着工作或学习，所以这是我放松并呼吸新鲜空气的好方法。这是一个能帮我清醒头脑的简单习惯。',
          keyPoints: ['Love going for walk', 'After dinner', 'Sit all day', 'Relax', 'Fresh air', 'Clear my head']
        },
        {
          question: 'Did you often go outside to have a walk when you were a child?',
          questionCN: '你小时候经常出去散步吗？',
          answer: [
            {
              text: "Yes, quite often.",
              keywords: ["quite often"]
            },
            {
              text: "I have many happy memories of going for a walk with my parents after dinner.",
              keywords: ["happy memories", "going for a walk with my parents", "after dinner"]
            },
            {
              text: "I remember holding their hands while we talked about my day at school.",
              keywords: ["holding their hands", "talked about my day at school"]
            },
            {
              text: "It was a very warm and sweet part of my childhood, and I really enjoyed the time with my family.",
              keywords: ["very warm and sweet part", "my childhood", "really enjoyed the time with my family"]
            }
          ],
          translation: '是的，经常这样。我有很多幸福的回忆，是和父母晚饭后一起散步。我记得我们一边走一边谈论我在学校的一天，那是我童年里非常温暖和甜蜜的一部分，我也真的很享受和家人在一起的时光。',
          keyPoints: ['Quite often', 'Happy memories', 'With parents', 'Holding hands', 'Warm and sweet', 'Enjoyed time with family']
        },
        {
          question: 'Why do people like to walk in parks?',
          questionCN: '为什么人们喜欢在公园里散步？',
          answer: [
            {
              text: "People enjoy walking in parks primarily for the natural environment and the peaceful atmosphere.",
              keywords: ["enjoy walking in parks", "natural environment", "peaceful atmosphere"]
            },
            {
              text: "It provides a perfect escape from the noisy city, allowing people to relax and breathe fresh air.",
              keywords: ["perfect escape from the noisy city", "relax", "breathe fresh air"]
            },
            {
              text: "Additionally, it's a great social space where people can exercise or chat with friends.",
              keywords: ["great social space", "exercise", "chat with friends"]
            }
          ],
          translation: '人们喜欢在公园散步主要是因为那里有自然环境和宁静的气氛。它提供了一个远离嘈杂城市的完美避难所，让人们能够放松并呼吸新鲜空气。此外，它也是一个很棒的社交空间，人们可以在那里锻炼或与朋友聊天。',
          keyPoints: ['Natural environment', 'Peaceful atmosphere', 'Escape from noisy city', 'Relax', 'Social space', 'Exercise']
        },
        {
          question: 'Where would you like to take a long walk if you had the chance?',
          questionCN: '如果你有机会，你想去哪里长时间散步？',
          answer: [
            {
              text: "If I had the chance, I would like to take a long walk in a large park.",
              keywords: ["If I had the chance", "long walk in a large park"]
            },
            {
              text: "I love the natural environment and the peaceful atmosphere there.",
              keywords: ["love the natural environment", "peaceful atmosphere"]
            },
            {
              text: "It's a perfect escape from the noisy city, which allows me to relax and breathe fresh air.",
              keywords: ["perfect escape from the noisy city", "relax", "breathe fresh air"]
            },
            {
              text: "Also, it's a great social space where I can exercise or chat with friends.",
              keywords: ["great social space", "exercise", "chat with friends"]
            }
          ],
          translation: '如果有机会，我想在大型公园里进行长距离散步。我喜欢那里的自然环境宁静气氛。它是远离嘈杂城市的完美避难所，让我能够放松并呼吸新鲜空气。此外，它也是一个很棒的社交空间，我可以在那里锻炼或与朋友聊天。',
          keyPoints: ['Large park', 'Natural environment', 'Peaceful atmosphere', 'Escape from noisy city', 'Social space']
        }
      ],
      answer: [
        {
          text: "Yes, I do. I really love going for a walk after dinner.",
          keywords: ["love going for a walk", "after dinner"]
        },
        {
          text: "Since I sit all day to work / study, it's a great way for me to relax and get some fresh air.",
          keywords: ["sit all day", "relax", "fresh air"]
        },
        {
          text: "It's a simple habit that helps me clear my head.",
          keywords: ["simple habit", "clear my head"]
        }
      ]
    },
    {
      id: '1-5',
      question: '⌨️ Typing-打字',
      topicType: '1-4月新题',
      questionCount: 4,
      examTakers: 511,
      answerCount: 4,
      duration: '1-2分钟',
      isNew: true,
      questions: [
        {
          question: 'Do you prefer typing or handwriting?',
          questionCN: '你更喜欢打字还是手写？',
          answer: [
            {
              text: "I definitely prefer typing.",
              keywords: ["definitely prefer typing"]
            },
            {
              text: "It is much faster and more convenient for my study / work.",
              keywords: ["much faster", "more convenient", "study / work"]
            },
            {
              text: "I can edit the text easily on my phone or computer.",
              keywords: ["edit the text easily", "phone or computer"]
            },
            {
              text: "But for some special occasions, like writing a birthday card for a friend, I still choose handwriting because it feels more personal and sincere.",
              keywords: ["special occasions", "birthday card", "handwriting", "more personal and sincere"]
            }
          ],
          translation: '我肯定更喜欢打字。对于我的学习/工作来说，它快得多，也更方便。我可以在手机或电脑上轻松地修改文字。但在一些特殊场合，比如给朋友写生日卡片，我还是会选择手写，因为我觉得这样更亲切和真诚。',
          keyPoints: ['Prefer typing', 'Faster and convenient', 'Edit text easily', 'Special occasions', 'Personal and sincere']
        },
        {
          question: 'Do you type on a desktop or laptop keyboard every day?',
          questionCN: '你每天在台式机还是笔记本电脑键盘上打字？',
          answer: [
            {
              text: "I type on my laptop keyboard every single day.",
              keywords: ["laptop keyboard", "every single day"]
            },
            {
              text: "Compared to a desktop, a laptop is much more portable, so I can use it anywhere I want.",
              keywords: ["Compared to a desktop", "much more portable", "anywhere I want"]
            },
            {
              text: "Also, I find it more comfortable because the keys are flatter, which makes it easier and faster for me to type and finish my tasks.",
              keywords: ["more comfortable", "keys are flatter", "easier and faster", "finish my tasks"]
            }
          ],
          translation: '我每天都在笔记本电脑键盘上打字。与台式机相比，笔记本电脑要轻便得多，所以我可以在任何我想去的地方使用它。此外，我觉得它更舒服，因为按键更平，这让我打字更简单、更快，能更高效地完成任务。',
          keyPoints: ['Laptop keyboard', 'Every day', 'More portable', 'More comfortable', 'Flatter keys', 'Faster']
        },
        {
          question: 'When did you learn how to type on a keyboard?',
          questionCN: '你是什么时候学会在键盘上打字的？',
          answer: [
            {
              text: "I learned how to type when I was in primary school.",
              keywords: ["learned how to type", "primary school"]
            },
            {
              text: "At that time, we had computer classes once a week, and the teacher taught us the correct finger positions.",
              keywords: ["computer classes", "once a week", "correct finger positions"]
            },
            {
              text: "I remember playing some typing games to practice, which were very fun and helped me memorize the layout of the keyboard quickly.",
              keywords: ["typing games", "very fun", "memorize the layout", "quickly"]
            }
          ],
          translation: '我是在上小学的时候学会在键盘上打字的。那时，我们每周有一次电脑课，老师教我们正确的指法。我记得当时会玩一些打字游戏来练习，那些游戏非常有趣，帮我很快就记住了键盘的布局。',
          keyPoints: ['Primary school', 'Computer classes', 'Correct finger positions', 'Typing games', 'Memorize layout']
        },
        {
          question: 'How do you improve your typing?',
          questionCN: '你如何提高你的打字速度？',
          answer: [
            {
              text: "Actually, my typing speed was already quite fast because of my experience in primary school.",
              keywords: ["typing speed", "quite fast", "experience in primary school"]
            },
            {
              text: "At that time, we had computer classes once a week, and the teacher taught us the correct finger positions.",
              keywords: ["computer classes", "once a week", "correct finger positions"]
            },
            {
              text: "I remember playing some typing games to practice, which were very fun and helped me memorize the layout of the keyboard quickly.",
              keywords: ["typing games", "very fun", "memorize the layout", "quickly"]
            },
            {
              text: "So now, I just type regularly to maintain my speed.",
              keywords: ["type regularly", "maintain my speed"]
            }
          ],
          translation: '其实，我的打字速度已经很快了，这得益于我小学时的经历。那时，我们每周有一次电脑课，老师教我们正确的指法。我记得当时会玩一些打字游戏来练习，那些游戏非常有趣，帮我很快就记住了键盘的布局。所以现在，我只需通过日常打字来保持速度。',
          keyPoints: ['Typing speed fast', 'Primary school experience', 'Computer classes', 'Typing games', 'Type regularly', 'Maintain speed']
        }
      ],
      answer: [
        {
          text: "I definitely prefer typing.",
          keywords: ["prefer typing"]
        },
        {
          text: "It is much faster and more convenient for my study / work.",
          keywords: ["faster", "convenient"]
        },
        {
          text: "I can edit the text easily on my phone or computer.",
          keywords: ["edit text easily"]
        },
        {
          text: "But for some special occasions, I still choose handwriting.",
          keywords: ["special occasions", "handwriting"]
        }
      ]
    },
    {
      id: '1-6',
      question: '🍜 Food-食物',
      topicType: '1-4月新题',
      questionCount: 3,
      examTakers: 700,
      answerCount: 3,
      duration: '1-2分钟',
      isNew: true,
      questions: [
        {
          question: 'What is your favourite food?',
          questionCN: '你最喜欢的食物是什么？',
          answer: [
            {
              text: "I'm a big fan of Sichuan cuisine, especially Mapo Tofu.",
              keywords: ["big fan of Sichuan cuisine", "Mapo Tofu"]
            },
            {
              text: "I love it because the flavor is spicy and strong, which always gives me a good appetite.",
              keywords: ["flavor is spicy and strong", "good appetite"]
            },
            {
              text: "It is a very classic dish in China, and it is great with rice.",
              keywords: ["very classic dish in China", "great with rice"]
            }
          ],
          translation: '我是川菜的大粉丝，尤其是麻婆豆腐。我喜欢它因为味道辣而强烈，这总是让我有很好的食欲。它是中国非常经典的一道菜，而且配米饭很棒。',
          keyPoints: ['Sichuan cuisine', 'Mapo Tofu', 'Spicy and strong', 'Good appetite', 'Classic dish', 'Great with rice']
        },
        {
          question: 'What kind of food did you like when you were young? / Has your favourite food changed since you were a child?',
          questionCN: '你小时候喜欢什么样的食物？/ 你最喜欢的食物从你小时候以来有改变吗？',
          answer: [
            {
              text: "Actually, my taste has changed a lot.",
              keywords: ["taste has changed a lot"]
            },
            {
              text: "When I was a kid, I was obsessed with sweet things like candies and chocolate.",
              keywords: ["When I was a kid", "obsessed with sweet things", "candies and chocolate"]
            },
            {
              text: "However, as I grew up, I realized that too much sugar is bad for my health, and I started to enjoy spicy food more.",
              keywords: ["as I grew up", "too much sugar", "bad for my health", "enjoy spicy food more"]
            },
            {
              text: "So my favorites are quite different now.",
              keywords: ["favorites", "quite different now"]
            }
          ],
          translation: '实际上，我的口味改变了很多。小时候，我沉迷于糖果和巧克力等甜食。然而，随着我长大，我意识到过多的糖对我的健康有害，我开始更喜欢辣的食物。所以我现在最喜欢的食物大不相同了。',
          keyPoints: ['Taste changed', 'Obsessed with sweet things', 'Candies and chocolate', 'Too much sugar', 'Enjoy spicy food', 'Quite different now']
        },
        {
          question: 'Do you have different foods at different times of the year?',
          questionCN: '你在一年中不同的时间会吃不同的食物吗？',
          answer: [
            {
              text: "Yes, I usually eat different things in different seasons.",
              keywords: ["eat different things", "different seasons"]
            },
            {
              text: "For instance, in the hot summer, I prefer light meals like salads or cold dishes to feel fresh.",
              keywords: ["hot summer", "light meals", "salads or cold dishes", "feel fresh"]
            },
            {
              text: "But in the cold winter, I'm more into hot pot or hot soup to keep my body warm.",
              keywords: ["cold winter", "hot pot or hot soup", "keep my body warm"]
            }
          ],
          translation: '是的，我通常在不同的季节吃不同的东西。例如，在炎热的夏天，我更喜欢沙拉或冷盘等清淡的餐点来感觉清爽。但在寒冷的冬天，我更倾向于火锅或热汤来让身体保持温暖。',
          keyPoints: ['Different seasons', 'Hot summer', 'Light meals', 'Cold winter', 'Hot pot', 'Keep body warm']
        }
      ],
      answer: [
        {
          text: "I'm a big fan of Sichuan cuisine, especially Mapo Tofu.",
          keywords: ["Sichuan cuisine", "Mapo Tofu"]
        },
        {
          text: "I love it because the flavor is spicy and strong.",
          keywords: ["spicy and strong"]
        },
        {
          text: "It is a very classic dish in China.",
          keywords: ["classic dish"]
        }
      ]
    },
    {
      id: '1-7',
      question: '💖 Hobby-爱好',
      topicType: '1-4月新题',
      questionCount: 3,
      examTakers: 945,
      answerCount: 3,
      duration: '1-2分钟',
      isNew: true,
      questions: [
        {
          question: 'Do u have any Hobbies?',
          questionCN: '你有什么爱好吗？',
          answer: [
            {
              text: "Yes, painting is my main hobby.",
              keywords: ["painting", "main hobby"]
            },
            {
              text: "I usually paint when I have some free time at home.",
              keywords: ["paint", "free time at home"]
            },
            {
              text: "I don't paint very seriously, but I like drawing things from daily life.",
              keywords: ["don't paint very seriously", "drawing things from daily life"]
            },
            {
              text: "It's a nice way for me to relax and forget about stress.",
              keywords: ["nice way", "relax", "forget about stress"]
            }
          ],
          translation: '是的，绘画是我的主要爱好。我有空在家时通常会画画。我画得不是很专业，但我喜欢画日常生活中的事物。对我来说，这是一个放松和忘记压力的好方法。',
          keyPoints: ['Painting', 'Main hobby', 'Free time', 'Daily life', 'Relax', 'Forget stress']
        },
        {
          question: 'Did u have any Hobbies when u were a child? / Do u have a hobby that you\'ve had since childhood?',
          questionCN: '你小时候有没有什么爱好？/ 你有没有从童年时代就一直坚持的爱好？',
          answer: [
            {
              text: "Actually, painting is something I've loved since I was very young.",
              keywords: ["painting", "loved since I was very young"]
            },
            {
              text: "When I was a child, I spent a lot of time drawing simple things like trees and flowers.",
              keywords: ["When I was a child", "drawing simple things", "trees and flowers"]
            },
            {
              text: "I continued painting as I grew up and never really stopped.",
              keywords: ["continued painting", "grew up", "never really stopped"]
            },
            {
              text: "Even now, it's still the best way for me to relax.",
              keywords: ["Even now", "best way", "relax"]
            }
          ],
          translation: '实际上，绘画是我从小就喜欢的事情。当我还是个孩子的时候，我花了很多时间画一些简单的东西，比如树木和花朵。我随着成长继续绘画，从来没有真正停止过。即使现在，它仍然是我放松的最佳方式。',
          keyPoints: ['Loved since young', 'Drawing simple things', 'Trees and flowers', 'Never stopped', 'Best way to relax']
        },
        {
          question: 'Do u have the same hobbies as your family numbers?',
          questionCN: '你的爱好和你家人的爱好一样吗？',
          answer: [
            {
              text: "Actually, painting is a shared interest in my family.",
              keywords: ["painting", "shared interest in my family"]
            },
            {
              text: "Both my father and I love drawing when we have free time.",
              keywords: ["Both my father and I", "love drawing", "free time"]
            },
            {
              text: "I remember watching him paint when I was a kid, which is how I got into it.",
              keywords: ["watching him paint", "when I was a kid", "how I got into it"]
            },
            {
              text: "However, my mother prefers different things like cooking, so we have both similar and different hobbies.",
              keywords: ["my mother", "prefers different things", "cooking", "similar and different hobbies"]
            }
          ],
          translation: '实际上，绘画是我们家共同的兴趣。我和我父亲在有空时都喜欢画画。我记得小时候看他画画，这就是我入门的原因。不过，我母亲更喜欢不同的事情，比如烹饪，所以我们的爱好既有相似之处也有不同之处。',
          keyPoints: ['Shared interest', 'Father and I', 'Drawing', 'Watching him paint', 'Mother prefers cooking', 'Similar and different']
        }
      ],
      answer: [
        {
          text: "Yes, painting is my main hobby.",
          keywords: ["painting", "main hobby"]
        },
        {
          text: "I usually paint when I have some free time at home.",
          keywords: ["free time", "at home"]
        },
        {
          text: "It's a nice way for me to relax and forget about stress.",
          keywords: ["relax", "forget stress"]
        }
      ]
    },
    {
      id: '1-8',
      question: '🎁 Gifts-礼物',
      topicType: '1-4月新题',
      questionCount: 4,
      examTakers: 602,
      answerCount: 4,
      duration: '1-2分钟',
      isNew: true,
      questions: [
        {
          question: 'What gift have u received recently? / Have u ever received a great gift?',
          questionCN: '你最近收到过什么礼物吗？/ 你曾经收到过一份很棒的礼物吗？',
          answer: [
            {
              text: "Actually, I just received a pair of headphones.",
              keywords: ["just received", "pair of headphones"]
            },
            {
              text: "It was a birthday gift from my best friend last month, and I think it's the best gift I've ever had.",
              keywords: ["birthday gift", "best friend", "last month", "best gift I've ever had"]
            },
            {
              text: "I use them every day to listen to music.",
              keywords: ["use them every day", "listen to music"]
            },
            {
              text: "Since they are high-quality and very useful, I really treasure them.",
              keywords: ["high-quality", "very useful", "really treasure them"]
            }
          ],
          translation: '事实上，我刚收到一副耳机。这是我最好的朋友上个月送我的生日礼物，我觉得这是我收过的最好的礼物。我每天都用它们听音乐。因为它们质量很高且非常实用，所以我非常珍惜它们。',
          keyPoints: ['Pair of headphones', 'Birthday gift', 'Best friend', 'Best gift ever', 'Use every day', 'Treasure them']
        },
        {
          question: 'Have u ever sent handmade gifts to others?',
          questionCN: '你有没有送过手工礼物给别人？',
          answer: [
            {
              text: "Yes, I have.",
              keywords: ["Yes, I have"]
            },
            {
              text: "I once made a handmade card for a friend's birthday.",
              keywords: ["made a handmade card", "friend's birthday"]
            },
            {
              text: "I think the effort you put in is much more meaningful than just buying something from a shop.",
              keywords: ["effort you put in", "much more meaningful", "buying something from a shop"]
            },
            {
              text: "It made me feel great because a handmade gift shows how much you really care.",
              keywords: ["made me feel great", "handmade gift", "shows how much you really care"]
            }
          ],
          translation: '是的，我送过。我曾经为朋友的生日做过一张手工卡片。我觉得你投入的心意比直接从商店买东西要有意义得多。这让我感觉棒极了，因为手工礼物能展现出你有多么在意。',
          keyPoints: ['Handmade card', "Friend's birthday", 'Effort more meaningful', 'Shows you care']
        },
        {
          question: 'What do u consider when choosing a gift? / Do u think u are good at choosing gifts?',
          questionCN: '你在选择礼物时会考虑哪些因素？/ 你觉得自己在挑选礼物方面做得怎么样？',
          answer: [
            {
              text: "To be honest, I think I'm pretty good at it.",
              keywords: ["To be honest", "pretty good at it"]
            },
            {
              text: "When I choose a gift, I always focus on what the person really needs or their hobbies.",
              keywords: ["choose a gift", "focus on", "what the person really needs", "their hobbies"]
            },
            {
              text: "Because I pay attention to these details, the gifts I pick are usually perfect for my friends.",
              keywords: ["pay attention to these details", "gifts I pick", "usually perfect for my friends"]
            },
            {
              text: "They always love my surprises.",
              keywords: ["always love my surprises"]
            }
          ],
          translation: '老实说，我觉得我挺擅长的。当我挑礼物时，我总是关注那个人真正需要什么或者他们的爱好。因为我非常注意这些细节，所以我挑的礼物通常对我的朋友们来说都很完美。他们总是很喜欢我给他们的惊喜。',
          keyPoints: ['Pretty good at it', 'Focus on needs', 'Their hobbies', 'Pay attention to details', 'Usually perfect', 'Love surprises']
        }
      ],
      answer: [
        {
          text: "I just received a pair of headphones from my best friend.",
          keywords: ["headphones", "best friend"]
        },
        {
          text: "I use them every day to listen to music.",
          keywords: ["every day", "listen to music"]
        },
        {
          text: "Since they are high-quality and very useful, I really treasure them.",
          keywords: ["high-quality", "treasure them"]
        }
      ]
    },
    {
      id: '1-9',
      question: '🥳 Day off-休假',
      topicType: '非大陆地区1-4月新题',
      questionCount: 4,
      examTakers: 686,
      answerCount: 4,
      duration: '1-2分钟',
      questions: [
        {
          question: 'When was the last time you had a few days off?',
          questionCN: '你上一次休假几天是什么时候？',
          answer: [
            {
              text: 'Actually, it was just a couple of weeks ago.',
              keywords: ['couple of weeks ago']
            },
            {
              text: 'I had a long weekend, so I stayed at home to catch up on some sleep and watch my favorite movies.',
              keywords: ['long weekend', 'stayed at home', 'catch up on some sleep', 'favorite movies']
            },
            {
              text: 'It was really nice because I had been so busy with my work / study lately.',
              keywords: ['really nice', 'so busy', 'work', 'study', 'lately']
            }
          ],
          translation: '其实就在几周前。我过了一个长周末,所以待在家里补了补觉，看了看我最喜欢的电影。这真的很棒，因为我最近工作/学习一直特别忙。',
          keyPoints: ['Couple of weeks ago', 'Long weekend', 'Catch up on sleep', 'Watch movies', 'Been busy']
        },
        {
          question: 'What do you usually do when you have days off?',
          questionCN: '你休息日通常做什么？',
          answer: [
            {
              text: 'Actually, I usually enjoy hanging out with my friends.',
              keywords: ['enjoy', 'hanging out with my friends']
            },
            {
              text: 'We often go to a cafe to chat or grab a meal together.',
              keywords: ['cafe', 'chat', 'grab a meal together']
            },
            {
              text: "It's a great way for me to relax because I've been so busy with my work / study lately.",
              keywords: ['great way', 'relax', 'so busy', 'work', 'study', 'lately']
            }
          ],
          translation: '其实我通常喜欢和朋友出去逛逛。我们经常去咖啡馆聊天或一起吃顿饭。对我来说这是放松的好方法，因为我最近工作/学习一直很忙。',
          keyPoints: ['Hanging out', 'Friends', 'Cafe', 'Chat', 'Grab a meal', 'Relax']
        },
        {
          question: 'Do you usually spend your days off with your parents or with your friends?',
          questionCN: '你通常在休息日和父母一起还是和朋友一起度过？',
          answer: [
            {
              text: 'I mostly spend my time with my friends.',
              keywords: ['mostly spend my time', 'friends']
            },
            {
              text: 'We often go to a cafe to chat or grab a meal together.',
              keywords: ['cafe', 'chat', 'grab a meal together']
            },
            {
              text: "It's a great way for me to relax because I've been so busy with my work / study lately.",
              keywords: ['great way', 'relax', 'so busy', 'work', 'study', 'lately']
            }
          ],
          translation: '我大多数时间和朋友在一起。我们经常去咖啡馆聊天或一起吃顿饭。对我来说这是放松的好方法，因为我最近工作/学习一直很忙。',
          keyPoints: ['Spend time with friends', 'Cafe', 'Chat', 'Meal together', 'Relax']
        },
        {
          question: 'What would you like to do if you had a day off tomorrow?',
          questionCN: '如果你明天休息，你想做什么？',
          answer: [
            {
              text: 'I would definitely invite my friends to a cafe.',
              keywords: ['definitely', 'invite my friends', 'cafe']
            },
            {
              text: 'We often go there to chat or grab a meal together.',
              keywords: ['chat', 'grab a meal together']
            },
            {
              text: "It's a great way for me to relax because I've been so busy with my work / study lately.",
              keywords: ['great way', 'relax', 'so busy', 'work', 'study', 'lately']
            }
          ],
          translation: '我肯定会邀请朋友去咖啡馆。我们经常去那里聊天或一起吃顿饭。对我来说这是放松的好方法，因为我最近工作/学习一直很忙。',
          keyPoints: ['Invite friends', 'Cafe', 'Chat', 'Meal', 'Relax', 'Been busy']
        }
      ],
      answer: [
        {
          text: 'I really value my days off as they give me time to recharge.',
          keywords: ['value', 'days off', 'recharge']
        },
        {
          text: 'I usually spend them relaxing at home or meeting up with friends.',
          keywords: ['relaxing', 'meeting up', 'friends']
        },
        {
          text: 'Sometimes I use the time to pursue hobbies or catch up on sleep.',
          keywords: ['pursue hobbies', 'catch up on sleep']
        },
        {
          text: 'Having regular breaks from work is essential for maintaining work-life balance.',
          keywords: ['regular breaks', 'essential', 'work-life balance']
        }
      ]
    },
    {
      id: '1-10',
      question: '🔑 Keys-钥匙',
      topicType: '非大陆地区1-4月新题',
      questionCount: 3,
      examTakers: 119,
      answerCount: 3,
      duration: '1-2分钟',
      questions: [
        {
          question: 'Do you always bring a lot of keys with you?',
          questionCN: '你总是随身带很多钥匙吗？',
          answer: [
            {
              text: 'Not really.',
              keywords: ['Not really']
            },
            {
              text: 'I prefer to keep my bag light and simple, so I only carry the most important keys for my home.',
              keywords: ['keep my bag light and simple', 'only carry', 'most important keys']
            },
            {
              text: 'These days, many buildings have smart locks or use access cards, which are much more convenient.',
              keywords: ['smart locks', 'access cards', 'much more convenient']
            },
            {
              text: "So, I don't have to carry a heavy bunch of keys anymore.",
              keywords: ["don't have to carry", 'heavy bunch of keys', 'anymore']
            }
          ],
          translation: '不怎么带。我更喜欢让包包保持轻便简单，所以我只带家里最重要的几把钥匙。如今，很多建筑都有智能锁或使用门禁卡，这要方便得多。所以我不再需要带着一大串沉重的钥匙了。',
          keyPoints: ['Not really', 'Keep bag light', 'Important keys only', 'Smart locks', 'Access cards', 'More convenient']
        },
        {
          question: 'Have you ever lost your keys? / Do you often forget the keys and lock yourself out?',
          questionCN: '你曾经丢过钥匙吗？/ 你经常忘带钥匙把自己锁在外面吗？',
          answer: [
            {
              text: "I've never really lost them, but I do forget them sometimes.",
              keywords: ['never really lost', 'forget them sometimes']
            },
            {
              text: "Because I'm often in a rush, I occasionally leave my keys on the table and walk out.",
              keywords: ['often in a rush', 'occasionally leave', 'walk out']
            },
            {
              text: "I've been locked out a couple of times, which was very annoying.",
              keywords: ['been locked out', 'couple of times', 'very annoying']
            },
            {
              text: 'Now, I usually keep a spare key in my bag or with a friend just in case.',
              keywords: ['spare key', 'in my bag', 'with a friend', 'just in case']
            }
          ],
          translation: '我从没真正弄丢过，但我确实有时会忘带。因为我经常急急忙忙的，偶尔会把钥匙留在桌子上就出门了。我有几次被锁在门外，那真的很烦人。所以现在，我通常会在包里或朋友那里放一把备用钥匙以防万一。',
          keyPoints: ['Never lost', 'Sometimes forget', 'In a rush', 'Locked out', 'Spare key']
        },
        {
          question: 'Do you think it is a good idea to leave your keys with a neighbour?',
          questionCN: '你觉得把钥匙留给邻居是个好主意吗？',
          answer: [
            {
              text: 'It depends on the neighbor.',
              keywords: ['depends on the neighbor']
            },
            {
              text: 'If you trust them, it can be very handy during an emergency, like when you are locked out.',
              keywords: ['trust them', 'very handy', 'emergency', 'locked out']
            },
            {
              text: 'However, if you are not close, it might be a security risk.',
              keywords: ['not close', 'security risk']
            },
            {
              text: "So, I think it's only a good idea if you know them well.",
              keywords: ['only a good idea', 'know them well']
            }
          ],
          translation: '这取决于邻居。如果你信任他们，在紧急情况下（比如你被锁在外面时）会非常方便。然而，如果你们不亲近，这可能会有安全风险。所以，我认为只有在非常了解他们的情况下，这才是好主意。',
          keyPoints: ['Depends on neighbor', 'Trust', 'Handy in emergency', 'Security risk', 'Know them well']
        }
      ],
      answer: [
        {
          text: 'I always keep my keys in the same place to avoid losing them.',
          keywords: ['same place', 'avoid losing']
        },
        {
          text: 'I have a small keychain with house keys, office keys, and car keys.',
          keywords: ['keychain', 'house keys', 'office keys', 'car keys']
        },
        {
          text: "I've lost my keys a few times before, which was quite stressful.",
          keywords: ['lost', 'stressful']
        },
        {
          text: 'Now I always double-check that I have them before leaving the house.',
          keywords: ['double-check', 'before leaving']
        }
      ]
    },
    {
      id: '1-11',
      question: '🌅 Morning time-早晨时光',
      topicType: '1-4月新题',
      questionCount: 5,
      examTakers: 245,
      answerCount: 5,
      duration: '1-2分钟',
      isNew: true,
      questions: [
        {
          question: 'Do you like getting up early in the morning?',
          questionCN: '你喜欢早上起床吗？',
          answer: [
            {
              text: 'To be honest, not really.',
              keywords: ['To be honest', 'not really']
            },
            {
              text: "I'm a night owl, so I find it hard to leave my bed, especially in winter.",
              keywords: ['night owl', 'hard to leave my bed', 'especially in winter']
            },
            {
              text: 'I usually need a strong coffee to properly wake up and start my day.',
              keywords: ['strong coffee', 'properly wake up', 'start my day']
            }
          ],
          translation: '老实说，并不喜欢。我是个熬夜党，所以我发现起床很困难，特别是在冬天。我通常需要一杯浓咖啡来彻底唤醒自己并开始新的一天。',
          keyPoints: ['Not really', 'Night owl', 'Hard to leave bed', 'Strong coffee', 'Wake up']
        },
        {
          question: 'What do you usually do in the morning?',
          questionCN: '你通常早上做什么？',
          answer: [
            {
              text: "I'm usually in a rush.",
              keywords: ['in a rush']
            },
            {
              text: 'After I get up, I quickly get dressed and grab a simple breakfast.',
              keywords: ['get up', 'quickly get dressed', 'grab a simple breakfast']
            },
            {
              text: 'Then I check my phone for messages or news while commuting to work / school.',
              keywords: ['check my phone', 'messages', 'news', 'commuting', 'work', 'school']
            }
          ],
          translation: '我通常很匆忙。起床后，我快速穿好衣服，随便吃点简单的早餐。然后在通勤去上班或上学的路上看手机消息或新闻。',
          keyPoints: ['In a rush', 'Get dressed', 'Simple breakfast', 'Check phone', 'Commuting']
        },
        {
          question: 'What did you do in the morning when you were little? Why?',
          questionCN: '你小时候早上做了什么？为什么？',
          answer: [
            {
              text: 'Back then, I had more time.',
              keywords: ['Back then', 'more time']
            },
            {
              text: 'My mom would wake me up and prepare a hot breakfast.',
              keywords: ['mom', 'wake me up', 'prepare a hot breakfast']
            },
            {
              text: 'I usually spent time watching cartoons or playing with my toys before going to school because I didn\'t have any stress.',
              keywords: ['watching cartoons', 'playing with my toys', 'before going to school', "didn't have any stress"]
            }
          ],
          translation: '那时候，我的时间更多。我妈妈会叫我起床并准备热腾腾的早餐。去学校之前，我通常会花时间看动画片或玩玩具，因为那时候没有任何压力。',
          keyPoints: ['More time', 'Mom wake me up', 'Hot breakfast', 'Watch cartoons', 'No stress']
        },
        {
          question: 'Are there any differences between what you do in the morning now and what you did in the past?',
          questionCN: '你现在的早晨做的事情和过去有什么不同？',
          answer: [
            {
              text: 'Yes, there are huge differences.',
              keywords: ['huge differences']
            },
            {
              text: 'In the past, my mornings were relaxed and my parents took care of everything.',
              keywords: ['In the past', 'mornings were relaxed', 'parents took care of everything']
            },
            {
              text: 'But now, my mornings are busy and stressful because I have to manage everything by myself.',
              keywords: ['now', 'busy and stressful', 'manage everything by myself']
            }
          ],
          translation: '是的，有巨大的不同。过去，我的早晨很轻松，父母会照顾好一切。但现在，我的早晨很忙碌且压力大，因为我必须自己打理所有事情。',
          keyPoints: ['Huge differences', 'Past - relaxed', 'Parents took care', 'Now - busy', 'Manage by myself']
        },
        {
          question: 'Do you spend your mornings doing the same things on both weekends and weekdays? Why?',
          questionCN: '你周末和工作日早上都做同样的事情吗？为什么？',
          answer: [
            {
              text: 'No, they are totally different.',
              keywords: ['totally different']
            },
            {
              text: 'On weekdays, I have to hurry to my classes / work.',
              keywords: ['weekdays', 'have to hurry', 'classes', 'work']
            },
            {
              text: 'But on weekends, I usually sleep in and have a late breakfast.',
              keywords: ['weekends', 'sleep in', 'late breakfast']
            },
            {
              text: "It's the only time I can relax and take it easy without an alarm.",
              keywords: ['only time', 'relax', 'take it easy', 'without an alarm']
            }
          ],
          translation: '不，完全不同。工作日我必须赶着去上课/工作。但周末我通常会睡懒觉并吃一顿很晚的早餐。这是我唯一可以在没有闹钟的情况下放松且不紧不慢的时间。',
          keyPoints: ['Totally different', 'Weekdays - hurry', 'Weekends - sleep in', 'Relax', 'Without alarm']
        }
      ],
      answer: [
        {
          text: 'I find mornings to be the most productive time of my day.',
          keywords: ['mornings', 'most productive']
        },
        {
          text: 'I usually wake up early and have a simple breakfast with coffee.',
          keywords: ['wake up early', 'breakfast', 'coffee']
        },
        {
          text: 'The morning air is fresh and the environment is peaceful.',
          keywords: ['morning air', 'fresh', 'peaceful']
        },
        {
          text: 'I like to plan my day during this time and set goals.',
          keywords: ['plan my day', 'set goals']
        },
        {
          text: 'Starting the day with a positive routine really affects my overall mood.',
          keywords: ['positive routine', 'affects', 'overall mood']
        }
      ]
    },
    {
      id: '1-12',
      question: '💤 Dreams-梦境',
      topicType: '非大陆地区1-4月新题',
      questionCount: 4,
      examTakers: 105,
      answerCount: 4,
      duration: '1-2分钟',
      questions: [
        {
          question: 'Can you remember the dreams you had?',
          questionCN: '你能记得你做过什么梦吗？',
          answer: [
            {
              text: 'Not really.',
              keywords: ['Not really']
            },
            {
              text: 'Most of the time, I forget my dreams almost immediately after I wake up.',
              keywords: ['Most of the time', 'forget my dreams', 'almost immediately', 'wake up']
            },
            {
              text: 'I might only have a vague feeling about what happened.',
              keywords: ['vague feeling', 'what happened']
            },
            {
              text: 'But if the dream is very scary or strange, like a nightmare, I can usually remember some details for a short while.',
              keywords: ['very scary', 'strange', 'nightmare', 'remember some details', 'short while']
            }
          ],
          translation: '不怎么记得。大部分时间，我醒来后几乎马上就把梦给忘了。我可能只对发生了什么有一种模糊的感觉。但如果那个梦非常吓人或奇怪，比如是个噩梦，我通常能短时间记住一些细节。',
          keyPoints: ['Not really', 'Forget immediately', 'Vague feeling', 'Nightmare', 'Remember details']
        },
        {
          question: 'Do you share your dreams with others?',
          questionCN: '你和其他人分享你的梦想吗？',
          answer: [
            {
              text: 'Sometimes I do.',
              keywords: ['Sometimes']
            },
            {
              text: 'If a dream is really interesting or funny, I usually tell my friends about it when we are hanging out.',
              keywords: ['really interesting', 'funny', 'tell my friends', 'hanging out']
            },
            {
              text: "It's a good way to start a conversation.",
              keywords: ['good way', 'start a conversation']
            },
            {
              text: 'However, if the dream is too personal or boring, I prefer to keep it to myself.',
              keywords: ['too personal', 'boring', 'keep it to myself']
            }
          ],
          translation: '有时会。如果一个梦非常有趣或搞笑，我通常会在和朋友闲逛时告诉他们。这是一个开启话题的好方法。然而，如果梦太私人或太无聊，我更愿意把它藏在心里。',
          keyPoints: ['Sometimes', 'Interesting or funny', 'Tell friends', 'Start conversation', 'Keep to myself']
        },
        {
          question: 'Do you think dreams have special meanings?',
          questionCN: '你认为梦有特殊的意义吗？',
          answer: [
            {
              text: "I'm not really sure.",
              keywords: ['not really sure']
            },
            {
              text: 'Some people believe dreams can predict the future, but I think they are just reflections of our daily lives.',
              keywords: ['Some people believe', 'predict the future', 'reflections of our daily lives']
            },
            {
              text: 'For example, if I am stressed about work, I might dream about being late.',
              keywords: ['For example', 'stressed about work', 'dream about being late']
            },
            {
              text: 'So, I think dreams are more about our emotions than any secret magic.',
              keywords: ['more about our emotions', 'secret magic']
            }
          ],
          translation: '我不大确定。有些人相信梦可以预见未来，但我认为它们只是我们日常生活的映射。例如，如果我对工作感到压力很大，我可能会梦到迟到。所以，我觉得梦更多地是关于我们的情绪，而不是什么秘密魔法。',
          keyPoints: ['Not sure', 'Predict future', 'Reflections of daily life', 'About emotions', 'Not magic']
        },
        {
          question: 'Do you want to make your dreams come true?',
          questionCN: '你想要实现你的梦吗？',
          answer: [
            {
              text: 'It depends on the dream.',
              keywords: ['depends on the dream']
            },
            {
              text: "If it's a wonderful dream, like winning the lottery, I'd definitely want it to be real.",
              keywords: ['wonderful dream', 'winning the lottery', 'want it to be real']
            },
            {
              text: 'It would be a pleasant surprise.',
              keywords: ['pleasant surprise']
            },
            {
              text: "But if it's a weird or scary one, I'd be relieved that it was just a dream.",
              keywords: ['weird', 'scary', 'relieved', 'just a dream']
            },
            {
              text: 'So, I only want the good ones to come true.',
              keywords: ['only want', 'good ones', 'come true']
            }
          ],
          translation: '这取决于是什么梦。如果是一个美梦，比如中了彩票，我肯定希望它是真的。那会是一个惊喜。但如果是一个奇怪或吓人的梦，我会很庆幸那只是个梦。所以，我只希望那些好的梦成真。',
          keyPoints: ['Depends', 'Wonderful dream', 'Winning lottery', 'Pleasant surprise', 'Only good ones']
        }
      ],
      answer: [
        {
          text: 'I often have vivid dreams, though I don\'t always remember them.',
          keywords: ['vivid dreams', 'remember']
        },
        {
          text: 'Sometimes my dreams are related to things that happened during the day.',
          keywords: ['related to', 'happened during the day']
        },
        {
          text: 'I find dreams fascinating because they reveal our subconscious thoughts.',
          keywords: ['fascinating', 'reveal', 'subconscious thoughts']
        },
        {
          text: 'I keep a dream journal occasionally to record interesting dreams.',
          keywords: ['dream journal', 'record', 'interesting dreams']
        }
      ]
    },
    {
      id: '1-13',
      question: '🐼 Pets and Animals-宠物和动物',
      topicType: '1-4月新题',
      questionCount: 3,
      examTakers: 504,
      answerCount: 3,
      duration: '1-2分钟',
      isNew: true,
      questions: [
        {
          question: "What's your favourite animal? Why? / What is the most popular animal in China?",
          questionCN: '你最喜欢的动物是什么？为什么？/ 中国最受欢迎的动物是什么？',
          answer: [
            {
              text: 'It has to be the Giant Panda.',
              keywords: ['Giant Panda']
            },
            {
              text: 'These animals are the most popular in China since they look so cute and friendly.',
              keywords: ['most popular in China', 'cute and friendly']
            },
            {
              text: 'In fact, I even bought a year pass to the zoo just to visit them regularly.',
              keywords: ['bought a year pass', 'zoo', 'visit them regularly']
            },
            {
              text: 'Their lovely faces really heal me and add a lot of fun to my life.',
              keywords: ['lovely faces', 'really heal me', 'add a lot of fun']
            }
          ],
          translation: '那肯定是大熊猫。由于长得非常可爱和友好，它们是中国最受欢迎的动物。事实上，我甚至为了经常看它们专门办了动物园的年卡。它们可爱的样子真的很治愈我，给我的生活增添了很多乐趣。',
          keyPoints: ['Giant Panda', 'Most popular', 'Cute and friendly', 'Year pass', 'Heal me']
        },
        {
          question: 'Where do you prefer to keep your pet, indoors or outdoors?',
          questionCN: '你更喜欢在室内还是室外养宠物？',
          answer: [
            {
              text: 'I definitely prefer keeping my pet indoors.',
              keywords: ['definitely prefer', 'indoors']
            },
            {
              text: 'Since the indoor environment is safer, I can better protect them.',
              keywords: ['indoor environment', 'safer', 'better protect them']
            },
            {
              text: 'In fact, I enjoy playing with my pet in the living room every day.',
              keywords: ['enjoy playing', 'living room', 'every day']
            },
            {
              text: 'Staying close to them really heals me and adds a lot of fun to my life.',
              keywords: ['Staying close', 'really heals me', 'adds a lot of fun']
            }
          ],
          translation: '我肯定更喜欢在室内养宠物。因为室内环境更安全，我能更好地保护它们。事实上，我喜欢每天在客厅和宠物玩耍。离它们近一点真的很治愈我，也给我的生活增添了很多乐趣。',
          keyPoints: ['Prefer indoors', 'Safer', 'Protect them', 'Play in living room', 'Heals me']
        },
        {
          question: 'Have you ever had a pet before?',
          questionCN: '你以前养过宠物吗？',
          answer: [
            {
              text: 'Yes, I have.',
              keywords: ['Yes']
            },
            {
              text: 'Since I really love animals, I used to keep a small dog at home.',
              keywords: ['really love animals', 'used to keep', 'small dog']
            },
            {
              text: 'In fact, I spent a lot of time walking it in the park after school.',
              keywords: ['spent a lot of time', 'walking it', 'park', 'after school']
            },
            {
              text: 'Taking care of my pet really heals me and adds a lot of fun to my life.',
              keywords: ['Taking care', 'really heals me', 'adds a lot of fun']
            }
          ],
          translation: '是的，我养过。因为我非常喜欢动物，我以前在家里养过一只小狗。事实上，我过去常常在放学后花很多时间在公园里遛它。照顾宠物真的很治愈我，也给我的生活增添了很多乐趣。',
          keyPoints: ['Yes', 'Love animals', 'Small dog', 'Walking in park', 'Heals me']
        }
      ],
      answer: [
        {
          text: 'I love animals and currently have a pet cat at home.',
          keywords: ['love animals', 'pet cat']
        },
        {
          text: 'Pets provide companionship and can reduce stress and loneliness.',
          keywords: ['companionship', 'reduce stress', 'loneliness']
        },
        {
          text: 'Taking care of a pet also teaches responsibility and empathy.',
          keywords: ['taking care', 'teaches responsibility', 'empathy']
        },
        {
          text: 'I enjoy watching wildlife documentaries to learn about different species.',
          keywords: ['wildlife documentaries', 'learn', 'different species']
        }
      ]
    },
    {
      id: '1-14',
      question: '📱 Mobile phone-手机',
      topicType: '9-12月',
      questionCount: 3,
      examTakers: 735,
      answerCount: 3,
      duration: '1-2分钟',
      questions: [
        {
          question: 'What was your first mobile phone?',
          questionCN: '你第一台手机是什么？',
          answer: [
            {
              text: 'My first mobile phone was a second-hand Huawei model that my parents gave me when I started high school.',
              keywords: ['first mobile phone', 'second-hand Huawei', 'parents gave me', 'started high school']
            },
            {
              text: "It wasn't very new or fancy, but I was super excited to have my own phone.",
              keywords: ["wasn't very new", 'fancy', 'super excited', 'own phone']
            },
            {
              text: 'I mainly used it to text my classmates and listen to music on the way to school.',
              keywords: ['mainly used', 'text my classmates', 'listen to music', 'way to school']
            }
          ],
          translation: '我第一台手机是一部华为的二手手机，是我上高中的时候爸妈给我的。虽然不是很新也不高级，但我当时特别激动能拥有自己的手机。我主要用它来给同学发消息，还有在上学路上听音乐。',
          keyPoints: ['Second-hand Huawei', 'Parents gave', 'High school', 'Excited', 'Text classmates', 'Listen to music']
        },
        {
          question: 'Do you often use your mobile phone for texting or calls?',
          questionCN: '你经常用手机发消息还是打电话？',
          answer: [
            {
              text: 'Yes, I use my phone to text more than to call.',
              keywords: ['use my phone', 'text more', 'to call']
            },
            {
              text: 'I usually chat with friends and family through apps like WeChat.',
              keywords: ['chat with', 'friends and family', 'apps like WeChat']
            },
            {
              text: 'It feels easier and less stressful than making a phone call.',
              keywords: ['feels easier', 'less stressful', 'making a phone call']
            },
            {
              text: 'I only make calls when something is urgent or needs to be explained clearly.',
              keywords: ['only make calls', 'something is urgent', 'needs to be explained clearly']
            }
          ],
          translation: '是的，我用手机发消息比打电话多。我通常通过像微信这样的应用和朋友家人聊天。发消息感觉更轻松，也没那么有压力。只有在紧急或需要讲清楚事情的时候，我才打电话。',
          keyPoints: ['Text more', 'WeChat', 'Easier', 'Less stressful', 'Only when urgent']
        },
        {
          question: 'Will you buy a new one in the future?',
          questionCN: '你将来会买新手机吗？',
          answer: [
            {
              text: 'Yes, probably.',
              keywords: ['Yes', 'probably']
            },
            {
              text: "My current phone works fine, but I think I'll get a new one in a year or two, especially if there's a good camera or better battery life.",
              keywords: ['current phone', 'works fine', 'get a new one', 'year or two', 'good camera', 'better battery life']
            },
            {
              text: 'Since I love taking photos, a phone with a great camera is really important for me.',
              keywords: ['love taking photos', 'great camera', 'really important']
            }
          ],
          translation: '会的。我现在用的手机还不错，但我想一两年内会换一部，尤其是如果有更好的相机或续航能力的话。因为我喜欢拍照，所以一部相机好的手机对我来说非常重要。',
          keyPoints: ['Yes probably', 'Current works fine', 'Year or two', 'Good camera', 'Love photos']
        }
      ],
      answer: [
        {
          text: 'I use my mobile phone every day for various purposes.',
          keywords: ['mobile phone', 'every day', 'various purposes']
        },
        {
          text: 'It helps me stay connected with friends and family through calls and messages.',
          keywords: ['stay connected', 'friends and family', 'calls', 'messages']
        },
        {
          text: 'I also use it for work, browsing the internet, and entertainment.',
          keywords: ['work', 'browsing the internet', 'entertainment']
        }
      ]
    },
    {
      id: '1-15',
      question: '👍 Doing something well-做得好',
      topicType: '1-4月保留题',
      questionCount: 2,
      examTakers: 224,
      answerCount: 2,
      duration: '1-2分钟',
      questions: [
        {
          question: 'Do you have an experience when you did something well? / Do you have an experience when your teacher thought you did a good job?',
          questionCN: '你有没有做过某件事情做得很好的经历？/ 你有没有老师认为你做得好的经历？',
          answer: [
            {
              text: 'Yes, last semester I gave a presentation in class.',
              keywords: ['Yes', 'last semester', 'gave a presentation', 'in class']
            },
            {
              text: 'I prepared very carefully and explained my ideas clearly.',
              keywords: ['prepared very carefully', 'explained my ideas clearly']
            },
            {
              text: 'In the end, my teacher praised me and said it was one of the best in the class.',
              keywords: ['teacher praised me', 'said it was one of the best', 'in the class']
            },
            {
              text: 'I felt really proud and more confident.',
              keywords: ['felt really proud', 'more confident']
            }
          ],
          translation: '有的，上学期我在课堂上做了一个展示。我提前准备得很认真，表达得也很清楚。最后老师表扬我，说是班上做得最好的展示之一。我感到很自豪，也更有自信了。',
          keyPoints: ['Yes', 'Last semester', 'Presentation', 'Prepared carefully', 'Teacher praised', 'Proud and confident']
        },
        {
          question: 'Do you often tell your friends when they do something well?',
          questionCN: '你经常在你朋友做得好的时候告诉他们吗？',
          answer: [
            {
              text: 'Yes, I usually tell them right away.',
              keywords: ['Yes', 'usually tell them', 'right away']
            },
            {
              text: 'I think praising them makes them happy and encourages them to keep doing well.',
              keywords: ['praising them', 'makes them happy', 'encourages them', 'keep doing well']
            },
            {
              text: 'It also makes our friendship stronger when we support each other.',
              keywords: ['makes our friendship stronger', 'support each other']
            }
          ],
          translation: '会的，我通常会马上告诉他们。我觉得表扬能让他们开心，也会鼓励他们继续努力。当我们互相支持时，我们的友谊也更加牢固。',
          keyPoints: ['Yes', 'Tell them', 'Praising', 'Encourages', 'Friendship stronger', 'Support each other']
        }
      ],
      answer: [
        {
          text: 'I always try to do my best in everything I undertake.',
          keywords: ['try my best', 'everything', 'undertake']
        },
        {
          text: 'Doing something well gives me a sense of achievement and satisfaction.',
          keywords: ['sense of achievement', 'satisfaction']
        }
      ]
    },
    {
      id: '1-16',
      question: '📏 Rules-规定',
      topicType: '1-4月保留题',
      questionCount: 6,
      examTakers: 168,
      answerCount: 6,
      duration: '1-2分钟',
      questions: [
        {
          question: 'Are there any rules for students at your school?',
          questionCN: '你们学校对学生有什么规定吗？',
          answer: [
            {
              text: 'Yes, there are.',
              keywords: ['Yes', 'there are']
            },
            {
              text: "For example, we have to arrive on time for classes and we're not allowed to use phones during lectures.",
              keywords: ['arrive on time', 'for classes', 'not allowed to use phones', 'during lectures']
            },
            {
              text: 'These rules are quite basic but important.',
              keywords: ['quite basic', 'but important']
            }
          ],
          translation: '是的，有一些规则。比如，我们必须按时上课，而且在课堂上不允许使用手机。这些规定虽然简单，但很重要。',
          keyPoints: ['Yes', 'Arrive on time', 'No phones', 'Basic but important']
        },
        {
          question: 'Do you think students would benefit more from more rules?',
          questionCN: '你认为学生从更多的规则中受益更多吗？',
          answer: [
            {
              text: 'Not really.',
              keywords: ['Not really']
            },
            {
              text: 'Too many rules can make students feel restricted.',
              keywords: ['Too many rules', 'make students feel restricted']
            },
            {
              text: 'I think what really matters is having clear but reasonable rules that create a good learning environment.',
              keywords: ['what really matters', 'clear but reasonable rules', 'good learning environment']
            }
          ],
          translation: '不太会。太多的规则会让学生觉得受限制。我认为真正重要的是有明确但合理的规则，能营造一个良好的学习环境。',
          keyPoints: ['Not really', 'Too many restricts', 'Clear and reasonable', 'Good environment']
        },
        {
          question: 'Have you ever had a really dedicated teacher?',
          questionCN: '你曾经有过一位非常尽职的老师吗？',
          answer: [
            {
              text: 'Yes, I have.',
              keywords: ['Yes', 'I have']
            },
            {
              text: 'My high school English teacher was very dedicated—she always stayed after class to answer our questions and prepared lots of extra materials.',
              keywords: ['high school English teacher', 'very dedicated', 'stayed after class', 'answer our questions', 'prepared lots of extra materials']
            },
            {
              text: 'She really inspired me to learn more.',
              keywords: ['really inspired me', 'to learn more']
            }
          ],
          translation: '是的，我有过。我的高中英语老师非常敬业——她经常在课后留下来回答我们的问题，还准备了很多额外的学习资料。她真的激励了我更好地学习。',
          keyPoints: ['Yes', 'English teacher', 'Very dedicated', 'Stayed after class', 'Extra materials', 'Inspired me']
        },
        {
          question: 'Do you prefer to have more or fewer rules at school?',
          questionCN: '你更喜欢在学校有更多的规则还是更少的规则？',
          answer: [
            {
              text: 'I prefer fewer rules.',
              keywords: ['prefer fewer rules']
            },
            {
              text: 'Students need some freedom to explore their interests and develop creativity.',
              keywords: ['Students need', 'some freedom', 'explore their interests', 'develop creativity']
            },
            {
              text: 'Of course, a few basic rules are still necessary to keep order.',
              keywords: ['Of course', 'a few basic rules', 'still necessary', 'keep order']
            }
          ],
          translation: '我更喜欢少一些规则。学生需要一定的自由去探索兴趣和培养创造力。当然，维持秩序的基本规则还是必要的。',
          keyPoints: ['Prefer fewer', 'Freedom', 'Explore interests', 'Develop creativity', 'Basic rules necessary']
        },
        {
          question: 'Have you ever had a really strict teacher?',
          questionCN: '你曾经有过一个非常严格的老师吗？',
          answer: [
            {
              text: 'Yes, I had a very strict math teacher in middle school.',
              keywords: ['Yes', 'very strict', 'math teacher', 'middle school']
            },
            {
              text: 'She gave us a lot of homework and was very serious in class.',
              keywords: ['gave us a lot of homework', 'was very serious', 'in class']
            },
            {
              text: 'But in the end, I think it helped me build good study habits.',
              keywords: ['But in the end', 'helped me', 'build good study habits']
            }
          ],
          translation: '是的，我在初中有一个非常严格的数学老师。她总是留很多作业，上课也很严肃。但我觉得最后这帮助我养成了好的学习习惯。',
          keyPoints: ['Yes', 'Strict math teacher', 'Lots of homework', 'Very serious', 'Helped study habits']
        },
        {
          question: 'Would you like to work as a teacher in a rule-free school?',
          questionCN: '你愿意在无规则学校当老师吗？',
          answer: [
            {
              text: "No, I don't think so.",
              keywords: ['No', "don't think so"]
            },
            {
              text: 'Rules are important because they help keep students focused and organized.',
              keywords: ['Rules are important', 'help keep students', 'focused and organized']
            },
            {
              text: 'Without rules, the classroom might get too noisy and hard to manage.',
              keywords: ['Without rules', 'classroom might get', 'too noisy', 'hard to manage']
            }
          ],
          translation: '不，我不太想。规则很重要，因为它能帮助学生保持专注和有条理。没有规则的话，课堂可能会变得很吵，难以管理。',
          keyPoints: ['No', 'Rules important', 'Keep focused', 'Hard to manage without']
        }
      ],
      answer: [
        {
          text: 'Rules are important for maintaining order in society.',
          keywords: ['rules', 'important', 'maintaining order', 'society']
        },
        {
          text: 'I generally follow rules because they help create a fair environment for everyone.',
          keywords: ['generally follow', 'create', 'fair environment']
        },
        {
          text: 'Some rules may seem strict, but they often exist for good reasons.',
          keywords: ['seem strict', 'exist', 'good reasons']
        }
      ]
    },
    {
      id: '1-17',
      question: '🏛️ Public places-公共场所',
      topicType: '1-4月保留题',
      questionCount: 4,
      examTakers: 140,
      answerCount: 4,
      duration: '1-2分钟',
      questions: [
        {
          question: "Have you ever talked with someone you don't know in public places?",
          questionCN: '你有没有在公共场所和陌生人交谈过？',
          answer: [
            {
              text: 'Yes, I have.',
              keywords: ['Yes', 'I have']
            },
            {
              text: 'For example, once I asked a stranger for directions when I was traveling.',
              keywords: ['For example', 'asked a stranger', 'for directions', 'when I was traveling']
            },
            {
              text: 'It was just a short conversation, but it was quite helpful.',
              keywords: ['just a short conversation', 'quite helpful']
            }
          ],
          translation: '是的，我有。例如，有一次我在旅行时向陌生人问路。那只是一次简短的对话，但非常有帮助。',
          keyPoints: ['Yes', 'Asked stranger', 'Directions', 'Traveling', 'Short but helpful']
        },
        {
          question: 'Do you wear headphones in public places?',
          questionCN: '你在公共场所戴耳机吗？',
          answer: [
            {
              text: "Yes, I often wear headphones when I'm outside.",
              keywords: ['Yes', 'often wear headphones', "when I'm outside"]
            },
            {
              text: 'I usually listen to music or podcasts while walking or taking the subway.',
              keywords: ['listen to music', 'or podcasts', 'while walking', 'or taking the subway']
            },
            {
              text: 'It helps me relax and also blocks out noise.',
              keywords: ['helps me relax', 'also blocks out noise']
            }
          ],
          translation: '是的，我经常在外面戴耳机。我通常在走路或乘坐地铁时听音乐或播客。这有助于我放松，也能隔绝噪音。',
          keyPoints: ['Yes often', 'Music or podcasts', 'Walking or subway', 'Relax', 'Blocks noise']
        },
        {
          question: 'Would you like to see more public places near where you live?',
          questionCN: '你希望在你住的地方附近看到更多公共场所吗？',
          answer: [
            {
              text: 'Yes, definitely.',
              keywords: ['Yes', 'definitely']
            },
            {
              text: 'If there were more parks and squares nearby, people could have more space to walk, exercise, or just hang out.',
              keywords: ['more parks and squares', 'nearby', 'more space', 'walk', 'exercise', 'or just hang out']
            },
            {
              text: 'It would make the community more lively and comfortable.',
              keywords: ['make the community', 'more lively and comfortable']
            }
          ],
          translation: '是的，当然。如果附近有更多的公园和广场，人们就会有更多的空间散步、锻炼或者只是闲逛。这将使社区更加活跃和舒适。',
          keyPoints: ['Yes definitely', 'More parks', 'More space', 'Walk exercise', 'More lively']
        },
        {
          question: 'Do you often go to public places with your friends?',
          questionCN: '你经常和朋友们去公共场所吗？',
          answer: [
            {
              text: 'Yes, I often go to public places with my friends.',
              keywords: ['Yes', 'often go', 'public places', 'with my friends']
            },
            {
              text: 'We usually go to cafes, parks, or shopping malls.',
              keywords: ['usually go to', 'cafes', 'parks', 'or shopping malls']
            },
            {
              text: "It's always relaxing and enjoyable.",
              keywords: ['always relaxing', 'and enjoyable']
            }
          ],
          translation: '是的，我经常和朋友去公共场所。我们通常会去咖啡馆、公园或者商场。这总是让人感到很放松，也很愉快。',
          keyPoints: ['Yes often', 'Cafes parks malls', 'Relaxing and enjoyable']
        }
      ],
      answer: [
        {
          text: 'I often visit public places like parks, libraries, and cafes.',
          keywords: ['visit', 'public places', 'parks', 'libraries', 'cafes']
        },
        {
          text: 'These spaces provide opportunities for relaxation and socializing.',
          keywords: ['spaces', 'opportunities', 'relaxation', 'socializing']
        },
        {
          text: 'Public places should be well-maintained and accessible to everyone.',
          keywords: ['well-maintained', 'accessible', 'everyone']
        }
      ]
    },
    {
      id: '1-18',
      question: '👴 Staying with old people-和老人一起',
      topicType: '1-4月保留题',
      questionCount: 4,
      examTakers: 70,
      answerCount: 4,
      duration: '1-2分钟',
      questions: [
        {
          question: 'Have you ever worked with old people?',
          questionCN: '你曾经和老年人一起工作过吗？',
          answer: [
            {
              text: 'Yes, I have.',
              keywords: []
            },
            {
              text: 'During my internship, I once worked with an older colleague who guided me a lot.',
              keywords: ['internship', 'older colleague', 'guided']
            },
            {
              text: 'I think it was a valuable experience.',
              keywords: ['valuable experience']
            }
          ],
          translation: '是的，我有过。在实习期间，我和一位年长的同事合作过，他给了我很多指导。我觉得这是一次很宝贵的经历。',
          keyPoints: ['Yes', 'Internship', 'Older colleague', 'Guided me', 'Valuable experience']
        },
        {
          question: 'Are you happy to work with people who are older than you? / What are the benefits of being friends with or working with old people?',
          questionCN: '你愿意和比你年龄大的人一起工作吗？/ 与老年人交朋友或与他们一起工作的好处是什么？',
          answer: [
            {
              text: "Yes, I'm happy to.",
              keywords: []
            },
            {
              text: 'Older people usually have more experience, so I can learn useful skills from them.',
              keywords: ['more experience', 'learn useful skills']
            },
            {
              text: 'They often give good advice and help me see problems in a different way.',
              keywords: ['good advice', 'different way']
            }
          ],
          translation: '是的，我很乐意。老年人通常有更多的经验，所以我可以从他们那里学到有用的技能。他们经常给出好的建议，并帮助我以不同的方式看待问题。',
          keyPoints: ['Yes happy', 'More experience', 'Learn skills', 'Good advice', 'Different perspective']
        },
        {
          question: 'Do you enjoy spending time with old people?',
          questionCN: '你喜欢和老年人一起度过时间吗？',
          answer: [
            {
              text: 'Yes, I do, especially with my grandparents.',
              keywords: ['grandparents']
            },
            {
              text: "I feel relaxed and cared for when I'm with them, and I can also learn a lot from their stories and experiences.",
              keywords: ['relaxed', 'cared for', 'learn', 'stories', 'experiences']
            }
          ],
          translation: '是的，我确实如此，尤其是和我的祖父母在一起时。和他们在一起时，我感觉很放松，得到了照顾，而且我还可以从他们的故事和经历中学到很多东西。',
          keyPoints: ['Yes', 'Especially grandparents', 'Feel relaxed', 'Cared for', 'Learn from stories']
        },
        {
          question: 'Have you ever lived with your grandparents?',
          questionCN: '你曾经和你的祖父母住在一起吗？',
          answer: [
            {
              text: 'Yes, I lived with my grandparents when I was young.',
              keywords: ['grandparents', 'when young']
            },
            {
              text: 'They took care of me while my parents were at work.',
              keywords: ['took care', 'parents at work']
            },
            {
              text: 'Those were very warm and happy memories for me.',
              keywords: ['warm', 'happy memories']
            }
          ],
          translation: '是的，我小时候和祖父母住在一起。爸妈上班的时候，他们照顾我。那是我非常温暖和快乐的回忆。',
          keyPoints: ['Yes', 'When young', 'Took care of me', 'Parents at work', 'Warm happy memories']
        }
      ],
      answer: [
        {
          text: 'I enjoy spending time with elderly people because they have so much wisdom and experience.',
          keywords: ['enjoy', 'elderly people', 'wisdom', 'experience']
        },
        {
          text: 'They can share interesting stories from the past and teach valuable life lessons.',
          keywords: ['share', 'interesting stories', 'teach', 'valuable life lessons']
        },
        {
          text: 'Being with older people helps me understand different perspectives.',
          keywords: ['older people', 'understand', 'different perspectives']
        }
      ]
    },
    {
      id: '1-19',
      question: '🌱 Growing vegetables/fruits-种蔬菜...',
      topicType: '1-4月保留题',
      questionCount: 5,
      examTakers: 70,
      answerCount: 5,
      duration: '1-2分钟',
      questions: [
        {
          question: 'Are you interested in growing vegetables and fruits?',
          questionCN: '你对种植蔬菜和水果感兴趣吗？',
          answer: [
            {
              text: 'Yes, I am.',
              keywords: []
            },
            {
              text: "I think it's healthy and satisfying to eat food you grow by yourself.",
              keywords: ['healthy', 'satisfying', 'grow by yourself']
            },
            {
              text: "But honestly, I don't have much time to do it now.",
              keywords: ['no time now']
            }
          ],
          translation: '是的，我感兴趣。我觉得吃自己种的食物既健康又满足。但老实说，我现在没有太多时间去做。',
          keyPoints: ['Yes', 'Healthy and satisfying', 'Grow by yourself', 'No time now']
        },
        {
          question: 'Is growing vegetables popular in your country?',
          questionCN: '在你的国家种植蔬菜流行吗？',
          answer: [
            {
              text: 'Yes, it is, especially in the countryside.',
              keywords: ['countryside']
            },
            {
              text: 'Many families have small gardens where they grow fresh vegetables.',
              keywords: ['small gardens', 'fresh vegetables']
            },
            {
              text: "It's part of their daily life.",
              keywords: ['daily life']
            }
          ],
          translation: '是的，尤其是在农村。很多家庭都有小菜园，种一些新鲜蔬菜。这已经是他们日常生活的一部分。',
          keyPoints: ['Yes', 'Especially countryside', 'Small gardens', 'Fresh vegetables', 'Part of daily life']
        },
        {
          question: 'Do many people grow vegetables in your city?',
          questionCN: '你们城市很多人种蔬菜吗？',
          answer: [
            {
              text: 'Not really.',
              keywords: []
            },
            {
              text: "In big cities, most people are too busy and don't have space.",
              keywords: ['big cities', 'too busy', 'no space']
            },
            {
              text: 'They usually buy vegetables from markets or supermarkets instead.',
              keywords: ['buy from markets']
            }
          ],
          translation: '不太多。在大城市，大部分人太忙而且没有空间。他们通常选择在菜市场或超市买蔬菜。',
          keyPoints: ['Not really', 'Big cities', 'Too busy', 'No space', 'Buy from markets']
        },
        {
          question: "Do you think it's easy to grow vegetables?",
          questionCN: '你认为种菜容易吗？',
          answer: [
            {
              text: "I think it's not very easy.",
              keywords: ['not very easy']
            },
            {
              text: 'You need to know about the soil, the weather, and how to take care of the plants.',
              keywords: ['soil', 'weather', 'take care']
            },
            {
              text: 'It takes time and patience.',
              keywords: ['time', 'patience']
            }
          ],
          translation: '我觉得不是很容易。你需要了解土壤、天气，还要知道如何照顾植物。这需要时间和耐心。',
          keyPoints: ['Not very easy', 'Know soil weather', 'Take care of plants', 'Time and patience']
        },
        {
          question: 'Should schools teach students how to grow vegetables?',
          questionCN: '学校应该教学生如何种植蔬菜？',
          answer: [
            {
              text: 'Yes, I think so.',
              keywords: []
            },
            {
              text: 'It can help students understand nature and learn the value of food.',
              keywords: ['understand nature', 'value of food']
            },
            {
              text: "It's also a good way to relax and develop responsibility.",
              keywords: ['relax', 'develop responsibility']
            }
          ],
          translation: '是的，我认���应该。这样能帮助学生了解自然，懂得食物的价值。这也是一种放松和培养责任感的好方式。',
          keyPoints: ['Yes', 'Understand nature', 'Value of food', 'Relax', 'Develop responsibility']
        }
      ],
      answer: [
        {
          text: 'Growing vegetables and fruits can be a rewarding hobby.',
          keywords: ['growing', 'vegetables', 'fruits', 'rewarding hobby']
        },
        {
          text: 'It allows you to eat fresh, organic produce from your own garden.',
          keywords: ['eat fresh', 'organic produce', 'own garden']
        },
        {
          text: 'The process teaches patience and gives you a connection to nature.',
          keywords: ['teaches patience', 'connection to nature']
        }
      ]
    },
    {
      id: '1-20',
      question: '🚶 Going out-外出',
      topicType: '1-4月保留题',
      questionCount: 4,
      examTakers: 77,
      answerCount: 4,
      duration: '1-2分钟',
      questions: [
        {
          question: 'Do you bring food or snacks with you when going out?',
          questionCN: '你出去时会带食物或小吃吗？',
          answer: [
            {
              text: 'Not usually.',
              keywords: []
            },
            {
              text: "I prefer to buy something outside if I get hungry, because it's more convenient.",
              keywords: ['buy outside', 'more convenient']
            },
            {
              text: 'But sometimes I take a small snack when I have a long trip.',
              keywords: ['small snack', 'long trip']
            }
          ],
          translation: '不太会。我更喜欢在外面饿了时买点东西，因为更方便。但如果是长途出行，我有时会带个小零食。',
          keyPoints: ['Not usually', 'Buy outside', 'More convenient', 'Small snack for long trip']
        },
        {
          question: 'Do you always take your mobile phone with you when going out?',
          questionCN: '你出去的时候总是带着手机吗？',
          answer: [
            {
              text: 'Yes, always.',
              keywords: []
            },
            {
              text: 'My phone is not only for communication but also for paying bills and finding information.',
              keywords: ['communication', 'paying bills', 'finding information']
            },
            {
              text: 'It has become a necessity for me.',
              keywords: ['necessity']
            }
          ],
          translation: '是的，总是会带。手机不仅用来联系，还能用来支付和查找信息。对我来说已经是必需品了。',
          keyPoints: ['Yes always', 'Communication', 'Paying bills', 'Finding information', 'Necessity']
        },
        {
          question: 'Do you often bring cash with you?',
          questionCN: '你经常随身携带现金吗？',
          answer: [
            {
              text: 'Not very often.',
              keywords: []
            },
            {
              text: "In China, mobile payment is very common, so I don't need to use cash most of the time.",
              keywords: ['mobile payment', 'very common', 'no cash needed']
            },
            {
              text: 'I only carry a little for emergencies.',
              keywords: ['for emergencies']
            }
          ],
          translation: '不太经常。在中国，移动支付非常普及，所以大多数时候我不需要现金。我只会带一点以防紧急情况。',
          keyPoints: ['Not very often', 'Mobile payment common', 'No cash needed', 'Little for emergencies']
        },
        {
          question: 'How often do you use cash?',
          questionCN: '你多长时间用一次现金？',
          answer: [
            {
              text: 'Hardly ever.',
              keywords: []
            },
            {
              text: 'I mainly use mobile apps like Alipay or WeChat Pay.',
              keywords: ['Alipay', 'WeChat Pay']
            },
            {
              text: "The only time I use cash is when small shops don't accept online payment.",
              keywords: ['small shops', 'no online payment']
            }
          ],
          translation: '几乎从来不会。我主要用支付宝或微信支付。只有在一些小店不支持线上支付时才会用现金。',
          keyPoints: ['Hardly ever', 'Alipay WeChat Pay', 'Only when shops no online payment']
        }
      ],
      answer: [
        {
          text: 'I like going out with friends to explore new places.',
          keywords: ['going out', 'friends', 'explore', 'new places']
        },
        {
          text: 'It helps me relax and break away from my daily routine.',
          keywords: ['relax', 'break away', 'daily routine']
        },
        {
          text: "Whether it's dining at a restaurant or watching a movie, going out is always enjoyable.",
          keywords: ['dining', 'restaurant', 'watching a movie', 'enjoyable']
        }
      ]
    }
  ],
  '2': [
    {
      id: '2-1',
      question: 'Describe a person who inspired you to do something interesting.',
      answerCount: 2,
      duration: '3-4分钟',
      isNew: true,
      answer: [
        {
          text: 'I would like to talk about my high school teacher, Mr. Chen, who inspired me to develop a passion for photography.',
          keywords: ['high school teacher', 'inspired', 'photography']
        },
        {
          text: 'He was not only an excellent English teacher but also an amateur photographer who often shared his work with us.',
          keywords: ['excellent teacher', 'amateur photographer', 'shared']
        },
        {
          text: 'What impressed me most was his ability to capture everyday moments and turn them into something beautiful.',
          keywords: ['impressed', 'capture everyday moments', 'beautiful']
        },
        {
          text: 'He encouraged me to look at the world from different perspectives and appreciate the small details.',
          keywords: ['encouraged', 'different perspectives', 'appreciate', 'small details']
        },
        {
          text: 'Thanks to his influence, I bought my first camera and started practicing photography regularly.',
          keywords: ['influence', 'first camera', 'practicing regularly']
        },
        {
          text: "Now it's become one of my favorite hobbies and a way for me to express my creativity.",
          keywords: ['favorite hobbies', 'express my creativity']
        }
      ]
    },
    {
      id: '2-2',
      question: 'Describe a place you visited that was full of colors.',
      answerCount: 2,
      duration: '3-4分钟',
      answer: [
        {
          text: 'I would like to describe a flower market I visited in Kunming, known as the Spring City of China.',
          keywords: ['flower market', 'Kunming', 'Spring City']
        },
        {
          text: 'The market was absolutely breathtaking with flowers of every color imaginable.',
          keywords: ['breathtaking', 'every color imaginable']
        },
        {
          text: 'There were rows and rows of roses, tulips, orchids, and many other varieties.',
          keywords: ['roses', 'tulips', 'orchids', 'varieties']
        },
        {
          text: 'The vibrant reds, yellows, purples, and pinks created a stunning visual feast.',
          keywords: ['vibrant', 'stunning visual feast']
        },
        {
          text: 'What made it even more special was the pleasant fragrance that filled the air.',
          keywords: ['special', 'pleasant fragrance']
        },
        {
          text: 'It was a truly memorable experience that lifted my spirits and made me appreciate the beauty of nature.',
          keywords: ['memorable experience', 'lifted my spirits', 'beauty of nature']
        }
      ]
    },
    {
      id: '2-3',
      question: 'Describe a time when you helped someone.',
      answerCount: 3,
      duration: '3-4分钟',
      isNew: true,
      answer: [
        {
          text: 'I remember a time when I helped my neighbor, an elderly lady, with her grocery shopping.',
          keywords: ['elderly lady', 'grocery shopping']
        },
        {
          text: 'She had difficulty walking and carrying heavy bags, especially during winter.',
          keywords: ['difficulty walking', 'heavy bags', 'winter']
        },
        {
          text: 'I offered to help her once a week, and she was incredibly grateful for the assistance.',
          keywords: ['offered to help', 'incredibly grateful']
        },
        {
          text: "We would go to the supermarket together, and I'd help her pick out fresh vegetables and fruits.",
          keywords: ['supermarket', 'fresh vegetables and fruits']
        },
        {
          text: 'This simple act of kindness made me realize how much small gestures can mean to others.',
          keywords: ['simple act of kindness', 'small gestures', 'mean to others']
        }
      ]
    }
  ],
  '3': [
    {
      id: '3-1',
      question: 'What are the benefits of looking at the sky?',
      answerCount: 2,
      duration: '2-3分钟',
      answer: [
        {
          text: 'There are several benefits to watching the sky, both physical and mental.',
          keywords: ['several benefits', 'physical', 'mental']
        },
        {
          text: 'Firstly, it can help reduce stress and anxiety by providing a sense of calm and perspective.',
          keywords: ['reduce stress', 'anxiety', 'calm', 'perspective']
        },
        {
          text: 'When people look at the vast sky, they often feel their problems are smaller in comparison.',
          keywords: ['vast sky', 'problems are smaller']
        },
        {
          text: 'Secondly, observing natural phenomena like clouds and stars can increase our appreciation for nature.',
          keywords: ['natural phenomena', 'increase our appreciation', 'nature']
        },
        {
          text: 'This connection with nature has been shown to improve overall wellbeing and mental health.',
          keywords: ['connection with nature', 'improve', 'wellbeing', 'mental health']
        }
      ]
    },
    {
      id: '3-2',
      question: 'How has technology changed the way people learn?',
      answerCount: 2,
      duration: '2-3分钟',
      isNew: true,
      answer: [
        {
          text: 'Technology has revolutionized education in numerous ways over the past few decades.',
          keywords: ['revolutionized', 'education', 'numerous ways']
        },
        {
          text: 'The most obvious change is the accessibility of information through the internet.',
          keywords: ['obvious change', 'accessibility', 'information', 'internet']
        },
        {
          text: 'Students can now access educational resources, videos, and courses from anywhere in the world.',
          keywords: ['access', 'educational resources', 'anywhere in the world']
        },
        {
          text: 'Additionally, online learning platforms have made education more flexible and personalized.',
          keywords: ['online learning platforms', 'flexible', 'personalized']
        },
        {
          text: 'However, this also means students need to develop self-discipline and digital literacy skills.',
          keywords: ['self-discipline', 'digital literacy skills']
        }
      ]
    },
    {
      id: '3-3',
      question: 'Why do some people prefer to help strangers rather than people they know?',
      answerCount: 2,
      duration: '2-3分钟',
      answer: [
        {
          text: 'This is an interesting phenomenon that can be explained by several psychological factors.',
          keywords: ['interesting phenomenon', 'psychological factors']
        },
        {
          text: 'Some people feel less pressure when helping strangers because there are no expectations for a long-term relationship.',
          keywords: ['less pressure', 'no expectations', 'long-term relationship']
        },
        {
          text: 'They can offer assistance without worrying about how it might affect their ongoing relationships.',
          keywords: ['offer assistance', 'affect', 'ongoing relationships']
        },
        {
          text: 'Additionally, helping strangers can provide a sense of satisfaction without the complications of personal dynamics.',
          keywords: ['sense of satisfaction', 'complications', 'personal dynamics']
        },
        {
          text: 'However, I believe the best approach is to help both strangers and people we know when they need support.',
          keywords: ['best approach', 'help both', 'need support']
        }
      ]
    }
  ]
};