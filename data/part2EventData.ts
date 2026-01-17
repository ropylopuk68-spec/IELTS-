// Part 2 事件类题目数据
export interface Part2Topic {
  id: string;
  title: string; // 题目名称
  storyGroup?: string; // 串题故事
  topicType: string; // 题目类型
  examTakers: number; // 近期考试人数
  groupColor: string; // 分组颜色
  question: string; // 完整题目内容（英文）
  questionCN?: string; // 题目中文翻译
  questionPoints?: Array<{ // 题目要点
    en: string;
    cn: string;
  }>;
  answer: Array<{
    text: string; // 英文段落
    translation: string; // 中文翻译
    keywords: string[]; // 关键词
  }>;
  analysis?: string; // 思路解读（HTML格式）
  keywordsMemo?: Array<{
    emoji: string;
    en: string;
    cn: string;
  }>; // 关键词速记
}

export const part2EventTopics: Part2Topic[] = [
  // 🏃 跑马拉松 组（米黄色）
  {
    id: 'no-phone-occasion',
    title: '禁用手机的场合',
    storyGroup: '🏃 跑马拉松',
    topicType: '1-4月新题',
    examTakers: 63,
    groupColor: 'bg-amber-100',
    question: 'Describe an occasion when you were not allowed to use your mobile phone',
    questionCN: '描述一个你不被允许使用手机的场合',
    questionPoints: [
      { en: 'When it was', cn: '它是什么时候' },
      { en: 'Where it was', cn: '它在哪里' },
      { en: 'Why you were not allowed to use your mobile phone', cn: '为什么你不被允许使用你的手机' },
      { en: 'How you felt about it', cn: '你对这件事有什么感觉' }
    ],
    answer: [
      {
        text: 'I\'d like to share an unforgettable experience from last year when I served as a volunteer for an international marathon. Actually, the main reason I signed up was to encourage my father. He had been training very hard for this marathon for the past six months, but right before the race, he told me he was worried about not performing well.He even planned to give up this time and try again next year. I kept telling him that the most important thing was to finish, not just the score. And I told him I would be proud of him just for joining the race itself. To support him, I signed up as a volunteer for the first time so I could be by his side.',
        translation: '我想分享一次去年难忘的经历，当时我担任国际马拉松的志愿者。实际上，我报名的主要原因是为了鼓励我的父亲。在过去的六个月里，他一直在为这次马拉松进行艰苦训练，但就在比赛前，他告诉我他担心表现不佳。他甚至计划这次放弃，明年再试。我一直告诉他最重要的是完成，而不仅仅是分数。我告诉他，仅仅参加比赛我就会为他感到骄傲。为了支持他，我第一次报名成为志愿者，这样我就可以陪在他身边。',
        keywords: ['volunteer for marathon', 'encourage my father', 'training hard', 'worried about performing', 'first time volunteer']
      },
      {
        text: 'Before the race started, all the volunteers received professional training. The staff told us that we were not allowed to use our mobile phones. To be honest, I really wanted to take some photos to record the excitement. However, I clearly understood that as a volunteer, my responsibility was to help the athletes and maintain order. Without my phone, I actually had a more immersive experience of the event.',
        translation: '比赛开始前，所有志愿者都接受了专业培训。工作人员告诉我们不允许使用手机。说实话，我真的很想拍一些照片来记录这种兴奋。然而，我清楚地明白，作为一名志愿者，我的责任是帮助运动员并维持秩序。没有手机，我实际上对活动有了更沉浸的体验。',
        keywords: ['not allowed phones', 'wanted to take photos', 'responsibility help athletes', 'more immersive experience']
      },
      {
        text: 'The most exciting part for me was the moment I witnessed my father crossing the finish line. He broke his limit under my encouragement, and will always be my role model. I told my father how proud I was of him, and he responded that he was also proud of my hard work as a volunteer. He said we were both doing a great job.',
        translation: '对我来说，最激动人心的部分是我见证父亲冲过终点线的那一刻。在我的鼓励下，他打破了自己的极限，永远是我的榜样。我告诉父亲我为他感到多么骄傲，他回应说他也为我作为志愿者的辛勤工作感到骄傲。他说我们都做得很好。',
        keywords: ['crossing finish line', 'broke his limit', 'role model', 'proud of each other']
      },
      {
        text: 'At the finish line, I also saw many other families and friends of the athletes. They were all hugging each other with happy smiles on their faces. Seeing the joy on everyone\'s face, I was deeply moved and felt so much happiness myself. I think this is the true meaning of a marathon: not only breaking your own limits but also building connections with others.',
        translation: '在终点线，我还看到了许多其他运动员的家人和朋友。他们都拥抱在一起，脸上洋溢着快乐的笑容。看到每个人脸上的喜悦，我深受感动，自己也感到非常幸福。我认为这就是马拉松的真正意义：不仅打破自己的极限，还与他人建立联系。',
        keywords: ['families hugging', 'happy smiles', 'deeply moved', 'true meaning marathon']
      }
    ]
  },

  {
    id: 'smiling-occasion',
    title: '微笑的场合',
    storyGroup: '🏃 跑马拉松',
    topicType: '1-4月新题',
    examTakers: 84,
    groupColor: 'bg-amber-100',
    question: 'Describe an occasion when you saw most people smiling',
    questionCN: '描述一个你看到大多数人都在笑的场合',
    questionPoints: [
      { en: 'When it happened', cn: '什么时候发生的' },
      { en: 'Who you were with', cn: '你当时和谁在一起' },
      { en: 'What happened', cn: '发生了什么' },
      { en: 'Why most people were smiling', cn: '为什么大多数人都在笑' }
    ],
    answer: [
      {
        text: 'I\'d like to share an unforgettable experience from last year when I served as a volunteer for an international marathon. Actually, the main reason I signed up was to encourage my father. He had been training very hard for this marathon for the past six months, but right before the race, he told me he was worried about not performing well.He even planned to give up this time and try again next year. I kept telling him that the most important thing was to finish, not just the score. And I told him I would be proud of him just for joining the race itself. To support him, I signed up as a volunteer for the first time so I could be by his side.',
        translation: '我想分享一次去年难忘的经历，当时我担任国际马拉松的志愿者。实际上，我报名的主要原因是为了鼓励我的父亲。在过去的六个月里，他一直在为这次马拉松进行艰苦训练，但就在比赛前，他告诉我他担心表现不佳。他甚至计划这次放弃，明年再试。我一直告诉他最重要的是完成，而不仅仅是分数。我告诉他，仅仅参加比赛我就会为他感到骄傲。为了支持他，我第一次报名成为志愿者，这样我就可以陪在他身边。',
        keywords: ['volunteer for marathon', 'encourage father', 'training hard', 'first time volunteer']
      },
      {
        text: 'Before the race started, all the volunteers received professional training. The staff told us that we were not allowed to use our mobile phones. To be honest, I really wanted to take some photos to record the excitement. However, I clearly understood that as a volunteer, my responsibility was to help the athletes and maintain order. Without my phone, I actually had a more immersive experience of the event.',
        translation: '比赛开始前，所有志愿者都接受了专业培训。工作人员告诉我们不允许使用手机。说实话，我真的很想拍一些照片来记录这种兴奋。然而，我清楚地明白，作为一名志愿者，我的责任是帮助运动员并维持秩序。没有手机，我实际上对活动有了更沉浸的体验。',
        keywords: ['received training', 'not allowed phones', 'immersive experience']
      },
      {
        text: 'The most exciting part for me was the moment I witnessed my father crossing the finish line. He broke his limit under my encouragement, and will always be my role model. I told my father how proud I was of him, and he responded that he was also proud of my hard work as a volunteer. He said we were both doing a great job.',
        translation: '对我来说，最激动人心的部分是我见证父亲冲过终点线的那一刻。在我的鼓励下，他打破了自己的极限，永远是我的榜样。我告诉父亲我为他感到多么骄傲，他回应说他也为我作为志愿者的辛勤工作感到骄傲。他说我们都做得很好。',
        keywords: ['crossing finish line', 'broke limit', 'proud of each other']
      },
      {
        text: 'At the finish line, I also saw many other families and friends of the athletes. They were all hugging each other with happy smiles on their faces. Seeing the joy on everyone\'s face, I was deeply moved and felt so much happiness myself. I think this is the true meaning of a marathon: not only breaking your own limits but also building connections with others.',
        translation: '在终点线，我还看到了许多其他运动员的家人和朋友。他们都拥抱在一起，脸上洋溢着快乐的笑容。看到每个人脸上的喜悦，我深受感动，自己也感到非常幸福。我认为这就是马拉松的真正意义：不仅打破自己的极限，还与他人建立联系。',
        keywords: ['families hugging', 'happy smiles', 'deeply moved', 'true meaning']
      }
    ]
  },

  {
    id: 'proud-of-family',
    title: '为家人骄傲',
    storyGroup: '🏃 跑马拉松',
    topicType: '1-4月新题',
    examTakers: 56,
    groupColor: 'bg-amber-100',
    question: 'Describe a time when you felt proud of a family member',
    questionCN: '描述一次你为家人感到骄傲的经历',
    questionPoints: [
      { en: 'When it happened', cn: '什么时候发生的' },
      { en: 'Who the person is', cn: '这个人是谁' },
      { en: 'What the person did', cn: '这个人做了什么' },
      { en: 'Why you felt proud of him/her', cn: '你为什么为他/她感到骄傲' }
    ],
    answer: [
      {
        text: 'I\'d like to share an unforgettable experience from last year when I served as a volunteer for an international marathon. Actually, the main reason I signed up was to encourage my father. He had been training very hard for this marathon for the past six months, but right before the race, he told me he was worried about not performing well.He even planned to give up this time and try again next year. I kept telling him that the most important thing was to finish, not just the score. And I told him I would be proud of him just for joining the race itself. To support him, I signed up as a volunteer for the first time so I could be by his side.',
        translation: '我想分享一次去年难忘的经历，当时我担任国际马拉松的志愿者。实际上，我报名的主要原因是为了鼓励我的父亲。在过去的六个月里，他一直在为这次马拉松进行艰苦训练，但就在比赛前，他告诉我他担心表现不佳。他甚至计划这次放弃，明年再试。我一直告诉他最重要的是完成，而不仅仅是分数。我告诉他，仅仅参加比赛我就会为他感到骄傲。为了支持他，我第一次报名成为志愿者，这样我就可以陪在他身边。',
        keywords: ['encourage father', 'training hard', 'worried performing', 'proud of him', 'volunteer to support']
      },
      {
        text: 'Before the race started, all the volunteers received professional training. The staff told us that we were not allowed to use our mobile phones. To be honest, I really wanted to take some photos to record the excitement. However, I clearly understood that as a volunteer, my responsibility was to help the athletes and maintain order. Without my phone, I actually had a more immersive experience of the event.',
        translation: '比赛开始前，所有志愿者都接受了专业培训。工作人员告诉我们不允许使用手机。说实话，我真的很想拍一些照片来记录这种兴奋。然而，我清楚地明白，作为一名志愿者，我的责任是帮助运动员并维持秩序。没有手机，我实际上对活动有了更沉浸的体验。',
        keywords: ['professional training', 'help athletes', 'immersive experience']
      },
      {
        text: 'The most exciting part for me was the moment I witnessed my father crossing the finish line. He broke his limit under my encouragement, and will always be my role model. I told my father how proud I was of him, and he responded that he was also proud of my hard work as a volunteer. He said we were both doing a great job.',
        translation: '对我来说，最激动人心的部分是我见证父亲冲过终点线的那一刻。在我的鼓励下，他打破了自己的极限，永远是我的榜样。我告诉父亲我为他感到多么骄傲，他回应说他也为我作为志愿者的辛勤工作感到骄傲。他说我们都做得很好。',
        keywords: ['crossing finish line', 'broke his limit', 'role model', 'proud of each other']
      },
      {
        text: 'At the finish line, I also saw many other families and friends of the athletes. They were all hugging each other with happy smiles on their faces. Seeing the joy on everyone\'s face, I was deeply moved and felt so much happiness myself. I think this is the true meaning of a marathon: not only breaking your own limits but also building connections with others.',
        translation: '在终点线，我还看到了许多其他运动员的家人和朋友。他们都拥抱在一起，脸上洋溢着快乐的笑容。看到每个人脸上的喜悦，我深受感动，自己也感到非常幸福。我认为这就是马拉松的真正意义：不仅打破自己的极限，还与他人建立联系。',
        keywords: ['families hugging', 'deeply moved', 'building connections']
      }
    ]
  },

  {
    id: 'encourage-someone',
    title: '鼓励别人做不愿做的事',
    storyGroup: '🏃 跑马拉松',
    topicType: '1-4月新题',
    examTakers: 91,
    groupColor: 'bg-amber-100',
    question: 'Describe a time when you encouraged someone to do something they didn\'t want to do',
    questionCN: '描述一次你鼓励别人做他们不想做的事的经历',
    questionPoints: [
      { en: 'Who he/she is', cn: '他是谁/她是谁' },
      { en: 'What you encouraged him/her to do', cn: '你鼓励他/她做什么' },
      { en: 'How he/she reacted', cn: '他/她的反应如何' },
      { en: 'Why you encouraged him/her to do it', cn: '你为什么鼓励他/她这样做' }
    ],
    answer: [
      {
        text: 'I\'d like to share an unforgettable experience from last year when I served as a volunteer for an international marathon. Actually, the main reason I signed up was to encourage my father. He had been training very hard for this marathon for the past six months, but right before the race, he told me he was worried about not performing well.He even planned to give up this time and try again next year. I kept telling him that the most important thing was to finish, not just the score. And I told him I would be proud of him just for joining the race itself. To support him, I signed up as a volunteer for the first time so I could be by his side.',
        translation: '我想分享一次去年难忘的经历，当时我担任国际马拉松的志愿者。实际上，我报名的主要原因是为了鼓励我的父亲。在过去的六个月里，他一直在为这次马拉松进行艰苦训练，但就在比赛前，他告诉我他担心表现不佳。他甚至计划这次放弃，明年再试。我一直告诉他最重要的是完成，而不仅仅是分数。我告诉他，仅仅参加比赛我就会为他感到骄傲。为了支持他，我第一次报名成为志愿者，这样我就可以陪在他身边。',
        keywords: ['encourage father', 'training hard', 'planned to give up', 'finish not score', 'volunteer to support']
      },
      {
        text: 'Before the race started, all the volunteers received professional training. The staff told us that we were not allowed to use our mobile phones. To be honest, I really wanted to take some photos to record the excitement. However, I clearly understood that as a volunteer, my responsibility was to help the athletes and maintain order. Without my phone, I actually had a more immersive experience of the event.',
        translation: '比赛开始前，所有志愿者都接受了专业培训。工作人员告诉我们不允许使用手机。说实话，我真的很想拍一些照片来记录这种兴奋。然而，我清楚地明白，作为一名志愿者，我的责任是帮助运动员并维持秩序。没有手机，我实际上对活动有了更沉浸的体验。',
        keywords: ['professional training', 'help athletes', 'immersive experience']
      },
      {
        text: 'The most exciting part for me was the moment I witnessed my father crossing the finish line. He broke his limit under my encouragement, and will always be my role model. I told my father how proud I was of him, and he responded that he was also proud of my hard work as a volunteer. He said we were both doing a great job.',
        translation: '对我来说，最激动人心的部分是我见证父亲冲过终点线的那一刻。在我的鼓励下，他打破了自己的极限，永远是我的榜样。我告诉父亲我为他感到多么骄傲，他回应说他也为我作为志愿者的辛勤工作感到骄傲。他说我们都做得很好。',
        keywords: ['crossing finish line', 'broke limit', 'under my encouragement', 'proud of each other']
      },
      {
        text: 'At the finish line, I also saw many other families and friends of the athletes. They were all hugging each other with happy smiles on their faces. Seeing the joy on everyone\'s face, I was deeply moved and felt so much happiness myself. I think this is the true meaning of a marathon: not only breaking your own limits but also building connections with others.',
        translation: '在终点线，我还看到了许多其他运动员的家人和朋友。他们都拥抱在一起，脸上洋溢着快乐的笑容。看到每个人脸上的喜悦，我深受感动，自己也感到非常幸福。我认为这就是马拉松的真正意义：不仅打破自己的极限，还与他人建立联系。',
        keywords: ['happy smiles', 'deeply moved', 'building connections']
      }
    ]
  },

  {
    id: 'first-foreign-language',
    title: '第一次用外语',
    storyGroup: '🏃 跑马拉松',
    topicType: '1-4月保留题',
    examTakers: 42,
    groupColor: 'bg-amber-100',
    question: 'Describe a time when you used a foreign language for the first time',
    questionCN: '描述一次你第一次使用外语的经历',
    questionPoints: [
      { en: 'Where you were', cn: '你在哪里' },
      { en: 'Who you were with', cn: '你和谁在一起' },
      { en: 'What you talked about', cn: '你们谈论了什么' },
      { en: 'How you felt about it', cn: '你对这件事的感受如何' }
    ],
    answer: [
      {
        text: 'I\'d like to share an unforgettable experience from last year when I served as a volunteer for an international marathon. Actually, the main reason I signed up was to encourage my father. He had been training very hard for this marathon for the past six months, but right before the race, he told me he was worried about not performing well.He even planned to give up this time and try again next year. I kept telling him that the most important thing was to finish, not just the score. And I told him I would be proud of him just for joining the race itself. To support him, I signed up as a volunteer for the first time so I could be by his side.',
        translation: '我想分享一次去年难忘的经历，当时我担任国际马拉松的志愿者。实际上，我报名的主要原因是为了鼓励我的父亲。在过去的六个月里，他一直在为这次马拉松进行艰苦训练，但就在比赛前，他告诉我他担心表现不佳。他甚至计划这次放弃，明年再试。我一直告诉他最重要的是完成，而不仅仅是分数。我告诉他，仅仅参加比赛我就会为他感到骄傲。为了支持他，我第一次报名成为志愿者，这样我就可以陪在他身边。',
        keywords: ['volunteer for marathon', 'encourage father', 'first time volunteer']
      },
      {
        text: 'To my surprise, this volunteer work turned out to be my first chance to use a foreign language. Just before the race started, a foreign runner came up to me looking very anxious. He was almost late and was rushing to find the place to leave his bags. This was my very first time using English in such a high-pressure situation. I tried my best to explain the directions clearly. At that moment, I felt a great sense of achievement because I realized that my English could actually help people in the real world.',
        translation: '令我惊讶的是，这次志愿者工作成为我第一次使用外语的机会。就在比赛开始前，一位外国跑步者走到我面前，看起来非常焦虑。他几乎迟到了，正急着找地方寄存行李。这是我第一次在如此高压的情况下使用英语。我尽力清楚地解释方向。那一刻，我感到非常有成就感，因为我意识到我的英语实际上可以在现实世界中帮助人们。',
        keywords: ['first chance foreign language', 'foreign runner anxious', 'high-pressure situation', 'sense of achievement']
      },
      {
        text: 'The most exciting part for me was the moment I witnessed my father crossing the finish line. He broke his limit under my encouragement, and will always be my role model. I told my father how proud I was of him, and he responded that he was also proud of my hard work as a volunteer. He said we were both doing a great job.',
        translation: '对我来说，最激动人心的部分是我见证父亲冲过终点线的那一刻。在我的鼓励下，他打破了自己的极限，永远是我的榜样。我告诉父亲我为他感到多么骄傲，他回应说他也为我作为志愿者的辛勤工作感到骄傲。他说我们都做得很好。',
        keywords: ['crossing finish line', 'broke limit', 'proud of each other']
      },
      {
        text: 'At the finish line, I also saw many other families and friends of the athletes. They were all hugging each other with happy smiles on their faces. Seeing the joy on everyone\'s face, I was deeply moved and felt so much happiness myself. I think this is the true meaning of a marathon: not only breaking your own limits but also building connections with others.',
        translation: '在终点线，我还看到了许多其他运动员的家人和朋友。他们都拥抱在一起，脸上洋溢着快乐的笑容。看到每个人脸上的喜悦，我深受感动，自己也感到非常幸福。我认为这就是马拉松的真正意义：不仅打破自己的极限，还与他人建立联系。',
        keywords: ['happy smiles', 'deeply moved', 'building connections']
      }
    ]
  },

  // 🎬 电影 组（紫色）
  {
    id: 'disappointing-movie',
    title: '让你失望的电影',
    storyGroup: '🎬 电影',
    topicType: '非大陆地区1-4月新题',
    examTakers: 35,
    groupColor: 'bg-purple-100',
    question: 'Describe a movie that disappointed you',
    questionCN: '描述一部让你失望的电影',
    questionPoints: [
      { en: 'When it was', cn: '什么时候看的' },
      { en: 'Why you didn\'t like it', cn: '你为什么不喜欢它' },
      { en: 'Why you decided to watch it', cn: '你为什么决定看它' },
      { en: 'Why you felt disappointed about it', cn: '你对它感到失望的原因' }
    ],
    answer: [
      {
        text: 'Recently, I spent about 50 RMB on a movie ticket for Zootopia 2. Although the price wasn\'t high, I still felt I spent more than expected because the movie was quite disappointing. I decided to watch it because the first one was a classic and I\'ve always trusted Disney\'s quality. However, after watching it, I personally felt it wasn\'t a satisfying work in many ways, even though there are many positive reviews online. Most people think it\'s fun and interesting, but it just didn\'t work for me.',
        translation: '最近，我花了大约50元人民币买了一张《疯狂动物城2》的电影票。虽然价格不高，但我仍然觉得我花的钱比预期的多，因为这部电影相当令人失望。我决定看它是因为第一部是经典之作，我一直信任迪士尼的质量。然而，看完之后，我个人觉得它在很多方面都不是一部令人满意的作品，尽管网上有很多正面评价。大多数人认为它有趣又好玩，但它对我来说就是不行。',
        keywords: ['50 RMB', 'Zootopia 2', 'quite disappointing', 'first one classic', 'didn\'t work for me']
      },
      {
        text: 'As for the plot, I felt the pacing was a bit strange. Some parts felt too fast, while other parts were just wasting time on unnecessary scenes. In the first movie, the detective work and the investigation were tight, logical, and engaging from start to finish. But in this one, the core narrative was a mess. There were too many coincidences, and the characters didn\'t even need to think to solve the case. It was too easy to guess the ending, so I didn\'t feel any surprise or excitement at all.',
        translation: '至于情节，我觉得节奏有点奇怪。有些部分感觉太快，而其他部分只是在不必要的场景上浪费时间。在第一部电影中，侦探工作和调查从头到尾都很紧凑、有逻辑、引人入胜。但在这部中，核心叙事一团糟。巧合太多，角色甚至不需要思考就能破案。结局太容易猜到了，所以我根本没有感到任何惊喜或兴奋。',
        keywords: ['pacing strange', 'wasting time', 'narrative mess', 'too many coincidences', 'no surprise']
      },
      {
        text: 'Regarding the characters, the character development was not consistent. In the first movie, the main characters were smart and careful, but here they became a bit reckless and made many careless mistakes. The characters felt flat and lacked the charm of the original. Even the bad guy was a bit weak and had a boring motive that didn\'t make much sense. Apart from that, many characters gave me the feeling that they were just tools for the story, rather than real characters with their own styles.',
        translation: '关于角色，角色发展不一致。在第一部电影中，主要角色聪明谨慎，但在这里他们变得有点鲁莽，犯了许多粗心的错误。角色感觉平淡，缺乏原作的魅力。即使是坏人也有点弱，动机无聊，没有什么意义。除此之外，许多角色给我的感觉是，它们只是故事的工具，而不是有自己风格的真实角色。',
        keywords: ['character development inconsistent', 'became reckless', 'felt flat', 'bad guy weak', 'just tools']
      },
      {
        text: 'Although 50 yuan is not a large amount of money, given my high expectations, 50 yuan still didn\'t feel worth it. I really hope to see more amazing animations with better stories in the future.',
        translation: '虽然50元不是一大笔钱，但考虑到我的高期望，50元仍然感觉不值得。我真的希望将来看到更多具有更好故事的精彩动画。',
        keywords: ['not worth it', 'high expectations', 'hope better stories']
      }
    ]
  },

  {
    id: 'recent-movie',
    title: '近期观影',
    storyGroup: '🎬 电影',
    topicType: '1-4月新题',
    examTakers: 77,
    groupColor: 'bg-purple-100',
    question: 'Describe a movie you watched recently',
    questionCN: '描述一部你最近看的电影',
    questionPoints: [
      { en: 'When and where you watched it', cn: '你是什么时候在哪里看的' },
      { en: 'Who you watched it with', cn: '你和谁一起看的' },
      { en: 'What it was about', cn: '它是什么内容' },
      { en: 'Why you watched this movie', cn: '你为什么看这部电影' }
    ],
    answer: [
      {
        text: 'Recently, I spent about 50 RMB on a movie ticket for Zootopia 2. Although the price wasn\'t high, I still felt I spent more than expected because the movie was quite disappointing. I decided to watch it because the first one was a classic and I\'ve always trusted Disney\'s quality. However, after watching it, I personally felt it wasn\'t a satisfying work in many ways, even though there are many positive reviews online. Most people think it\'s fun and interesting, but it just didn\'t work for me.',
        translation: '最近，我花了大约50元人民币买了一张《疯狂动物城2》的电影票。虽然价格不高，但我仍然觉得我花的钱比预期的多，因为这部电影相当令人失望。我决定看它是因为第一部是经典之作，我一直信任迪士尼的质量。然而，看完之后，我个人觉得它在很多方面都不是一部令人满意的作品，尽管网上有很多正面评价。大多数人认为它有趣又好玩，但它对我来说就是不行。',
        keywords: ['Zootopia 2', 'quite disappointing', 'first one classic', 'didn\'t work for me']
      },
      {
        text: 'As for the plot, I felt the pacing was a bit strange. Some parts felt too fast, while other parts were just wasting time on unnecessary scenes. In the first movie, the detective work and the investigation were tight, logical, and engaging from start to finish. But in this one, the core narrative was a mess. There were too many coincidences, and the characters didn\'t even need to think to solve the case. It was too easy to guess the ending, so I didn\'t feel any surprise or excitement at all.',
        translation: '至于情节，我觉得节奏有点奇怪。有些部分感觉太快，而其他部分只是在不必要的场景上浪费时间。在第一部电影中，侦探工作和调查从头到尾都很紧凑、有逻辑、引人入胜。但在这部中，核心叙事一团糟。巧合太多，角色甚至不需要思考就能破案。结局太容易猜到了，所以我根本没有感到任何惊喜或兴奋。',
        keywords: ['pacing strange', 'narrative mess', 'too many coincidences', 'no surprise']
      },
      {
        text: 'Regarding the characters, the character development was not consistent. In the first movie, the main characters were smart and careful, but here they became a bit reckless and made many careless mistakes. The characters felt flat and lacked the charm of the original. Even the bad guy was a bit weak and had a boring motive that didn\'t make much sense. Apart from that, many characters gave me the feeling that they were just tools for the story, rather than real characters with their own styles.',
        translation: '关于角色，角色发展不一致。在第一部电影中，主要角色聪明谨慎，但在这里他们变得有点鲁莽，犯了许多粗心的错误。角色感觉平淡，缺乏原作的魅力。即使是坏人也有点弱，动机无聊，没有什么意义。除此之外，许多角色给我的感觉是，它们只是故事的工具，而不是有自己风格的真实角色。',
        keywords: ['character development inconsistent', 'felt flat', 'bad guy weak', 'just tools']
      },
      {
        text: 'Although 50 yuan is not a large amount of money, given my high expectations, 50 yuan still didn\'t feel worth it. I really hope to see more amazing animations with better stories in the future.',
        translation: '虽然50元不是一大笔钱，但考虑到我的高期望，50元仍然感觉不值得。我真的希望将来看到更多具有更好故事的精彩动画。',
        keywords: ['not worth it', 'high expectations', 'hope better stories']
      }
    ]
  },

  {
    id: 'spent-more-than-expected',
    title: '花费超过预期的物品',
    storyGroup: '🎬 电影',
    topicType: '1-4月新题',
    examTakers: 126,
    groupColor: 'bg-purple-100',
    question: 'Describe something you bought that cost more than expected',
    questionCN: '描述一件你买的花费超过预期的物品',
    questionPoints: [
      { en: 'What it is', cn: '它是什么' },
      { en: 'How much you spent on it', cn: '你在这上面花了多少钱' },
      { en: 'Why you bought it', cn: '你为什么买它' },
      { en: 'Why you think you spent more than expected', cn: '你为什么认为你花的钱比预期的多' }
    ],
    answer: [
      {
        text: 'Recently, I spent about 50 RMB on a movie ticket for Zootopia 2. Although the price wasn\'t high, I still felt I spent more than expected because the movie was quite disappointing. I decided to watch it because the first one was a classic and I\'ve always trusted Disney\'s quality. However, after watching it, I personally felt it wasn\'t a satisfying work in many ways, even though there are many positive reviews online. Most people think it\'s fun and interesting, but it just didn\'t work for me.',
        translation: '最近，我花了大约50元人民币买了一张《疯狂动物城2》的电影票。虽然价格不高，但我仍然觉得我花的钱比预期的多，因为这部电影相当令人失望。我决定看它是因为第一部是经典之作，我一直信任迪士尼的质量。然而，看完之后，我个人觉得它在很多方面都不是一部令人满意的作品，尽管网上有很多正面评价。大多数人认为它有趣又好玩，但它对我来说就是不行。',
        keywords: ['50 RMB movie ticket', 'Zootopia 2', 'more than expected', 'quite disappointing', 'first one classic']
      },
      {
        text: 'As for the plot, I felt the pacing was a bit strange. Some parts felt too fast, while other parts were just wasting time on unnecessary scenes. In the first movie, the detective work and the investigation were tight, logical, and engaging from start to finish. But in this one, the core narrative was a mess. There were too many coincidences, and the characters didn\'t even need to think to solve the case. It was too easy to guess the ending, so I didn\'t feel any surprise or excitement at all.',
        translation: '至于情节，我觉得节奏有点奇怪。有些部分感觉太快，而其他部分只是在不必要的场景上浪费时间。在第一部电影中，侦探工作和调查从头到尾都很紧凑、有逻辑、引人入胜。但在这部中，核心叙事一团糟。巧合太多，角色甚至不需要思考就能破案。结局太容易猜到了，所以我根本没有感到任何惊喜或兴奋。',
        keywords: ['pacing strange', 'narrative mess', 'too easy to guess', 'no surprise']
      },
      {
        text: 'Regarding the characters, the character development was not consistent. In the first movie, the main characters were smart and careful, but here they became a bit reckless and made many careless mistakes. The characters felt flat and lacked the charm of the original. Even the bad guy was a bit weak and had a boring motive that didn\'t make much sense. Apart from that, many characters gave me the feeling that they were just tools for the story, rather than real characters with their own styles.',
        translation: '关于角色，角色发展不一致。在第一部电影中，主要角色聪明谨慎，但在这里他们变得有点鲁莽，犯了许多粗心的错误。角色感觉平淡，缺乏原作的魅力。即使是坏人也有点弱，动机无聊，没有什么意义。除此之外，许多角色给我的感觉是，它们只是故事的工具，而不是有自己风格的真实角色。',
        keywords: ['character development inconsistent', 'felt flat', 'lacked charm', 'just tools']
      },
      {
        text: 'Although 50 yuan is not a large amount of money, given my high expectations, 50 yuan still didn\'t feel worth it. I really hope to see more amazing animations with better stories in the future.',
        translation: '虽然50元不是一大笔钱，但考虑到我的高期望，50元仍然感觉不值得。我真的希望将来看到更多具有更好故事的精彩动画。',
        keywords: ['not worth it', 'high expectations', 'hope better stories']
      }
    ]
  },

  // 🤖 AI工具 组（蓝色）
  {
    id: 'app-program',
    title: 'App/程序',
    storyGroup: '🤖 AI工具',
    topicType: '1-4月新题',
    examTakers: 98,
    groupColor: 'bg-blue-100',
    question: 'Describe an app or program you often use',
    questionCN: '描述一个你经常使用的应用程序',
    questionPoints: [
      { en: 'What it is', cn: '它是什么' },
      { en: 'How often you see it', cn: '你多久看到一次' },
      { en: 'When/how you use it', cn: '你何时/如何使用它' },
      { en: 'When/how you found it', cn: '你何时/如何发现它' },
      { en: 'How you felt about it', cn: '你对它的感受' }
    ],
    answer: [
      {
        text: 'The app I\'d like to talk about is Nanobanana, which is a powerful AI tool for creators. Recently, I\'ve been coming across a lot of really funny videos on Xiaohongshu, which is a popular social media platform in China. Basically, these videos are about historical figures. Many creators use an App called Nanobanana to make these ancient people "come alive" in modern cities. For example, one video was about Picasso taking an art exam. In the video, Picasso was painting in his own style, but the teacher next to him criticized his work for being "wrong". Seeing a genius being told they are "unprofessional" is so funny. It really shows the conflict between creativity and boring rules.',
        translation: '我想谈论的应用程序是Nanobanana，这是一个强大的AI创作工具。最近，我在小红书上看到很多非常有趣的视频，小红书是中国一个流行的社交媒体平台。基本上，这些视频都是关于历史人物的。许多创作者使用一个名为Nanobanana的应用程序让这些古代人物在现代城市中"活过来"。例如，一个视频是关于毕加索参加艺术考试的。在视频中，毕加索以自己的风格作画，但他旁边的老师批评他的作品"错误"。看到天才被告知他们"不专业"非常有趣。它真正展示了创造力与无聊规则之间的冲突。',
        keywords: ['Nanobanana', 'AI tool', 'Xiaohongshu', 'historical figures', 'Picasso video', 'creativity vs rules']
      },
      {
        text: 'Inspired by these videos, I used Nanobanana for the first time to make my own short film. It was really an exciting attempt. First, I spent some time brainstorming the story and designing the main characters to make the plot interesting. Then comes the App part. I expected the App to turn my words into real scenes in just seconds; however, getting the perfect result wasn\'t that easy. I had to adjust the prompts over and over again to get every detail right, but eventually, all the hard work paid off the moment I saw the final version.',
        translation: '受到这些视频的启发，我第一次使用Nanobanana制作了自己的短片。这真是一次令人兴奋的尝试。首先，我花了一些时间构思故事并设计主要角色以使情节有趣。然后是应用程序部分。我期待应用程序在几秒钟内将我的文字转化为真实场景；然而，获得完美的结果并不那么容易。我不得不一遍又一遍地调整提示以使每个细节都正确，但最终，当我看到最终版本时，所有的辛勤工作都得到了回报。',
        keywords: ['first time used', 'exciting attempt', 'brainstorming story', 'adjust prompts', 'hard work paid off']
      },
      {
        text: 'Since then, Nanobanana has become something I can\'t live without. I use it almost every day for generating pictures and even creating PPTs for my studies. To be honest, it has totally changed the way I work. Whenever I get stuck or run out of ideas, I just open the App to find some inspiration. Although some people worry about AI, I still believe the advantages are more than the disadvantages. It is truly the bridge between my dreams and reality.',
        translation: '从那时起，Nanobanana已成为我离不开的东西。我几乎每天都使用它来生成图片，甚至为我的学习创建PPT。说实话，它完全改变了我的工作方式。每当我卡住或想法用尽时，我只需打开应用程序寻找一些灵感。尽管有些人担心人工智能，但我仍然相信优点多于缺点。它真正是我梦想与现实之间的桥梁。',
        keywords: ['can\'t live without', 'use almost every day', 'changed way I work', 'find inspiration', 'bridge dreams and reality']
      }
    ]
  },

  {
    id: 'cant-live-without',
    title: '生活中离不开的东西',
    storyGroup: '🤖 AI工具',
    topicType: '非大陆地区1-4月新题',
    examTakers: 49,
    groupColor: 'bg-blue-100',
    question: 'Describe something you can\'t live without in your daily life',
    questionCN: '描述你日常生活中离不开的东西',
    questionPoints: [
      { en: 'What it is', cn: '它是什么' },
      { en: 'What you do with it', cn: '你如何使用它' },
      { en: 'How it helps you in your life', cn: '它如何在生活中帮助你' },
      { en: 'Why you can\'t live without it', cn: '为什么你离不开它' }
    ],
    answer: [
      {
        text: 'Something I can\'t live without in my daily life is an AI application called Nanobanana. Recently, I\'ve been coming across a lot of really funny videos on Xiaohongshu, which is a popular social media platform in China. Basically, these videos are about historical figures. Many creators use an App called Nanobanana to make these ancient people "come alive" in modern cities. For example, one video was about Picasso taking an art exam. In the video, Picasso was painting in his own style, but the teacher next to him criticized his work for being "wrong". Seeing a genius being told they are "unprofessional" is so funny. It really shows the conflict between creativity and boring rules.',
        translation: '我日常生活中离不开的东西是一个名为Nanobanana的AI应用程序。最近，我在小红书上看到很多非常有趣的视频，小红书是中国一个流行的社交媒体平台。基本上，这些视频都是关于历史人物的。许多创作者使用一个名为Nanobanana的应用程序让这些古代人物在现代城市中"活过来"。例如，一个视频是关于毕加索参加艺术考试的。在视频中，毕加索以自己的风格作画，但他旁边的老师批评他的作品"错误"。看到天才被告知他们"不专业"非常有趣。它真正展示了创造力与无聊规则之间的冲突。',
        keywords: ['can\'t live without', 'Nanobanana', 'Xiaohongshu', 'historical figures', 'creativity vs rules']
      },
      {
        text: 'Inspired by these videos, I used Nanobanana for the first time to make my own short film. It was really an exciting attempt. First, I spent some time brainstorming the story and designing the main characters to make the plot interesting. Then comes the App part. I expected the App to turn my words into real scenes in just seconds; however, getting the perfect result wasn\'t that easy. I had to adjust the prompts over and over again to get every detail right, but eventually, all the hard work paid off the moment I saw the final version.',
        translation: '受到这些视频的启发，我第一次使用Nanobanana制作了自己的短片。这真是一次令人兴奋的尝试。首先，我花了一些时间构思故事并设计主要角色以使情节有趣。然后是应用程序部分。我期待应用程序在几秒钟内将我的文字转化为真实场景；然而，获得完美的结果并不那么容易。我不得不一遍又一遍地调整提示以使每个细节都正确，但最终，当我看到最终版本时，所有的辛勤工作都得到了回报。',
        keywords: ['exciting attempt', 'brainstorming', 'adjust prompts', 'hard work paid off']
      },
      {
        text: 'Since then, Nanobanana has become something I can\'t live without. I use it almost every day for generating pictures and even creating PPTs for my studies. To be honest, it has totally changed the way I work. Whenever I get stuck or run out of ideas, I just open the App to find some inspiration. Although some people worry about AI, I still believe the advantages are more than the disadvantages. It is truly the bridge between my dreams and reality.',
        translation: '从那时起，Nanobanana已成为我离不开的东西。我几乎每天都使用它来生成图片，甚至为我的学习创建PPT。说实话，它完全改变了我的工作方式。每当我卡住或想法用尽时，我只需打开应用程序寻找一些灵感。尽管有些人担心人工智能，但我仍然相信优点多于缺点。它真正是我梦想与现实之间的桥梁。',
        keywords: ['use almost every day', 'changed way I work', 'find inspiration', 'bridge dreams and reality']
      }
    ]
  },

  {
    id: 'first-exciting-activity',
    title: '第一次尝试的兴奋活动',
    storyGroup: '🤖 AI工具',
    topicType: '1-4月保留题',
    examTakers: 56,
    groupColor: 'bg-blue-100',
    question: 'Describe an exciting activity you tried for the first time',
    questionCN: '描述一次你第一次尝试的令人兴奋的活动',
    questionPoints: [
      { en: 'What it is', cn: '它是什么' },
      { en: 'When/Where you did it', cn: '你在什么时候/哪里做的' },
      { en: 'Why you thought it was exciting', cn: '你为什么认为它很刺激' },
      { en: 'How you felt about it', cn: '你对它的感受如何' }
    ],
    answer: [
      {
        text: 'The exciting activity I tried for the first time was using an AI tool to make my own short film. Recently, I\'ve been coming across a lot of really funny videos on Xiaohongshu, which is a popular social media platform in China. Basically, these videos are about historical figures. Many creators use an App called Nanobanana to make these ancient people "come alive" in modern cities. For example, one video was about Picasso taking an art exam. In the video, Picasso was painting in his own style, but the teacher next to him criticized his work for being "wrong". Seeing a genius being told they are "unprofessional" is so funny. It really shows the conflict between creativity and boring rules.',
        translation: '我第一次尝试的令人兴奋的活动是使用AI工具制作自己的短片。最近，我在小红书上看到很多非常有趣的视频，小红书是中国一个流行的社交媒体平台。基本上，这些视频都是关于历史人物的。许多创作者使用一个名为Nanobanana的应用程序让这些古代人物在现代城市中"活过来"。例如，一个视频是关于毕加索参加艺术考试的。在视频中，毕加索以自己的风格作画，但他旁边的老师批评他的作品"错误"。看到天才被告知他们"不专业"非常有趣。它真正展示了创造力与无聊规则之间的冲突。',
        keywords: ['AI tool short film', 'Xiaohongshu', 'Nanobanana', 'historical figures', 'creativity vs rules']
      },
      {
        text: 'Inspired by these videos, I used Nanobanana for the first time to make my own short film. It was really an exciting attempt. First, I spent some time brainstorming the story and designing the main characters to make the plot interesting. Then comes the App part. I expected the App to turn my words into real scenes in just seconds; however, getting the perfect result wasn\'t that easy. I had to adjust the prompts over and over again to get every detail right, but eventually, all the hard work paid off the moment I saw the final version.',
        translation: '受到这些视频的启发，我第一次使用Nanobanana制作了自己的短片。这真是一次令人兴奋的尝试。首先，我花了一些时间构思故事并设计主要角色以使情节有趣。然后是应用程序部分。我期待应用程序在几秒钟内将我的文字转化为真实场景；然而，获得完美的结果并不那么容易。我不得不一遍又一遍地调整提示以使每个细节都正确，但最终，当我看到最终版本时，所有的辛勤工作都得到了回报。',
        keywords: ['first time', 'exciting attempt', 'brainstorming story', 'adjust prompts', 'hard work paid off']
      },
      {
        text: 'Since then, Nanobanana has become something I can\'t live without. I use it almost every day for generating pictures and even creating PPTs for my studies. To be honest, it has totally changed the way I work. Whenever I get stuck or run out of ideas, I just open the App to find some inspiration. Although some people worry about AI, I still believe the advantages are more than the disadvantages. It is truly the bridge between my dreams and reality.',
        translation: '从那时起，Nanobanana已成为我离不开的东西。我几乎每天都使用它来生成图片，甚至为我的学习创建PPT。说实话，它完全改变了我的工作方式。每当我卡住或想法用尽时，我只需打开应用程序寻找一些灵感。尽管有些人担心人工智能，但我仍然相信优点多于缺点。它真正是我梦想与现实之间的桥梁。',
        keywords: ['can\'t live without', 'changed way I work', 'find inspiration', 'bridge dreams and reality']
      }
    ]
  },

  {
    id: 'social-media-interesting',
    title: '社交媒体趣事',
    storyGroup: '🤖 AI工具',
    topicType: '1-4月保留题',
    examTakers: 70,
    groupColor: 'bg-blue-100',
    question: 'Describe something interesting you saw on social media',
    questionCN: '描述你在社交媒体上看到的有趣的事情',
    questionPoints: [
      { en: 'When it was', cn: '什么时候' },
      { en: 'Where you saw it', cn: '哪里看到的' },
      { en: 'What you saw', cn: '看到了什么' },
      { en: 'Why you think it was interesting', cn: '为什么你觉得它有趣' }
    ],
    answer: [
      {
        text: 'Recently, I\'ve been coming across a lot of really funny videos on Xiaohongshu, which is a popular social media platform in China. Basically, these videos are about historical figures. Many creators use an App called Nanobanana to make these ancient people "come alive" in modern cities. For example, one video was about Picasso taking an art exam. In the video, Picasso was painting in his own style, but the teacher next to him criticized his work for being "wrong". Seeing a genius being told they are "unprofessional" is so funny. It really shows the conflict between creativity and boring rules.',
        translation: '最近，我在小红书上看到很多非常有趣的视频，小红书是中国一个流行的社交媒体平台。基本上，这些视频都是关于历史人物的。许多创作者使用一个名为Nanobanana的应用程序让这些古代人物在现代城市中"活过来"。例如，一个视频是关于毕加索参加艺术考试的。在视频中，毕加索以自己的风格作画，但他旁边的老师批评他的作品"错误"。看到天才被告知他们"不专业"非常有趣。它真正展示了创造力与无聊规则之间的冲突。',
        keywords: ['Xiaohongshu', 'funny videos', 'historical figures', 'Nanobanana', 'Picasso video', 'creativity vs rules']
      },
      {
        text: 'Inspired by these videos, I used Nanobanana for the first time to make my own short film. It was really an exciting attempt. First, I spent some time brainstorming the story and designing the main characters to make the plot interesting. Then comes the App part. I expected the App to turn my words into real scenes in just seconds; however, getting the perfect result wasn\'t that easy. I had to adjust the prompts over and over again to get every detail right, but eventually, all the hard work paid off the moment I saw the final version.',
        translation: '受到这些视频的启发，我第一次使用Nanobanana制作了自己的短片。这真是一次令人兴奋的尝试。首先，我花了一些时间构思故事并设计主要角色以使情节有趣。然后是应用程序部分。我期待应用程序在几秒钟内将我的文字转化为真实场景；然而，获得完美的结果并不那么容易。我不得不一遍又一遍地调整提示以使每个细节都正确，但最终，当我看到最终版本时，所有的辛勤工作都得到了回报。',
        keywords: ['inspired', 'exciting attempt', 'brainstorming', 'adjust prompts', 'hard work paid off']
      },
      {
        text: 'Since then, Nanobanana has become something I can\'t live without. I use it almost every day for generating pictures and even creating PPTs for my studies. To be honest, it has totally changed the way I work. Whenever I get stuck or run out of ideas, I just open the App to find some inspiration. Although some people worry about AI, I still believe the advantages are more than the disadvantages. It is truly the bridge between my dreams and reality.',
        translation: '从那时起，Nanobanana已成为我离不开的东西。我几乎每天都使用它来生成图片，甚至为我的学习创建PPT。说实话，它完全改变了我的工作方式。每当我卡住或想法用尽时，我只需打开应用程序寻找一些灵感。尽管有些人担心人工智能，但我仍然相信优点多于缺点。它真正是我梦想与现实之间的桥梁。',
        keywords: ['can\'t live without', 'changed way I work', 'find inspiration', 'bridge dreams and reality']
      }
    ]
  },

  // 🎨 画画 组（粉色）
  {
    id: 'use-imagination',
    title: '发挥想象力',
    storyGroup: '🎨 画画',
    topicType: '1-4月新题',
    examTakers: 105,
    groupColor: 'bg-pink-100',
    question: 'Describe a time when you had to use your imagination',
    questionCN: '描述一次你需要发挥想象力的经历',
    questionPoints: [
      { en: 'When it was', cn: '什么时候' },
      { en: 'Why you needed to use imagination', cn: '为什么你需要使用想象力' },
      { en: 'How difficult or easy it was', cn: '它是多么困难或容易' },
      { en: 'How you felt about it', cn: '你对它的感觉如何' }
    ],
    answer: [
      {
        text: 'I\'d like to talk about a time I used my imagination through drawing. Since I was little, drawing has been a big part of my daily life. I used to take a notebook and a pen everywhere to record anything I saw. However, back then, I didn\'t have any professional training. I only knew how to use simple lines to draw basic outlines.',
        translation: '我想谈谈我通过绘画发挥想象力的一次经历。从小，绘画就是我日常生活的重要组成部分。我过去常常带着笔记本和笔到处记录我看到的任何东西。然而，那时我没有接受任何专业培训。我只知道如何使用简单的线条画基本轮廓。',
        keywords: ['imagination through drawing', 'since little', 'notebook and pen', 'no professional training', 'simple lines']
      },
      {
        text: 'Later, I received professional art training in school. Learning techniques like light and shadow was a real turning point for me. At the same time, I studied works of different masters, which helped me find a clearer direction. I found that for me, fiction was much more attractive than just realism. So, I started to use my imagination more to create my own works.',
        translation: '后来，我在学校接受了专业的艺术培训。学习光影等技术对我来说是一个真正的转折点。与此同时，我研究了不同大师的作品，这帮助我找到了更清晰的方向。我发现对我来说，虚构比单纯的现实主义更有吸引力。所以，我开始更多地使用我的想象力来创作自己的作品。',
        keywords: ['professional training', 'light and shadow', 'turning point', 'fiction more attractive', 'use imagination']
      },
      {
        text: 'The process of using imagination is very interesting. I have a habit of collecting many different elements in my sketchbook, which is like my creative treasure box. Before I start drawing, I will pick out different elements from this sketchbook and combine them to form my paintings. This way, I can create something unique that doesn\'t exist in the real world.',
        translation: '使用想象力的过程非常有趣。我有一个习惯，在我的速写本中收集许多不同的元素，这就像我的创意宝箱。在我开始画画之前，我会从这个速写本中挑选出不同的元素并将它们组合起来形成我的画作。这样，我可以创造出在现实世界中不存在的独特东西。',
        keywords: ['process interesting', 'collecting elements', 'creative treasure box', 'combine elements', 'create something unique']
      },
      {
        text: 'Although I have practiced a lot, I clearly know that if I only rely on my talent without working hard, I will stay where I am forever. In the future, I want to further improve my imagination and the ability to express complex emotions. I want my work to tell a powerful story rather than just being a combination of different elements.',
        translation: '虽然我已经练习了很多，但我清楚地知道，如果我只依赖我的天赋而不努力工作，我将永远停留在原地。将来，我想进一步提高我的想象力和表达复杂情感的能力。我希望我的作品能讲述一个有力的故事，而不仅仅是不同元素的组合。',
        keywords: ['practiced a lot', 'rely on talent', 'improve imagination', 'express complex emotions', 'tell powerful story']
      }
    ]
  },

  {
    id: 'child-loves-drawing',
    title: '喜欢画画的孩子',
    storyGroup: '🎨 画画',
    topicType: '1-4月新题',
    examTakers: 63,
    groupColor: 'bg-pink-100',
    question: 'Describe a child who loves drawing or painting',
    questionCN: '描述一个喜欢画画的孩子',
    questionPoints: [
      { en: 'Who he/she is', cn: '他是谁' },
      { en: 'How/when you know him/her', cn: '你什么时候知道他/她' },
      { en: 'How often he/she draws/paints', cn: '他/她多久画一次' },
      { en: 'Why you think he/she loves drawing/painting', cn: '你为什么认为他/她喜欢画画' }
    ],
    answer: [
      {
        text: 'Actually, the child who loves drawing is me. Since I was little, drawing has been a big part of my daily life. I used to take a notebook and a pen everywhere to record anything I saw. However, back then, I didn\'t have any professional training. I only knew how to use simple lines to draw basic outlines.',
        translation: '实际上，喜欢画画的孩子就是我。从小，绘画就是我日常生活的重要组成部分。我过去常常带着笔记本和笔到处记录我看到的任何东西。然而，那时我没有接受任何专业培训。我只知道如何使用简单的线条画基本轮廓。',
        keywords: ['child who loves drawing is me', 'since little', 'notebook and pen', 'no professional training']
      },
      {
        text: 'Later, I received professional art training in school. Learning techniques like light and shadow was a real turning point for me. At the same time, I studied works of different masters, which helped me find a clearer direction. I found that for me, fiction was much more attractive than just realism. So, I started to use my imagination more to create my own works.',
        translation: '后来，我在学校接受了专业的艺术培训。学习光影等技术对我来说是一个真正的转折点。与此同时，我研究了不同大师的作品，这帮助我找到了更清晰的方向。我发现对我来说，虚构比单纯的现实主义更有吸引力。所以，我开始更多地使用我的想象力来创作自己的作品。',
        keywords: ['professional training', 'light and shadow', 'turning point', 'fiction more attractive']
      },
      {
        text: 'The process of using imagination is very interesting. I have a habit of collecting many different elements in my sketchbook, which is like my creative treasure box. Before I start drawing, I will pick out different elements from this sketchbook and combine them to form my paintings. This way, I can create something unique that doesn\'t exist in the real world.',
        translation: '使用想象力的过程非常有趣。我有一个习惯，在我的速写本中收集许多不同的元素，这就像我的创意宝箱。在我开始画画之前，我会从这个速写本中挑选出不同的元素并将它们组合起来形成我的画作。这样，我可以创造出在现实世界中不存在的独特东西。',
        keywords: ['collecting elements', 'creative treasure box', 'combine elements', 'create unique']
      },
      {
        text: 'Although I have practiced a lot, I clearly know that if I only rely on my talent without working hard, I will stay where I am forever. In the future, I want to further improve my imagination and the ability to express complex emotions. I want my work to tell a powerful story rather than just being a combination of different elements.',
        translation: '虽然我已经练习了很多，但我清楚地知道，如果我只依赖我的天赋而不努力工作，我将永远停留在原地。将来，我想进一步提高我的想象力和表达复杂情感的能力。我希望我的作品能讲述一个有力的故事，而不仅仅是不同元素的组合。',
        keywords: ['practiced a lot', 'improve imagination', 'express complex emotions', 'tell powerful story']
      }
    ]
  },

  {
    id: 'improve-talent',
    title: '想提升的天赋',
    storyGroup: '🎨 画画',
    topicType: '1-4月保留题',
    examTakers: 84,
    groupColor: 'bg-pink-100',
    question: 'Describe a talent you would like to improve',
    questionCN: '描述一个你想提升的天赋',
    questionPoints: [
      { en: 'What it is', cn: '是什么' },
      { en: 'When you discovered it', cn: '什么时候发现的' },
      { en: 'How you want to improve it', cn: '你希望如何提升它' },
      { en: 'How you feel about it', cn: '你感觉如何' }
    ],
    answer: [
      {
        text: 'The talent I\'d like to improve is definitely drawing. Since I was little, drawing has been a big part of my daily life. I used to take a notebook and a pen everywhere to record anything I saw. However, back then, I didn\'t have any professional training. I only knew how to use simple lines to draw basic outlines.',
        translation: '我想提升的天赋绝对是绘画。从小，绘画就是我日常生活的重要组成部分。我过去常常带着笔记本和笔到处记录我看到的任何东西。然而，那时我没有接受任何专业培训。我只知道如何使用简单的线条画基本轮廓。',
        keywords: ['talent to improve drawing', 'since little', 'notebook and pen', 'no professional training']
      },
      {
        text: 'Later, I received professional art training in school. Learning techniques like light and shadow was a real turning point for me. At the same time, I studied works of different masters, which helped me find a clearer direction. I found that for me, fiction was much more attractive than just realism. So, I started to use my imagination more to create my own works.',
        translation: '后来，我在学校接受了专业��艺术培训。学习光影等技术对我来��是一个��正的转折点。与此同时，我研究了不同大师的作品，这帮助我找到了更清晰的方向。我发现对我来说，虚构比单纯的现实主义更有吸引力。所以，我开始更多地使用我的想象力来创作自己的作品。',
        keywords: ['professional training', 'light and shadow', 'turning point', 'fiction more attractive']
      },
      {
        text: 'The process of using imagination is very interesting. I have a habit of collecting many different elements in my sketchbook, which is like my creative treasure box. Before I start drawing, I will pick out different elements from this sketchbook and combine them to form my paintings. This way, I can create something unique that doesn\'t exist in the real world.',
        translation: '使用想象力的过程非常有趣。我有一个习惯，在我的速写本中收集许多不同的元素，这就像我的创意宝箱。在我开始画画之前，我会从这个速写本中挑选出不同的元素并将它们组合起来形成我的画作。这样，我可以创造出在现实世界中不存在的独特东西。',
        keywords: ['collecting elements', 'creative treasure box', 'combine elements', 'create unique']
      },
      {
        text: 'Although I have practiced a lot, I clearly know that if I only rely on my talent without working hard, I will stay where I am forever. In the future, I want to further improve my imagination and the ability to express complex emotions. I want my work to tell a powerful story rather than just being a combination of different elements.',
        translation: '虽然我已经练习了很多，但我清楚地知道，如果我只依赖我的天赋而不努力工作，我将永远停留在原地。将来，我想进一步提高我的想象力和表达复杂情感的能力。我希望我的作品能讲述一个有力的故事，而不仅仅是不同元素的组合。',
        keywords: ['practiced a lot', 'improve imagination', 'express complex emotions', 'tell powerful story']
      }
    ]
  },

  // 🍲 海底捞 组（红色）
  {
    id: 'dinner-with-family',
    title: '和亲友享受的晚餐',
    storyGroup: '🍲 海底捞',
    topicType: '1-4月保留题',
    examTakers: 77,
    groupColor: 'bg-red-100',
    question: 'Describe a dinner you enjoyed with your friends or family',
    questionCN: '描述一次你和朋友或家人享受的晚餐',
    questionPoints: [
      { en: 'What you had', cn: '你吃了什么' },
      { en: 'Who you had the dinner with', cn: '你和谁一起吃的晚餐' },
      { en: 'What you talked about during the dinner', cn: '晚餐期间你们聊了些什么' },
      { en: 'Why you enjoyed it', cn: '你为什么喜欢它' }
    ],
    answer: [
      {
        text: 'The dinner I\'d like to talk about is a birthday meal I had with my parents at Haidilao. A while ago, I went back home during a holiday and celebrated my birthday with my parents. We decided to have a family dinner together and chose to eat at Haidilao near our home, a very famous hotpot restaurant in China. Actually, this was a very special and unusual chance for me because I spend most of the year away from home, so I hardly ever have time to sit down and chat with my parents for a long time.',
        translation: '我想谈论的晚餐是我和父母在海底捞吃的生日餐。不久前，我假期回家和父母一起庆祝我的生日。我们决定一起吃家庭晚餐，选择在我们家附近的海底捞吃饭，这是中国一家非常著名的火锅餐厅。实际上，这对我来说是一个非常特殊和不寻常的机会，因为我一年中大部分时间都不在家，所以我几乎没有时间坐下来和父母长时间聊天。',
        keywords: ['birthday meal', 'parents at Haidilao', 'famous hotpot restaurant', 'special chance', 'hardly have time']
      },
      {
        text: 'I remember we ordered the most classic double-flavor soup base, which included spicy soup and tomato soup, plus a lot of fresh beef and vegetables that tasted delicious and wonderful. While enjoying the meal, we just relaxed and had a casual chat, like my parents talking about all kinds of funny things that happened when I was a child, such as the silly mistakes I made or how I used to be naughty at school. Having such a chance to recall my childhood with my family was really precious, and we were all very happy.',
        translation: '我记得我们点了最经典的双味汤底，包括麻辣汤和番茄汤，还有很多新鲜的牛肉和蔬菜，味道美味极了。在享受美食的同时，我们只是放松地随意聊天，比如我父母谈论我小时候发生的各种有趣的事情，比如我犯的愚蠢错误或我过去在学校如何淘气。有这样一个机会与家人回忆童年真的很珍贵，我们都很开心。',
        keywords: ['double-flavor soup', 'spicy and tomato', 'fresh beef vegetables', 'casual chat', 'recall childhood', 'really precious']
      },
      {
        text: 'What made the meal even better was the warm and friendly service. All the staff were very enthusiastic. For example, throughout the meal, they were very attentive and took the initiative to add more food and sauces for us, and even provided tissues before we even asked. To my surprise, after my parents told the staff it was my birthday, they all came over to sing the birthday song for me and gave me their best wishes. They even gave me a free bowl of longevity noodles—in China, eating noodles on a birthday means a long life. I was deeply moved by such thoughtful and detailed service.',
        translation: '让这顿饭更美好的是温暖友好的服务。所有员工都非常热情。例如，在整顿饭期间，他们非常细心，主动为我们添加更多的食物和酱料，甚至在我们要求之前就提供纸巾。令我惊讶的是，在我父母告诉员工这是我的生日后，他们都过来为我唱生日歌并给我最好的祝福。他们甚至给了我一碗免费的长寿面——在中国，生日吃面条意味着长寿。这种周到细致的服务深深打动了我。',
        keywords: ['warm friendly service', 'very attentive', 'birthday song', 'longevity noodles', 'deeply moved']
      },
      {
        text: 'Overall, I really enjoyed this unusual dinner. It wasn\'t just about the food, but the quality time with my family. The excellent service made my birthday very memorable, and we\'ve already decided to have our next family gathering there again.',
        translation: '总的来说，我真的很享受这顿不寻常的晚餐。它不仅仅是关于食物，而是与家人在一起的美好时光。出色的服务让我的生日非常难忘，我们已经决定下次家庭聚会再去那里。',
        keywords: ['enjoyed unusual dinner', 'quality time', 'excellent service', 'very memorable', 'next gathering']
      }
    ]
  },

  {
    id: 'good-service-shop',
    title: '购物服务',
    storyGroup: '🍲 海底捞',
    topicType: '1-4月保留题',
    examTakers: 91,
    groupColor: 'bg-red-100',
    question: 'Describe a time when you received good service in a shop or store',
    questionCN: '描述一次你在商店中获得良好服务的经历',
    questionPoints: [
      { en: 'Where the shop is', cn: '商店在哪里' },
      { en: 'When you went to the shop', cn: '你什么时候去商店' },
      { en: 'What service you received from the staff', cn: '你从员工那里得到了什么服务' },
      { en: 'How you felt about the service', cn: '你对服务的感觉如何' }
    ],
    answer: [
      {
        text: 'I\'d like to describe a time I received excellent service at a famous hotpot restaurant called Haidilao. A while ago, I went back home during a holiday and celebrated my birthday with my parents. We decided to have a family dinner together and chose to eat at Haidilao near our home, a very famous hotpot restaurant in China. Actually, this was a very special and unusual chance for me because I spend most of the year away from home, so I hardly ever have time to sit down and chat with my parents for a long time.',
        translation: '我想描述一次我在一家名为海底捞的著名火锅餐厅获得出色服务的经历。不久前，我假期回家和父母一起庆祝我的生日。我们决定一起吃家庭晚餐，选择在我们家附近的海底捞吃饭，这是中国一家非常著名的火锅餐厅。实际上，这对我来说是一个非常特殊和不寻常的机会，因为我一年中大部分时间都不在家，所以我几乎没有时间坐下来和父母长时间聊天。',
        keywords: ['excellent service', 'Haidilao', 'birthday with parents', 'famous hotpot', 'special chance']
      },
      {
        text: 'I remember we ordered the most classic double-flavor soup base, which included spicy soup and tomato soup, plus a lot of fresh beef and vegetables that tasted delicious and wonderful. While enjoying the meal, we just relaxed and had a casual chat, like my parents talking about all kinds of funny things that happened when I was a child, such as the silly mistakes I made or how I used to be naughty at school. Having such a chance to recall my childhood with my family was really precious, and we were all very happy.',
        translation: '我记得我们点了最经典的双味汤底，包括麻辣汤和番茄汤，还有很多新鲜的牛肉和蔬菜，味道美味极了。在享受美食的同时，我们只是放松地随意聊天，比如我父母谈论我小时候发生的各种有趣的事情，比如我犯的愚蠢错误或我过去在学校如何淘气。有这样一个机会与家人回忆童年真的很珍贵，我们都很开心。',
        keywords: ['double-flavor soup', 'fresh beef vegetables', 'casual chat', 'recall childhood', 'really precious']
      },
      {
        text: 'What made the meal even better was the warm and friendly service. All the staff were very enthusiastic. For example, throughout the meal, they were very attentive and took the initiative to add more food and sauces for us, and even provided tissues before we even asked. To my surprise, after my parents told the staff it was my birthday, they all came over to sing the birthday song for me and gave me their best wishes. They even gave me a free bowl of longevity noodles—in China, eating noodles on a birthday means a long life. I was deeply moved by such thoughtful and detailed service.',
        translation: '让这顿饭更美好的是温暖友好的服务。所有员工都非常热情。例如，在整顿饭期间，他们非常细心，主动为我们添加更多的食物和酱料，甚至在我们要求之前就提供纸巾。令我惊讶的是，在我父母告诉员工这是我的生日后，他们都过来为我唱生日歌并给我最好的祝福。他们甚至给了我一碗免费的长寿面——在中国，生日吃面条意味着长寿。这种周到细致的服务深深打动了我。',
        keywords: ['warm friendly service', 'very attentive', 'birthday song', 'longevity noodles', 'deeply moved']
      },
      {
        text: 'Overall, I really enjoyed this unusual dinner. It wasn\'t just about the food, but the quality time with my family. The excellent service made my birthday very memorable, and we\'ve already decided to have our next family gathering there again.',
        translation: '总的来说，我真的很享受这顿不寻常的晚餐。它不仅仅是关于食物，而是与家人在一起的美好时光。出色的服务让我的生日非常难忘，我们已经决定下次家庭聚会再去那里。',
        keywords: ['enjoyed unusual dinner', 'quality time', 'excellent service', 'very memorable']
      }
    ]
  },

  {
    id: 'unusual-meal',
    title: '不寻常的一餐',
    storyGroup: '🍲 海底捞',
    topicType: '1-4月保留题',
    examTakers: 63,
    groupColor: 'bg-red-100',
    question: 'Describe an unusual meal you had',
    questionCN: '描述一次不寻常的用餐经历',
    questionPoints: [
      { en: 'When you had it', cn: '什么时候' },
      { en: 'Where you had it', cn: '在哪里' },
      { en: 'Whom you had it with', cn: '和谁一起' },
      { en: 'Why it was unusual', cn: '为什么不寻常' }
    ],
    answer: [
      {
        text: 'The unusual meal I want to share is my last birthday dinner, which was full of surprises. A while ago, I went back home during a holiday and celebrated my birthday with my parents. We decided to have a family dinner together and chose to eat at Haidilao near our home, a very famous hotpot restaurant in China. Actually, this was a very special and unusual chance for me because I spend most of the year away from home, so I hardly ever have time to sit down and chat with my parents for a long time.',
        translation: '我想分享的不寻常的一餐是我上次的生日晚餐，充满了惊喜。不久前，我假期回家和父母一起庆祝我的生日。我们决定一起吃家庭晚餐，选择在我们家附近的海底捞吃饭，这是中国一家非常著名的火锅餐厅。实际上，这对我来说是一个非常特殊和不寻常的机会，因为我一年中大部分时间都不在家，所以我几乎没有时间坐下来和父母长时间聊天。',
        keywords: ['unusual meal', 'birthday dinner', 'full of surprises', 'Haidilao', 'special chance']
      },
      {
        text: 'I remember we ordered the most classic double-flavor soup base, which included spicy soup and tomato soup, plus a lot of fresh beef and vegetables that tasted delicious and wonderful. While enjoying the meal, we just relaxed and had a casual chat, like my parents talking about all kinds of funny things that happened when I was a child, such as the silly mistakes I made or how I used to be naughty at school. Having such a chance to recall my childhood with my family was really precious, and we were all very happy.',
        translation: '我记得我们点了最经典的双味汤底，包括麻辣汤和番茄汤，还有很多新鲜的牛肉和蔬菜，味道美味极了。在享受美食的同时，我们只是放松地随意聊天，比如我父母谈论我小时候发生的各种有趣的事情，比如我犯的愚蠢错误或我过去在学校如何淘气。有这样一个机会与家人回忆童年真的很珍贵，我们都很开心。',
        keywords: ['double-flavor soup', 'casual chat', 'recall childhood', 'really precious']
      },
      {
        text: 'What made the meal even better was the warm and friendly service. All the staff were very enthusiastic. For example, throughout the meal, they were very attentive and took the initiative to add more food and sauces for us, and even provided tissues before we even asked. To my surprise, after my parents told the staff it was my birthday, they all came over to sing the birthday song for me and gave me their best wishes. They even gave me a free bowl of longevity noodles—in China, eating noodles on a birthday means a long life. I was deeply moved by such thoughtful and detailed service.',
        translation: '让这顿饭更美好的是温暖友好的服务。所有员工都非常热情。例如，在整顿饭期间，他们非常细心，主动为我们添加更多的食物和酱料，甚至在我们要求之前就提供纸巾。令我惊讶的是，在我父母告诉员工这是我的生日后，他们都过来为我唱生日歌并给我最好的祝福。他们甚至给了我一碗免费的长寿面——在中国，生日吃面条意味着长寿。这种周到细致的服务深深打动了我。',
        keywords: ['warm friendly service', 'birthday song', 'longevity noodles', 'deeply moved']
      },
      {
        text: 'Overall, I really enjoyed this unusual dinner. It wasn\'t just about the food, but the quality time with my family. The excellent service made my birthday very memorable, and we\'ve already decided to have our next family gathering there again.',
        translation: '总的来说，我真的很享受这顿不寻常的晚餐。它不仅仅是关于食物，而是��家人在一起的���好时光。出色的服务让我的生日非常难忘，我们已经决定下次家庭聚会再去那里。',
        keywords: ['enjoyed unusual dinner', 'quality time', 'very memorable', 'next gathering']
      }
    ]
  },

  // 📚 看书-原子习惯 组（绿色）
  {
    id: 'useful-book',
    title: '有用的书',
    storyGroup: '📚 看书-原子习惯',
    topicType: '1-4月保留题',
    examTakers: 133,
    groupColor: 'bg-green-100',
    question: 'Describe a useful book you read',
    questionCN: '描述一本你读过的有用的书',
    questionPoints: [
      { en: 'What it is', cn: '哪本书' },
      { en: 'When you read it', cn: '什么时候读的' },
      { en: 'Why you think it is useful', cn: '为什么你认为它是有用的' },
      { en: 'How you felt about it', cn: '你对它的感受如何' }
    ],
    answer: [
      {
        text: 'I\'d like to talk about a truly useful book I read called Atomic Habits. A close friend recommended it to me at the beginning of this year, saying it had helped her change bad habits and build a solid daily routine. I took her advice and started reading it.',
        translation: '我想谈谈我读过的一本真正有用的书，叫做《原子习惯》。今年年初，一位亲密的朋友向我推荐了它，说它帮助她改变了坏习惯并建立了良好的日常生活。我接受了她的建议并开始阅读它。',
        keywords: ['Atomic Habits', 'close friend recommended', 'change bad habits', 'solid daily routine']
      },
      {
        text: 'This book is all about how small changes can lead to remarkable results.The most helpful idea for me was the 2 minute rule - which means you should begin with a new habit that takes less than two minutes to do.  I applied it by reading just one page every night before sleep. It helped me build a strong reading habit over time, which in turn allowed me to quit staying up late and overcome my addiction to social media.',
        translation: '这本书讲的都是小改变如何带来显著的结果。对我最有帮助的想法是2分钟规则——这意味着你应该从一个需要不到两分钟的新习惯开始。我通过每晚睡前只读一页来应用它。随着时间的推移，它帮助我建立了强大的阅读习惯，这反过来让我戒掉熬夜并克服了对社交媒体的沉迷。',
        keywords: ['small changes remarkable results', '2 minute rule', 'one page every night', 'quit staying up late']
      },
      {
        text: 'Another key concept is linking habits together - connecting a new behavior to an existing habit you already have every day.I put this into practice by thinking of one thing I\'m grateful for right after I brush my teeth each morning. This small practice helps me start the day in a positive way.',
        translation: '另一个关键概念是将习惯联系在一起——将一个新行为与你每天已经有的现有习惯联系起来。我通过每天早上刷牙后想一件我感激的事情来将其付诸实践。这个小习惯帮助我以积极的方式开始一天。',
        keywords: ['linking habits together', 'thinking grateful', 'start day positive']
      },
      {
        text: 'Overall, this book  has made my daily routine more structured and meaningful. I\'ve become more disciplined, more positive, and more confident in myself.',
        translation: '总的来说，这本书让我的日常生活更有条理和意义。我变得更加自律、更加积极、对自己更有信心。',
        keywords: ['routine structured meaningful', 'more disciplined positive confident']
      }
    ]
  },

  {
    id: 'recent-routine-change',
    title: '近期日常改变',
    storyGroup: '📚 看书-原子习惯',
    topicType: '非大陆地区1-4月保留题',
    examTakers: 0,
    groupColor: 'bg-green-100',
    question: 'Describe a positive change you made in your daily routine recently',
    questionCN: '描述你最近在日常生活中做出的积极改变',
    questionPoints: [
      { en: 'What the change is', cn: '变化是什么' },
      { en: 'How you have changed the routine', cn: '你是如何改变日常生活的' },
      { en: 'Why you think it is a positive change', cn: '你认为这是积极的改变的原因是' },
      { en: 'How you feel about the change', cn: '你对这个变化的感觉如何' }
    ],
    answer: [
      {
        text: 'Well, there have been quite a few changes in my life recently, and they all started with one book called Atomic Habits. A close friend recommended it to me at the beginning of this year, saying it had helped her change some bad habits and build a solid daily routine. So I took her advice and started reading it.',
        translation: '好吧，我的生活最近发生了很多变化，这一切都始于一本叫做《原子习惯》的书。今年年初，一位亲密的朋友向我推荐了它，说它帮助她改变了一些坏习惯并建立了良好的日常生活。所以我接受了她的建议并开始阅读它。',
        keywords: ['few changes', 'Atomic Habits', 'close friend recommended', 'solid daily routine']
      },
      {
        text: 'This book is all about how small changes can lead to remarkable results.The most helpful idea for me was the 2 minute rule - which means you should begin with a new habit that takes less than two minutes to do. I applied it by reading just one page every night before sleep. It helped me build a strong reading habit over time, which in turn allowed me to quit staying up late and overcome my addiction to social media.',
        translation: '这本书讲的都是小改变如何带来显著的结果。对我最有帮助的想法是2分钟规则——这意味着你应该从一个需要不到两分钟的新习惯开始。我通过每晚睡前只读一页来应用它。随着时间的推移，它帮助我建立了强大的阅读习惯，这反过来让我戒掉熬夜并克服了对社交媒体的沉迷。',
        keywords: ['small changes remarkable results', '2 minute rule', 'one page every night', 'quit staying up late']
      },
      {
        text: 'Another key concept I\'ve learned from the book is linking habits together - connecting a new behavior to an existing habit you already have every day. I put this into practice by thinking of one thing I\'m grateful for right after I brush my teeth each morning. This small practice helps me start the day in a positive way.',
        translation: '我从这本书中学到的另一个关键概念是将习惯联系在一起——将一个新行为与你每天已经有的现有习惯联系起来。我通过每天早上刷牙后想一件我感激的事情来将其付诸实践。这个小习惯帮助我以积极的方式开始一天。',
        keywords: ['linking habits together', 'thinking grateful', 'start day positive']
      },
      {
        text: 'Overall, these changes have made my daily routine more structured and meaningful. I\'ve become more disciplined, more positive, and more confident in myself.',
        translation: '总的来说，这些变化让我的日常生活更有条理和意义。我变得更加自律、更加积极、对自己更有信心。',
        keywords: ['changes made routine structured', 'more disciplined positive confident']
      }
    ]
  },

  {
    id: 'decision-with-help',
    title: '别人帮忙做下的决定',
    storyGroup: '📚 看书-原子习惯',
    topicType: '1-4月保留题',
    examTakers: 0,
    groupColor: 'bg-green-100',
    question: 'Describe a decision you made with help from someone',
    questionCN: '描述一个你在别人帮助下做出的决定',
    questionPoints: [
      { en: 'What the decision was', cn: '决定是什么' },
      { en: 'Why you made the decision', cn: '你为什么做出这个决定' },
      { en: 'Who helped you make the decision', cn: '谁帮助你做出这个决定' },
      { en: 'How you felt about it', cn: '你对这个决定的感受如何' }
    ],
    answer: [
      {
        text: 'I\'d like to talk about a decision I made with the help of my friend. The decision was to change bad habits and  build a solid daily routine. At the beginning of this year, one of my close friends recommended me a book called Atomic Habits. It became the turning point that made me reflect on my lifestyle and decide to make a change.',
        translation: '我想谈谈我在朋友帮助下做出的一个决定。这个决定是改变坏习惯并建立良好的日常生活。今年年初，我的一位亲密朋友向我推荐了一本叫《原子习惯》的书。它成为了让我反思生活方式并决定做出改变的转折点。',
        keywords: ['decision with help', 'change bad habits', 'Atomic Habits', 'turning point']
      },
      {
        text: 'My routine was really unhealthy for a long time. I often stayed up late at night playing with my phone and scrolling through social media, which made me very tired the next day. It affected my study/work efficiency, and I felt like I was wasting a lot of time. I knew I needed to change, but it was hard to start on my own.',
        translation: '很长一段时间以来，我的日常生活真的很不健康。我经常熬夜玩手机和浏览社交媒体，这让我第二天非常疲倦。它影响了我的学习/工作效率，我觉得我浪费了很多时间。我知道我需要改变，但很难自己开始。',
        keywords: ['routine unhealthy', 'stayed up late', 'affected efficiency', 'hard to start']
      },
      {
        text: 'After reading the book, I learned about the " two-minute rule",  which means starting a new habit that takes less than two minutes. I applied it by reading just one page every night before sleep.This helped me build a strong reading habit over time, which in turn allowed me to quit staying up late and overcome my addiction to social media.',
        translation: '读完这本书后，我了解了"两分钟规则"，这意味着开始一个需要不到两分钟的新习惯。我通过每晚睡前只读一页来应用它。随着时间的推移，这帮助我建立了强大的阅读习惯，这反过来让我戒掉熬夜并克服了对社交媒体的沉迷。',
        keywords: ['two-minute rule', 'one page every night', 'quit staying up late']
      },
      {
        text: 'Overall, this decision have made my daily routine more structured and meaningful. I\'ve become more disciplined, more positive, and more confident in myself.',
        translation: '总的来说，这个决定让我的日常生活更有条理和意义。我变得更加自律、更加积极、对自己更有信心。',
        keywords: ['decision made routine structured', 'more disciplined positive confident']
      }
    ]
  },

  {
    id: 'learn-friend-habit',
    title: '学习朋友好习惯',
    storyGroup: '📚 看书-原子习惯',
    topicType: '1-4月保留题',
    examTakers: 35,
    groupColor: 'bg-green-100',
    question: 'Describe a good habit you learned from a friend',
    questionCN: '描述一个你从朋友那里学到的好习惯',
    questionPoints: [
      { en: 'Who your friend is', cn: '你的朋友是谁' },
      { en: 'What habit he/she has', cn: '他/她有什么习惯' },
      { en: 'When you noticed this habit', cn: '你什么时候注意到这个习惯' },
      { en: 'Why you want to develop this habit', cn: '你为什么想培养这个习惯' }
    ],
    answer: [
      {
        text: 'I\'d like to talk about one of my close friends who has a very good habit of reading. At the beginning of this year, she recommended me a book called Atomic Habits. She told me it helped her change some bad habits and build a solid daily routine.',
        translation: '我想谈谈我的一位亲密朋友，她有一个很好的阅读习惯。今年年初，她向我推荐了一本叫《原子习惯》的书。她告诉我，它帮助她改变了一些坏习惯并建立了良好的日常生活。',
        keywords: ['close friend', 'good habit reading', 'Atomic Habits', 'solid daily routine']
      },
      {
        text: 'I started to notice her reading habit from that time, so I asked her how she developed it. She told me that reading doesn\'t have to be a big task at once. Instead, small changes can lead to remarkable results. She used the "two-minute rule" from the book, which means you should begin with a new habit that takes less than two minutes to do. And she applied it by reading just one page every night before sleep. It helped her build a strong reading habit over time.',
        translation: '从那时起我开始注意到她的阅读习惯，所以我问她是如何培养的。她告诉我，阅读不必一次成为一项大任务。相反，小改变可以带来显著的结果。她使用了书中的"两分钟规则"，这意味着你应该从一个需要不到两分钟的新习惯开始。她通过每晚睡前只读一页来应用它。随着时间的推移，它帮助她建立了强大的阅读习惯。',
        keywords: ['noticed reading habit', 'small changes remarkable results', 'two-minute rule', 'strong reading habit']
      },
      {
        text: 'The reason I want to develop this habit is that my routine was really unhealthy for a long time. I often stayed up late at night playing with my phone and scrolling through social media, which made me very tired the next day. It affected my study/work efficiency, and I felt like I was wasting a lot of time.',
        translation: '我想培养这个习惯的原因是，很长一段时间以来我的日常生活真的很不健康。我经常熬夜玩手机和浏览社交媒体，这让我第二天非常疲倦。它影响了我的学习/工作效率，我觉得我浪费了很多时间。',
        keywords: ['routine unhealthy', 'stayed up late', 'affected efficiency', 'wasting time']
      },
      {
        text: 'I hope that by developing a daily reading habit, I can make my life more structured and meaningful and become a more disciplined, more positive, and more confident person in the future.',
        translation: '我希望通过培养每天的阅读习惯，我可以让我的生活更有条理和意义，并在未来成为一个更自律、更积极、更有信心的人。',
        keywords: ['developing reading habit', 'life structured meaningful', 'disciplined positive confident']
      }
    ]
  },

  {
    id: 'interesting-subject',
    title: '感兴趣的学科/领域',
    storyGroup: '📚 看书-原子习惯',
    topicType: '1-4月保留题',
    examTakers: 0,
    groupColor: 'bg-green-100',
    question: 'Describe a subject or area you are interested in',
    questionCN: '描述一个你感兴趣的学科或领域',
    questionPoints: [
      { en: 'Which area/subject it is', cn: '它是哪个领域/主题' },
      { en: 'When and Where you came to know this area/subject', cn: '你何时何地开始了解这个领域/主题' },
      { en: 'How you get information about this area/subject', cn: '你是如何获取这个领域/主题的信息的' },
      { en: 'Why you are interested in this area/subject', cn: '你为什么对这个领域/主题感兴趣' }
    ],
    answer: [
      {
        text: 'I\'d like to talk about psychology, especially behavioral psychology. I first became interested in this subject earlier this year when a close friend recommended a book to me called Atomic Habits. It\'s a very practical book about how small changes can lead to remarkable results.',
        translation: '我想谈谈心理学，尤其是行为心理学。今年年初，当一位亲密的朋友向我推荐了一本叫《原子习惯》的书时，我第一次对这个主题产生了兴趣。这是一本非常实用的书，讲的是小改变如何带来显著的结果。',
        keywords: ['psychology', 'behavioral psychology', 'Atomic Habits', 'small changes remarkable results']
      },
      {
        text: 'Since then, I\'ve continued to explore behavioral psychology through other books, podcasts, and online articles. What fascinates me most is that behavioral psychology is not just theoretical but highly practical and easy to apply.',
        translation: '从那时起，我继续通过其他书籍、播客和在线文章探索行为心理学。最让我着迷的是，行为心理学不仅仅是理论性的，而且非常实用且易于应用。',
        keywords: ['explore behavioral psychology', 'books podcasts articles', 'practical easy to apply']
      },
      {
        text: 'For example, some useful psychology tips that can help people change bad habits and build a solid daily routine .One was the "two-minute rule," which means starting a new habit with something that takes less than two minutes. I applied it by reading one page every night before sleep, and over time it helped me build a strong reading habit, which in turn allowed me to quit staying up late and overcome my addiction to social media.',
        translation: '例如，一些有用的心理学技巧可以帮助人们改变坏习惯并建立良好的日常生活。其中一个是"两分钟规则"，这意味着用需要不到两分钟的事情开始一个新习惯。我通过每晚睡前读一页来应用它，随着时间的推移，它帮助我建立了强大的阅读习惯，这反过来让我戒掉熬夜并克服了对社交媒体的沉迷。',
        keywords: ['useful psychology tips', 'two-minute rule', 'strong reading habit', 'quit staying up late']
      },
      {
        text: 'Another key concept is linking habits together - connecting a new behavior to an existing habit you already have every day. I put this into practice by thinking of one thing I\'m grateful for right after I brush my teeth each morning. This small practice helps me start the day in a positive way. Overall, I think behavioral psychology is very practical and helpful. I hope to share what I\'ve learned with more people so they can also use it to make their life more structured and meaningful.',
        translation: '另一个关键概念是将习惯联系在一起——将一个新行为与你每天已经有的现有习惯联系起来。我通过每天早上刷牙后想一件我感激的事情来将其付诸实践。这个小习惯帮助我以积极的方式开始一天。总的来说，我认为行为心理学非常实用和有帮助。我希望与更多的人分享我学到的东西，这样他们也可以使用它来让自己的生活更有条理和意义。',
        keywords: ['linking habits together', 'thinking grateful', 'practical helpful', 'share with more people']
      }
    ]
  },

  // 😖 景区遭遇 组（浅蓝色）
  {
    id: 'got-lost',
    title: '迷路',
    storyGroup: '😖 景区遭遇',
    topicType: '1-4月保留题',
    examTakers: 0,
    groupColor: 'bg-cyan-100',
    question: 'Describe a time when you got lost',
    questionCN: '描述一次你迷路的经历',
    questionPoints: [
      { en: 'When you were', cn: '你当时在哪里' },
      { en: 'What happened', cn: '发生了什么' },
      { en: 'How you felt', cn: '你感觉怎么样' },
      { en: 'How you found your way', cn: '你怎么找到路的' }
    ],
    answer: [
      {
        text: 'I\'d like to share an experience of getting lost while I was hiking alone in Zhangjiajie National Forest Park. That was definitely one of the most unforgettable experiences I\'ve had. It happened last year when I was traveling alone in Zhangjiajie National Forest Park. Absorbed in the beautiful scenery, I completely lost track of time, and by the time I decided to head back, the sun had already set.',
        translation: '我想分享一次在张家界国家森林公园独自徒步时迷路的经历。那绝对是我最难忘的经历之一。这发生在去年，当时我独自在张家界国家森林公园旅行。我沉浸在美丽的风景中，完全忘记了时间，当我决定回去时，太阳已经落山了。',
        keywords: ['getting lost', 'Zhangjiajie', 'hiking alone', 'absorbed in scenery', 'sun already set']
      },
      {
        text: 'Unfortunately, while I was trying to find the exit, my surroundings suddenly went completely dark.It was clear that the park had a power outage. I tried to use my phone\'s flashlight and check the map, but the battery ran out quickly.',
        translation: '不幸的是，当我试图找到出口时，我周围突然变得完全黑暗。很明显，公园停电了。我试图使用手机的手电筒并查看地图，但电池很快就耗尽了。',
        keywords: ['trying to find exit', 'completely dark', 'power outage', 'battery ran out']
      },
      {
        text: 'To be honest, I felt really anxious, scared, and completely lost at that moment. There was nothing I could do except waiting for the power to come back and hoping that someone would come to help.This was truly a very special waiting experience. I waited in the darkness for about half an hour. Finally, the lights turned back on, and I heard a park staff member shouting in the distance. He found me and guided me safely back to the main road.',
        translation: '说实话，那一刻我感到非常焦虑、害怕和完全迷失。除了等待电力恢复并希望有人来帮助之外，我什么都做不了。这确实是一次非常特殊的等待经历。我在黑暗中等了大约半小时。最后，灯又亮了，我听到远处有公园工作人员在喊。他找到了我并安全地引导我回到主干道。',
        keywords: ['anxious scared lost', 'waited half hour', 'lights turned back', 'staff guided safely']
      },
      {
        text: 'He explained that the power outage was due to an unexpected equipment failure and said he was truly sorry for the fear and inconvenience I had experienced.I felt relieved and told him it wasn\'t his fault. To be honest, his sincere apology and concern made me feel much better and more respected as a visitor. Looking back, it was both lucky and unlucky. This experience taught me to be better prepared for future trips, like carrying a flashlight and checking the route in advance.',
        translation: '他解释说停电是由于意外的设备故障，并说他对我经历的恐惧和不便感到非常抱歉。我感到如释重负，并告诉他这不是他的错。说实话，他真诚的道歉和关心让我作为游客感觉好多了，也更受尊重。回顾过去，这既幸运又不幸。这次经历教会我为未来的旅行做好更好的准备，比如带手电筒和提前检查路线。',
        keywords: ['equipment failure', 'sincere apology', 'felt relieved', 'better prepared', 'carrying flashlight']
      }
    ]
  },

  {
    id: 'power-outage',
    title: '突然停电',
    storyGroup: '😖 景区遭遇',
    topicType: '1-4月保留题',
    examTakers: 56,
    groupColor: 'bg-cyan-100',
    question: 'Describe a time when there was a power outage',
    questionCN: '描述一次突然停电的经历',
    questionPoints: [
      { en: 'When/Where it happened', cn: '当时发生在哪里' },
      { en: 'How long it lasted', cn: '持续了多久' },
      { en: 'What you did during that time', cn: '在那段时间里你做了什么' },
      { en: 'How you felt about it', cn: '你对这件事的感受如何' }
    ],
    answer: [
      {
        text: 'I want to talk about a sudden power outage that happened during my trip to a forest park last year. That was definitely one of the most unforgettable experiences I\'ve had. It happened last year when I was traveling alone in Zhangjiajie National Forest Park. Absorbed in the beautiful scenery, I completely lost track of time, and by the time I decided to head back, the sun had already set.',
        translation: '我想谈谈去年去森林公园旅行时发生的一次突然停电。那绝对是我最难忘的经历之一。这发生在去年，当时我独自在张家界国家森林公园旅行。我沉浸在美丽的风景中，完全忘记了时间，当我决定回去时，太阳已经落山了。',
        keywords: ['power outage', 'forest park', 'Zhangjiajie', 'absorbed in scenery', 'sun set']
      },
      {
        text: 'Unfortunately, while I was trying to find the exit, my surroundings suddenly went completely dark.It was clear that the park had a power outage. I tried to use my phone\'s flashlight and check the map, but the battery ran out quickly.',
        translation: '不幸的是，当我试图找到出口时，我周围突然变得完全黑暗。很明显，公园停电了。我试图使用手机的手电筒并查看地图，但电池很快就耗尽了。',
        keywords: ['completely dark', 'power outage', 'phone flashlight', 'battery ran out quickly']
      },
      {
        text: 'To be honest, I felt really anxious, scared, and completely lost at that moment. There was nothing I could do except waiting for the power to come back and hoping that someone would come to help.This was truly a very special waiting experience. I waited in the darkness for about half an hour. Finally, the lights turned back on, and I heard a park staff member shouting in the distance. He found me and guided me safely back to the main road.',
        translation: '说实话，那一刻我感到非常焦虑、害怕和完全迷失。除了等待电力恢复并希望有人来帮助之外，我什么都做不了。这确实是一次非常特殊的等待经历。我在黑暗中等了大约半小时。最后，灯又亮了，我听到远处有公园工作人员在喊。他找到了我并安全地引导我回到主干道。',
        keywords: ['anxious scared', 'waiting for power', 'waited half hour', 'lights turned back', 'guided safely']
      },
      {
        text: 'He explained that the power outage was due to an unexpected equipment failure and said he was truly sorry for the fear and inconvenience I had experienced.I felt relieved and told him it wasn\'t his fault. To be honest, his sincere apology and concern made me feel much better and more respected as a visitor. Looking back, it was both lucky and unlucky. This experience taught me to be better prepared for future trips, like carrying a flashlight and checking the route in advance.',
        translation: '他解释说停电是由于意外的设备故障，并说他对我经历的恐惧和不便感到非常抱歉。我感到如释重负，并告诉他这不是他的错。说实话，他真诚的道歉和关心让我作为游客感觉好多了，也更受尊重。回顾过去，这既幸运又不幸。这次经历教会我为未来的旅行做好更好的准备，比如带手电筒和提前检查路线。',
        keywords: ['equipment failure', 'sincere apology', 'felt relieved', 'better prepared', 'carrying flashlight']
      }
    ]
  },

  {
    id: 'waiting-special',
    title: '等待特别事情',
    storyGroup: '😖 景区遭遇',
    topicType: '1-4月保留题',
    examTakers: 0,
    groupColor: 'bg-cyan-100',
    question: 'Describe a time when you waited for something special',
    questionCN: '描述一次你等待特别事情的经历',
    questionPoints: [
      { en: 'What you waited for', cn: '你在等待什么' },
      { en: 'Where you waited', cn: '你在哪里等待' },
      { en: 'Why it was special', cn: '为什么它很特殊' },
      { en: 'How you felt while you were waiting', cn: '等待的时候感觉怎么样' }
    ],
    answer: [
      {
        text: 'The special waiting experience I want to describe is when I was stuck in the dark, waiting for help in Zhangjiajie National Forest Park. That was definitely one of the most unforgettable experiences I\'ve had. It happened last year when I was traveling alone in Zhangjiajie National Forest Park. Absorbed in the beautiful scenery, I completely lost track of time, and by the time I decided to head back, the sun had already set.',
        translation: '我想描述的特殊等待经历是当我在张家界国家森林公园被困在黑暗中等待帮助时。那绝对是我最难忘的经历之一。这发生在去年，当时我独自在张家界国家森林公园旅行。我沉浸在美丽的风景中，完全忘记了时间，当我决定回去时，太阳已经落山了。',
        keywords: ['special waiting experience', 'stuck in dark', 'Zhangjiajie', 'absorbed in scenery', 'sun set']
      },
      {
        text: 'Unfortunately, while I was trying to find the exit, my surroundings suddenly went completely dark.It was clear that the park had a power outage. I tried to use my phone\'s flashlight and check the map, but the battery ran out quickly.',
        translation: '不幸的是，当我试图找到出口时，我周围突然变得完全黑暗。很明显，公园停电了。我试图使用手机的手电筒并查看地图，但电池很快就耗尽了。',
        keywords: ['completely dark', 'power outage', 'phone flashlight', 'battery ran out']
      },
      {
        text: 'To be honest, I felt really anxious, scared, and completely lost at that moment. There was nothing I could do except waiting for the power to come back and hoping that someone would come to help.This was truly a very special waiting experience. I waited in the darkness for about half an hour. Finally, the lights turned back on, and I heard a park staff member shouting in the distance. He found me and guided me safely back to the main road.',
        translation: '说实话，那一刻我感到非常焦虑、害怕和完全迷失。除了等待电力恢复并希望有人来帮助之外，我什么都做不了。这确实是一次非常特殊的等待经历。我在黑暗中等了大约半小时。最后，灯又亮了，我听到远处有公园工作人员在喊。他找到了我并安全地引导我回到主干道。',
        keywords: ['anxious scared lost', 'waiting for help', 'special waiting experience', 'waited half hour', 'staff guided safely']
      },
      {
        text: 'He explained that the power outage was due to an unexpected equipment failure and said he was truly sorry for the fear and inconvenience I had experienced.I felt relieved and told him it wasn\'t his fault. To be honest, his sincere apology and concern made me feel much better and more respected as a visitor. Looking back, it was both lucky and unlucky. This experience taught me to be better prepared for future trips, like carrying a flashlight and checking the route in advance.',
        translation: '他解释说停电是由于意外的设备故障，并说他对我经历的恐惧和不便感到非常抱歉。我感到如释重负，并告诉他这不是他的错。说实话，他真诚的道歉和关心让我作为游客感觉好多了，也更受尊重。回顾过去，这既幸运又不幸。这次经历教会我为未来的旅行做好更好的准备，比如带手电筒和提前检查路线。',
        keywords: ['equipment failure', 'sincere apology', 'felt relieved', 'better prepared']
      }
    ]
  },

  {
    id: 'someone-apologized',
    title: '别人向你道歉',
    storyGroup: '😖 景区遭遇',
    topicType: '1-4月保留题',
    examTakers: 28,
    groupColor: 'bg-cyan-100',
    question: 'Describe a time when someone apologized to you',
    questionCN: '描述一次别人向你道歉的经历',
    questionPoints: [
      { en: 'When it was', cn: '什么时候发生的' },
      { en: 'Who this person is', cn: '这个人是谁' },
      { en: 'Why he/she apologized to you', cn: '为什么他/她向你道歉' },
      { en: 'How you felt about it', cn: '你对这件事的感受如何' }
    ],
    answer: [
      {
        text: 'I\'d like to talk about a time a park staff member apologized to me after an unexpected accident during my trip. That was definitely one of the most unforgettable experiences I\'ve had. It happened last year when I was traveling alone in Zhangjiajie National Forest Park. Absorbed in the beautiful scenery, I completely lost track of time, and by the time I decided to head back, the sun had already set.',
        translation: '我想谈谈一次旅行中发生意外事故后公园工作人员向我道歉的经历。那绝对是我最难忘的经历之一。这发生在去年，当时我独自在张家界国家森林公园旅行。我沉浸在美丽的风景中，完全忘记了时间，当我决定回去时，太阳已经落山了。',
        keywords: ['park staff apologized', 'unexpected accident', 'Zhangjiajie', 'absorbed in scenery', 'sun set']
      },
      {
        text: 'Unfortunately, while I was trying to find the exit, my surroundings suddenly went completely dark.It was clear that the park had a power outage. I tried to use my phone\'s flashlight and check the map, but the battery ran out quickly.',
        translation: '不幸的是，当我试图找到出口时，我周围突然变得完全黑暗。很明显，公园停电了。我试图使用手机的手电筒并查看地图，但电池很快就耗尽了。',
        keywords: ['completely dark', 'power outage', 'phone flashlight', 'battery ran out']
      },
      {
        text: 'To be honest, I felt really anxious, scared, and completely lost at that moment. There was nothing I could do except waiting for the power to come back and hoping that someone would come to help.This was truly a very special waiting experience. I waited in the darkness for about half an hour. Finally, the lights turned back on, and I heard a park staff member shouting in the distance. He found me and guided me safely back to the main road.',
        translation: '说实话，那一刻我感到非常焦虑、害怕和完全迷失。除了等待电力恢复并希望有人来帮助之外，我什么都做不了。这确实是一次非常特殊的等待经历。我在黑暗中等了大约半小时。最后，灯又亮了，我听到远处有公园工作人员在喊。他找到了我并安全地引导我回到主干道。',
        keywords: ['anxious scared', 'waited half hour', 'staff guided safely']
      },
      {
        text: 'He explained that the power outage was due to an unexpected equipment failure and said he was truly sorry for the fear and inconvenience I had experienced.I felt relieved and told him it wasn\'t his fault. To be honest, his sincere apology and concern made me feel much better and more respected as a visitor. Looking back, it was both lucky and unlucky. This experience taught me to be better prepared for future trips, like carrying a flashlight and checking the route in advance.',
        translation: '他解释说停电是由于意外的设备故障，并说他对我经历的恐惧和不便感到非常抱歉。我感到如释重负，并告诉他这不是他的错。说实话，他真诚的道歉和关心让我作为游客感觉好多了，也更受尊重。回顾过去，这既幸运又不幸。这次经历教会我为未来的旅行做好更好的准备，比如带手电筒和提前检查路线。',
        keywords: ['equipment failure', 'truly sorry', 'sincere apology and concern', 'felt much better', 'better prepared']
      }
    ]
  },

  // 🏮 花木兰 组（粉红色）
  {
    id: 'traditional-story',
    title: '传统故事',
    storyGroup: '🏮 花木兰',
    topicType: '1-4月保留题',
    examTakers: 42,
    groupColor: 'bg-rose-100',
    question: 'Describe a traditional story from your country',
    questionCN: '描述一个你国家的传统故事',
    questionPoints: [
      { en: 'What the story is about', cn: '这个故事是关于什么的' },
      { en: 'When/How you knew it', cn: '你什么时候/怎么知道的' },
      { en: 'Who told you the story', cn: '是谁告诉你的故事' },
      { en: 'How you felt when you first heard it', cn: '你第一次听到这个故事时的感受' }
    ],
    answer: [
      {
        text: 'I\'d like to talk about a traditional story called Hua Mulan. Mulan is a famous woman in Chinese history, and her story happened a long time ago in ancient China. She disguised herself as a man and joined the army instead of her aging father. Fighting in a war was already very hard for men, but she had to hide her identity and fight bravely at the same time, which made it even more difficult. In the end, she completed her mission and returned in triumph.',
        translation: '我想谈谈一个叫花木兰的传统故事。木兰是中国历史上的一位著名女性，她的故事发生在很久以前的古代中国。她女扮男装，代替年迈的父亲参军。在战争中战斗对男人来说已经很困难了，但她必须同时隐藏身份并勇敢战斗，这使得它更加困难。最后，她完成了任务并凯旋而归。',
        keywords: ['Hua Mulan', 'disguised as man', 'joined army', 'aging father', 'hide identity', 'returned in triumph']
      },
      {
        text: 'I first knew about this story when I was in primary school, because there was a poem about Mulan in our textbook.My teacher explained how she took her father\'s place and served for many years, which left a deep impression on me. At home, my parents told me she was not only a good daughter but also a symbol of courage. As I grew older, I came across her story again through TV, operas and  movies. Mulan\'s story has gone beyond China and become known around the world.',
        translation: '我第一次知道这个故事是在小学时，因为我们的课本上有一首关于木兰的诗。我的老师解释了她如何代替父亲并服役多年，这给我留下了深刻的印象。在家里，我父母告诉我她不仅是一个好女儿，也是勇气的象征。随着年龄的增长，我通过电视、戏曲和电影再次接触到她的故事。木兰的故事已经超越了中国，在世界各地广为人知。',
        keywords: ['primary school', 'poem in textbook', 'took father\'s place', 'deep impression', 'symbol of courage', 'known around world']
      },
      {
        text: 'I was really shocked that Mulan had such great courage to protect her family and her country.She refused the emperor\'s offer and went home to care for her parents. I think this shows her kindness and makes me admire her even more. Even today,the story of Mulan is still studied by generations of students, and her spirit continues to inspire Chinese people to face challenges bravely.',
        translation: '我真的很震惊，木兰有这么大的勇气来保护她的家人和她的国家。她拒绝了皇帝的提议，回家照顾她的父母。我认为这显示了她的善良，让我更加钦佩她。即使在今天，木兰的故事仍然被几代学生研究，她的精神继续激励中国人勇敢面对挑战。',
        keywords: ['great courage', 'protect family and country', 'refused emperor offer', 'shows kindness', 'inspire face challenges bravely']
      }
    ]
  },
];
