# 更新数据库表结构指南

## 您的 Supabase 信息

- **Project URL**: `https://qxzlidncqqsyicsgsane.supabase.co`
- **Service Role Key**: `sb_secret_hkVT26lAlTW7ilup-mZiHg_jzV5uqa_`

## 第一步：检查环境变量

在 `service/.env` 文件中应该包含：

```env
SUPABASE_URL=https://qxzlidncqqsyicsgsane.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sb_secret_hkVT26lAlTW7ilup-mZiHg_jzV5uqa_
```

## 第二步：更新数据库表结构

由于您已经创建了表（使用默认结构），需要添加我们所需的列。

### 方法 1：在 Supabase SQL Editor 中执行（推荐）

1. 登录 Supabase 控制台
2. 点击左侧菜单的 **SQL Editor**
3. 点击 **New query**
4. 复制并粘贴以下 SQL 脚本（`service/sql/update_existing_table.sql`）
5. 点击 **Run** 执行

### 方法 2：如果表是空的，可以删除重建

如果表中没有重要数据，可以：

1. 在 Table Editor 中删除现有表
2. 使用 **SQL Editor** 执行 `service/sql/create_topics_table.sql`

## 第三步：验证表结构

执行 SQL 后，在 Table Editor 中检查 `topics` 表，应该包含以下列：

### 必需列：
- `id` (TEXT, PRIMARY KEY)
- `part` (TEXT, NOT NULL)
- `question` (TEXT, NOT NULL)
- `answer_count` (INTEGER, NOT NULL)
- `duration` (TEXT, NOT NULL)
- `answer` (JSONB, NOT NULL)

### Part1 相关列：
- `question_cn` (TEXT)
- `question_count` (INTEGER)
- `exam_takers` (INTEGER)
- `topic_type` (TEXT)
- `is_new_topic` (BOOLEAN)
- `questions` (JSONB)

### Part2 相关列：
- `title` (TEXT)
- `story_group` (TEXT)
- `group_color` (TEXT)
- `question_points` (JSONB)
- `analysis` (TEXT)
- `keywords_memo` (JSONB)

### 系统列：
- `created_at` (TIMESTAMP WITH TIME ZONE)
- `updated_at` (TIMESTAMP WITH TIME ZONE)

## 第四步：导入数据

表结构更新完成后，运行：

```bash
cd service
npm run import:data -- --clear
```

这将导入所有 Part1、Part2、Part3 的数据。

## 故障排除

**Q: 执行 SQL 时出错 "column already exists"**
A: 这是正常的，脚本会自动检查列是否存在，不会重复添加。

**Q: 执行 SQL 时出错 "table does not exist"**
A: 请先创建表，然后使用 `update_existing_table.sql` 脚本。

**Q: 环境变量正确但连接失败**
A: 检查：
1. `.env` 文件中的值是否有引号（不应该有）
2. 值前后是否有空格
3. Service Role Key 是否完整
