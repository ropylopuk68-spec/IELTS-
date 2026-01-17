# 🔧 修复数据库表结构

## ✅ 环境变量检查

您的环境变量已配置：
- ✅ `SUPABASE_URL=https://qxzlidncqqsyicsgsane.supabase.co`
- ✅ `SUPABASE_SERVICE_ROLE_KEY=sb_secret_hkVT26lAlTW7ilup-mZiHg_jzV5uqa_`

⚠️ **注意**：Service Role Key 末尾有一个空格，可能需要去掉。如果没有问题就不需要修改。

## 📋 更新表结构的步骤

由于您创建的表使用了默认结构，需要添加所需的列。有两种方法：

### 方法 1：使用 SQL 脚本更新（推荐，不会丢失数据）

1. **打开 Supabase 控制台**
   - 访问 https://supabase.com/dashboard
   - 选择您的项目

2. **打开 SQL Editor**
   - 点击左侧菜单的 **SQL Editor**
   - 点击 **New query**

3. **执行更新脚本**
   - 打开项目中的 `service/sql/update_existing_table.sql` 文件
   - 复制全部内容
   - 粘贴到 SQL Editor 中
   - 点击 **Run** (或按 Ctrl/Cmd + Enter)

   这个脚本会：
   - ✅ 检查每列是否存在
   - ✅ 只添加不存在的列
   - ✅ 不会删除或修改现有列
   - ✅ 创建必要的索引和约束

4. **验证结果**
   - 在 Table Editor 中查看 `topics` 表
   - 应该看到所有必需的列都已添加

### 方法 2：如果表是空的，重新创建

如果表中没有任何数据：

1. **删除现有表**
   - 在 Table Editor 中，点击 `topics` 表
   - 点击 **Delete table**

2. **执行创建脚本**
   - 在 SQL Editor 中执行 `service/sql/create_topics_table.sql`

## 🔍 验证表结构

更新后，`topics` 表应该包含以下列：

### 必需列
- `id` (TEXT, PRIMARY KEY)
- `part` (TEXT, NOT NULL, CHECK IN ('1','2','3'))
- `question` (TEXT, NOT NULL)
- `answer_count` (INTEGER, NOT NULL)
- `duration` (TEXT, NOT NULL)
- `answer` (JSONB, NOT NULL)

### Part1 专用列
- `question_cn` (TEXT)
- `question_count` (INTEGER)
- `exam_takers` (INTEGER)
- `topic_type` (TEXT)
- `is_new_topic` (BOOLEAN)
- `questions` (JSONB)

### Part2 专用列
- `title` (TEXT)
- `story_group` (TEXT)
- `group_color` (TEXT)
- `question_points` (JSONB)
- `analysis` (TEXT)
- `keywords_memo` (JSONB)

### 系统列
- `created_at` (TIMESTAMP WITH TIME ZONE)
- `updated_at` (TIMESTAMP WITH TIME ZONE)

## 🚀 导入数据

表结构更新完成后，运行导入命令：

```bash
cd service
npm run import:data -- --clear
```

这会：
1. 清空现有数据（如果有）
2. 导入 Part1 数据（从 `data/mockData.ts`）
3. 导入 Part2 数据（从 `data/part2PeopleData.ts`、`part2PlaceData.ts` 等）

## ❓ 常见问题

**Q: 执行 SQL 时报错 "column already exists"**
A: 这是正常的，脚本会自动检查并跳过已存在的列。

**Q: 如何查看表结构？**
A: 在 Supabase 控制台的 Table Editor 中查看，或执行：
```sql
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'topics';
```

**Q: 执行 SQL 后没有看到列？**
A: 刷新 Table Editor 页面，或者检查 SQL 执行是否有错误。

## 📝 SQL 脚本位置

- **更新脚本**: `service/sql/update_existing_table.sql`
- **创建脚本**: `service/sql/create_topics_table.sql`
