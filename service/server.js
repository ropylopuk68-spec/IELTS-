const express = require('express');
const { testConnection } = require('./config/supabase');
const Topic = require('./models/TopicSupabase');

// Load environment variables if needed
require('dotenv').config();

const app = express();

// Test database connection
testConnection().catch(console.error);

// Middleware
app.use(express.json());

// Routes

// 获取所有主题，支持按 part 筛选
app.get('/api/topics', async (req, res) => {
  try {
    const { part, topicType, category } = req.query;
    const filters = {};
    
    if (part) {
      filters.part = part;
    }
    
    if (topicType) {
      filters.topicType = topicType;
    }
    
    if (category && part === '2') {
      filters.category = category;
    }
    
    const topics = await Topic.find(filters);
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 按 part 获取主题列表
app.get('/api/topics/part/:part', async (req, res) => {
  try {
    const { part } = req.params;
    const { topicType, limit, skip } = req.query;
    
    const options = {};
    if (topicType) {
      options.topicType = topicType;
    }
    if (limit) {
      options.limit = parseInt(limit);
    }
    if (skip) {
      options.skip = parseInt(skip);
    }
    
    const result = await Topic.findByPart(part, options);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取单个主题
app.get('/api/topics/:id', async (req, res) => {
  try {
    const topic = await Topic.findOne({ id: req.params.id });
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 创建新主题
app.post('/api/topics', async (req, res) => {
  try {
    const newTopic = await Topic.create(req.body);
    res.status(201).json(newTopic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 更新主题
app.put('/api/topics/:id', async (req, res) => {
  try {
    const topic = await Topic.update(req.params.id, req.body);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    res.json(topic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 删除主题
app.delete('/api/topics/:id', async (req, res) => {
  try {
    const topic = await Topic.findOneById(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    await Topic.delete(req.params.id);
    res.json({ message: 'Topic deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取统计信息
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await Topic.getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});