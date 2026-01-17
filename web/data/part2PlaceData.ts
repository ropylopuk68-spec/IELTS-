import { Part2Topic as BaseTopic } from './part2PeopleData';

export type Part2Topic = BaseTopic;

export const part2PlaceTopics: Part2Topic[] = [
  {
    id: 'place-1',
    title: 'A place you like to visit',
    storyGroup: '🌲 森林公园',
    topicType: '经典题',
    examTakers: 8,
    questionPoints: [
      { en: 'Where is this place?', cn: '这个地方在哪里？' }
    ],
    answer: [
      {
        text: 'I love visiting a nearby forest park because it is peaceful and full of fresh air.',
        translation: '我喜欢去附近的森林公园，因为那里宁静且空气清新。',
        keywords: ['forest', 'peaceful', 'fresh air']
      }
    ]
  }
];
