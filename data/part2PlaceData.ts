// Part 2 地点类题目数据
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

export const part2PlaceTopics: Part2Topic[] = [
  // 🌲 森林公园 组（绿色）
  {
    id: 'natural-place',
    title: '自然之地',
    storyGroup: '🌲 森林公园',
    topicType: '1-4月保留题',
    examTakers: 35,
    groupColor: 'bg-green-100',
    question: 'Describe a natural place',
    questionCN: '描述一个自然之地',
    questionPoints: [
      { en: 'Where this place is', cn: '这个地方在哪里' },
      { en: 'How you knew this place', cn: '你怎么知道这个地方' },
      { en: 'What it is like', cn: '它是什么样的' },
      { en: 'Why you like to visit it', cn: '为什么你喜欢去那里' }
    ],
    analysis: `
      <p class="mb-4"><strong>📝 答题思路：</strong></p>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>第一段：</strong>介绍地点基本信息（位置、名称、如何了解）</li>
        <li><strong>第二段：</strong>描述去那里的方式和原因（自驾游、练习驾驶技能）</li>
        <li><strong>第三段：</strong>详细描述自然景观特点（生态系统、石峰、设施）</li>
        <li><strong>第四段：</strong>说明为什么喜欢这个地方（亲近自然、放松、与朋友共享回忆）</li>
      </ul>
      <p class="mb-4"><strong>🎯 核心要点：</strong></p>
      <ul class="list-disc list-inside space-y-2">
        <li>突出"自然"元素：森林、动植物、石峰、清新空气</li>
        <li>对比城市生活：noisy and crowded vs peaceful and natural</li>
        <li>个人感受：hear birds singing, connected to nature, slow down</li>
      </ul>
    `,
    keywordsMemo: [
      { emoji: '🌲', en: 'Forest Park', cn: '森林公园' },
      { emoji: '🚗', en: 'Self-driving', cn: '自驾游' },
      { emoji: '🏔️', en: 'Stone Peaks', cn: '石峰奇观' },
      { emoji: '🐦', en: 'Birds Singing', cn: '鸟鸣声' },
      { emoji: '😌', en: 'Slow Down', cn: '放慢节奏' },
      { emoji: '👥', en: 'Shared Memories', cn: '共同回忆' }
    ],
    answer: [
      {
        text: 'The place in nature I\'d like to talk about is Zhangjiajie National Forest Park, which is located in Hunan Province. Actually, it was the first national forest park in China, so it is famous. I first learned about this place from a travel documentary, and since then, I have been obsessed with its unique landscape. I plan to go there with some of my best friends during the next holiday.',
        translation: '我想谈论的自然之地是张家界国家森林公园，它位于湖南省。实际上，它是中国第一个国家森林公园，所以很有名。我第一次从旅游纪录片中了解到这个地方，从那以后，我就被它独特的景观所吸引。我计划在下个假期和我的一些最好的朋友去那里。',
        keywords: ['Zhangjiajie National Forest Park', 'Hunan Province', 'first national forest park', 'travel documentary', 'unique landscape']
      },
      {
        text: 'To be honest, I\'ve recently passed my driving test and got my driver\'s license, so I\'m really looking forward to a self-driving trip. I believe traveling by car will give us more freedom and flexibility; we can stop whenever we see a beautiful view along the way without being limited by bus schedules. Plus, I can practice my skills on those winding mountain roads.',
        translation: '说实话，我最近通过了驾驶考试并获得了驾照，所以我真的很期待自驾游。我相信开车旅行会给我们更多的自由和灵活性；我们可以在看到沿途美丽风景时随时停下来，而不受公交车时刻表的限制。另外，我可以在那些蜿蜒的山路上练习我的技能。',
        keywords: ['passed driving test', 'freedom and flexibility', 'stop whenever', 'winding mountain roads']
      },
      {
        text: 'Speaking of our destination, just like its name, it is a massive forest park. The ecosystem there is well-preserved, and you can find all kinds of rare plants and unique animals inside. The most amazing part is the stone peaks. There are thousands of tall stone columns. On cloudy days, they are hidden in the clouds, and it looks like a movie scene. Also, there is a famous outdoor elevator that can take us to the top of the mountains very quickly.',
        translation: '说到我们的目的地，就像它的名字一样，它是一个巨大的森林公园。那里的生态系统保存完好，你可以在里面找到各种稀有植物和独特的动物。最令人惊叹的部分是石峰。有数千根高大的石柱。在阴天，它们隐藏在云雾中，看起来像电影场景。此外，还有一个著名的户外电梯，可以很快把我们带到山顶。',
        keywords: ['massive forest park', 'well-preserved ecosystem', 'stone peaks', 'hidden in clouds', 'outdoor elevator']
      },
      {
        text: 'I think Zhangjiajie can provide exactly what I need—a place where I can hear birds singing and feel connected to nature. It is a world apart from the noisy and crowded city, and it will allow me to slow down and breathe deeply. I really want to enjoy this beautiful scenery with my friends and create more shared memories together. This road trip will be a perfect way for me to celebrate my new driving skills and enjoy the peaceful feeling.',
        translation: '我认为张家界可以提供我所需要的东西——一个我可以听到鸟儿歌唱并感受与大自然联系的地方。它与喧闹拥挤的城市完全不同，它将让我放慢脚步，深呼吸。我真的想和我的朋友一起享受这美丽的风景，一起创造更多共同的回忆。这次公路旅行将是我庆祝新驾驶技能和享受平静感觉的完美方式。',
        keywords: ['hear birds singing', 'connected to nature', 'slow down', 'shared memories']
      }
    ]
  },

  {
    id: 'long-journey',
    title: '想再去一次的远行',
    storyGroup: '🌲 森林公园',
    topicType: '1-4月保留题',
    examTakers: 56,
    groupColor: 'bg-green-100',
    question: 'Describe a long journey you would like to take again',
    questionCN: '描述一次你想再去一次的远行',
    questionPoints: [
      { en: 'When/Where you went', cn: '你去了哪里/什么时候去的' },
      { en: 'Who you had the journey with', cn: '你与谁一起旅行' },
      { en: 'Why you had the journey', cn: '你为什么旅行' },
      { en: 'Why you would like to have it again', cn: '你为什么想再次旅行' }
    ],
    analysis: `
      <p class="mb-4"><strong>📝 答题思路：</strong></p>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>第一段：</strong>介绍旅行目的地和背景（张家界、如何了解、计划与谁去）</li>
        <li><strong>第二段：</strong>说明选择自驾游的原因（刚拿驾照、自由灵活、练习技能）</li>
        <li><strong>第三段：</strong>详细描述目的地特色（森林公园、生态系统、石峰、设施）</li>
        <li><strong>第四段：</strong>说明为什么想再去一次（亲近自然、放松、与朋友共享回忆、庆祝驾驶技能）</li>
      </ul>
      <p class="mb-4"><strong>🎯 核心要点：</strong></p>
      <ul class="list-disc list-inside space-y-2">
        <li>强调"想再去"的理由：obsessed with, want to enjoy again</li>
        <li>突出旅行的独特价值：freedom, flexibility, shared memories</li>
        <li>个人成长元素：practice driving skills, celebrate achievement</li>
      </ul>
    `,
    keywordsMemo: [],
    answer: [
      {
        text: 'The long journey I want to have again is a road trip to Zhangjiajie, as it\'s a place that truly obsessed me. Actually, it was the first national forest park in China, so it is famous. I first learned about this place from a travel documentary, and since then, I have been obsessed with its unique landscape. I plan to go there with some of my best friends during the next holiday.',
        translation: '我想再次进行的长途旅行是去张家界的公路旅行，因为这是一个真正让我着迷的地方。实际上，它是中国第一个国家森林公园，所以很有名。我第一次从旅游纪录片中了解到这个地方，从那以后，我就被它独特的景观所吸引。我计划在下个假期和我的一些最好的朋友去那里。',
        keywords: ['road trip to Zhangjiajie', 'truly obsessed', 'first national forest park', 'unique landscape']
      },
      {
        text: 'To be honest, I\'ve recently passed my driving test and got my driver\'s license, so I\'m really looking forward to a self-driving trip. I believe traveling by car will give us more freedom and flexibility; we can stop whenever we see a beautiful view along the way without being limited by bus schedules. Plus, I can practice my skills on those winding mountain roads.',
        translation: '说实话，我最近通过了驾驶考试并获得了驾照，所以我真的很期待自驾游。我相信开车旅行会给我们更多的自由和灵活性；我们可以在看到沿途美丽风景时随时停下来，而不受公交车时刻表的限制。另外，我可以在那些蜿蜒的山路上练习我的技能。',
        keywords: ['passed driving test', 'freedom and flexibility', 'stop whenever', 'practice skills']
      },
      {
        text: 'Speaking of our destination, just like its name, it is a massive forest park. The ecosystem there is well-preserved, and you can find all kinds of rare plants and unique animals inside. The most amazing part is the stone peaks. There are thousands of tall stone columns. On cloudy days, they are hidden in the clouds, and it looks like a movie scene. Also, there is a famous outdoor elevator that can take us to the top of the mountains very quickly.',
        translation: '说到我们的目的地，就像它的名字一样，它是一个巨大的森林公园。那里的生态系统保存完好，你可以在里面找到各种稀有植物和独特的动物。最令人惊叹的部分是石峰。有数千根高大的石柱。在阴天，它们隐藏在云雾中，看起来像电影场景。此外，还有一个著名的户外电梯，可以很快把我们带到山顶。',
        keywords: ['massive forest park', 'stone peaks', 'hidden in clouds', 'outdoor elevator']
      },
      {
        text: 'I think Zhangjiajie can provide exactly what I need—a place where I can hear birds singing and feel connected to nature. It is a world apart from the noisy and crowded city, and it will allow me to slow down and breathe deeply. I really want to enjoy this beautiful scenery with my friends and create more shared memories together. This road trip will be a perfect way for me to celebrate my new driving skills and enjoy the peaceful feeling.',
        translation: '我认为张家界可以提供我所需要的东西——一个我可以听到鸟儿歌唱并感受与大自然联系的地方。它与喧闹拥挤的城市完全不同，它将让我放慢脚步，深呼吸。我真的想和我的朋友一起享受这美丽的风景，一起创造更多共同的回忆。这次公路旅行将是我庆祝新驾驶技能和享受平静感觉的完美方式。',
        keywords: ['connected to nature', 'slow down', 'shared memories', 'celebrate driving skills']
      }
    ]
  },

  {
    id: 'vehicle-trip',
    title: '自行车/摩托车/汽车旅行',
    storyGroup: '🌲 森林公园',
    topicType: '1-4月新题',
    examTakers: 35,
    groupColor: 'bg-green-100',
    question: 'Describe a trip you took by bike/motorbike/car',
    questionCN: '描述一次自行车/摩托车/汽车旅行',
    questionPoints: [
      { en: 'Who you would like to go with', cn: '你想和谁一起去' },
      { en: 'Where you would like to go', cn: '你想去哪里' },
      { en: 'When you would like to go', cn: '你想什么时候去' },
      { en: 'Why you would like to go by bicycle/motrocycle/car', cn: '为什么想骑自行车/摩托车/汽车去' }
    ],
    analysis: `
      <p class="mb-4"><strong>📝 答题思路：</strong></p>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>第一段：</strong>介绍计划的旅行目的地和背景（张家界、如何了解、与谁去）</li>
        <li><strong>第二段：</strong>说明选择该交通工具的原因（刚拿驾照、自由灵活、练习技能）</li>
        <li><strong>第三段：</strong>详细描述目的地特色（森林公园、生态系统、石峰、设施）</li>
        <li><strong>第四段：</strong>说明这次旅行的意义（亲近自然、与朋友共享回忆、庆祝成就）</li>
      </ul>
      <p class="mb-4"><strong>🎯 核心要点：</strong></p>
      <ul class="list-disc list-inside space-y-2">
        <li>突出交通方式的优势：freedom and flexibility, stop whenever</li>
        <li>个人成长元素：passed driving test, practice skills, celebrate</li>
        <li>旅行的情感价值：shared memories, peaceful feeling</li>
      </ul>
    `,
    keywordsMemo: [],
    answer: [
      {
        text: 'I\'d like to talk about a self-driving trip I plan to take to Zhangjiajie National Forest Park by car. Actually, it was the first national forest park in China, so it is famous. I first learned about this place from a travel documentary, and since then, I have been obsessed with its unique landscape. I plan to go there with some of my best friends during the next holiday.',
        translation: '我想谈谈我计划开车去张家界国家森林公园的自驾游。实际上，它是中国第一个国家森林公园，所以很有名。我第一次从旅游纪录片中了解到这个地方，从那以后，我就被它独特的景观所吸引。我计划在下个假期和我的一些最好的朋友去那里。',
        keywords: ['self-driving trip', 'Zhangjiajie National Forest Park', 'first national forest park', 'travel documentary', 'unique landscape']
      },
      {
        text: 'To be honest, I\'ve recently passed my driving test and got my driver\'s license, so I\'m really looking forward to a self-driving trip. I believe traveling by car will give us more freedom and flexibility; we can stop whenever we see a beautiful view along the way without being limited by bus schedules. Plus, I can practice my skills on those winding mountain roads.',
        translation: '说实话，我最近通过了驾驶考试并获得了驾照，所以我真的很期待自驾游。我相信开车旅行会给我们更多的自由和灵活性；我们可以在看到沿途美丽风景时随时停下来，而不受公交车时刻表的限制。另外，我可以在那些蜿蜒的山路上练习我的技能。',
        keywords: ['passed driving test', 'driver\'s license', 'freedom and flexibility', 'stop whenever', 'winding mountain roads']
      },
      {
        text: 'Speaking of our destination, just like its name, it is a massive forest park. The ecosystem there is well-preserved, and you can find all kinds of rare plants and unique animals inside. The most amazing part is the stone peaks. There are thousands of tall stone columns. On cloudy days, they are hidden in the clouds, and it looks like a movie scene. Also, there is a famous outdoor elevator that can take us to the top of the mountains very quickly.',
        translation: '说到我们的目的地，就像它的名字一样，它是一个巨大的森林公园。那里的生态系统保存完好，你可以在里面找到各种稀有植物和独特的动物。最令人惊叹的部分是石峰。有数千根高大的石柱。在阴天，它们隐藏在云雾中，看起来像电影场景。此外，还有一个著名的户外电梯，可以很快把我们带到山顶。',
        keywords: ['massive forest park', 'well-preserved ecosystem', 'stone peaks', 'hidden in clouds', 'outdoor elevator']
      },
      {
        text: 'I think Zhangjiajie can provide exactly what I need—a place where I can hear birds singing and feel connected to nature. It is a world apart from the noisy and crowded city, and it will allow me to slow down and breathe deeply. I really want to enjoy this beautiful scenery with my friends and create more shared memories together. This road trip will be a perfect way for me to celebrate my new driving skills and enjoy the peaceful feeling.',
        translation: '我认为张家界可以提供我所需要的东西——一个我可以听到鸟儿歌唱并感受与大自然联系的地方。它与喧闹拥挤的城市完全不同，它将让我放慢脚步，深呼吸。我真的想和我的朋友一起享受这美丽的风景，一起创造更多共同的回忆。这次公路旅行将是我庆祝新驾驶技能和享受平静感觉的完美方式。',
        keywords: ['hear birds singing', 'connected to nature', 'slow down', 'shared memories', 'celebrate driving skills']
      }
    ]
  },

  // 🏛️ 鸟巢 组（灰色）
  {
    id: 'interesting-building',
    title: '有趣的建筑',
    storyGroup: '🏛️ 鸟巢',
    topicType: '1-4月新题',
    examTakers: 112,
    groupColor: 'bg-gray-100',
    question: 'Describe an interesting building you have visited',
    questionCN: '描述一个你参观过的有趣建筑',
    questionPoints: [
      { en: 'Where it is', cn: '在哪里' },
      { en: 'What it looks like', cn: '它看起来怎么样' },
      { en: 'What function it has', cn: '它有什么功能' },
      { en: 'Why you think it is interesting', cn: '为什么你认为它有趣' }
    ],
    answer: [
      {
        text: 'I\'d like to talk about the National Stadium in Beijing, which is widely known as the Bird\'s Nest. It is located in the north of the city, inside the massive Olympic Park. I first saw this building on TV during the opening ceremony of the 2008 Olympics, and I was immediately obsessed with its unique look.',
        translation: '我想谈谈北京的国家体育场，它被广泛称为鸟巢。它位于城市的北部，在巨大的奥林匹克公园内。我第一次在2008年奥运会开幕式上在电视上看到这座建筑，我立即被它独特的外观所吸引。',
        keywords: ['National Stadium', 'Bird\'s Nest', 'Olympic Park', '2008 Olympics', 'unique look']
      },
      {
        text: 'In my opinion, it is not just a building; I feel it is a giant piece of art. The architects didn\'t use any traditional walls or a roof. Instead, they used thousands of long metal bars that cross each other in a messy but beautiful way. This unique structure makes the stadium look like a real nest and gives people a strong visual impact.',
        translation: '在我看来，它不仅仅是一座建筑；我觉得它是一件巨大的艺术品。建筑师没有使用任何传统的墙壁屋顶相反，他们使用了数千根长金属条，以一种凌乱但美丽的方式相互交叉。这种独特的结构使体育场看起来像一个真正的鸟巢，给人强烈的视觉冲击。',
        keywords: ['giant piece of art', 'metal bars cross each other', 'unique structure', 'strong visual impact']
      },
      {
        text: 'It is now a top-level venue for world-class sports events and large-scale performances. Actually, the stadium is also being developed for business and exhibitions. I went there for a pop concert recently, and the experience was incredible. Because the stadium is so huge, it has a powerful atmosphere that you can\'t find in smaller places. When tens of thousands of people waved their light sticks together, the entire stadium looked like a sea of stars. The sound was so loud that I could feel the music shaking my heart, and it made me feel really excited.',
        translation: '它现在是世界级体育赛事和大型演出的顶级场馆。实际上，体育场也正在开发商业和展览功能。我最近去那里参加了一场流行音乐会，体验非常棒。因为体育场非常巨大，它具有在较小场所找不到的强大氛围。当成千上万的人一起挥舞荧光棒时，整个体育场看起来像星海。声音如此响亮，我可以感觉到音乐震撼我的心，这让我感到非常兴奋。',
        keywords: ['top-level venue', 'pop concert', 'powerful atmosphere', 'sea of stars', 'feel really excited']
      },
      {
        text: 'The reason it is so special to me is that it represents a special memory of the 2008 Olympics. For Chinese people, it is a symbol of pride and shows how much the country has achieved and changed. Every time I stand there, I feel connected to the history of my country and enjoy the peaceful but powerful feeling it brings.',
        translation: '它对我如此特别的原因是它代表了2008年奥运会的特殊记忆。对中国人来说，它是自豪的象征，展示了国家取得了多少成就和变化。每次我站在那里，我都感到与我国的历史联系在一起，并享受它带来的平静但强大的感觉。',
        keywords: ['special memory', 'symbol of pride', 'connected to history', 'peaceful but powerful']
      }
    ]
  },

  // 🦁 动物园 组（黄色）
  {
    id: 'wild-animal',
    title: '想了解的野生动物',
    storyGroup: '🦁 动物园',
    topicType: '1-4月保留题',
    examTakers: 70,
    groupColor: 'bg-yellow-100',
    question: 'Describe a wild animal you would like to learn more about',
    questionCN: '描述一个你想了解更多的野生动物',
    questionPoints: [
      { en: 'What it is', cn: '它是什么' },
      { en: 'When/Where you saw it', cn: '你在哪里/什么时候看到它的' },
      { en: 'Why you want to learn more about it', cn: '你为什么想了解更多关于它的信息' },
      { en: 'What you want to learn more about it', cn: '你想要了解更多关于它的什么' }
    ],
    answer: [
      {
        text: 'The wild animal I want to learn more about is the elephant, which I first saw during a trip to the zoo. Last summer, I went on a trip to Beijing with my mother, and one of the places we visited was the Beijing Zoo. We saw a wide variety of animals, including monkeys swinging between trees, pandas chewing bamboo, and tigers resting in the shade.',
        translation: '我想了解更多的野生动物是大象，我第一次在动物园旅行时看到它。去年夏天，我和妈妈去北京旅行，我们参观的地方之一是北京动物园。我们看到了各种各样的动物，包括在树间摆动的猴子、咀嚼竹子的熊猫和在阴凉处休息的老虎。',
        keywords: ['elephant', 'trip to zoo', 'Beijing Zoo', 'wide variety of animals']
      },
      {
        text: 'One of the animals that really caught my attention was an elephant. It was kept in a relatively small enclosure, and I noticed it was walking back and forth constantly and even banging its head against the wall. It made me feel quite uncomfortable. I realized that although zoos aim to protect animals, some of them don\'t provide an environment that truly resembles their natural habitat.',
        translation: '真正引起我注意的动物之一是一头大象。它被关在一个相对较小的围栏里，我注意到它不断地来回走动，甚至用头撞墙。这让我感到很不舒服。我意识到，尽管动物园旨在保护动物，但其中一些动物园没有提供真正类似于它们自然栖息地的环境。',
        keywords: ['caught attention', 'small enclosure', 'walking back and forth', 'banging head', 'uncomfortable']
      },
      {
        text: 'After I got home, I searched online for more information about elephants, including their natural habitats, diet, and living conditions. I also wanted to understand the difference between life in the wild and life in a zoo, and how zoos could provide better space and activities for elephants to keep them healthy.',
        translation: '回家后，我在网上搜索了更多关于大象的信息，包括它们的自然栖息地、饮食和生活条件。我还想了解野外生活和动物园生活之间的区别，以及动物园如何提供更好的空间和活动来保持大象健康。',
        keywords: ['searched online', 'natural habitats', 'diet living conditions', 'better space and activities']
      },
      {
        text: 'I also put all the information I found into a post and shared it online. I hoped more people could see it, learn about the situation of elephants, care about them, and protect them. In the end, I truly wish all wild animals can live freely and safely in a place that suits them.',
        translation: '我还把我找到的所有信息放进一篇帖子并在网上分享。我希望更多的人可以看到它，了解大象的情况，关心它们并保护它们。最后，我真心希望所有野生动物都能在适合它们的地方自由安全地生活。',
        keywords: ['shared online', 'learn about situation', 'care and protect', 'live freely and safely']
      }
    ]
  },

  {
    id: 'animal-place',
    title: '看到动物的地方',
    storyGroup: '🦁 动物园',
    topicType: '9-12月',
    examTakers: 28,
    groupColor: 'bg-yellow-100',
    question: 'Describe a place where you saw animals',
    questionCN: '描述一个你看到动物的地方',
    questionPoints: [
      { en: 'when u went', cn: '什么时候去的' },
      { en: 'who u went with', cn: '和谁一起去的' },
      { en: 'what animals u saw', cn: '看到了什么动物' },
      { en: 'how u felt about', cn: '对此有什么感觉' }
    ],
    answer: [
      {
        text: 'A place where I saw animals that left a deep impression on me was the Beijing Zoo during my summer trip. Last summer, I went on a trip to Beijing with my mother, and one of the places we visited was the Beijing Zoo. We saw a wide variety of animals, including monkeys swinging between trees, pandas chewing bamboo, and tigers resting in the shade.',
        translation: '一个让我印象深刻的看到动物的地方是我夏季旅行期间的北京动物园。去年夏天，我和妈妈去北京旅行，我们参观的地方之一是北京动物园。我们看到了各种各样的动物，包括在树间摆动的猴子、咀嚼竹子的熊猫和在阴凉处休息的老虎。',
        keywords: ['Beijing Zoo', 'summer trip', 'wide variety', 'monkeys pandas tigers']
      },
      {
        text: 'One of the animals that really caught my attention was an elephant. It was kept in a relatively small enclosure, and I noticed it was walking back and forth constantly and even banging its head against the wall. It made me feel quite uncomfortable. I realized that although zoos aim to protect animals, some of them don\'t provide an environment that truly resembles their natural habitat.',
        translation: '真正引起我注意的动物之一是一头大象。它被关在一个相对较小的围栏里，我注意到它不断地来回走动，甚至用头撞墙。这让我感到很不舒服。我意识到，尽管动物园旨在保护动物，但其中一些动物园没有提供真正类似于它们自然栖息地的环境。',
        keywords: ['elephant', 'small enclosure', 'walking back and forth', 'uncomfortable']
      },
      {
        text: 'After I got home, I searched online for more information about elephants, including their natural habitats, diet, and living conditions. I also wanted to understand the difference between life in the wild and life in a zoo, and how zoos could provide better space and activities for elephants to keep them healthy.',
        translation: '回家后，我在网上搜索了更多关于大象的信息，包括它们的自然栖息地、饮食和生活条件。我还想了解野外生活和动物园生活之间的区别，以及动物园如何提供更好的空间和活动来保持大象健康。',
        keywords: ['searched online', 'natural habitats', 'better space and activities']
      },
      {
        text: 'I also put all the information I found into a post and shared it online. I hoped more people could see it, learn about the situation of elephants, care about them, and protect them. In the end, I truly wish all wild animals can live freely and safely in a place that suits them.',
        translation: '我还把我找到的所有信息放进一篇帖子并在网上分享。我希望更多的人可以看到它，了解大象的情况，关心它们并保护它们。最后，我真心希望所有野生动物都能在适合它们的地方自由安全地生活。',
        keywords: ['shared online', 'care and protect', 'live freely and safely']
      }
    ]
  },

  // 🏀 运动场 组（蓝色）
  {
    id: 'outdoor-activity-place',
    title: '户外活动之地',
    storyGroup: '🏀 运动场',
    topicType: '9-12月保留题',
    examTakers: 84,
    groupColor: 'bg-blue-100',
    question: 'Describe a place where you did outdoor activities',
    questionCN: '描述一个你进行户外活动的地方',
    questionPoints: [
      { en: 'Where it was', cn: '在哪里' },
      { en: 'When u went there', cn: '你什么时候去' },
      { en: 'What outdoor activity u did there', cn: '你在那里做了什么户外活动' },
      { en: 'Why u went there and did the activity', cn: '你为什么去那里做这个活动' },
      { en: 'How u felt about it', cn: '你对这个活动有什么感觉' }
    ],
    answer: [
      {
        text: 'One outdoor place I really enjoy is the sports ground near my university. It\'s quite spacious, with a running track, football field, basketball courts, and some open areas for stretching or yoga. I usually go there in the late afternoon, especially after class or on weekends when I need to relax or move around a bit.',
        translation: '我真正喜欢的一个户外场所是我大学附近的运动场。它相当宽敞，有跑道、足球场、篮球场和一些开放区域可以做伸展运动或瑜伽。我通常在傍晚去那里，特别是下课后或周末需要放松或活动一下时。',
        keywords: ['sports ground', 'near university', 'quite spacious', 'running track', 'late afternoon']
      },
      {
        text: 'The last time I went there was about a week ago. I did some light jogging for about 30 minutes, and then joined a few classmates for a casual game of badminton. It wasn\'t anything too intense, but we laughed a lot and really enjoyed the time together. The weather was perfect that day — sunny but not too hot — which made the whole experience even better.',
        translation: '我上次去那里是大约一周前。我做了大约30分钟的轻松慢跑，然后和几个同学一起打了一场随意的羽毛球比赛。这不是什么太激烈的运动，但我们笑了很多，真的很享受在一起的时光。那天天气完美——阳光明媚但不太热——这让整个体验更好。',
        keywords: ['week ago', 'light jogging', 'badminton', 'laughed a lot', 'perfect weather']
      },
      {
        text: 'I chose to do outdoor activities there because it\'s free, close to campus, and gives me a great balance between exercise and socializing. After spending long hours studying indoors, I feel refreshed just being outside, breathing fresh air, and moving my body. Honestly, every time I go, I leave in a better mood. It helps me clear my head, reduce stress, and sleep better at night.',
        translation: '我选择在那里进行户外活动，因为它是免费的，靠近校园，并在运动和社交之间给我很好的平衡。在室内学习很长时间后，我只是在外面，呼吸新鲜空气，移动身体，就感到精神焕发。老实说，每次我去，我都会心情更好地离开。它帮助我清理思绪，减轻压力，晚上睡得更好。',
        keywords: ['free close to campus', 'balance exercise socializing', 'feel refreshed', 'clear head reduce stress']
      },
      {
        text: 'This kind of outdoor exercise has become an important part of my weekly routine. I always feel more positive and motivated afterward, and I think having access to a place like this really improves my overall well-being.',
        translation: '这种户外运动已经成为我每周例行活动的重要部分。我总是在之后感到更积极和有动力，我认为能够使用这样的地方真的改善了我的整体健康。',
        keywords: ['important part', 'weekly routine', 'more positive motivated', 'improves well-being']
      }
    ]
  },

  {
    id: 'popular-sports-place',
    title: '受欢迎的运动场所',
    storyGroup: '🏀 运动场',
    topicType: '9-12月保留题',
    examTakers: 35,
    groupColor: 'bg-blue-100',
    question: 'Describe a popular place for sports',
    questionCN: '描述一个受欢迎的运动场所',
    questionPoints: [
      { en: 'Where it is', cn: '这个地方在哪里' },
      { en: 'When u went there', cn: '你什么时候去的' },
      { en: 'what u did there', cn: '你在那里做了什么' },
      { en: 'How u felt about this place', cn: '你对这个地方的感觉如何' }
    ],
    answer: [
      {
        text: 'One outdoor place I really enjoy is the sports ground near my university. It\'s quite spacious, with a running track, football field, basketball courts, and some open areas for stretching or yoga. I usually go there in the late afternoon, especially after class or on weekends when I need to relax or move around a bit.',
        translation: '我真正喜欢的一户外场所是大学附近的运动场。它相当宽敞，有跑道、足球场、篮球场和一些开放区域可以做伸展运动或瑜伽。我通常在傍晚去那里，特别是下课后或周末需要放松或活动一下时。',
        keywords: ['sports ground', 'near university', 'quite spacious', 'late afternoon']
      },
      {
        text: 'The last time I went there was about a week ago. I did some light jogging for about 30 minutes, and then joined a few classmates for a casual game of badminton. It wasn\'t anything too intense, but we laughed a lot and really enjoyed the time together. The weather was perfect that day — sunny but not too hot — which made the whole experience even better.',
        translation: '我上次去那里是大约一周前。我做了大约30分钟的轻松慢跑，然后和几个同学一起打了一场随意的羽毛球比赛。这不是什么太激烈的运动，但我们笑了很多，真的很享受在一起的时光。那天天气完美——阳光明媚但不太热——这让整个体验更好。',
        keywords: ['week ago', 'light jogging', 'badminton', 'perfect weather']
      },
      {
        text: 'I chose to do outdoor activities there because it\'s free, close to campus, and gives me a great balance between exercise and socializing. After spending long hours studying indoors, I feel refreshed just being outside, breathing fresh air, and moving my body. Honestly, every time I go, I leave in a better mood. It helps me clear my head, reduce stress, and sleep better at night.',
        translation: '我选择在那里进行户外活动，因为它是免费的，靠近校园，并在运动和社交之间给我很好的平衡。在室内学习很长时间后，我只是在外面，呼吸新鲜空气，移动身体，就感到精神焕发。老实说，每次我去，我都会心情更好地离开。它帮助我清理思绪，减轻压力，晚上睡得更好。',
        keywords: ['free close to campus', 'balance exercise socializing', 'feel refreshed', 'clear head']
      },
      {
        text: 'This kind of outdoor exercise has become an important part of my weekly routine. I always feel more positive and motivated afterward, and I think having access to a place like this really improves my overall well-being.',
        translation: '这种户外运动已经成为我每周例行活动的重要部分。我总是在之后感到更积极和有动力，我认为能够使用这样的地方真的改善了我的整体健康。',
        keywords: ['weekly routine', 'positive motivated', 'improves well-being']
      }
    ]
  },

  // 🏛️ 泉州 组（紫色）
  {
    id: 'city-revisit',
    title: '想再去一次的城市',
    storyGroup: '🏛️ 泉州',
    topicType: '9-12月保留题',
    examTakers: 91,
    groupColor: 'bg-purple-100',
    question: 'Describe a city you would like to visit again',
    questionCN: '描述一个你想再去一次的城市',
    questionPoints: [
      { en: 'When u visit', cn: '什么时候去的' },
      { en: 'What you did there', cn: '在那里做了什么' },
      { en: 'What it was like', cn: '它是什么样的' },
      { en: 'Why u would like to visit again', cn: '为什么想再去一次' }
    ],
    answer: [
      {
        text: 'One of the most memorable places I\'ve visited in recent years is Quanzhou, a beautiful city in Fujian Province. I went there after graduating from university with my roommates, as a way to celebrate the end of our studies. I had seen many photos and videos of quanzhou on social media, so I was really looking forward to the trip.',
        translation: '近年来我访问过的最难忘的地方之一是泉州，福建省的一座美丽城市。我大学毕业后和室友一起去那里，作为庆祝学业结束的方式。我在社交媒体上看过许多泉州的照片和视频，所以我真的很期待这次旅行。',
        keywords: ['Quanzhou', 'Fujian Province', 'after graduating', 'celebrate', 'looking forward']
      },
      {
        text: 'During the trip, we visited several well-known museums that showed the city\'s rich past as one of China\'s biggest ancient ports.We learned a lot about the Silk Road and saws some ship models — it was really eye-opening. We also took a walk along the beach. As someone from northern China, it was actually my first time seeing the sea,and I was totally amazed.',
        translation: '旅行期间，我们参观了几个著名的博物馆，这些博物馆展示了这座城市作为中国最大的古代港口之一的丰富历史。我们了解了很多关于丝绸之路的知识，看到了一些船模型——这真的让人大开眼界。我们还沿着海滩散步。作为来自中国北方的人，这实际上是我第一次看到大海，我完全被惊呆了。',
        keywords: ['well-known museums', 'ancient ports', 'Silk Road', 'first time seeing sea', 'totally amazed']
      },
      {
        text: 'What impresses me is that Quanzhou doesn\'t feel overly commercialized like some big cities.The streets are quiet, the buildings have a historical style, and you can see elderly people sitting outside their homes, chatting or playing chess. The pace of life there is really slow and calming. It feels like time moves more slowly.',
        translation: '让我印象深刻的是，泉州不像一些大城市那样过度商业化。街道很安静，建筑物具有历史风格，你可以看到老年人坐在家外面，聊天或下棋。那里的生活节奏真的很慢很平静。感觉时间移动得更慢。',
        keywords: ['not overly commercialized', 'quiet streets', 'historical style', 'slow and calming', 'time moves slowly']
      },
      {
        text: 'I\'d love to go back again one day, maybe with my family. Compared to many tourist cities, Quanzhou has its own unique charm ,whether you\'re into history, food, or just want to relax, you\'ll find something to love there.',
        translation: '我希望有一天能再回去，也许和我的家人一起。与许多旅游城市相比，泉州有其独特的魅力，无论你喜欢历史、美食，还是只是想放松，你都会在那里找到喜欢的东西。',
        keywords: ['go back with family', 'unique charm', 'history food relax', 'find something to love']
      }
    ]
  },

  {
    id: 'recommend-tourist-place',
    title: '向游客推荐本国旅游地',
    storyGroup: '🏛️ 泉州',
    topicType: '9-12月保留题',
    examTakers: 49,
    groupColor: 'bg-purple-100',
    question: 'Describe a tourist place in your country that you would recommend',
    questionCN: '描述一个你会推荐的本国旅游地',
    questionPoints: [
      { en: 'What it is', cn: '是什么' },
      { en: 'Where it is', cn: '它在哪里' },
      { en: 'What people can do there', cn: '人们可以在那里做什么' },
      { en: 'Why you like to recommend it to visitors', cn: '为什么你向游客推荐它' }
    ],
    answer: [
      {
        text: 'One of the most memorable places I\'ve visited in recent years is Quanzhou, a beautiful city in Fujian Province. I went there after graduating from university with my roommates, as a way to celebrate the end of our studies. I had seen many photos and videos of quanzhou on social media, so I was really looking forward to the trip.',
        translation: '近年来我访问过的最难忘的地方之一是泉州，福建省的一座美丽城市。我大学毕业后和室友一起去那里，作为庆祝学业结束的方式。我在社交媒体上看过许多泉州的照片和视频，所以我真的很期待这次旅行。',
        keywords: ['Quanzhou', 'Fujian Province', 'after graduating', 'looking forward']
      },
      {
        text: 'During the trip, we visited several well-known museums that showed the city\'s rich past as one of China\'s biggest ancient ports.We learned a lot about the Silk Road and saws some ship models — it was really eye-opening. We also took a walk along the beach. As someone from northern China, it was actually my first time seeing the sea,and I was totally amazed.',
        translation: '旅行期间，我们参观了几个著名的博物馆，这些博物馆展示了这座城市作为中国最大的古代港口之一的丰富历史。我们了解了很多关于丝绸之路的知识，看到了一些船模型——这真的让人大开眼界。我们还沿着海滩散步。作为来自中国北方的人，这实际上是我第一次看到大海，我完全被惊呆了。',
        keywords: ['well-known museums', 'Silk Road', 'first time seeing sea', 'totally amazed']
      },
      {
        text: 'What impresses me is that Quanzhou doesn\'t feel overly commercialized like some big cities.The streets are quiet, the buildings have a historical style, and you can see elderly people sitting outside their homes, chatting or playing chess. The pace of life there is really slow and calming. It feels like time moves more slowly.',
        translation: '让我印象深刻的是，泉州不像一些大城市那样过度商业化。街道很安静，建筑物具有历史风格，你可以看到老年人坐在家外面，聊天或下棋。那里的生活节奏真的很慢很平静。感觉时间移动得更慢。',
        keywords: ['not overly commercialized', 'historical style', 'slow and calming']
      },
      {
        text: 'I\'d love to go back again one day, maybe with my family. Compared to many tourist cities, Quanzhou has its own unique charm ,whether you\'re into history, food, or just want to relax, you\'ll find something to love there.',
        translation: '我希望有一天能再回去，也许和我的家人一起。与许多旅游城市相比，泉州有其独特的魅力，无论你喜欢历史、美食，还是只是想放松，你都会在那里找到喜欢的东西。',
        keywords: ['unique charm', 'history food relax', 'find something to love']
      }
    ]
  },

  // 🏡 朋友的家 组（橙色）
  {
    id: 'relax-at-home',
    title: '家里放松的地方',
    storyGroup: '🏡 朋友的家',
    topicType: '非大陆地区1-4月新题',
    examTakers: 77,
    groupColor: 'bg-orange-100',
    question: 'Describe a place in your home where you relax',
    questionCN: '描述家里一个让你放松的地方',
    questionPoints: [
      { en: 'Where it is', cn: '它在哪里' },
      { en: 'What it is like', cn: '它是什么样的' },
      { en: 'What you enjoy doing there', cn: '你喜欢在那里做什么' },
      { en: 'Why you feel relaxed at this place', cn: '为什么你觉得这个地方让你放松' }
    ],
    answer: [
      {
        text: 'The place I\'d love to talk about is my best friend Linda\'s home. Since we\'ve been very close for years, I go there almost every weekend or on holidays. To be honest, it\'s basically become my \'second home\'.',
        translation: '我想谈论的地方是我最好的朋友琳达的家。由于我们多年来一直非常亲密，我几乎每个周末或假期都去那里。说实话，它基本上已经成为我的"第二个家"。',
        keywords: ['best friend Linda\'s home', 'very close for years', 'every weekend', 'second home']
      },
      {
        text: 'I still remember my first visit there, I was a bit worried because it seemed quite far away and I thought life there wouldn\'t be very convenient. However, as soon as I arrived, I was immediately attracted by the environment. The house is located in the suburbs, totally away from all the traffic and noise. Actually, the whole building is surrounded by a small forest park, so the air is super fresh and you can hear the clear sound of birds singing. This kind of quiet atmosphere gives me a sense of relaxation and safety that I just can\'t find in the city. It\'s the perfect way to slowly recharge and get more energy for the week.',
        translation: '我仍然记得我第一次去那里时，我有点担心，因为它似乎很远，我认为那里的生活不会很方便。然而，我一到达，就立即被环境所吸引。房子位于郊区，完全远离所有交通和噪音。实际上，整栋建筑被一个小森林公园环绕，所以空气超级新鲜，你可以听到清晰的鸟鸣声。这种安静的氛围给我一种我在城市里找不到的放松和安全感。这是慢慢充电并为一周获得更多能量的完美方式。',
        keywords: ['first visit', 'located in suburbs', 'surrounded by forest park', 'super fresh air', 'birds singing', 'relaxation and safety']
      },
      {
        text: 'The inside of the house is just as great, especially one cozy movie corner in the living room. This corner is made up of a projector, a huge screen, blackout curtains, and a great sound system, which together create a mini immersive home cinema. And instead of regular chairs, there\'s a giant, soft sofa that feels like a warm hug, so you can just sink into it and feel totally embraced. We usually turn off all the lights, grab some snacks, and get lost in a movie for hours. It\'s the absolute favorite spot for me to escape from reality and feel like I\'m in another world. Sometimes we invite a few friends over to watch films together, which is a great way to bring us closer in such a fantastic atmosphere.',
        translation: '房子的内部同样很棒，尤其是客厅里一个舒适的电影角落。这个角落由投影仪、巨大的屏幕、遮光窗帘和出色的音响系统组成，它们共同创造了一个小型沉浸式家庭影院。而且不是普通的椅子，而是一个巨大、柔软的沙发，感觉像温暖的拥抱，所以你可以沉入其中并感到完全被拥抱。我们通常会关掉所有灯，拿些零食，在电影中迷失几个小时。这是我逃离现实并感觉像在另一个世界的绝对最喜欢的地方。有时我们邀请几个朋友过来一起看电影，这是在如此美妙的氛围中拉近我们距离���好方法。',
        keywords: ['cozy movie corner', 'projector huge screen', 'immersive home cinema', 'giant soft sofa', 'escape from reality', 'fantastic atmosphere']
      },
      {
        text: 'To me, city life is efficient and convenient, but it can also be very busy and tiring. But the moment I step inside this place, time seems to slow down. It\'s like a hidden paradise that keeps me away from the chaos of the world, making me feel completely refreshed every time I leave.',
        translation: '对我来说，城市生活高效便捷，但也可能非常忙碌和累人。但当我踏入这个地方时，时间似乎放慢了。它就像一个隐藏的天堂，让我远离世界的混乱，每次离开时都让我感到完全精神焕发。',
        keywords: ['city life busy tiring', 'time slows down', 'hidden paradise', 'completely refreshed']
      }
    ]
  },

  {
    id: 'quiet-place',
    title: '安静的地方',
    storyGroup: '🏡 朋友的家',
    topicType: '9-12月',
    examTakers: 196,
    groupColor: 'bg-orange-100',
    question: 'Describe a quiet place you like to go',
    questionCN: '描述一个你喜欢去的安静地方',
    questionPoints: [
      { en: 'Where', cn: '在哪里' },
      { en: 'How u knew it', cn: '你怎么知道这个地方' },
      { en: 'How often u go there', cn: '你多久去一次那里' },
      { en: 'What u do there', cn: '你在那里做什么' },
      { en: 'How u feel about the place', cn: '你对这个地方的感觉如何' }
    ],
    answer: [
      {
        text: 'The place I\'d love to talk about is my best friend Linda\'s home. Since we\'ve been very close for years, I go there almost every weekend or on holidays. To be honest, it\'s basically become my \'second home\'.',
        translation: '我想谈论的地方是我最好的朋友琳达的家。由于我们多年来一直非常亲密，我几乎每个周末或假期都去那里。说实话，它基本上已经成为我的"第二个家"。',
        keywords: ['best friend Linda\'s home', 'very close', 'every weekend', 'second home']
      },
      {
        text: 'I still remember my first visit there, I was a bit worried because it seemed quite far away and I thought life there wouldn\'t be very convenient. However, as soon as I arrived, I was immediately attracted by the environment. The house is located in the suburbs, totally away from all the traffic and noise. Actually, the whole building is surrounded by a small forest park, so the air is super fresh and you can hear the clear sound of birds singing. This kind of quiet atmosphere gives me a sense of relaxation and safety that I just can\'t find in the city. It\'s the perfect way to slowly recharge and get more energy for the week.',
        translation: '我仍然记得我第一次去那里时，我有点担心，因为它似乎很远，我认为那里的生活不会很方便。然而，我一到达，就立即被环境所吸引。房子位于郊区，完全远离所有交通和噪音。实际上，整栋建筑被一个小森林公园环绕，所以空气超级新鲜，你可以听到清晰的鸟鸣声。这种安静的氛围给我一种我在城市里找不到的放松和安全感。这是慢慢充电并为一周获得更多能量的完美方式。',
        keywords: ['located in suburbs', 'surrounded by forest park', 'quiet atmosphere', 'relaxation and safety', 'recharge energy']
      },
      {
        text: 'The inside of the house is just as great, especially one cozy movie corner in the living room. This corner is made up of a projector, a huge screen, blackout curtains, and a great sound system, which together create a mini immersive home cinema. And instead of regular chairs, there\'s a giant, soft sofa that feels like a warm hug, so you can just sink into it and feel totally embraced. We usually turn off all the lights, grab some snacks, and get lost in a movie for hours. It\'s the absolute favorite spot for me to escape from reality and feel like I\'m in another world. Sometimes we invite a few friends over to watch films together, which is a great way to bring us closer in such a fantastic atmosphere.',
        translation: '房子的内部同样很棒，尤其是客厅里一个舒适的电影角落。这个角落由投影仪、巨大的屏幕、遮光窗帘和出色的音响系统组成，它们共同创造了一个小型沉浸式家庭影院。而且不是普通的椅子，而是一个巨大、柔软的沙发，感觉像温暖的拥抱，所以你可以沉入其中并感到完全被拥抱。我们通常会关掉所有灯，拿些零食，在电影中迷失几个小时。这是我逃离现实并感觉像在另一个世界的绝对最喜欢的地方。有时我们邀请几个朋友过来一起看电影，这是在如此美妙的氛围中拉近我们距离的好方法。',
        keywords: ['cozy movie corner', 'immersive home cinema', 'giant soft sofa', 'escape from reality', 'bring us closer']
      },
      {
        text: 'To me, city life is efficient and convenient, but it can also be very busy and tiring. But the moment I step inside this place, time seems to slow down. It\'s like a hidden paradise that keeps me away from the chaos of the world, making me feel completely refreshed every time I leave.',
        translation: '对我来说，城市生活高效便捷，但也可能非常忙碌和累人。但当我踏入这个地方时，时间似乎放慢了。它就像一个隐藏的天堂，让我远离世界的混乱，每次离开时都让我感到完全精神焕发。',
        keywords: ['time slows down', 'hidden paradise', 'completely refreshed']
      }
    ]
  },

  {
    id: 'familiar-person-home',
    title: '常去的熟人之家',
    storyGroup: '🏡 朋友的家',
    topicType: '9-12月',
    examTakers: 0,
    groupColor: 'bg-orange-100',
    question: 'Describe the home of someone you know well and visit often',
    questionCN: '描述一个你很熟悉并经常拜访的人的家',
    questionPoints: [
      { en: 'Whose home', cn: '谁的家' },
      { en: 'How oftenu go there', cn: '你经常去那里吗' },
      { en: 'What it is like', cn: '那是什么样子' },
      { en: 'How u feel about the home', cn: '你对家有什么感觉' }
    ],
    answer: [
      {
        text: 'The place I\'d love to talk about is my best friend Linda\'s home. Since we\'ve been very close for years, I go there almost every weekend or on holidays. To be honest, it\'s basically become my \'second home\'.',
        translation: '我想谈论的地方是我最好的朋友琳达的家。由于我们多年来一直非常亲密，我几乎每个周末或假期都去那里。说实话，它基本上已经成为我的"第二个家"。',
        keywords: ['best friend Linda\'s home', 'very close', 'every weekend', 'second home']
      },
      {
        text: 'I still remember my first visit there, I was a bit worried because it seemed quite far away and I thought life there wouldn\'t be very convenient. However, as soon as I arrived, I was immediately attracted by the environment. The house is located in the suburbs, totally away from all the traffic and noise. Actually, the whole building is surrounded by a small forest park, so the air is super fresh and you can hear the clear sound of birds singing. This kind of quiet atmosphere gives me a sense of relaxation and safety that I just can\'t find in the city. It\'s the perfect way to slowly recharge and get more energy for the week.',
        translation: '我仍然记得我第一次去那里时，我有点担心，因为它似乎很远，我认为那里的生活不会很方便。然而，我一到达，就立即被环境所吸引。房子位于郊区，完全远离所有交通和噪音。实际上，整栋建筑被一个小森林公园环绕，所以空气超级新鲜，你可以听到清晰的鸟鸣声。这种安静的氛围给我一种我在城市里找不到的放松和安全感。这是慢慢充电并为一周获得更多能量的完美方式。',
        keywords: ['suburbs', 'surrounded by forest park', 'quiet atmosphere', 'relaxation and safety']
      },
      {
        text: 'The inside of the house is just as great, especially one cozy movie corner in the living room. This corner is made up of a projector, a huge screen, blackout curtains, and a great sound system, which together create a mini immersive home cinema. And instead of regular chairs, there\'s a giant, soft sofa that feels like a warm hug, so you can just sink into it and feel totally embraced. We usually turn off all the lights, grab some snacks, and get lost in a movie for hours. It\'s the absolute favorite spot for me to escape from reality and feel like I\'m in another world. Sometimes we invite a few friends over to watch films together, which is a great way to bring us closer in such a fantastic atmosphere.',
        translation: '房子的内部同样很棒，尤其是客厅里一个舒适的电影角落。这个角落由投影仪、巨大的屏幕、遮光窗帘和出色的音响系统组成，它们共同创造了一个小型沉浸式家庭影院。而且不是普通的椅子，而是一个巨大、柔软的沙发，感觉像温暖的拥抱，所以你可以沉入其中并感到完全被拥抱。我们通常会关掉所有灯，拿些零食，在电影中迷失几个小时。这是我逃离现实并感觉像在另一个世界的绝对最喜欢的地方。有时我们邀请几个朋友过来一起看电影，这是在如此美妙的氛围中拉近我们距离的好方法。',
        keywords: ['cozy movie corner', 'immersive cinema', 'giant soft sofa', 'escape reality']
      },
      {
        text: 'To me, city life is efficient and convenient, but it can also be very busy and tiring. But the moment I step inside this place, time seems to slow down. It\'s like a hidden paradise that keeps me away from the chaos of the world, making me feel completely refreshed every time I leave.',
        translation: '对我来说，城市生活高效便捷，但也可能非常忙碌和累人。但当我踏入这个地方时，时间似乎放慢了。它就像一个隐藏的天堂，让我远离世界的混乱，每次离开时都让我感到完全精神焕发。',
        keywords: ['time slows down', 'hidden paradise', 'completely refreshed']
      }
    ]
  },

  // 🛍️ 宜家 组（粉色）
  {
    id: 'favorite-shop',
    title: '喜欢的商店',
    storyGroup: '🛍️ 宜家',
    topicType: '9-12月保留题',
    examTakers: 49,
    groupColor: 'bg-pink-100',
    question: 'Describe a shop you like to visit',
    questionCN: '描述一个你喜欢去的商店',
    questionPoints: [
      { en: 'What the shop\'s name is', cn: '这家店的名称是什么' },
      { en: 'Where it is', cn: '它在哪' },
      { en: 'How often you visit it', cn: '你多久去一次' },
      { en: 'Why you like to visit it', cn: '你为什么喜欢去那里' }
    ],
    answer: [
      {
        text: 'One of my favorite stores is IKEA, which is a well-known chain of home furnishing store. It\'s originally from Sweden but now has branches all over the world. In China, almost every big city has at least one store, which makes it quite convenient to visit.',
        translation: '我最喜欢的商店之一是宜家，这是一家著名的家居用品连锁店。它最初来自瑞典，但现在在世界各地都有分店。在中国，几乎每个大城市都至少有一家商店，这使得参观非常方便。',
        keywords: ['IKEA', 'home furnishing store', 'from Sweden', 'convenient to visit']
      },
      {
        text: 'I usually go there about once a month, sometimes just to look around, and sometimes with a clear shopping goal in mind. I\'ve always enjoyed decorating my home,and IKEA is the perfect choice. Their furniture and home products are very stylish and minimalist, but at the same time, they\'re also practical.',
        translation: '我通常大约一个月去一次那里，有时只是看看，有时有明确的购物目标。我一直喜欢装饰我的家，宜家是完美的选择。他们的家具和家居产品非常时尚和简约，但同时，它们也很实用。',
        keywords: ['once a month', 'decorating home', 'stylish and minimalist', 'practical']
      },
      {
        text: 'One thing I really like is the quality of their products. A few years ago, I bought a desk from there, and even after two or three years of daily use, it still in great condition—very solid and stable. That gave me a lot of confidence in their brand. Plus, during sales seasons, you can get very good deals on many items, which makes shopping there even more satisfying.',
        translation: '我真正喜欢的一件事是他们产品的质量。几年前，我从那里买了一张桌子，即使经过两三年的日常使用，它仍然状况良好——非常坚固和稳定。这让我对他们的品牌有很大的信心。此外，在销售季节，你可以在许多商品上获得非常好的优惠，这使得在那里购物更加令人满意。',
        keywords: ['quality of products', 'great condition', 'confidence in brand', 'good deals']
      },
      {
        text: 'If I could have my own house in the future, I\'d  love to furnish it entirely in the IKEA style.',
        translation: '如果我将来能拥有自己的房子，我想完全用宜家风格来装饰它。',
        keywords: ['own house', 'furnish entirely', 'IKEA style']
      }
    ]
  },
];