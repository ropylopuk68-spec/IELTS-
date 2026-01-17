/**
 * 将 TypeScript 数据文件转换为 JSON 格式
 * 这个脚本需要 ts-node 来运行 TypeScript 文件
 */

const fs = require('fs');
const path = require('path');

// 由于直接解析 TypeScript 比较复杂，我们创建一个辅助脚本
// 实际使用时，建议使用 ts-node 或先将数据转换为 JSON

function convertTSDataToJSON() {
  console.log('数据转换工具');
  console.log('建议：');
  console.log('1. 安装 ts-node: npm install -D ts-node typescript');
  console.log('2. 使用 ts-node 运行 TypeScript 文件并导出为 JSON');
  console.log('3. 或者手动将数据转换为 JSON 格式');
}

if (require.main === module) {
  convertTSDataToJSON();
}

module.exports = { convertTSDataToJSON };
