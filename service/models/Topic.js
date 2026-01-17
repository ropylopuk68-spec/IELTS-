const mongoose = require('mongoose');

// Answer sub-schema (支持 Part1 和 Part2 的不同格式)
const answerSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  translation: {
    type: String
  },
  keywords: [{
    type: String
  }]
}, { _id: false });

// Question Point sub-schema (Part2 使用)
const questionPointSchema = new mongoose.Schema({
  en: String,
  cn: String
}, { _id: false });

// Keyword Memo sub-schema (Part2 使用)
const keywordMemoSchema = new mongoose.Schema({
  emoji: String,
  en: String,
  cn: String
}, { _id: false });

// Question sub-schema (Part1 使用)
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  questionCN: {
    type: String,
    required: true
  },
  answer: [answerSchema],
  translation: {
    type: String,
    required: true
  },
  audioUrl: String,
  keyPoints: [{
    type: String
  }]
}, { _id: false });

// Topic schema - 支持 Part1, Part2, Part3
const topicSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  part: {
    type: String,
    required: true,
    enum: ['1', '2', '3'],
    index: true
  },
  // 通用字段
  question: {
    type: String,
    required: true
  },
  questionCN: String, // Part2 使用
  title: String, // Part2 使用（题目名称）
  topicType: String,
  questionCount: Number,
  examTakers: Number,
  answerCount: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  isNewTopic: {
    type: Boolean,
    default: false
  },
  
  // Part1 特有字段
  questions: [questionSchema], // Part1 的多个问题
  
  // Part2 特有字段
  storyGroup: String, // 串题故事组
  groupColor: String, // 分组颜色
  questionPoints: [questionPointSchema], // 题目要点
  analysis: String, // 思路解读（HTML格式）
  keywordsMemo: [keywordMemoSchema], // 关键词速记
  
  // 通用答案字段
  answer: [answerSchema]
}, {
  timestamps: true
});

// 创建索引以提高查询性能
topicSchema.index({ part: 1, id: 1 });
topicSchema.index({ part: 1, topicType: 1 });

module.exports = mongoose.model('Topic', topicSchema);