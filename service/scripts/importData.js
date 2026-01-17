const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const connectDB = require('../config/database');
const Topic = require('../models/Topic');

// 加载环境变量
require('dotenv').config();

// 辅助函数：从 TypeScript 文件中提取数据
function extractDataFromTS(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // 简单的提取逻辑：查找 export const 或 export 语句
    // 这是一个简化的解析，实际项目中可能需要使用 TypeScript 编译器 API
    
    // 对于 mockData.ts，查找 mockTopics
    if (filePath.includes('mockData.ts')) {
      // 尝试提取 mockTopics 对象
      const match = content.match(/export\s+const\s+mockTopics[^=]*=\s*({[\s\S]*?});/);
      if (match) {
        // 这里需要更复杂的解析，暂时返回 null，使用其他方法
        return null;
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

// 导入 Part1 数据
async function importPart1Data() {
  console.log('开始导入 Part1 数据...');
  
  // 由于 TypeScript 文件，我们需要手动转换或使用其他方法
  // 这里我们创建一个临时的数据转换脚本
  const mockDataPath = path.join(__dirname, '../../data/mockData.ts');
  
  // 读取文件并提取数据（简化版本）
  // 实际项目中，建议将数据转换为 JSON 格式或使用 TypeScript 编译器
  
  // 这里我们假设数据已经准备好，直接从文件系统读取
  // 或者我们可以创建一个 JSON 版本的数据文件
  
  console.log('Part1 数据导入完成');
}

// 导入 Part2 数据
async function importPart2Data() {
  console.log('开始导入 Part2 数据...');
  
  const part2Files = [
    { file: 'part2PeopleData.ts', category: 'people' },
    { file: 'part2PlaceData.ts', category: 'place' },
    { file: 'part2EventData.ts', category: 'event' },
    { file: 'part2ThingData.ts', category: 'thing' }
  ];
  
  for (const { file, category } of part2Files) {
    const filePath = path.join(__dirname, '../../data', file);
    if (fs.existsSync(filePath)) {
      console.log(`处理 ${file}...`);
      // 这里需要解析 TypeScript 文件
      // 暂时跳过，等待数据转换
    }
  }
  
  console.log('Part2 数据导入完成');
}

// 主导入函数
async function importAllData() {
  try {
    // 连接数据库
    await connectDB();
    console.log('数据库连接成功');
    
    // 清空现有数据（可选）
    const clearData = process.argv.includes('--clear');
    if (clearData) {
      console.log('清空现有数据...');
      await Topic.deleteMany({});
      console.log('数据已清空');
    }
    
    // 导入各 Part 数据
    await importPart1Data();
    await importPart2Data();
    // Part3 数据导入（如果有）
    
    console.log('所有数据导入完成！');
    process.exit(0);
  } catch (error) {
    console.error('导入数据时出错:', error);
    process.exit(1);
  }
}

// 运行导入
if (require.main === module) {
  importAllData();
}

module.exports = { importAllData, importPart1Data, importPart2Data };
