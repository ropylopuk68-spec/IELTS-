// Part 2 事物类题目数据
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

export const part2ThingTopics: Part2Topic[] = [
  // 🧱 乐高玩具 组（橙色）
  {
    id: 'important-to-family',
    title: '对家庭重要的东西',
    storyGroup: '🧱 乐高玩具',
    topicType: '1-4月新题',
    examTakers: 119,
    groupColor: 'bg-orange-100',
    question: 'Describe something that is important to your family',
    questionCN: '描述对你家庭重要的东西',
    questionPoints: [
      { en: 'What it is', cn: '它是什么' },
      { en: 'When your family had it', cn: '什么时候拥有的' },
      { en: 'How your family got it', cn: '你的家庭是如何得到它的' },
      { en: 'Why it is important to your family', cn: '它为什么对你的家庭很重要' }
    ],
    answer: [
      {
        text: 'The thing I\'d like to talk about is a LEGO set, which was my favorite toy as a child. It was a birthday gift from my parents when I was about ten years old. Actually, it wasn\'t just a gift for me; it was a project for our whole family. I still remember every day after school, the first thing I did was to sit on the floor and connect the pieces with my parents. It took a lot of work, but the ship model looked great in the end. We all felt so proud and put it on the storage shelf to show it off.',
        translation: '我想谈论的东西是一套乐高玩具，这是我小时候最喜欢的玩具。这是我大约十岁时父母送给我的生日礼物。实际上，它不仅仅是给我的礼物；它是我们全家的项目。我仍然记得每天放学后，我做的第一件事就是坐在地板上和父母一起连接积木。这需要很多工作，但船模型最终看起来很棒。我们都感到非常自豪，并把它放在储物架上炫耀。',
        keywords: ['LEGO set', 'birthday gift', 'ten years old', 'project for whole family', 'connect pieces', 'felt so proud']
      },
      {
        text: 'Up until now, this LEGO ship has been kept in our home for over ten years. During this time, I have received many other birthday gifts, like dolls or other building blocks, but this one is very special and unique. I believe it\'s because this model is like a diary; it records our family time during my childhood, and more importantly, it has witnessed my growth and the changes in our family.',
        translation: '直到现在，这艘乐高船已经在我们家保存了十多年。在此期间，我收到了许多其他生日礼物，比如娃娃或其他积木，但这一个非常特殊和独特。我相信这是因为这个模型就像一本日记；它记录了我童年时期的家庭时光，更重要的是，它见证了我的成长和我们家庭的变化。',
        keywords: ['kept for over ten years', 'special and unique', 'like a diary', 'records family time', 'witnessed my growth']
      },
      {
        text: 'But unfortunately, a few weeks ago while I was cleaning the storage room, I knocked it off the shelf by mistake and it broke into many pieces. When I saw the mess on the floor, I was really shocked and felt so regretful. Actually, my father had reminded me many times that I should use a protective case, but I ignored his advice. Luckily, we still kept the original instruction manual from years ago. So, once again, my parents and I sat together and started connecting the pieces, and we finally fixed it successfully. This time, we put it in a display cabinet and added a protective case.',
        translation: '但不幸的是，几周前我在打扫储藏室时，不小心把它从架子上打翻了，它碎成了许多碎片。当我看到地板上的混乱时，我真的很震惊，感到非常后悔。实际上，我父亲多次提醒我应该使用保护罩，但我忽视了他的建议。幸运的是，我们仍然保留着多年前的原始说明书。所以，我和父母再次坐在一起，开始连接碎片，最终成功修复了它。这次，我们把它放在展示柜里，并添加了保护罩。',
        keywords: ['knocked off shelf', 'broke into pieces', 'shocked and regretful', 'kept instruction manual', 'fixed it successfully', 'protective case']
      },
      {
        text: 'This experience gave me a deeper emotional connection to this LEGO set. Now it carries not only my childhood memories but also the memory of fixing it together with my family, which makes it even more special.',
        translation: '这段经历让我与这套乐高玩具有了更深的情感联系。现在它不仅承载着我的童年记忆，还承载着与家人一起修复它的记忆，这使它更加特别。',
        keywords: ['deeper emotional connection', 'childhood memories', 'fixing together', 'even more special']
      }
    ]
  },

  {
    id: 'childhood-toy',
    title: '童年喜欢的玩具',
    storyGroup: '🧱 乐高玩具',
    topicType: '1-4月保留题',
    examTakers: 77,
    groupColor: 'bg-orange-100',
    question: 'Describe a toy you liked in your childhood',
    questionCN: '描述一个你童年喜欢的玩具',
    questionPoints: [
      { en: 'What kind of toy it is', cn: '这是什么玩具' },
      { en: 'When you received it', cn: '什么时候收到的' },
      { en: 'How you played it', cn: '你怎么玩它' },
      { en: 'How you felt about it', cn: '你对它的感觉如何' }
    ],
    answer: [
      {
        text: 'The thing I\'d like to talk about is a LEGO set, which was my favorite toy as a child. It was a birthday gift from my parents when I was about ten years old. Actually, it wasn\'t just a gift for me; it was a project for our whole family. I still remember every day after school, the first thing I did was to sit on the floor and connect the pieces with my parents. It took a lot of work, but the ship model looked great in the end. We all felt so proud and put it on the storage shelf to show it off.',
        translation: '我想谈论的东西是一套乐高玩具，这是我小时候最喜欢的玩具。这是我大约十岁时父母送给我的生日礼物。实际上，它不仅仅是给我的礼物；它是我们全家的项目。我仍然记得每天放学后，我做的第一件事就是坐在地板上和父母一起连接积木。这需要很多工作，但船模型最终看起来很棒。我们都感到非常自豪，并把它放在储物架上炫耀。',
        keywords: ['LEGO set', 'favorite toy', 'birthday gift', 'project for family', 'connect pieces', 'felt proud']
      },
      {
        text: 'Up until now, this LEGO ship has been kept in our home for over ten years. During this time, I have received many other birthday gifts, like dolls or other building blocks, but this one is very special and unique. I believe it\'s because this model is like a diary; it records our family time during my childhood, and more importantly, it has witnessed my growth and the changes in our family.',
        translation: '直到现在，这艘乐高船已经在我们家保存了十多年。在此期间，我收到了许多其他生日礼物，比如娃娃或其他积木，但这一个非常特殊和独特。我相信这是因为这个模型就像一本日记；它记录了我童年时期的家庭时光，更重要的是，它见证了我的成长和我们家庭的变化。',
        keywords: ['kept for ten years', 'special and unique', 'like a diary', 'witnessed my growth']
      },
      {
        text: 'But unfortunately, a few weeks ago while I was cleaning the storage room, I knocked it off the shelf by mistake and it broke into many pieces. When I saw the mess on the floor, I was really shocked and felt so regretful. Actually, my father had reminded me many times that I should use a protective case, but I ignored his advice. Luckily, we still kept the original instruction manual from years ago. So, once again, my parents and I sat together and started connecting the pieces, and we finally fixed it successfully. This time, we put it in a display cabinet and added a protective case.',
        translation: '但不幸的是，几周前我在打扫储藏室时，不小心把它从架子上打翻了，它碎成了许多碎片。当我看到地板上的混乱时，我真的很震惊，感到非常后悔。实际上，我父亲多次提醒我应该使用保护罩，但我忽视了他的建议。幸运的是，我们仍然保留着多年前的原始说明书。所以，我和父母再次坐在一起，开始连接碎片，最终成功修复了它。这次，我们把它放在展示柜里，并添加了保护罩。',
        keywords: ['knocked off shelf', 'broke into pieces', 'shocked regretful', 'fixed successfully', 'protective case']
      },
      {
        text: 'This experience gave me a deeper emotional connection to this LEGO set. Now it carries not only my childhood memories but also the memory of fixing it together with my family, which makes it even more special.',
        translation: '这段经历让我与这套乐高玩具有了更深的情感联系。现在它不仅承载着我的童年记忆，还承载着与家人一起修复它的记忆，这使它更加特别。',
        keywords: ['deeper connection', 'childhood memories', 'fixing together', 'more special']
      }
    ]
  },

  {
    id: 'old-family-item',
    title: '家中老物件',
    storyGroup: '🧱 乐高玩具',
    topicType: '1-4月保留题',
    examTakers: 91,
    groupColor: 'bg-orange-100',
    question: 'Describe an old item that your family has kept for a long time',
    questionCN: '描述你家保存很久的老物件',
    questionPoints: [
      { en: 'What it is', cn: '这是什么' },
      { en: 'How/When your family first got this thing', cn: '你的家庭第一次得到这个物品的时间/方式' },
      { en: 'How long your family has kept it', cn: '你的家庭拥有这个物品的时间有多长' },
      { en: 'Why this thing is important to your family', cn: '为什么这个物品对你们家庭来说很重要' }
    ],
    answer: [
      {
        text: 'The thing I\'d like to talk about is a LEGO set, which was my favorite toy as a child. It was a birthday gift from my parents when I was about ten years old. Actually, it wasn\'t just a gift for me; it was a project for our whole family. I still remember every day after school, the first thing I did was to sit on the floor and connect the pieces with my parents. It took a lot of work, but the ship model looked great in the end. We all felt so proud and put it on the storage shelf to show it off.',
        translation: '我想谈论的东西是一套乐高玩具，这是我小时候最喜欢的玩具。这是我大约十岁时父母送给我的生日礼物。实际上，它不仅仅是给我的礼物；它是我们全家的项目。我仍然记得每天放学后，我做的第一件事就是坐在地板上和父母一起连接积木。这需要很多工作，但船模型最终看起来很棒。我们都感到非常自豪，并把它放在储物架上炫耀。',
        keywords: ['LEGO set', 'birthday gift', 'project for family', 'connect pieces', 'felt proud']
      },
      {
        text: 'Up until now, this LEGO ship has been kept in our home for over ten years. During this time, I have received many other birthday gifts, like dolls or other building blocks, but this one is very special and unique. I believe it\'s because this model is like a diary; it records our family time during my childhood, and more importantly, it has witnessed my growth and the changes in our family.',
        translation: '直到现在，这艘乐高船已经在我们家保存了十多年。在此期间，我收到了许多其他生日礼物，比如娃娃或其他积木，但这一个非常特殊和独特。我相信这是因为这个模型就像一本日记；它记录了我童年时期的家庭时光，更重要的是，它见证了我的成长和我们家庭的变化。',
        keywords: ['kept for over ten years', 'special and unique', 'like a diary', 'witnessed growth']
      },
      {
        text: 'But unfortunately, a few weeks ago while I was cleaning the storage room, I knocked it off the shelf by mistake and it broke into many pieces. When I saw the mess on the floor, I was really shocked and felt so regretful. Actually, my father had reminded me many times that I should use a protective case, but I ignored his advice. Luckily, we still kept the original instruction manual from years ago. So, once again, my parents and I sat together and started connecting the pieces, and we finally fixed it successfully. This time, we put it in a display cabinet and added a protective case.',
        translation: '但不幸的是，几周前我在打扫储藏室时，不小心把它从架子上打翻了，它碎成了许多碎片。当我看到地板上的混乱时，我真的很震惊，感到非常后悔。实际上，我父亲多次提醒我应该使用保护罩，但我忽视了他的建议。幸运的是，我们仍然保留着多年前的原始说明书。所以，我和父母再次坐在一起，开始连接碎片，最终成功修复了它。这次，我们把它放在展示柜里，并添加了保护罩。',
        keywords: ['broke into pieces', 'shocked regretful', 'fixed successfully', 'protective case']
      },
      {
        text: 'This experience gave me a deeper emotional connection to this LEGO set. Now it carries not only my childhood memories but also the memory of fixing it together with my family, which makes it even more special.',
        translation: '这段经历让我与这套乐高玩具有了更深的情感联系。现在它不仅承载着我的童年记忆，还承载着与家人一起修复它的记忆，这使它更加特别。',
        keywords: ['deeper connection', 'childhood memories', 'fixing together', 'more special']
      }
    ]
  },

  {
    id: 'broke-something',
    title: '弄坏东西',
    storyGroup: '🧱 乐高玩具',
    topicType: '1-4月保留题',
    examTakers: 63,
    groupColor: 'bg-orange-100',
    question: 'Describe a time when you broke something',
    questionCN: '描述一次你弄坏东西的经历',
    questionPoints: [
      { en: 'What it was', cn: '是什么东西' },
      { en: 'When/Where that happened', cn: '什么时候/哪里发生' },
      { en: 'How you broke it', cn: '你是如何弄坏的' },
      { en: 'What you did after that', cn: '之后你做了什么' }
    ],
    answer: [
      {
        text: 'The thing I\'d like to talk about is a LEGO set, which was my favorite toy as a child. It was a birthday gift from my parents when I was about ten years old. Actually, it wasn\'t just a gift for me; it was a project for our whole family. I still remember every day after school, the first thing I did was to sit on the floor and connect the pieces with my parents. It took a lot of work, but the ship model looked great in the end. We all felt so proud and put it on the storage shelf to show it off.',
        translation: '我想谈论的东西是一套乐高玩具，这是我小时候最喜欢的玩具。这是我大约十岁时父母送给我的生日礼物。实际上，它不仅仅是给我的礼物；它是我们全家的项目。我仍然记得每天放学后，我做的第一件事就是坐在地板上和父母一起连接积木。这需要很多工作，但船模型最终看起来很棒。我们都感到非常自豪，并把它放在储物架上炫���。',
        keywords: ['LEGO set', 'favorite toy', 'birthday gift', 'project for family', 'felt proud']
      },
      {
        text: 'Up until now, this LEGO ship has been kept in our home for over ten years. During this time, I have received many other birthday gifts, like dolls or other building blocks, but this one is very special and unique. I believe it\'s because this model is like a diary; it records our family time during my childhood, and more importantly, it has witnessed my growth and the changes in our family.',
        translation: '直到现在，这艘乐高船已经在我们家保存了十多年。在此期间，我收到了许多其他生日礼物，比如娃娃或其他积木，但这一个非常特殊和独特。我相信这是因为这个模型就像一本日记；它记录了我童年时期的家庭时光，更重要的是，它见证了我的成长和我们家庭的变化。',
        keywords: ['kept for ten years', 'special unique', 'like a diary', 'witnessed growth']
      },
      {
        text: 'But unfortunately, a few weeks ago while I was cleaning the storage room, I knocked it off the shelf by mistake and it broke into many pieces. When I saw the mess on the floor, I was really shocked and felt so regretful. Actually, my father had reminded me many times that I should use a protective case, but I ignored his advice. Luckily, we still kept the original instruction manual from years ago. So, once again, my parents and I sat together and started connecting the pieces, and we finally fixed it successfully. This time, we put it in a display cabinet and added a protective case.',
        translation: '但不幸的是，几周前我在打扫储藏室时，不小心把它从架子上打翻了，它碎成了许多碎片。当我看到地板上的混乱时，我真的很震惊，感到非常后悔。实际上，我父亲多次提醒我应该使用保护罩，但我忽视了他的建议。幸运的是，我们仍然保留着多年前的原始说明书。所以，我和父母再次坐在一起，开始连接碎片，最终成功修复了它。这次，我们把它放在展示柜里，并添加了保护罩。',
        keywords: ['knocked off shelf', 'broke into pieces', 'shocked regretful', 'ignored advice', 'fixed successfully', 'protective case']
      },
      {
        text: 'This experience gave me a deeper emotional connection to this LEGO set. Now it carries not only my childhood memories but also the memory of fixing it together with my family, which makes it even more special.',
        translation: '这段经历让我与这套乐高玩具有了更深的情感联系。现在它不仅承载着我的童年记忆，还承载着与家人一起修复它的记忆，这使它更加特别。',
        keywords: ['deeper connection', 'childhood memories', 'fixing together', 'more special']
      }
    ]
  },
];
