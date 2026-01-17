const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const connectDB = require('../config/database');
const Topic = require('../models/Topic');

require('dotenv').config();

/**
 * 从 JSON 文件导入数据到数据库
 */

// 转换 Part1 数据格式
function convertPart1Topic(topic, part = '1') {
  return {
    id: topic.id,
    part: part,
    question: topic.question,
    questionCN: topic.questionCN || null,
    title: null,
    topicType: topic.topicType || null,
    questionCount: topic.questionCount || null,
    examTakers: topic.examTakers || null,
    answerCount: topic.answerCount,
    duration: topic.duration,
    isNewTopic: topic.isNew || false,
    questions: topic.questions || [],
    answer: topic.answer || [],
    storyGroup: null,
    groupColor: null,
    questionPoints: null,
    analysis: null,
    keywordsMemo: null
  };
}

// 转换 Part2 数据格式
function convertPart2Topic(topic, part = '2') {
  return {
    id: topic.id,
    part: part,
    question: topic.question,
    questionCN: topic.questionCN || null,
    title: topic.title || null,
    topicType: topic.topicType || null,
    questionCount: null,
    examTakers: topic.examTakers || null,
    answerCount: topic.answer ? topic.answer.length : 0,
    duration: '1-2分钟', // Part2 默认时长
    isNewTopic: false,
    questions: null, // Part2 没有 questions 数组
    answer: topic.answer || [],
    storyGroup: topic.storyGroup || null,
    groupColor: topic.groupColor || null,
    questionPoints: topic.questionPoints || null,
    analysis: topic.analysis || null,
    keywordsMemo: topic.keywordsMemo || null
  };
}

// 导入 JSON 数据
async function importFromJSON(jsonFilePath, part, converter) {
  try {
    if (!fs.existsSync(jsonFilePath)) {
      console.log(`文件不存在: ${jsonFilePath}`);
      return;
    }

    const fileContent = fs.readFileSync(jsonFilePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    // 处理数组或对象
    let topics = [];
    if (Array.isArray(data)) {
      topics = data;
    } else if (data.part1 || data.part2 || data.part3) {
      // 如果是按 part 组织的对象
      const partKey = `part${part}`;
      topics = data[partKey] || [];
    } else if (data.people || data.place || data.event || data.thing) {
      // Part2 的分类数据
      topics = Object.values(data).flat();
    } else {
      topics = [data];
    }

    console.log(`找到 ${topics.length} 个 ${part} 数据项`);

    let imported = 0;
    let updated = 0;
    let errors = 0;

    for (const topic of topics) {
      try {
        const convertedTopic = converter(topic, part);
        
        // 使用 upsert 操作（如果存在则更新，不存在则插入）
        const result = await Topic.findOneAndUpdate(
          { id: convertedTopic.id },
          convertedTopic,
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        
        if (result.isNew) {
          imported++;
        } else {
          updated++;
        }
      } catch (error) {
        console.error(`处理主题 ${topic.id} 时出错:`, error.message);
        errors++;
      }
    }

    console.log(`Part${part} 导入完成: 新增 ${imported}, 更新 ${updated}, 错误 ${errors}`);
  } catch (error) {
    console.error(`导入 ${jsonFilePath} 时出错:`, error);
  }
}

// 主导入函数
async function importAllFromJSON() {
  try {
    await connectDB();
    console.log('数据库连接成功\n');

    const clearData = process.argv.includes('--clear');
    if (clearData) {
      console.log('清空现有数据...');
      await Topic.deleteMany({});
      console.log('数据已清空\n');
    }

    const dataDir = path.join(__dirname, '../../data');
    
    // 导入 Part1 数据
    const part1File = path.join(dataDir, 'part1.json');
    if (fs.existsSync(part1File)) {
      await importFromJSON(part1File, '1', convertPart1Topic);
    } else {
      console.log('Part1 JSON 文件不存在，跳过');
    }

    // 导入 Part2 数据
    const part2Files = [
      { file: 'part2-people.json', category: 'people' },
      { file: 'part2-place.json', category: 'place' },
      { file: 'part2-event.json', category: 'event' },
      { file: 'part2-thing.json', category: 'thing' }
    ];

    for (const { file } of part2Files) {
      const filePath = path.join(dataDir, file);
      if (fs.existsSync(filePath)) {
        await importFromJSON(filePath, '2', convertPart2Topic);
      }
    }

    // 导入 Part3 数据（如果有）
    const part3File = path.join(dataDir, 'part3.json');
    if (fs.existsSync(part3File)) {
      await importFromJSON(part3File, '3', convertPart2Topic); // Part3 可能使用类似 Part2 的格式
    }

    console.log('\n所有数据导入完成！');
    
    // 显示统计信息
    const stats = await Topic.aggregate([
      {
        $group: {
          _id: '$part',
          count: { $sum: 1 }
        }
      }
    ]);
    
    console.log('\n数据库统计:');
    stats.forEach(stat => {
      console.log(`  Part ${stat._id}: ${stat.count} 个主题`);
    });

    process.exit(0);
  } catch (error) {
    console.error('导入数据时出错:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  importAllFromJSON();
}

module.exports = { importFromJSON, importAllFromJSON };
