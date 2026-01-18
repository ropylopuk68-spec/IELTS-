import { Part2Topic as BaseTopic } from './part2PeopleData';

export type Part2Topic = BaseTopic;

export const part2EventTopics: Part2Topic[] = [
  {
    id: 'event-1',
    title: 'An important event in your life',
    storyGroup: '🎤 泰勒',
    topicType: '经典题',
    examTakers: 20,
    questionPoints: [
      { en: 'What was the event?', cn: '是什么事件？' }
    ],
    answer: [
      {
        text: 'An important event was when I graduated university; it marked the beginning of my professional journey.',
        translation: '一个重要事件是我大学毕业；它标志着我职业生涯的开始。',
        keywords: ['graduation', 'university', 'career']
      }
    ]
  }
];
