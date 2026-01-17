// Part 2 人物类题目数据
export interface Part2Topic {
  id: string;
  title: string; // 题目名称
  storyGroup?: string; // 串题故事（如"🗣️ 马龙"、"👫 好朋友"）
  topicType: string; // 题目类型（如"1-4月保留题"、"1-4月新题"、"9-12月"）
  examTakers: number; // 近期考试人数
  groupColor: string; // 分组颜色（用于表格行背景）
  question: string; // 完整题目内容（英文）
  questionCN?: string; // 题目中文翻译
  questionPoints?: Array<{ // 题目要点
    en: string;
    cn: string;
  }>;
  answer: Array<{
    text: string; // 英文句子
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

export const part2PeopleTopics: Part2Topic[] = [
  // 🏃‍♂️ 马龙 组（橙色）
  {
    id: 'athlete',
    title: '崇拜的运动员',
    storyGroup: '🏃‍♂️ 马龙',
    topicType: '1-4月保留题',
    examTakers: 14,
    groupColor: 'bg-orange-100',
    question: 'Describe an athlete you admire',
    questionCN: '描述一个你崇拜的运动员',
    questionPoints: [
      { en: 'Who he/she is', cn: '他是谁' },
      { en: 'What you know about him / her', cn: '你对他的了解' },
      { en: 'What he/she is like in real life', cn: '他在现实生活中的样子' },
      { en: 'What achievement he/she has made', cn: '他取得的成就' },
      { en: 'Why you admire him/ her', cn: '你为什么钦佩他/她' }
    ],
    analysis: `
      <p class="mb-4"><strong>📝 答题思路：</strong></p>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>第一段：</strong>介绍基本信息（是什么/是谁、在哪里、如何了解）</li>
        <li><strong>第二段：</strong>详细描述特点、经历或细节</li>
        <li><strong>第三段：</strong>进一步展开说明个人感受和影响</li>
        <li><strong>第四段：</strong>总结为什么重要或有意义</li>
      </ul>
      <p class="mb-4"><strong>🎯 核心要点：</strong></p>
      <ul class="list-disc list-inside space-y-2">
        <li>使用具体细节和例子支撑观点</li>
        <li>表达个人感受和情感联系</li>
        <li>展示词汇多样性和地道表达</li>
        <li>保持逻辑清晰，自然过渡</li>
      </ul>
    `,
    keywordsMemo: [],
    answer: [
      {
        text: 'The athlete I deeply admire is Ma Long, a Chinese table tennis player. He is widely considered one of the most successful players in the history of the sport. As you know, table tennis is a major sport in my country, and it\'s a common leisure activity that many people enjoy from a young age. Growing up in this environment, I was naturally exposed to table tennis matches and gradually began following professional games. That\'s how I came to know about Ma Long and his incredible career.',
        translation: '我敬佩的运动员是马龙，一位中国乒乓球运动员。他被广泛认为是这项运动历史上最成功的球员之一。正如你所知，乒乓球在我国是一项主要的运动，也是许多人从很小就开始享受的休闲活动。在这样的环境中长大，我自然地接触到了乒乓球比赛，并逐渐开始关注职业比赛。就这样，我了解到了马龙和他的非凡职业生涯。',
        keywords: ['Ma Long', 'table tennis player', 'most successful', 'major sport', 'incredible career']
      },
      {
        text: 'He started playing as early as five years old and joined the national team in 2003, at the age of just 15. Over his long career, he has won numerous major championships, including the Olympic games and the World Championships.',
        translation: '他五岁就开始打球，2003年，也就是他15岁时，加入了国家队。在他的漫长职业生涯中，他赢得了无数重大冠军，包括奥运会和世界锦标赛。',
        keywords: ['five years old', 'national team', 'numerous championships', 'Olympic games']
      },
      {
        text: 'Outside of the sport, he is known to be a very humble person. Even though he is extremely famous, he never shows off his achievements and always stays respectful to everyone. This attitude is also one of the main reasons why so many people admire him.',
        translation: '在体育之外，他被认为是非常谦逊的人。尽管他极其有名，但他从不炫耀自己的成就，总是对每个人都保持尊重。这种态度也是许多人钦佩他的主要原因之一。',
        keywords: ['humble person', 'never shows off', 'respectful', 'admire him']
      },
      {
        text: 'For me, I look up to him is not only because of his victories, but also because of his strength in overcoming challenges. A few years back, he faced a serious injury that kept him away from the game for a long time. Many people doubted he might not return, but through hard work and determination, he made a successful comeback and continued to win. His story motivates me to never give up when facing difficulties in my own life.',
        translation: '对我来说，我敬佩他，不仅是因为他的胜利，还因为他克服挑战的强大力量。几年前，他面临严重的伤病，这让他离开比赛很长一段时间。许多人怀疑他可能无法回归，但通过努力工作和决心，他成功复出并继续赢得胜利。他的故事激励我在面对自己生活中的困难时永不放弃。',
        keywords: ['overcoming challenges', 'serious injury', 'successful comeback', 'never give up']
      }
    ]
  },

  // 👫 好朋友 组（粉色）
  {
    id: 'problem-solver',
    title: '机智解决问题的人',
    storyGroup: '👫 好朋友',
    topicType: '1-4月新题',
    examTakers: 49,
    groupColor: 'bg-pink-100',
    question: 'Describe a person who solved a problem in a clever way',
    questionCN: '描述一个机智解决问题的人',
    questionPoints: [
      { en: 'Who this person is', cn: '这个人是谁' },
      { en: 'What the problem was', cn: '这个问题是什么' },
      { en: 'How he/she solved it', cn: '他是怎么解决的' },
      { en: 'Why you think he she did it in a smart way', cn: '为什么你认为他/她这样做很聪明' }
    ],
    analysis: `
      <p class="mb-4"><strong>📝 答题思路：</strong></p>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>第一段：</strong>介绍基本信息（是什么/是谁、在哪里、如何了解）</li>
        <li><strong>第二段：</strong>详细描述特点、经历或细节</li>
        <li><strong>第三段：</strong>进一步展开说明个人感受和影响</li>
        <li><strong>第四段：</strong>总结为什么重要或有意义</li>
      </ul>
      <p class="mb-4"><strong>🎯 核心要点：</strong></p>
      <ul class="list-disc list-inside space-y-2">
        <li>使用具体细节和例子支撑观点</li>
        <li>表达个人感受和情感联系</li>
        <li>展示词汇多样性和地道表达</li>
        <li>保持逻辑清晰，自然过渡</li>
      </ul>
    `,
    keywordsMemo: [],
    answer: [
      {
        text: 'The person I\'d like to talk about is my childhood best friend, Lily. We\'ve known each other for over 20 years. Being classmates starting from kindergarten allowed us to get to know each other very quickly, and our parents became great friends too. We spent so much time together, doing things like studying, hanging out, and traveling. Although we are both very busy now, we still meet up regularly to chat and have dinner.',
        translation: '我想谈论的人是我童年最好的朋友，莉莉。我们已经认识超过20年了。从幼儿园开始就是同学，这让我们能够很快地了解彼此，我们的父母也成为了好朋友��我们一起度过了很多时光，做的事情包括学习、闲逛和旅行。虽然我们现在都很忙，但我们仍然定期见面聊天和吃饭。',
        keywords: ['childhood best friend', 'Lily', 'over 20 years', 'kindergarten', 'meet up regularly']
      },
      {
        text: 'After graduation, she chose to go back home to run her family business, a creative products company. Her main job is product design, which is widely considered the most important part of the whole company. She is incredibly creative and can always turn traditional patterns into modern, stylish items that young people love. These items soon became top-sellers online.',
        translation: '毕业后，她选择回家经营她的家族企业，一家创意产品公司。她的主要工作是产品设计，这被广泛认为是整个公司最重要的部分。她极具创造力，总能将传统图案转化为年轻人喜爱的现代时尚物品。这些物品很快成为网上的畅销品。',
        keywords: ['family business', 'product design', 'incredibly creative', 'traditional patterns', 'top-sellers']
      },
      {
        text: 'However, things were not always smooth. I remember once there was a serious delivery problem—several overseas orders arrived much later than expected. While I would have been very panicked, my friend handled the problem very smartly. She quickly contacted several shipping companies to arrange alternative delivery and also told the customers that she was willing to take responsibility for any losses. She is truly the smartest person I\'ve ever met.',
        translation: '然而，事情并不总是一帆风顺。我记得有一次出现了严重的配送问题——几个海外订单到达的时间比预期晚得多。虽然我会非常恐慌，但我的朋友非常聪明地处理了这个问题。她迅速联系了几家运输公司安排替代配送，并告诉客户她愿意为任何损失负责。她真的是我见过最聪明的人。',
        keywords: ['delivery problem', 'handled smartly', 'alternative delivery', 'take responsibility']
      },
      {
        text: 'She is such an important person in my life because she has inspired me to become a better version of myself. To be more specific, I had always wanted to start my own social media channel to share my life, but I was too afraid of what others might think. She encouraged me to give it a try and told me that \"just being myself is enough.\" Because of her support, I finally uploaded my first video, and it actually received a lot of likes and positive comments. Overall, I\'m really grateful for our friendship, and I hope we can keep growing together in the future.',
        translation: '她是我生命中如此重要的人，因为她激励我成为更好的自己。更具体地说，我一直想创建自己的社交媒体频道来分享我的生活，但我太害怕别人会怎么想。她鼓励我尝试一下，并告诉我\"做自己就足够了\"。因为她的支持，我终于上传了我的第一个视频，它实际上收到了很多点赞和积极的评论。总的来说，我真的很感激我们的友谊，我希望我们能在未来继续一起成长。',
        keywords: ['inspired me', 'social media channel', 'being myself is enough', 'keep growing together']
      }
    ]
  },

  {
    id: 'family-business',
    title: '在家族企业工作的人',
    storyGroup: '👫 好朋友',
    topicType: '1-4月保留题',
    examTakers: 56,
    groupColor: 'bg-pink-100',
    question: 'Describe a person who works in a family business',
    questionCN: '描述一个在家族企业工作的人',
    questionPoints: [
      { en: 'Who he/she is', cn: '他是谁/她是谁' },
      { en: 'What the business is', cn: '这家公司的业务是什么' },
      { en: 'What his/her job is', cn: '他的工作是什么' },
      { en: 'Why he/she enjoys working there', cn: '他为什么喜欢在那里工作' }
    ],
    answer: [
      {
        text: 'I\'d like to describe my friend Sarah, who works in her family\'s restaurant business.',
        translation: '我想描述我的朋友莎拉，她在家族的餐厅生意工作。',
        keywords: ['friend Sarah', 'family restaurant', 'business']
      },
      {
        text: 'She started helping out in the kitchen when she was just a teenager.',
        translation: '她十几岁的时候就开始在厨房帮忙。',
        keywords: ['kitchen', 'teenager', 'helping out']
      },
      {
        text: 'Now she manages the whole operation and has introduced many innovative ideas.',
        translation: '现在她管理整个运营并引入了许多创新想法。',
        keywords: ['manages', 'operation', 'innovative ideas']
      },
      {
        text: 'Her dedication to preserving family traditions while embracing change is truly admirable.',
        translation: '她在拥抱变化的同时保持家族传统的奉献精神真的令人钦佩。',
        keywords: ['dedication', 'family traditions', 'embracing change']
      }
    ]
  },

  {
    id: 'creative-person',
    title: '崇拜的有创造力的人',
    storyGroup: '👫 好朋友',
    topicType: '1-4月保留题',
    examTakers: 42,
    groupColor: 'bg-pink-100',
    question: 'Describe a creative person you admire',
    questionCN: '描述一个你崇拜的有创造力的人',
    questionPoints: [
      { en: 'Who he/she is', cn: '他是谁/她是谁' },
      { en: 'How you knew him/her', cn: '你是怎么知道他/她的' },
      { en: 'What his/her greatest achievement is', cn: '他/她的最大成就是什么' },
      { en: 'Why you think he/ she is creative', cn: '为什么你认为他/她很有创意' }
    ],
    answer: [
      {
        text: 'The creative person I admire is my college friend Lisa, who is an incredibly talented graphic designer.',
        translation: '我崇拜的有创造力的人是我的大学朋友丽莎，她是一位极具天赋的平面设计师。',
        keywords: ['college friend Lisa', 'talented', 'graphic designer']
      },
      {
        text: 'What makes her special is her ability to turn ordinary ideas into stunning visual designs.',
        translation: '让她与众不同的是她将普通想法转化为令人惊叹的视觉设计的能力。',
        keywords: ['special', 'ordinary ideas', 'stunning designs']
      },
      {
        text: 'She often draws inspiration from everyday life and nature.',
        translation: '她经常从日常生活和大自中汲取灵感。',
        keywords: ['inspiration', 'everyday life', 'nature']
      },
      {
        text: 'Her creative approach has taught me to see beauty in the simplest things.',
        translation: '她的创造性方法教会我在最简单的事物中看到美。',
        keywords: ['creative approach', 'beauty', 'simplest things']
      }
    ]
  },

  {
    id: 'important-friend',
    title: '重要的好朋友',
    storyGroup: '👫 好朋友',
    topicType: '1-4月保留题',
    examTakers: 0,
    groupColor: 'bg-pink-100',
    question: 'Describe an important friend',
    questionCN: '描述一个重要的好朋友',
    questionPoints: [
      { en: 'Who he/she is', cn: '他是谁/她是谁' },
      { en: 'How/Where you got to know him /her', cn: '你是如何/在哪里认识他的/她的' },
      { en: 'How long have you known each other', cn: '你们认识多久了' },
      { en: 'Why he/she is important to you', cn: '为什么他/她对你很重要' }
    ],
    answer: [
      {
        text: 'The most important friend in my life is definitely Alex, whom I\'ve known since high school.',
        translation: '我生活中最重要的朋友绝对是亚历克斯，我从高中就认识他了。',
        keywords: ['important friend', 'Alex', 'high school']
      },
      {
        text: 'He has always been there for me during both good times and difficult moments.',
        translation: '无论是在顺境还是困难时刻，他总是陪伴在我身边。',
        keywords: ['always there', 'good times', 'difficult moments']
      },
      {
        text: 'What I appreciate most is his honesty and the way he gives me straightforward advice.',
        translation: '我最欣赏的是他的诚实和他给我直接建议的方式。',
        keywords: ['honesty', 'straightforward advice', 'appreciate']
      },
      {
        text: 'Our friendship has shaped who I am today and taught me the true meaning of loyalty.',
        translation: '我们的友谊塑造了今天的我，并教会我忠诚的真正含义。',
        keywords: ['friendship', 'shaped', 'loyalty']
      }
    ]
  },

  {
    id: 'interesting-thing-person',
    title: '激励你做有趣事情的人',
    storyGroup: '👫 好朋友',
    topicType: '9-12月',
    examTakers: 21,
    groupColor: 'bg-pink-100',
    question: 'Describe a person who encouraged you to do something interesting',
    questionCN: '描述一个激励你做有趣事情的人',
    questionPoints: [
      { en: 'Who he/she is', cn: '是谁' },
      { en: 'How you knew him/her', cn: '怎么认识他的/她的' },
      { en: 'What interesting thing you did', cn: '你做了什么有趣的事情' },
      { en: 'How she inspired u to do it', cn: '她是如何激励你去做这件事的' }
    ],
    answer: [
      {
        text: 'I\'d like to talk about my cousin Mike, who encouraged me to start learning photography.',
        translation: '我想谈谈我的表哥迈克，他鼓励我开始学习摄影。',
        keywords: ['cousin Mike', 'encouraged', 'photography']
      },
      {
        text: 'He showed me how photography can capture beautiful moments and tell powerful stories.',
        translation: '他向我展示了摄影如何捕捉美妙瞬间并讲述动人故事。',
        keywords: ['capture moments', 'tell stories', 'photography']
      },
      {
        text: 'Thanks to his patient guidance, I developed a new passion and even won a local competition.',
        translation: '多亏了他耐心的指导，我培养了新的爱好，甚至赢得了当地的一个比赛。',
        keywords: ['patient guidance', 'new passion', 'competition']
      },
      {
        text: 'His encouragement completely changed my perspective on creative hobbies.',
        translation: '他的鼓励完全改变了我对创意爱好的看法。',
        keywords: ['encouragement', 'changed perspective', 'creative hobbies']
      }
    ]
  },

  {
    id: 'childhood-friend',
    title: '发小',
    storyGroup: '👫 好朋友',
    topicType: '9-12月',
    examTakers: 35,
    groupColor: 'bg-pink-100',
    question: 'Describe a childhood friend',
    questionCN: '描述一个童年朋友',
    questionPoints: [
      { en: 'Who he/she is', cn: '他是谁/她是谁' },
      { en: 'Where and how you met each other', cn: '你们在哪里以及如何相遇的' },
      { en: 'What you often did together', cn: '你们经常一起做什么' },
      { en: 'What made you like him/her', cn: '是什么让你喜欢他/她' }
    ],
    answer: [
      {
        text: 'My childhood friend Jenny has been part of my life for as long as I can remember.',
        translation: '我的童年朋友珍妮在我记忆中一直是我生活的一部分。',
        keywords: ['childhood friend', 'Jenny', 'long time']
      },
      {
        text: 'We used to play together every day after school in the neighborhood park.',
        translation: '我们过去每天放学后都会在附近的公园一起玩耍。',
        keywords: ['play together', 'after school', 'park']
      },
      {
        text: 'Even though we now live in different cities, we still keep in touch regularly.',
        translation: '尽管我们现在住在不同的城市，我们仍然经常保持联系。',
        keywords: ['different cities', 'keep in touch', 'regularly']
      },
      {
        text: 'Those carefree childhood days with her remain some of my most treasured memories.',
        translation: '和她一起度过的那些无忧无虑的童年时光仍然是我最珍贵的回忆。',
        keywords: ['carefree days', 'treasured memories', 'childhood']
      }
    ]
  },

  {
    id: 'smart-person',
    title: '聪明的人',
    storyGroup: '👫 好朋友',
    topicType: '9-12月',
    examTakers: 28,
    groupColor: 'bg-pink-100',
    question: 'Describe an intelligent person you know',
    questionCN: '描述一个你认识的聪明人',
    questionPoints: [
      { en: 'Who this person is', cn: '这个人是谁' },
      { en: 'How you knew this person', cn: '你怎么认识这个人的' },
      { en: 'What this person does', cn: '这个人做什么' },
      { en: 'Why you think this person is intelligent', cn: '你为什么认为这个人聪明' }
    ],
    answer: [
      {
        text: 'The smartest person I know is my former classmate David, who excels in almost everything he does.',
        translation: '我认识的最聪明的人是我以前的同学大卫，他几乎在所有事情上都表现出色。',
        keywords: ['smartest person', 'David', 'excels']
      },
      {
        text: 'What makes him truly intelligent is not just his academic achievements but his problem-solving abilities.',
        translation: '让他真正聪明的不仅是他的学术成就，还有他解决问的能力。',
        keywords: ['intelligent', 'academic achievements', 'problem-solving']
      },
      {
        text: 'He can quickly understand complex concepts and explain them in simple terms.',
        translation: '他能快速理解复杂概念并用简单的话解释。',
        keywords: ['understand', 'complex concepts', 'simple terms']
      },
      {
        text: 'His intelligence combined with humility makes him someone I really look up to.',
        translation: '他的聪明才智加上谦逊使他成为我真正敬仰的人。',
        keywords: ['intelligence', 'humility', 'look up to']
      }
    ]
  },

  // 💃 泰勒斯威夫特 组（黄色）
  {
    id: 'famous-person',
    title: '想见的名人',
    storyGroup: '💃 泰勒斯威夫特',
    topicType: '1-4月新题',
    examTakers: 462,
    groupColor: 'bg-yellow-100',
    question: 'Describe a famous person you would like to meet',
    questionCN: '描述一个你想见的名人',
    questionPoints: [
      { en: 'Who he / she is', cn: '他是谁/她是谁' },
      { en: 'How you knew him / her', cn: '你是怎么认识他的/她的' },
      { en: 'How / Where you would like to meet him / her', cn: '你希望在哪里/如何与他/她见面' },
      { en: 'Why you would like to meet him / her', cn: '你为什么想见他/她' }
    ],
    analysis: `
      <p class="mb-4"><strong>📝 答题思路：</strong></p>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>第一段：</strong>介绍基本信息（是什么/是谁、在哪里、如何了解）</li>
        <li><strong>第二段：</strong>详细描述特点、经历或细节</li>
        <li><strong>第三段：</strong>进一步展开说明个人感受和影响</li>
        <li><strong>第四段：</strong>总结为什么重要或有意义</li>
      </ul>
      <p class="mb-4"><strong>🎯 核心要点：</strong></p>
      <ul class="list-disc list-inside space-y-2">
        <li>使用具体细节和例子支撑观点</li>
        <li>表达个人感受和情感联系</li>
        <li>展示词汇多样性和地道表达</li>
        <li>保持逻辑清晰，自然过渡</li>
      </ul>
    `,
    keywordsMemo: [],
    answer: [
      {
        text: 'The person I\'d like to talk about is Taylor Swift. As you know, she is a world-famous celebrity, but for me, I feel she is more like a close friend who has been present in my life for years. I first came across her music on a music app several years ago. The song was called "Love Story", and it was so romantic and beautiful that I fell in love with it immediately. After that, I started following her and gradually became a huge fan.',
        translation: '我想谈论的人是泰勒·斯威夫特。如你所知，她是一位世界知名的名人，但对我来说，我觉得她更像是一位多年来一直出现在我生活中的密友。几年前，我第一次在音乐应用上听到她的音乐。那首歌叫做"爱情故事"，它如此浪漫和美丽，以至于我立刻爱上了它。之后，我开始关注她，逐渐成为了一个超级粉丝。',
        keywords: ['Taylor Swift', 'close friend', 'Love Story', 'huge fan']
      },
      {
        text: 'I believe she became such a popular singer not just because of her talent, but because of her hard work. To achieve her goals, she is constantly active, and I often see her in various concerts, music videos, news interviews, and documentaries. This really brings her closer to her fans and makes us feel like she is a friend who is always chatting with us. I think this is why she is so popular worldwide.',
        translation: '我相信她成为如此受欢迎的歌手不仅仅是因为她的天赋，而是因为她的努力工作。为了实现她的目标，她不断活跃，我经常看到她出现在各种音乐会、音乐录影带、新闻采访和纪录片中。这真的拉近了她与粉丝的距离，让我们觉得她就像一个总是在和我们聊天的朋友。我认为这就是她在全球如此受欢迎的原因。',
        keywords: ['popular singer', 'hard work', 'constantly active', 'brings closer to fans']
      },
      {
        text: 'Her music is incredibly versatile, covering various genres from country to pop and even rock. I usually listen to her music when I am commuting or sometimes feeling stressed. I feel like her songs perfectly capture my inner thoughts. It really helps me better feel the present moment, whether it\'s happiness or pain.',
        translation: '她的音乐非常多样化，涵盖了从乡村音乐到流行音乐甚至摇滚音乐的各种风格。我通常在通勤时或有时感到压力时听她的音乐。我觉得她的歌曲完美地捕捉了我内心的想法。它真的帮助我更好地感受当下，无论是快乐还是痛苦。',
        keywords: ['incredibly versatile', 'capture inner thoughts', 'feel present moment']
      },
      {
        text: 'Recently, she held The Eras Tour, and although I missed it due to my busy schedule, I really hope to get a ticket and see her live at her next concert. It has always been a dream of mine to meet her in person, and I truly hope I can make it happen one day.',
        translation: '最近，她举办了时代巡回演唱会，尽管由于我的繁忙日程我错过了，但我真的希望能拿到票，在她的下一场音乐会上现场看到她。亲自见到她一直是我的梦想，我真的希望有一天我能实现它。',
        keywords: ['Eras Tour', 'see her live', 'meet in person', 'dream']
      }
    ]
  },

  {
    id: 'popular-person',
    title: '受欢迎的人',
    storyGroup: '💃 泰勒斯威夫特',
    topicType: '非大陆地区1-4月保留题',
    examTakers: 35,
    groupColor: 'bg-yellow-100',
    question: 'Describe a popular person',
    questionCN: '描述一个受欢迎的人',
    questionPoints: [
      { en: 'Who this person is', cn: '这个人是谁' },
      { en: 'What kind of person he or she is', cn: '这个人是什么样的人' },
      { en: 'When you see him / her normally', cn: '你通常看到他/她的时刻' },
      { en: 'Why you think this person is popular', cn: '为什么你认为这个人受欢迎' }
    ],
    answer: [
      {
        text: 'A really popular person in my community is Ms. Wang, our local community center director.',
        translation: '我们社区中一个非常受欢迎的人是王女士，我们当地社区中心的主任。',
        keywords: ['popular person', 'Ms. Wang', 'community center']
      },
      {
        text: 'Everyone knows and loves her because she always goes out of her way to help others.',
        translation: '每个人都认识并喜爱她，因为她总是竭尽全力帮助他人。',
        keywords: ['knows and loves', 'help others', 'goes out of way']
      },
      {
        text: 'She organizes numerous activities and events that bring people together.',
        translation: '她组织了许多活动和聚会，将人们聚集在一起。',
        keywords: ['organizes', 'activities', 'bring together']
      },
      {
        text: 'Her warm personality and genuine care for everyone make her truly beloved in our neighborhood.',
        translation: '她温暖的个性和对每个人的真诚关怀使她在我们社区真正受到爱戴。',
        keywords: ['warm personality', 'genuine care', 'beloved']
      }
    ]
  },

  {
    id: 'favorite-singer',
    title: '喜欢的歌手',
    storyGroup: '💃 泰勒斯威夫特',
    topicType: '1-4月保留题',
    examTakers: 21,
    groupColor: 'bg-yellow-100',
    question: 'Describe your favorite singer or band',
    questionCN: '描述你最喜欢的歌手或乐队',
    questionPoints: [
      { en: 'Who he/she is', cn: '他是谁' },
      { en: 'What genre his /her music belongs to', cn: '他的音乐属于什么流派' },
      { en: 'When/Where you listen to his/her music/songs', cn: '你什么时候/在哪里听他的音乐/歌曲' },
      { en: 'Why you ike him/her and his/her music', cn: '你为什么喜欢他/她和他的音乐' }
    ],
    answer: [
      {
        text: 'My favorite singer is Taylor Swift, who has been dominating the music industry for over a decade.',
        translation: '我最喜欢的歌手是泰勒·斯威夫特，她在音乐行业占据主导地位已超过十年。',
        keywords: ['Taylor Swift', 'dominating', 'music industry']
      },
      {
        text: 'Her ability to reinvent herself with each album while staying authentic is remarkable.',
        translation: '她在每张专辑中重塑自我同时保持真实的能力非常了不起。',
        keywords: ['reinvent herself', 'authentic', 'remarkable']
      },
      {
        text: 'I love how her songs tell stories that resonate with people of all ages.',
        translation: '我喜欢她的歌曲讲述与所有年龄段的人产生共鸣的故事。',
        keywords: ['tell stories', 'resonate', 'all ages']
      },
      {
        text: 'Her music has become the soundtrack to many important moments in my life.',
        translation: '她的音乐已成为我生活中许多重要时刻的配乐。',
        keywords: ['soundtrack', 'important moments', 'life']
      }
    ]
  },

  {
    id: 'music-friend',
    title: '擅长音乐的朋友',
    storyGroup: '💃 泰勒斯威夫特',
    topicType: '1-4月保留题',
    examTakers: 21,
    groupColor: 'bg-yellow-100',
    question: 'Describe a friend who is good at music',
    questionCN: '描述一个擅长音乐的朋友',
    questionPoints: [
      { en: 'Who he/she is', cn: '他是谁' },
      { en: 'When/Where you listen to his/her music/singing', cn: '你在什么时候/哪里听他的音乐/唱歌' },
      { en: 'What kind of music/songs he/she is good at', cn: '他擅长什么类型的音乐/歌曲' },
      { en: 'How you feel when listening to his music/singing', cn: '你听他的音乐/唱歌时的感受' }
    ],
    answer: [
      {
        text: 'My friend Emma is incredibly talented when it comes to music.',
        translation: '说到音乐，我的朋友艾玛非常有天赋。',
        keywords: ['friend Emma', 'talented', 'music']
      },
      {
        text: 'She can play multiple instruments including piano, guitar, and violin.',
        translation: '她会演奏多种乐器，包括钢琴、吉他和小提琴。',
        keywords: ['multiple instruments', 'piano', 'guitar', 'violin']
      },
      {
        text: 'Whenever we hang out, she often plays her own compositions which are absolutely beautiful.',
        translation: '每当我们一起出去玩时，她经常演奏自己的作品，非常优美。',
        keywords: ['compositions', 'beautiful', 'hang out']
      },
      {
        text: 'Her passion for music is contagious and has inspired me to appreciate music more deeply.',
        translation: '她对音乐的热情具有感染力，激励我更深入地欣赏音乐。',
        keywords: ['passion', 'contagious', 'appreciate music']
      }
    ]
  },

  // 👩🏾 外国朋友 组（蓝色）
  {
    id: 'planning-person',
    title: '擅长做计划的人',
    storyGroup: '👩🏾 外国朋友',
    topicType: '1-4月新题',
    examTakers: 147,
    groupColor: 'bg-blue-100',
    question: 'Describe a person who is good at planning',
    questionCN: '描述一个擅长计划的人',
    questionPoints: [
      { en: 'Who he/she is', cn: '他是谁' },
      { en: 'How you knew him/ her', cn: '你如何认识他/她' },
      { en: 'What plans he/she makes', cn: '他/她有什么计划' },
      { en: 'How you feel about this person', cn: '你对这个人感觉如何' }
    ],
    analysis: `
      <p class="mb-4"><strong>📝 答题思路：</strong></p>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>第一段：</strong>介绍基本信息（是什么/是谁、在哪里、如何了解）</li>
        <li><strong>第二段：</strong>详细描述特点、经历或细节</li>
        <li><strong>第三段：</strong>进一步展开说明个人感受和影响</li>
        <li><strong>第四段：</strong>总结为什么重要或有意义</li>
      </ul>
      <p class="mb-4"><strong>🎯 核心要点：</strong></p>
      <ul class="list-disc list-inside space-y-2">
        <li>使用具体细节和例子支撑观点</li>
        <li>表达个人感受和情感联系</li>
        <li>展示词汇多样性和地道表达</li>
        <li>保持逻辑清晰，自然过渡</li>
      </ul>
    `,
    keywordsMemo: [],
    answer: [
      {
        text: 'I\'d like to talk about my friend Leo, who is from Germany. We met at a local hiking club. Recently, our hiking club had a forest hike. He was chosen as the leader because of his years of experience. To be honest, I didn\'t really like him at first.',
        translation: '我想谈谈我的朋友Leo，他来自德国。我们在当地的徒步俱乐部认识。最近，我们的徒步俱乐部进行了一次森林徒步。因为他多年的经验，他被选为领队。说实话，我起初真的不太喜欢他。',
        keywords: ['friend Leo', 'Germany', 'hiking club', 'chosen as leader', 'didn\'t like at first']
      },
      {
        text: 'A few days before the trip, he repeatedly persuaded me to prepare every necessary item. He gave me a long list, including a compass, a professional first-aid kit, waterproof clothes, and even extra batteries. He also insisted that I should memorize not only the main routes but also backup routes. I understand a leader needs to have leadership skills, but he was incredibly strict. I just wanted to relax in nature, so I found his rules to be a burden.',
        translation: '在旅行前几天，他反复说服我准备好每一件必要的物品。他给了我一个长长的清单，包括指南针、专业急救包、防水衣服，甚至还有备用电池。他还坚持要求我不仅要记住主要路线，还要记住备用路线。我理解领队需要有领导技能，但他太严格了。我只是想在大自然中放松，所以我觉得他的规定是一种负担。',
        keywords: ['repeatedly persuaded', 'long list', 'first-aid kit', 'incredibly strict', 'rules burden']
      },
      {
        text: 'However, it turned out that I should have followed his advice. During the trip, the weather suddenly changed, and we met a heavy storm with lightning. Right when I was scared and panicking, and deeply regretting ignoring his suggestions, Leo handed me a box. Inside were the extra things he had prepared for me. Thanks to his help, I successfully finished the hike and got home safely.',
        translation: '然而，事实证明我应该听从他的建议。在旅途中，天气突然变了，我们遇到了一场大风暴，还有闪电。就在我害怕和恐慌，并深深后悔忽视他的建议时，Leo递给我一个盒子。里面是他为我准备的额外物品。多亏了他的帮助，我成功完成了徒步旅行，平安回到了家。',
        keywords: ['should have followed', 'heavy storm', 'deeply regretting', 'prepared for me', 'got home safely']
      },
      {
        text: 'After this, I gradually became great friends with Leo. I realized that being serious and having a clear plan is actually a part of German culture. Now, I really like his way of making plans.',
        translation: '在这之后，我逐渐与Leo成为了好朋友。我意识到认真和有明确计划实际上是德国文化的一部分。现在，我真的很喜欢他做计划的方式。',
        keywords: ['gradually became friends', 'German culture', 'clear plan', 'like his way']
      }
    ]
  },

  {
    id: 'helpful-person',
    title: '劝你的人',
    storyGroup: '👩🏾 外国朋友',
    topicType: '9-12月',
    examTakers: 0,
    groupColor: 'bg-blue-100',
    question: 'Describe someone who persuaded you to do something',
    questionCN: '描述一个说服你做某事的人',
    questionPoints: [
      { en: 'Who she was', cn: '她是谁' },
      { en: 'When where did it happened', cn: '什么时候在哪里发生的' },
      { en: 'What she persuaded you to do', cn: '她说服你做什么' },
      { en: 'Why you unhappy', cn: '为什么你不高兴' }
    ],
    answer: [
      {
        text: 'I\'d like to talk about my friend Sarah, who persuaded me to apply for a study abroad program last year.',
        translation: '我想谈谈我的朋友莎拉，她去年说服我申请了一个留学项目。',
        keywords: ['friend Sarah', 'persuaded', 'study abroad']
      },
      {
        text: 'At first, I was really hesitant and worried about leaving my comfort zone.',
        translation: '起初，我真的很犹豫，担心离开我的舒适区。',
        keywords: ['hesitant', 'worried', 'comfort zone']
      },
      {
        text: 'She spent hours convincing me by sharing her own positive experiences and addressing all my concerns.',
        translation: '她花了几个小时说服我，分享了她自己的积极经历，并解决了我所有的顾虑。',
        keywords: ['convincing', 'positive experiences', 'concerns']
      },
      {
        'text': 'Her persuasion turned out to be life-changing, and I\'m so grateful she didn\'t give up on me.',
        'translation': '她的说服最终改变了我的人生，我很感激她没有放弃我。',
        'keywords': ['life-changing', 'grateful', 'didn\'t give up']
      }
    ]
  },

  {
    id: 'different-culture-friend',
    title: '不同文化的朋友',
    storyGroup: '👩🏾 外国朋友',
    topicType: '9-12月',
    examTakers: 0,
    groupColor: 'bg-blue-100',
    question: 'Describe a friend from a different culture',
    questionCN: '描述一个来自不同文化的朋友',
    questionPoints: [
      { en: 'Who she is', cn: '她是谁' },
      { en: 'Where she from', cn: '她来自哪里' },
      { en: 'Where how you knew her', cn: '你是怎么认识她的' },
      { en: 'How you feel about her', cn: '你对她的感觉如何' }
    ],
    answer: [
      {
        text: 'One of my closest friends is Maria, who is from Spain and has a completely different cultural background.',
        translation: '我最亲密的朋友之一是玛丽亚，她来自西班牙，有着完全不同的文化背景。',
        keywords: ['Maria', 'Spain', 'different culture']
      },
      {
        text: 'Through our friendship, I\'ve learned so much about Spanish traditions, food, and lifestyle.',
        translation: '通过我们的友谊，我学到了很多关于西班牙传统、食物和生活方式的知识。',
        keywords: ['Spanish traditions', 'food', 'lifestyle']
      },
      {
        text: 'She has a very warm and expressive personality which is typical of Mediterranean culture.',
        translation: '她有着非常热情和富有表现力的个性，这是地中海文化的典型特征。',
        keywords: ['warm', 'expressive', 'Mediterranean culture']
      },
      {
        text: 'Our cultural differences have enriched both of our lives and broadened our perspectives.',
        translation: '我们的文化差异丰富了我们双方的生活，拓宽了我们的视野。',
        keywords: ['cultural differences', 'enriched', 'broadened perspectives']
      }
    ]
  },

  {
    id: 'dislike-to-like-friend',
    title: '由不喜欢到喜欢的朋友',
    storyGroup: '👩🏾 外国朋友',
    topicType: '9-12月',
    examTakers: 0,
    groupColor: 'bg-blue-100',
    question: 'Describe a person you didn\'t like but now you do',
    questionCN: '描述一个你以前不喜欢但现在喜欢的人',
    questionPoints: [
      { en: 'Who she is', cn: '她是谁' },
      { en: 'How you knew her', cn: '你怎么认识她的' },
      { en: 'Why dislike at first but changed your mind', cn: '为什么一开始不喜欢但后来改变了主意' },
      { en: 'How you feel about the experience', cn: '你对这次经历的感受如何' }
    ],
    answer: [
      {
        text: 'I\'d like to talk about my friend Leo, who is from Germany. We met at a local hiking club. Recently, our hiking club had a forest hike. He was chosen as the leader because of his years of experience. To be honest, I didn\'t really like him at first.',
        translation: '我想谈谈我的朋友Leo，他来自德国。我们在当地的徒步俱乐部认识。最近，我们的徒步俱乐部进行了一次森林徒步。因为他多年的经验，他被选为领队。说实话，我起初真的不太喜欢他。',
        keywords: ['friend Leo', 'Germany', 'hiking club', 'chosen as leader', 'didn\'t like at first']
      },
      {
        text: 'A few days before the trip, he repeatedly persuaded me to prepare every necessary item. He gave me a long list, including a compass, a professional first-aid kit, waterproof clothes, and even extra batteries. He also insisted that I should memorize not only the main routes but also backup routes. I understand a leader needs to have leadership skills, but he was incredibly strict. I just wanted to relax in nature, so I found his rules to be a burden.',
        translation: '在旅行前几天，他反复说服我准备好每一件必要的物品。他给了我一个长长的清单，包括指南针、专业急救包、防水衣服，甚至还有备用电池。他还坚持要求我不仅要记住主要路线，还要记住备用路线。我理解领队需要有领导技能，但他太严格了。我只是想在大自然中放松，所以我觉得他的规定是一种负担。',
        keywords: ['repeatedly persuaded', 'long list', 'first-aid kit', 'incredibly strict', 'rules burden']
      },
      {
        text: 'However, it turned out that I should have followed his advice. During the trip, the weather suddenly changed, and we met a heavy storm with lightning. Right when I was scared and panicking, and deeply regretting ignoring his suggestions, Leo handed me a box. Inside were the extra things he had prepared for me. Thanks to his help, I successfully finished the hike and got home safely.',
        translation: '然而，事实证明我应该听从他的建议。在旅途中，天气突然变了，我们遇到了一场大风暴，还有闪电。就在我害怕和恐慌，并深深后悔忽视他的建议时，Leo递给我一个盒子。里面是他为我准备的额外物品。多亏了他的帮助，我成功完成了徒步旅行，平安回到了家。',
        keywords: ['should have followed', 'heavy storm', 'deeply regretting', 'prepared for me', 'got home safely']
      },
      {
        text: 'After this, I gradually became great friends with Leo. I realized that being serious and having a clear plan is actually a part of German culture. Now, I really like his way of making plans.',
        translation: '在这之后，我逐渐与Leo成为了好朋友。我意识到认真和有明确计划实际上是德国文化的一部分。现在，我真的很喜欢他做计划的方式。',
        keywords: ['gradually became friends', 'German culture', 'clear plan', 'like his way']
      }
    ]
  },

  // 👫 怪朋友 组（浅粉色）
  {
    id: 'fashionable-person',
    title: '奇装异服的人',
    storyGroup: '👫 怪朋友',
    topicType: '9-12月',
    examTakers: 0,
    groupColor: 'bg-pink-50',
    question: 'Describe a person who dresses in an unusual way',
    questionCN: '描述一个穿着奇特的人',
    questionPoints: [
      { en: 'Who she is', cn: '她是谁' },
      { en: 'How u knew', cn: '你怎么认识她的' },
      { en: 'What her clothes are like', cn: '她的衣服是什么样子的' },
      { en: 'Why u think her clothes are unusual', cn: '为什么你觉得她的衣服很特别' }
    ],
    analysis: `
      <p class="mb-4"><strong>📝 答题思路：</strong></p>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>第一段：</strong>介绍基本信息（是什么/是谁、在哪里、如何了解）</li>
        <li><strong>第二段：</strong>详细描述特点、经历或细节</li>
        <li><strong>第三段：</strong>进一步展开说明个人感受和影响</li>
        <li><strong>第四段：</strong>总结为什么重要或有意义</li>
      </ul>
      <p class="mb-4"><strong>🎯 核心要点：</strong></p>
      <ul class="list-disc list-inside space-y-2">
        <li>使用具体细节和例子支撑观点</li>
        <li>表达个人感受和情感联系</li>
        <li>展示词汇多样性和地道表达</li>
        <li>保持逻辑清晰，自然过渡</li>
      </ul>
    `,
    keywordsMemo: [],
    answer: [
      {
        text: 'The person I\'d like to talk about is my best friend, Lily. We\'ve known each other for over twenty years. We were classmates since kindergarten and went to the same school all the way through primary, middle, and high school. So I know her style really well.',
        translation: '我想谈论的人是我最好的朋友，莉莉。我们已经认识二十多年了。我们从幼儿园开始就是同学，一路上完了小学、中学和高中。所以我非常了解她的风格。',
        keywords: ['best friend Lily', 'over twenty years', 'classmates since kindergarten', 'know her style']
      },
      {
        text: 'Her dressing style is quite unique. She loves wearing Hanfu, which is traditional Chinese clothing. She has all kinds of Hanfu in her wardrobe, in colors like pale blue, soft pink, and cream. The fabric is usually light and flowing, and it makes her look calm and elegant.',
        translation: '她的着装风格相当独特。她喜欢穿汉服，这是中国的传统服装。她的衣柜里有各种各样的汉服，颜色有淡蓝色、柔和的粉色和奶油色。面料通常轻盈飘逸，使她看起来平静而优雅。',
        keywords: ['quite unique', 'loves wearing Hanfu', 'traditional Chinese clothing', 'light and flowing', 'calm and elegant']
      },
      {
        text: 'She once told me that wearing Hanfu is a good way to promote traditional culture. In a busy modern city, many people forget about these traditions. Wearing Hanfu is an easy and direct way to show the beauty and history behind it. She hopes more people can notice it and learn to appreciate traditional culture.',
        translation: '她曾经告诉我，穿汉服是宣传传统文化的好方法。在繁忙的现代城市，许多人忘记了这些传统。穿汉服是展示其背后美丽和历史的简单而直接的方式。她希望更多的人能够注意到它并学��欣赏传统文化。',
        keywords: ['promote traditional culture', 'busy modern city', 'forget traditions', 'show beauty and history', 'appreciate culture']
      },
      {
        text: 'She also thinks that clothes are a personal choice. For her, wearing Hanfu is just like choosing a skirt or a T-shirt — it\'s normal and fun. She wears it in her daily life, not only for special occasions, and she likes to encourage others to wear what makes them feel good. Overall, I really admire her. She has made promoting traditional Chinese culture part of her everyday life. Seeing her confident and passionate about Hanfu really inspires me.',
        translation: '她还认为衣服是个人选择。对她来说，穿汉服就像选择裙子或T恤——这很正常也很有趣。她在日常生活中穿它，不仅仅是在特殊场合，她喜欢鼓励其他人穿让他们感觉良好的衣服。总的来说，我真的很钦佩她。她把宣传中国传统文化融入到了日常生活中。看到她对汉服如此自信和充满热情真的激励了我。',
        keywords: ['personal choice', 'daily life', 'encourage others', 'really admire', 'confident and passionate', 'really inspires me']
      }
    ]
  },

  {
    id: 'well-dressed-friend',
    title: '会打扮的朋友',
    storyGroup: '👫 怪朋友',
    topicType: '9-12月',
    examTakers: 0,
    groupColor: 'bg-pink-50',
    question: 'Describe a friend who is good at dressing up',
    questionCN: '描述一个擅长打扮的朋友',
    questionPoints: [
      { en: 'Who she is', cn: '她是谁' },
      { en: 'How u knew her', cn: '你怎么认识她的' },
      { en: 'What her dressing style is', cn: '她的着装风格是什么' },
      { en: 'Why she dresses this way', cn: '她为什么这样打扮' }
    ],
    answer: [
      {
        text: 'The person I\'d like to talk about is my best friend, Lily. We\'ve known each other for over twenty years. We were classmates since kindergarten and went to the same school all the way through primary, middle, and high school. So I know her style really well.',
        translation: '我想谈论的人是我最好的朋友，莉莉。我们已经认识二十多年了。我们从幼儿园开始就是同学，一路上完了小学、中学和高中。所以我非常了解她的风格。',
        keywords: ['best friend Lily', 'over twenty years', 'classmates since kindergarten', 'know her style']
      },
      {
        text: 'Her dressing style is quite unique. She loves wearing Hanfu, which is traditional Chinese clothing. She has all kinds of Hanfu in her wardrobe, in colors like pale blue, soft pink, and cream. The fabric is usually light and flowing, and it makes her look calm and elegant.',
        translation: '她的着装风格相当独特。她喜欢穿汉服，这是中国的传统服装。她的衣柜里有各种各样的汉服，颜色有淡蓝色、柔和的粉色和奶油色。面料通常轻盈飘逸，使她看起来平静而优雅。',
        keywords: ['quite unique', 'loves wearing Hanfu', 'traditional Chinese clothing', 'light and flowing', 'calm and elegant']
      },
      {
        text: 'She once told me that wearing Hanfu is a good way to promote traditional culture. In a busy modern city, many people forget about these traditions. Wearing Hanfu is an easy and direct way to show the beauty and history behind it. She hopes more people can notice it and learn to appreciate traditional culture.',
        translation: '她曾经告诉我，穿汉服是宣传传统文化的好方法。在繁忙的现代城市，许多人忘记了这些传统。穿汉服是展示其背后美丽和历史的简单而直接的方式。她希望更多的人能够注意到它并学会欣赏传统文化。',
        keywords: ['promote traditional culture', 'busy modern city', 'forget traditions', 'show beauty and history', 'appreciate culture']
      },
      {
        text: 'She also thinks that clothes are a personal choice. For her, wearing Hanfu is just like choosing a skirt or a T-shirt — it\'s normal and fun. She wears it in her daily life, not only for special occasions, and she likes to encourage others to wear what makes them feel good. Overall, I really admire her. She has made promoting traditional Chinese culture part of her everyday life. Seeing her confident and passionate about Hanfu really inspires me.',
        translation: '她还认为衣服是个人选择。对她来说，穿汉服就像选择裙子或T恤——这很正常也很有趣。她在日常生活中穿它，不仅仅是在特殊场合，她喜欢鼓励其他人穿让他们感觉良好的衣服。总的来说，我真的很钦佩她。她把宣传中国传统文化融入到了日常生活中。看到她对汉服如此自信和充满热情真的激励了我。',
        keywords: ['personal choice', 'daily life', 'encourage others', 'really admire', 'confident and passionate', 'really inspires me']
      }
    ]
  },

  // 👵 李邻居 组（橙红色）
  {
    id: 'gardening-person',
    title: '待花弄果之人',
    storyGroup: '👵 李邻居',
    topicType: '9-12月',
    examTakers: 56,
    groupColor: 'bg-red-100',
    question: 'Describe a person who likes to grow plants',
    questionCN: '描述一个喜欢种植植物的人',
    questionPoints: [
      { en: 'Who this person is', cn: '这个人是谁' },
      { en: 'What she grows', cn: '她种植什么' },
      { en: 'Where she grows them', cn: '她在哪里种植' },
      { en: 'Why she enjoys growing plants', cn: '她为什么喜欢种植植物' }
    ],
    analysis: `
      <p class="mb-4"><strong>📝 答题思路：</strong></p>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>第一段：</strong>介绍基本信息（是什么/是谁、在哪里、如何了解）</li>
        <li><strong>第二段：</strong>详细描述特点、经历或细节</li>
        <li><strong>第三段：</strong>进一步展开说明个人感受和影响</li>
        <li><strong>第四段：</strong>总结为什么重要或有意义</li>
      </ul>
      <p class="mb-4"><strong>🎯 核心要点：</strong></p>
      <ul class="list-disc list-inside space-y-2">
        <li>使用具体细节和例子支撑观点</li>
        <li>表达个人感受和情感联系</li>
        <li>展示词汇多样性和地道表达</li>
        <li>保持逻辑清晰，自然过渡</li>
      </ul>
    `,
    keywordsMemo: [],
    answer: [
      {
        text: 'I\'d like to talk about my elderly neighbor, Mrs. Li. I met her shortly after I moved into my apartment — I noticed her balcony was full of flowers and plants, so I said hi and we started chatting.',
        translation: '我想谈谈我的邻居李奶奶。我搬进公寓后不久就认识了她——我注意到她的阳台上长满了鲜花和植物，所以我和她打招呼，我们开始聊天。',
        keywords: ['elderly neighbor', 'Mrs. Li', 'shortly after', 'balcony full of', 'flowers and plants']
      },
      {
        text: 'Through our conversations, I learned that Mrs. Li lives alone, but she never feels lonely. In fact, her life revolves around flowers. She is busy everyday growing all kinds of flowers — roses, lilies, sunflowers, and more. She told me that planting helps her relax and feel connected to nature, especially living in a busy city like this.',
        translation: '通过我们的对话，我了解到李奶奶独自生活，但她从不感到孤独。事实上，她的生活围绕着花朵。她每天都忙于种植各种花卉——玫瑰、百合、向日葵等等。她告诉我，种植帮助她放松，并感受到与大自然的联系，尤其是生活在这样一个繁忙的城市里。',
        keywords: ['lives alone', 'never feels lonely', 'life revolves around flowers', 'growing all kinds', 'feel connected to nature']
      },
      {
        text: 'Actually, I really enjoy talking with her. She not only shares practical tips about gardening but also gives me valuable life lessons. I remember she once told me that taking care of flowers is just like taking care of ourselves: both need patience, attention, and a little bit of love every day. These conversations always make me feel calm and inspired.',
        translation: '实际上，我真的很喜欢和她交谈。她不仅分享关于园艺的实用技巧，还给我宝贵的人生教训。我记得她曾经告诉我，照顾花朵就像照顾我们自己：两者都需要耐心、关注和每天一点点的爱。这些对话总是让我感到平静和受到启发。',
        keywords: ['really enjoy talking', 'practical tips', 'valuable life lessons', 'taking care flowers', 'patience attention love']
      },
      {
        text: 'I think she is really interesting because she can learn deep life lessons from something as simple as planting flowers. So now, whenever I have free time, we take care of the plants together, like watering them and moving the pots. I hope we will have more chances to talk and get to know each other better.',
        translation: '我认为她真的很有趣，因为她能从种花这样简单的事情中学到深刻的人生道理。所以现在，每当我有空闲时间，我们就一起照顾植物，比如给它们浇水和移动花盆。我希望我们能有更多机会交谈，更好地了解彼此。',
        keywords: ['really interesting', 'deep life lessons', 'plants together', 'hope more chances', 'get to know better']
      }
    ]
  },

  {
    id: 'interesting-old-person',
    title: '聊得来的有趣老人',
    storyGroup: '👵 李邻居',
    topicType: '9-12月',
    examTakers: 0,
    groupColor: 'bg-red-100',
    question: 'Describe an interesting old person you know',
    questionCN: '描述一个你认识的有趣的老人',
    questionPoints: [
      { en: 'Who this person is', cn: '这个人是谁' },
      { en: 'Where he/she lives', cn: '他/她住在哪里' },
      { en: 'What his/her life like', cn: '他/她的生活是怎样的' },
      { en: 'What you like to talk about with him/her', cn: '你喜欢和他/她谈论什么' },
      { en: 'Why you enjoy talking to him/her', cn: '你为什么喜欢和他/她聊天' }
    ],
    answer: [
      {
        text: 'I\'d like to talk about my elderly neighbor, Mrs. Li. I met her shortly after I moved into my apartment — I noticed her balcony was full of flowers and plants, so I said hi and we started chatting.',
        translation: '我想谈谈我的邻居李奶奶。我搬进公寓后不久就认识了她——我注意到她的阳台上长满了鲜花和植物，所以我和她打招呼，我们开始聊天。',
        keywords: ['elderly neighbor', 'Mrs. Li', 'shortly after', 'balcony full of', 'flowers and plants']
      },
      {
        text: 'Through our conversations, I learned that Mrs. Li lives alone, but she never feels lonely. In fact, her life revolves around flowers. She is busy everyday growing all kinds of flowers — roses, lilies, sunflowers, and more. She told me that planting helps her relax and feel connected to nature, especially living in a busy city like this.',
        translation: '通过我们的对话，我了解到李奶奶独自生活，但她从不感到孤独。事实上，她的生活围绕着花朵。她每天都忙于种植各种花卉——玫瑰、百合、向日葵等等。她告诉我，种植帮助她放松，并感受到与大自然的联系，尤其是生活在这样一个繁忙的城市里。',
        keywords: ['lives alone', 'never feels lonely', 'life revolves around flowers', 'growing all kinds', 'feel connected to nature']
      },
      {
        text: 'Actually, I really enjoy talking with her. She not only shares practical tips about gardening but also gives me valuable life lessons. I remember she once told me that taking care of flowers is just like taking care of ourselves: both need patience, attention, and a little bit of love every day. These conversations always make me feel calm and inspired.',
        translation: '实际上，我真的很喜欢和她交谈。她不仅分享关于园艺的实用技巧，还给我宝贵的人生教训。我记得她曾经告诉我，照顾花朵就像照顾我们自己：两者都需要耐心、关注和每天一点点的爱。这些对话总是让我感到平静和受到启发。',
        keywords: ['really enjoy talking', 'practical tips', 'valuable life lessons', 'taking care flowers', 'patience attention love']
      },
      {
        text: 'I think she is really interesting because she can learn deep life lessons from something as simple as planting flowers. So now, whenever I have free time, we take care of the plants together, like watering them and moving the pots. I hope we will have more chances to talk and get to know each other better.',
        translation: '我认为她真的很有趣，因为她能从种花这样简单的事情中学到深刻的人生道理。所以现在，每当我有空闲时间，我们就一起照顾植物，比如给它们浇水和移动花盆。我希望我们能有更多机会交谈，更好地了解彼此。',
        keywords: ['really interesting', 'deep life lessons', 'plants together', 'hope more chances', 'get to know better']
      }
    ]
  },
];