# 🔧 创建/更新数据库表（修复版本）

## ❌ 问题

执行更新脚本时出错：`relation "topics" does not exist`

这意味着 `topics` 表还不存在。

## ✅ 解决方案

我已经创建了一个新的 SQL 脚本，会**自动检测表是否存在**：
- 如果表不存在 → 创建新表（包含所有必需的列）
- 如果表已存在 → 只添加缺失的列

## 📋 执行步骤

### 1. 打开 Supabase SQL Editor

1. 登录 Supabase 控制台
2. 点击左侧菜单的 **SQL Editor**
3. 点击 **New query**

### 2. 执行新的 SQL 脚本

**使用文件：`service/sql/create_or_update_table.sql`**

1. 打开文件 `service/sql/create_or_update_table.sql`
2. **复制全部内容**
3. 粘贴到 SQL Editor
4. 点击 **Run** (或按 Ctrl/Cmd + Enter)

### 3. 验证执行结果

执行成功后，您应该看到：
- ✅ 提示消息显示表已创建或列已添加
- ✅ 在 Table Editor 中可以查看 `topics` 表

### 4. 检查表结构

在 **Table Editor** 中，`topics` 表应该包含以下列：

**必需列：**
- `id` (TEXT, PRIMARY KEY)
- `part` (TEXT, NOT NULL)
- `question` (TEXT, NOT NULL)
- `answer_count` (INTEGER, NOT NULL)
- `duration` (TEXT, NOT NULL)
- `answer` (JSONB, NOT NULL)

**Part1 相关列：**
- `question_cn`, `question_count`, `exam_takers`, `topic_type`, `is_new_topic`, `questions`

**Part2 相关列：**
- `title`, `story_group`, `group_color`, `question_points`, `analysis`, `keywords_memo`

**系统列：**
- `created_at`, `updated_at`

## 🚀 下一步

表创建完成后，运行数据导入：

```bash
cd service
npm run import:data -- --clear
```

## 📝 文件说明

- **`create_or_update_table.sql`** - 新的智能脚本（推荐使用）
- `create_topics_table.sql` - 仅创建新表（如果表已存在会报错）
- `update_existing_table.sql` - 仅更新现有表（如果表不存在会报错）

**建议：使用 `create_or_update_table.sql`，它会自动处理两种情况！**
