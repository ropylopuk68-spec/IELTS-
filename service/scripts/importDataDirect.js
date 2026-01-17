/**
 * 直接从 TypeScript 数据文件导入数据到数据库
 * 使用简单的字符串解析来提取数据
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const connectDB = require('../config/database');
const Topic = require('../models/Topic');

require('dotenv').config();

// 解析 TypeScript 文件中的数组数据（简化版本）
function parseTSArray(content, arrayName) {
  try {
    // 查找 export const arrayName = [...]
    const regex = new RegExp(`export\\s+const\\s+${arrayName}\\s*=\\s*\\[([\\s\\S]*?)\\];`, 'g');
    const match = regex.exec(content);
    
    if (!match) {
      // 尝试查找其他格式
      const altRegex = new RegExp(`${arrayName}\\s*[:=]\\s*\\[([\\s\\S]*?)\\];`, 'g');
      const altMatch = altRegex.exec(content);
      if (altMatch) {
        return parseArrayContent(altMatch[1]);
      }
      return [];
    }
    
    return parseArrayContent(match[1]);
  } catch (error) {
    console.error(`解析 ${arrayName} 时出错:`, error);
    return [];
  }
}

// 解析数组内容（非常简化的版本）
function parseArrayContent(content) {
  // 这是一个非常简化的解析器
  // 实际项目中应该使用 TypeScript 编译器或更强大的解析器
  // 这里我们假设数据格式相对简单
  
  const items = [];
  let depth = 0;
  let currentItem = '';
  let inString = false;
  let stringChar = '';
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];
    
    if (!inString && (char === '"' || char === "'" || char === '`')) {
      inString = true;
      stringChar = char;
      currentItem += char;
    } else if (inString && char === stringChar && content[i - 1] !== '\\') {
      inString = false;
      currentItem += char;
    } else if (!inString && char === '{') {
      depth++;
      currentItem += char;
    } else if (!inString && char === '}') {
      depth--;
      currentItem += char;
      if (depth === 0) {
        // 尝试解析这个对象
        try {
          // 替换 TypeScript 语法为 JSON 语法
          let jsonStr = currentItem
            .replace(/(\w+):/g, '"$1":') // 键名加引号
            .replace(/'/g, '"') // 单引号转双引号
            .replace(/,\s*}/g, '}') // 移除尾随逗号
            .replace(/,\s*]/g, ']'); // 移除尾随逗号
          
          const obj = JSON.parse(jsonStr);
          items.push(obj);
        } catch (e) {
          // 解析失败，跳过
          console.warn('解析对象失败，跳过:', currentItem.substring(0, 100));
        }
        currentItem = '';
      }
    } else {
      currentItem += char;
    }
  }
  
  return items;
}

// 导入 Part1 数据
async function importPart1() {
  console.log('开始导入 Part1 数据...');
  
  const filePath = path.join(__dirname, '../../data/mockData.ts');
  if (!fs.existsSync(filePath)) {
    console.log('Part1 数据文件不存在');
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 提取 mockTopics 对象
  // 由于数据结构复杂，我们使用更简单的方法：手动提取每个 part
  const part1Match = content.match(/'1':\s*\[([\s\S]*?)\],/);
  
  if (!part1Match) {
    console.log('无法解析 Part1 数据，请手动转换为 JSON 格式');
    return;
  }

  // 这里需要更复杂的解析逻辑
  // 建议：先将数据转换为 JSON，然后使用 importFromJSON.js
  console.log('Part1 数据解析复杂，建议使用 JSON 导入方式');
  console.log('请运行: node scripts/convertDataToJSON.js 或手动转换数据');
}

// 导入 Part2 数据
async function importPart2() {
  console.log('开始导入 Part2 数据...');
  
  const part2Files = [
    { file: 'part2PeopleData.ts', exportName: 'part2PeopleTopics' },
    { file: 'part2PlaceData.ts', exportName: 'part2PlaceTopics' },
    { file: 'part2EventData.ts', exportName: 'part2EventTopics' },
    { file: 'part2ThingData.ts', exportName: 'part2ThingTopics' }
  ];

  for (const { file, exportName } of part2Files) {
    const filePath = path.join(__dirname, '../../data', file);
    if (!fs.existsSync(filePath)) {
      console.log(`文件不存在: ${file}`);
      continue;
    }

    console.log(`处理 ${file}...`);
    const content = fs.readFileSync(filePath, 'utf-8');
    const topics = parseTSArray(content, exportName);
    
    console.log(`找到 ${topics.length} 个主题`);
    
    // 导入到数据库
    for (const topic of topics) {
      try {
        const dbTopic = {
          id: topic.id,
          part: '2',
          question: topic.question || '',
          questionCN: topic.questionCN || null,
          title: topic.title || null,
          topicType: topic.topicType || null,
          examTakers: topic.examTakers || null,
          answerCount: topic.answer ? topic.answer.length : 0,
          duration: '1-2分钟',
          isNew: false,
          answer: topic.answer || [],
          storyGroup: topic.storyGroup || null,
          groupColor: topic.groupColor || null,
          questionPoints: topic.questionPoints || null,
          analysis: topic.analysis || null,
          keywordsMemo: topic.keywordsMemo || null
        };

        await Topic.findOneAndUpdate(
          { id: dbTopic.id },
          dbTopic,
          { upsert: true, new: true }
        );
      } catch (error) {
        console.error(`导入主题 ${topic.id} 失败:`, error.message);
      }
    }
  }
  
  console.log('Part2 数据导入完成');
}

// 主导入函数
async function importAll() {
  try {
    await connectDB();
    console.log('数据库连接成功\n');

    const clearData = process.argv.includes('--clear');
    if (clearData) {
      console.log('清空现有数据...');
      await Topic.deleteMany({});
      console.log('数据已清空\n');
    }

    await importPart1();
    await importPart2();

    console.log('\n导入完成！');
    
    // 显示统计
    const stats = await Topic.aggregate([
      { $group: { _id: '$part', count: { $sum: 1 } } }
    ]);
    
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

module.exports = { importAll, importPart1, importPart2 };
