# 数据导入脚本使用说明

## 概述

本项目提供了多个数据导入脚本，用于将 TypeScript 数据文件导入到 MongoDB 数据库中。

## 数据库模型

数据库模型已更新，支持以下字段：

- **通用字段**: `id`, `part` (1/2/3), `question`, `questionCN`, `topicType`, `examTakers`, `answerCount`, `duration`
- **Part1 特有**: `questions` (数组), `questionCount`
- **Part2 特有**: `title`, `storyGroup`, `groupColor`, `questionPoints`, `analysis`, `keywordsMemo`
- **答案字段**: `answer` (数组，包含 `text`, `translation`, `keywords`)

## 导入方法

### 方法 1: 使用 tsx 导入（推荐）

这是最直接的方法，可以直接从 TypeScript 文件导入数据。

**步骤：**

1. 安装 tsx（如果尚未安装）:
```bash
cd service
npm install -D tsx
```

2. 运行导入脚本:
```bash
npm run import:data
```

3. 如果需要清空现有数据后重新导入:
```bash
npm run import:data -- --clear
```

### 方法 2: 从 JSON 文件导入

如果 TypeScript 文件解析有问题，可以先将数据转换为 JSON 格式。

**步骤：**

1. 将 TypeScript 数据文件转换为 JSON（手动或使用工具）
2. 将 JSON 文件放在 `data/` 目录下，命名为：
   - `part1.json` - Part1 数据
   - `part2-people.json` - Part2 人物类
   - `part2-place.json` - Part2 地点类
   - `part2-event.json` - Part2 事件类
   - `part2-thing.json` - Part2 事物类
   - `part3.json` - Part3 数据（如果有）

3. 运行导入脚本:
```bash
npm run import:json
```

### 方法 3: 直接导入（实验性）

使用简单的字符串解析来提取数据（可能不够准确）:

```bash
npm run import:direct
```

## API 端点

导入数据后，可以使用以下 API 端点访问数据：

### 获取所有主题
```
GET /api/topics?part=1&topicType=1-4月新题
```

### 按 Part 获取主题
```
GET /api/topics/part/1
GET /api/topics/part/2
GET /api/topics/part/3
```

### 获取单个主题
```
GET /api/topics/:id
```

### 获取统计信息
```
GET /api/stats
```

## 数据格式说明

### Part1 数据格式
```typescript
{
  id: string;
  question: string;
  topicType?: string;
  questionCount?: number;
  examTakers?: number;
  answerCount: number;
  duration: string;
  isNew?: boolean;
  questions?: Array<{
    question: string;
    questionCN: string;
    answer: Array<{ text: string; keywords: string[] }>;
    translation: string;
    keyPoints?: string[];
  }>;
  answer: Array<{ text: string; keywords: string[] }>;
}
```

### Part2 数据格式
```typescript
{
  id: string;
  title: string;
  storyGroup?: string;
  topicType: string;
  examTakers: number;
  groupColor: string;
  question: string;
  questionCN?: string;
  questionPoints?: Array<{ en: string; cn: string }>;
  answer: Array<{
    text: string;
    translation: string;
    keywords: string[];
  }>;
  analysis?: string;
  keywordsMemo?: Array<{ emoji: string; en: string; cn: string }>;
}
```

## 故障排除

1. **tsx 未找到**: 运行 `npm install -D tsx`
2. **数据库连接失败**: 检查 `.env` 文件中的 `MONGODB_URI`
3. **数据解析错误**: 尝试使用 JSON 导入方法
4. **重复数据**: 脚本使用 `upsert`，会自动更新已存在的记录

## 注意事项

- 导入前建议备份数据库
- 使用 `--clear` 选项会删除所有现有数据
- 确保 MongoDB 服务正在运行
- 大数据量导入可能需要一些时间
