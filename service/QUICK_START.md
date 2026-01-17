# Supabase 快速开始指南

## ✅ 已完成的步骤

1. ✅ 已卸载 MongoDB 依赖
2. ✅ 已安装 Supabase 客户端库 (`@supabase/supabase-js`)
3. ✅ 已创建 Supabase 数据库连接配置
4. ✅ 已更新数据库模型（支持 Part1/2/3）
5. ✅ 已更新导入脚本
6. ✅ 已更新 API 路由

## 📋 您需要完成的步骤

### 1. 创建 Supabase 项目并获取 API Keys

**详细步骤请查看 `SUPABASE_SETUP.md` 文件**

快速步骤：
1. 访问 https://supabase.com 并登录
2. 点击 "New Project" 创建项目
3. 在 Settings → API 中获取：
   - **Project URL**: `https://xxxxx.supabase.co`
   - **service_role key**: `eyJhbGc...` (用于后端)

### 2. 创建数据库表

在 Supabase 控制台：

1. 点击 **Table Editor** → **New Table**
2. 表名: `topics`
3. 或使用 SQL Editor 执行以下 SQL：

```sql
CREATE TABLE topics (
  id TEXT PRIMARY KEY,
  part TEXT NOT NULL CHECK (part IN ('1', '2', '3')),
  question TEXT NOT NULL,
  question_cn TEXT,
  title TEXT,
  topic_type TEXT,
  question_count INTEGER,
  exam_takers INTEGER,
  answer_count INTEGER NOT NULL,
  duration TEXT NOT NULL,
  is_new_topic BOOLEAN DEFAULT false,
  questions JSONB,
  answer JSONB NOT NULL,
  story_group TEXT,
  group_color TEXT,
  question_points JSONB,
  analysis TEXT,
  keywords_memo JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_topics_part ON topics(part);
CREATE INDEX idx_topics_part_type ON topics(part, topic_type);
CREATE INDEX idx_topics_id ON topics(id);
```

### 3. 配置环境变量

在 `service/.env` 文件中添加（如果不存在，请创建）：

```env
SUPABASE_URL=https://你的项目ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=你的service_role_key
```

**示例：**
```env
SUPABASE_URL=https://abcdefghijklmnop.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. 导入数据

配置完成后，运行：

```bash
cd service
npm run import:data -- --clear
```

这将：
- 连接 Supabase 数据库
- 清空现有数据（如果有）
- 导入 Part1 数据（从 `data/mockData.ts`）
- 导入 Part2 数据（从 `data/part2PeopleData.ts` 等）

### 5. 启动服务器

```bash
cd service
npm start
# 或开发模式
npm run dev
```

## 📚 API 端点

导入数据后，可以使用以下 API：

- `GET /api/topics` - 获取所有主题
- `GET /api/topics?part=1` - 获取 Part1 数据
- `GET /api/topics?part=2` - 获取 Part2 数据
- `GET /api/topics/part/1` - 按 Part 获取（带分页）
- `GET /api/topics/:id` - 获取单个主题
- `GET /api/stats` - 获取统计信息

## ⚠️ 常见问题

**Q: 提示 "请设置 SUPABASE_URL 和 SUPABASE_SERVICE_ROLE_KEY"**
A: 检查 `service/.env` 文件是否存在，并且包含正确的值。

**Q: 提示 "topics 表不存在"**
A: 需要在 Supabase 控制台创建 `topics` 表（见步骤 2）。

**Q: 导入数据时出错**
A: 检查：
1. Supabase 项目是否正常运行
2. API keys 是否正确
3. 数据库表结构是否正确
4. 网络连接是否正常

## 📖 更多信息

详细设置说明请查看 `SUPABASE_SETUP.md`
