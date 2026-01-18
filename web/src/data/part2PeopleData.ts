export type Part2Topic = {
  id: string;
  title: string;
  storyGroup: string;
  topicType: string;
  examTakers: number;
  questionPoints?: { en: string; cn?: string }[];
  answer: { text: string; translation?: string; keywords?: string[] }[];
};

export const part2PeopleTopics: Part2Topic[] = [
  {
    id: 'people-1',
    title: 'A person who influenced you',
    storyGroup: '🏃‍♂️ 马龙',
    topicType: '经典题',
    examTakers: 12,
    questionPoints: [
      { en: 'Who is this person?', cn: '这个人是谁？' },
      { en: 'How did they influence you?', cn: '他们如何影响了你？' },
    ],
    answer: [
      {
        text: 'One person who influenced me greatly is my high school English teacher. She encouraged me to speak up and think critically.',
        translation: '有一个对我影响很大的人是我的高中英语老师。她鼓励我大胆发言并进行批判性思考。',
        keywords: ['teacher', 'encouraged', 'critical thinking']
      }
    ]
  },
  {
    id: 'people-2',
    title: 'A friend you enjoy spending time with',
    storyGroup: '👨‍👩‍👧 发展 Lily',
    topicType: '9-12月',
    examTakers: 5,
    questionPoints: [
      { en: 'What do you usually do together?', cn: '你们通常一起做什么？' }
    ],
    answer: [
      {
        text: 'My friend and I often go hiking and discuss books. We share similar tastes and enjoy learning from each other.',
        translation: '我和朋友经常去徒步并讨论书籍。我们兴趣相投，喜欢互相学习。',
        keywords: ['hiking', 'books', 'share']
      }
    ]
  }
];
