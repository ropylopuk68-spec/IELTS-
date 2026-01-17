import { Topic } from './mockData';

// Part 2 Topics by Category
export const part2Topics: Record<'people' | 'place' | 'event', Topic[]> = {
  // 人物类
  people: [
    {
      id: '2-people-1',
      question: '软佩的运动员',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 14,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I would like to talk about Ma Long, one of the greatest table tennis players in history.', keywords: ['Ma Long', 'table tennis', 'greatest'] }
      ]
    },
    {
      id: '2-people-2',
      question: '机智解决问题的人',
      topicType: '1-4月新题',
      questionCount: 1,
      examTakers: 35,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I want to describe a friend of mine who is excellent at solving problems creatively.', keywords: ['friend', 'solving problems', 'creatively'] }
      ]
    },
    {
      id: '2-people-3',
      question: '在家族企业工作的人',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 56,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I would like to talk about my cousin who works in his family business.', keywords: ['cousin', 'family business'] }
      ]
    },
    {
      id: '2-people-4',
      question: '软佩的有创造力的人',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 42,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I admire Steve Jobs for his incredible creativity and innovation.', keywords: ['Steve Jobs', 'creativity', 'innovation'] }
      ]
    },
    {
      id: '2-people-5',
      question: '重要的好朋友',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'My best friend Lisa has been incredibly important in my life.', keywords: ['best friend', 'Lisa', 'important'] }
      ]
    },
    {
      id: '2-people-6',
      question: '激励你做有趣事情的人',
      topicType: '9-12月',
      questionCount: 1,
      examTakers: 21,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'My uncle always encourages me to try new and interesting things.', keywords: ['uncle', 'encourages', 'interesting'] }
      ]
    },
    {
      id: '2-people-7',
      question: '发小',
      topicType: '9-12月',
      questionCount: 1,
      examTakers: 35,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I grew up with Tom, who has been my childhood friend since kindergarten.', keywords: ['childhood friend', 'kindergarten'] }
      ]
    },
    {
      id: '2-people-8',
      question: '聪明的人',
      topicType: '9-12月',
      questionCount: 1,
      examTakers: 28,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'My physics teacher is one of the most intelligent people I have ever met.', keywords: ['physics teacher', 'intelligent'] }
      ]
    },
    {
      id: '2-people-9',
      question: '想见的名人',
      topicType: '1-4月新题',
      questionCount: 1,
      examTakers: 385,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'If I could meet any celebrity, it would be Elon Musk.', keywords: ['Elon Musk', 'celebrity'] }
      ]
    },
    {
      id: '2-people-10',
      question: '受欢迎的人',
      topicType: '非大陆地区1-4月保留题',
      questionCount: 1,
      examTakers: 35,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'There is a girl in my class who is extremely popular among everyone.', keywords: ['popular', 'classmate'] }
      ]
    },
    {
      id: '2-people-11',
      question: '喜欢的歌手',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 21,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'Taylor Swift is my favorite singer of all time.', keywords: ['Taylor Swift', 'favorite singer'] }
      ]
    },
    {
      id: '2-people-12',
      question: '擅长音乐的朋友',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 21,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I have a friend named David who is extremely talented in music.', keywords: ['David', 'talented', 'music'] }
      ]
    },
    {
      id: '2-people-13',
      question: '擅长做计划的人',
      topicType: '1-4月新题',
      questionCount: 1,
      examTakers: 112,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'My sister is incredibly good at making plans and organizing events.', keywords: ['sister', 'making plans', 'organizing'] }
      ]
    },
    {
      id: '2-people-14',
      question: '功你的人',
      topicType: '9-12月',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'A foreign friend from Australia has taught me a lot about different cultures.', keywords: ['foreign friend', 'Australia', 'cultures'] }
      ]
    },
    {
      id: '2-people-15',
      question: '不同文化的朋友',
      topicType: '9-12月',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I have a friend from India who introduced me to their fascinating culture.', keywords: ['India', 'culture'] }
      ]
    },
    {
      id: '2-people-16',
      question: '由不喜欢到喜欢的朋友',
      topicType: '9-12月',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'At first, I didn\'t like my roommate, but now we are close friends.', keywords: ['roommate', 'close friends'] }
      ]
    },
    {
      id: '2-people-17',
      question: '奇装异服的人',
      topicType: '9-12月',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'There is a girl in my neighborhood who always wears unique and unusual outfits.', keywords: ['unique', 'unusual outfits'] }
      ]
    },
    {
      id: '2-people-18',
      question: '会打扮的朋友',
      topicType: '9-12月',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'My friend Sarah has an excellent sense of fashion and style.', keywords: ['Sarah', 'fashion', 'style'] }
      ]
    },
    {
      id: '2-people-19',
      question: '待花着果之人',
      topicType: '9-12月',
      questionCount: 1,
      examTakers: 56,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'My neighbor Li Hua is a very patient person who always gets good results.', keywords: ['Li Hua', 'patient', 'results'] }
      ]
    },
    {
      id: '2-people-20',
      question: '聊得来的有趣老人',
      topicType: '9-12月',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'My grandfather is an interesting elderly person who tells amazing stories.', keywords: ['grandfather', 'interesting', 'stories'] }
      ]
    }
  ],

  // 地点类
  place: [
    {
      id: '2-place-1',
      question: '自然之地',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I would like to describe a beautiful natural place I visited last year.', keywords: ['natural place', 'beautiful'] }
      ]
    },
    {
      id: '2-place-2',
      question: '想再去一次的远行',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 49,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I would love to visit the forest park near my city again.', keywords: ['forest park', 'visit again'] }
      ]
    },
    {
      id: '2-place-3',
      question: '自行车/摩托车/汽车旅行',
      topicType: '1-4月新题',
      questionCount: 1,
      examTakers: 14,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'Last summer, I went on an unforgettable road trip by car.', keywords: ['road trip', 'car', 'unforgettable'] }
      ]
    },
    {
      id: '2-place-4',
      question: '有趣的建筑',
      topicType: '1-4月新题',
      questionCount: 1,
      examTakers: 70,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'The Bird\'s Nest stadium in Beijing is a fascinating building.', keywords: ['Bird\'s Nest', 'Beijing', 'fascinating'] }
      ]
    },
    {
      id: '2-place-5',
      question: '想了解的野生动物',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 35,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I went to the zoo last month and saw many interesting animals.', keywords: ['zoo', 'animals'] }
      ]
    },
    {
      id: '2-place-6',
      question: '看到动物的地方',
      topicType: '9-12月',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I often see squirrels and birds in the park near my home.', keywords: ['squirrels', 'birds', 'park'] }
      ]
    },
    {
      id: '2-place-7',
      question: '户外活动之地',
      topicType: '9-12月',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'There is a sports field near my house perfect for outdoor activities.', keywords: ['sports field', 'outdoor activities'] }
      ]
    },
    {
      id: '2-place-8',
      question: '受欢迎的运动场所',
      topicType: '9-12月',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'The city stadium is a very popular place for sports enthusiasts.', keywords: ['stadium', 'popular', 'sports'] }
      ]
    },
    {
      id: '2-place-9',
      question: '想再去一次的城市',
      topicType: '9-12月',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I would love to visit Chengdu again for its food and pandas.', keywords: ['Chengdu', 'food', 'pandas'] }
      ]
    },
    {
      id: '2-place-10',
      question: '向游客推荐本国旅游地',
      topicType: '9-12月',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I would recommend tourists to visit the Great Wall in China.', keywords: ['Great Wall', 'China', 'tourists'] }
      ]
    },
    {
      id: '2-place-11',
      question: '家里放松的地方',
      topicType: '非大陆地区1-4月新题',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'My favorite relaxing spot at home is my balcony.', keywords: ['balcony', 'relaxing', 'home'] }
      ]
    },
    {
      id: '2-place-12',
      question: '安静的地方',
      topicType: '9-12月',
      questionCount: 1,
      examTakers: 70,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'The library is my go-to place when I need peace and quiet.', keywords: ['library', 'peace', 'quiet'] }
      ]
    },
    {
      id: '2-place-13',
      question: '常去的熟人之家',
      topicType: '9-12月',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I often visit my grandmother\'s house on weekends.', keywords: ['grandmother', 'house', 'weekends'] }
      ]
    },
    {
      id: '2-place-14',
      question: '商店',
      topicType: '9-12月',
      questionCount: 1,
      examTakers: 14,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'There is a nice bookstore I frequently visit in my neighborhood.', keywords: ['bookstore', 'neighborhood'] }
      ]
    }
  ],

  // 事件类&事物类
  event: [
    {
      id: '2-event-1',
      question: '禁用手机的场合',
      topicType: '1-4月新题',
      questionCount: 1,
      examTakers: 49,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I remember a time when phones were not allowed during an important exam.', keywords: ['phones', 'not allowed', 'exam'] }
      ]
    },
    {
      id: '2-event-2',
      question: '微笑的场合',
      topicType: '1-4月新题',
      questionCount: 1,
      examTakers: 42,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I often smile when I meet old friends or receive good news.', keywords: ['smile', 'friends', 'good news'] }
      ]
    },
    {
      id: '2-event-3',
      question: '为家人所做',
      topicType: '1-4月新题',
      questionCount: 1,
      examTakers: 42,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I cooked a special dinner for my family on my mother\'s birthday.', keywords: ['cooked', 'dinner', 'birthday'] }
      ]
    },
    {
      id: '2-event-4',
      question: '鼓励别人做不愿做的事',
      topicType: '1-4月新题',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I once encouraged my friend to join a public speaking competition.', keywords: ['encouraged', 'friend', 'public speaking'] }
      ]
    },
    {
      id: '2-event-5',
      question: '第一次外语',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 35,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I learned my first foreign language, English, when I was in primary school.', keywords: ['English', 'primary school', 'foreign language'] }
      ]
    },
    {
      id: '2-event-6',
      question: '让人失望的电影',
      topicType: '1-4月新题',
      questionCount: 1,
      examTakers: 238,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I watched a highly anticipated movie that turned out to be disappointing.', keywords: ['movie', 'disappointing', 'anticipated'] }
      ]
    },
    {
      id: '2-event-7',
      question: '近期观影',
      topicType: '1-4月新题',
      questionCount: 1,
      examTakers: 14,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I recently watched an amazing science fiction film.', keywords: ['science fiction', 'film', 'amazing'] }
      ]
    },
    {
      id: '2-event-8',
      question: '对家庭重要的东西',
      topicType: '1-4月新题',
      questionCount: 1,
      examTakers: 49,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'A family photo album is very important to us.', keywords: ['photo album', 'family', 'important'] }
      ]
    },
    {
      id: '2-event-9',
      question: '童年喜欢的玩具',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'My favorite childhood toy was a LEGO set.', keywords: ['LEGO', 'childhood', 'favorite'] }
      ]
    },
    {
      id: '2-event-10',
      question: '家中老物件',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 14,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'We have an antique clock that has been in our family for decades.', keywords: ['antique clock', 'family', 'decades'] }
      ]
    },
    {
      id: '2-event-11',
      question: '异坏东西',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 14,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I accidentally broke my favorite mug last week.', keywords: ['broke', 'mug', 'accidentally'] }
      ]
    },
    {
      id: '2-event-12',
      question: 'App/程序',
      topicType: '1-4月新题',
      questionCount: 1,
      examTakers: 14,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I use a language learning app every day to practice English.', keywords: ['app', 'language learning', 'practice'] }
      ]
    },
    {
      id: '2-event-13',
      question: '生活中意外开心的东西',
      topicType: '非大陆地区1-4月新题',
      questionCount: 1,
      examTakers: 35,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'Finding money in an old jacket made me unexpectedly happy.', keywords: ['finding money', 'jacket', 'happy'] }
      ]
    },
    {
      id: '2-event-14',
      question: '发挥想象力',
      topicType: '1-4月新题',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I used my imagination to create a story for a school project.', keywords: ['imagination', 'story', 'project'] }
      ]
    },
    {
      id: '2-event-15',
      question: '第一次英语的兴趣活动',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'The first time I participated in an English speech contest was exciting.', keywords: ['English', 'speech contest', 'exciting'] }
      ]
    },
    {
      id: '2-event-16',
      question: '想提升的天赋',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I wish I could improve my musical talent, especially playing the piano.', keywords: ['musical talent', 'piano', 'improve'] }
      ]
    },
    {
      id: '2-event-17',
      question: '传统故事',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 28,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'A traditional Chinese story I love is the legend of Mulan.', keywords: ['Mulan', 'legend', 'Chinese'] }
      ]
    },
    {
      id: '2-event-18',
      question: '和朋友聚餐的晚餐',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 21,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'Last month, I had a wonderful dinner with friends at a seafood restaurant.', keywords: ['dinner', 'friends', 'seafood restaurant'] }
      ]
    },
    {
      id: '2-event-19',
      question: '购物服务',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I received excellent customer service at a local boutique.', keywords: ['customer service', 'boutique', 'excellent'] }
      ]
    },
    {
      id: '2-event-20',
      question: '不寻常的一餐',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I had an unusual meal when I tried insects in Thailand.', keywords: ['unusual meal', 'insects', 'Thailand'] }
      ]
    },
    {
      id: '2-event-21',
      question: '有用的书',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 98,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'A useful book I read recently taught me about time management.', keywords: ['book', 'time management', 'useful'] }
      ]
    },
    {
      id: '2-event-22',
      question: '近期日常改变',
      topicType: '非大陆地区1-4月保留题',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'Recently, I started waking up earlier to exercise before work.', keywords: ['waking up earlier', 'exercise', 'work'] }
      ]
    },
    {
      id: '2-event-23',
      question: '别人帮你作的决定',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'My parents helped me decide which university to attend.', keywords: ['parents', 'university', 'decide'] }
      ]
    },
    {
      id: '2-event-24',
      question: '学习做友好习惯',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 35,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I learned to develop the habit of reading before bed.', keywords: ['habit', 'reading', 'bed'] }
      ]
    },
    {
      id: '2-event-25',
      question: '感兴趣的科学学科/领域',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I am very interested in astronomy and space exploration.', keywords: ['astronomy', 'space exploration', 'interested'] }
      ]
    },
    {
      id: '2-event-26',
      question: '迷路',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I got lost in a foreign city during my vacation last year.', keywords: ['lost', 'foreign city', 'vacation'] }
      ]
    },
    {
      id: '2-event-27',
      question: '突然停电',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 56,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'We experienced a sudden power outage during dinner one evening.', keywords: ['power outage', 'dinner', 'sudden'] }
      ]
    },
    {
      id: '2-event-28',
      question: '等待别到情',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I had to wait a long time for my friend who was late to our meeting.', keywords: ['wait', 'friend', 'late'] }
      ]
    },
    {
      id: '2-event-29',
      question: '别人向你伤歉',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 28,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'A colleague apologized to me for missing an important deadline.', keywords: ['colleague', 'apologized', 'deadline'] }
      ]
    },
    {
      id: '2-event-30',
      question: '社交媒体事',
      topicType: '1-4月保留题',
      questionCount: 1,
      examTakers: 0,
      answerCount: 1,
      duration: '1-2分钟',
      answer: [
        { text: 'I recently joined a community event organized through social media.', keywords: ['social media', 'community event', 'organized'] }
      ]
    }
  ]
};
