# Supabase 设置指南

## 步骤 1: 创建 Supabase 项目

1. 访问 https://supabase.com
2. 注册/登录账号
3. 点击 **"New Project"** 创建新项目
4. 填写项目信息：
   - 项目名称（例如：ielts-app）
   - 数据库密码（请保存好，后续需要）
   - 选择区域（建议选择离您最近的区域）
5. 点击 **"Create new project"**，等待项目创建完成（约 2 分钟）

## 步骤 2: 获取 API Keys

1. 在 Supabase 控制台，点击左侧菜单的 **Settings**（设置）
2. 点击 **API** 或 **API Keys**
3. 您会看到以下信息：

### 必需的信息：
- **Project URL**: `https://xxxxx.supabase.co`
- **anon/public key**: `eyJhbGc...` (用于前端/客户端)
- **service_role key**: `eyJhbGc...` (用于后端，有完整权限)

⚠️ **重要**: 
- `anon key` 可以在前端使用（公开）
- `service_role key` 必须保密，只在后端使用，拥有完整权限

## 步骤 3: 创建数据库表

在 Supabase 控制台创建表：

1. 点击左侧菜单的 **Table Editor**
2. 点击 **"New Table"** 创建新表
3. 表名: `topics`
4. 添加以下列：

```sql
-- 您也可以在 SQL Editor 中执行以下 SQL 语句：

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

-- 创建索引以提高查询性能
CREATE INDEX idx_topics_part ON topics(part);
CREATE INDEX idx_topics_part_type ON topics(part, topic_type);
CREATE INDEX idx_topics_id ON topics(id);
```

## 步骤 4: 配置环境变量

在 `service/.env` 文件中添加以下内容（如果没有该文件，请创建）：

```env
SUPABASE_URL=https://你的项目ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=你的service_role_key
```

## 步骤 5: 设置 Row-Level Security (可选)

如果需要公开访问数据（前端可以直接读取），需要：

1. 在 Table Editor 中，选择 `topics` 表
2. 点击 **"Enable RLS"** 启用行级安全
3. 在 **Policies** 标签页，创建策略：

```sql
-- 允许所有人读取（如果需要公开访问）
CREATE POLICY "Allow public read access" ON topics
  FOR SELECT
  USING (true);

-- 或者只允许认证用户读取
CREATE POLICY "Allow authenticated read access" ON topics
  FOR SELECT
  TO authenticated
  USING (true);
```

如果使用 `service_role key`，会绕过 RLS，所以可以暂时不设置。

## 完成！

配置完成后，您就可以运行导入脚本了：

```bash
cd service
npm install
npm run import:data -- --clear
```
