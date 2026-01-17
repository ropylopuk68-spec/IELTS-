/**
 * 使用 tsx 导入 TypeScript 数据文件
 * 需要先安装: npm install -D tsx
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { testConnection } = require('../config/supabase');
const Topic = require('../models/TopicSupabase');

require('dotenv').config();

// 检查 tsx 是否可用
function checkTSX() {
  try {
    require.resolve('tsx');
    return true;
  } catch (e) {
    return false;
  }
}

// 使用 tsx 执行 TypeScript 文件并获取数据
async function importWithTSX(tsFilePath, part, converter) {
  return new Promise((resolve, reject) => {
    // 创建一个临时脚本来导出数据
    const tempScript = `
import * as data from '${tsFilePath.replace(/\\/g, '/')}';
import { writeFileSync } from 'fs';

// 根据不同的导出名称提取数据
let topics = [];
if (data.mockTopics) {
  topics = data.mockTopics['${part}'] || [];
} else if (data.part2PeopleTopics) {
  topics = data.part2PeopleTopics || [];
} else if (data.part2PlaceTopics) {
  topics = data.part2PlaceTopics || [];
} else if (data.part2EventTopics) {
  topics = data.part2EventTopics || [];
} else if (data.part2ThingTopics) {
  topics = data.part2ThingTopics || [];
} else if (Array.isArray(data.default)) {
  topics = data.default;
} else if (Array.isArray(data)) {
  topics = data;
}

writeFileSync('${path.join(__dirname, 'temp-data.json').replace(/\\/g, '/')}', JSON.stringify(topics, null, 2));
console.log('Exported', topics.length, 'topics');
`;

    const tempScriptPath = path.join(__dirname, 'temp-import.ts');
    fs.writeFileSync(tempScriptPath, tempScript);

    const tsx = spawn('npx', ['tsx', tempScriptPath], {
      cwd: path.join(__dirname, '../..'),
      stdio: 'pipe'
    });

    let output = '';
    let errorOutput = '';

    tsx.stdout.on('data', (data) => {
      output += data.toString();
    });

    tsx.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    tsx.on('close', async (code) => {
      // 清理临时文件
      if (fs.existsSync(tempScriptPath)) {
        fs.unlinkSync(tempScriptPath);
      }

      if (code !== 0) {
        console.error('tsx 执行失败:', errorOutput);
        reject(new Error(`tsx 执行失败: ${errorOutput}`));
        return;
      }

      // 读取导出的 JSON 数据
      const jsonPath = path.join(__dirname, 'temp-data.json');
      if (!fs.existsSync(jsonPath)) {
        reject(new Error('数据导出失败'));
        return;
      }

      try {
        const topics = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        fs.unlinkSync(jsonPath); // 清理临时文件

        // 导入到数据库
        let imported = 0;
        let updated = 0;
        let errors = 0;

        for (const topic of topics) {
          try {
            const dbTopic = converter(topic, part);
            // 检查记录是否存在
            const existing = await Topic.findOneById(dbTopic.id);
            const result = await Topic.upsert(dbTopic);

            if (existing) {
              updated++;
            } else {
              imported++;
            }
          } catch (error) {
            console.error(`导入主题 ${topic.id} 失败:`, error.message);
            errors++;
          }
        }

        console.log(`Part${part} 导入完成: 新增 ${imported}, 更新 ${updated}, 错误 ${errors}`);
        resolve({ imported, updated, errors });
      } catch (error) {
        reject(error);
      }
    });
  });
}

// 转换函数
function convertPart1Topic(topic, part = '1') {
  return {
    id: topic.id,
    part: part,
    question: topic.question,
    questionCN: null,
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

function convertPart2Topic(topic, part = '2') {
  return {
    id: topic.id,
    part: part,
    question: topic.question || '',
    questionCN: topic.questionCN || null,
    title: topic.title || null,
    topicType: topic.topicType || null,
    questionCount: null,
    examTakers: topic.examTakers || null,
    answerCount: topic.answer ? topic.answer.length : 0,
    duration: '1-2分钟',
    isNewTopic: false,
    questions: null,
    answer: topic.answer || [],
    storyGroup: topic.storyGroup || null,
    groupColor: topic.groupColor || null,
    questionPoints: topic.questionPoints || null,
    analysis: topic.analysis || null,
    keywordsMemo: topic.keywordsMemo || null
  };
}

// 主导入函数
async function importAll() {
  try {
    if (!checkTSX()) {
      console.log('错误: 未安装 tsx');
      console.log('请运行: npm install -D tsx');
      console.log('\n或者使用 JSON 导入方式: node scripts/importFromJSON.js');
      process.exit(1);
    }

    const connected = await testConnection();
    if (!connected) {
      process.exit(1);
    }
    console.log('数据库连接成功\n');

    const clearData = process.argv.includes('--clear');
    if (clearData) {
      console.log('清空现有数据...');
      await Topic.deleteMany({});
      console.log('数据已清空\n');
    }

    const dataDir = path.join(__dirname, '../../data');

    // 导入 Part1
    const part1File = path.join(dataDir, 'mockData.ts');
    if (fs.existsSync(part1File)) {
      console.log('导入 Part1 数据...');
      await importWithTSX(part1File, '1', convertPart1Topic);
    }

    // 导入 Part2
    const part2Files = [
      { file: 'part2PeopleData.ts', converter: convertPart2Topic },
      { file: 'part2PlaceData.ts', converter: convertPart2Topic },
      { file: 'part2EventData.ts', converter: convertPart2Topic },
      { file: 'part2ThingData.ts', converter: convertPart2Topic }
    ];

    for (const { file, converter } of part2Files) {
      const filePath = path.join(dataDir, file);
      if (fs.existsSync(filePath)) {
        console.log(`导入 ${file}...`);
        await importWithTSX(filePath, '2', converter);
      }
    }

    console.log('\n所有数据导入完成！');

    // 显示统计
    const stats = await Topic.getStats();

    console.log('\n数据库统计:');
    stats.forEach(stat => {
      console.log(`  Part ${stat._id}: ${stat.count} 个主题`);
    });

    process.exit(0);
  } catch (error) {
    console.error('导入出错:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  importAll();
}

module.exports = { importAll, importWithTSX };
