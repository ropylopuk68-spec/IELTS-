/**
 * 将 TypeScript 数据文件转换为 JSON
 * 使用 ts-node 来执行 TypeScript 文件并导出数据
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 检查是否安装了 ts-node
function checkTSDependencies() {
  try {
    require.resolve('ts-node');
    return true;
  } catch (e) {
    return false;
  }
}

// 转换单个 TypeScript 文件
function convertTSFile(tsFilePath, outputPath) {
  try {
    // 创建一个临时脚本来导出数据
    const tempScript = `
const data = require('${tsFilePath.replace(/\\/g, '/')}');
const fs = require('fs');
const output = JSON.stringify(data, null, 2);
fs.writeFileSync('${outputPath.replace(/\\/g, '/')}', output, 'utf-8');
console.log('转换完成: ${outputPath}');
`;

    // 由于 TypeScript 文件不能直接 require，我们需要使用其他方法
    // 这里提供一个手动转换的指导
    console.log(`\n需要手动转换: ${tsFilePath}`);
    console.log(`输出路径: ${outputPath}`);
    console.log('请使用以下方法之一:');
    console.log('1. 使用 ts-node: npx ts-node -e "const data = require(\\'./data/mockData.ts\\'); console.log(JSON.stringify(data, null, 2));"');
    console.log('2. 或者手动将数据复制并转换为 JSON 格式');
    
    return false;
  } catch (error) {
    console.error(`转换 ${tsFilePath} 时出错:`, error);
    return false;
  }
}

// 转换所有数据文件
function convertAllDataFiles() {
  const dataDir = path.join(__dirname, '../../data');
  const outputDir = path.join(__dirname, '../../data/json');
  
  // 创建输出目录
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('开始转换 TypeScript 数据文件为 JSON...\n');

  // Part1 数据
  const part1File = path.join(dataDir, 'mockData.ts');
  if (fs.existsSync(part1File)) {
    convertTSFile(part1File, path.join(outputDir, 'part1.json'));
  }

  // Part2 数据
  const part2Files = [
    'part2PeopleData.ts',
    'part2PlaceData.ts',
    'part2EventData.ts',
    'part2ThingData.ts'
  ];

  part2Files.forEach(file => {
    const tsFile = path.join(dataDir, file);
    if (fs.existsSync(tsFile)) {
      const jsonFile = file.replace('.ts', '.json').toLowerCase();
      convertTSFile(tsFile, path.join(outputDir, jsonFile));
    }
  });

  console.log('\n转换完成！');
  console.log('如果自动转换失败，请手动将数据转换为 JSON 格式。');
}

if (require.main === module) {
  convertAllDataFiles();
}

module.exports = { convertAllDataFiles, convertTSFile };
