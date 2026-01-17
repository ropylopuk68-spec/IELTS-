-- 如果表已存在，使用此脚本来修改表结构
-- 在 Supabase SQL Editor 中执行

-- 首先检查并添加缺失的列

-- 添加 part 列（如果不存在）
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='topics' AND column_name='part') THEN
        ALTER TABLE topics ADD COLUMN part TEXT;
    END IF;
END $$;

-- 添加 question_cn 列
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='topics' AND column_name='question_cn') THEN
        ALTER TABLE topics ADD COLUMN question_cn TEXT;
    END IF;
END $$;

-- 添加 title 列
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='topics' AND column_name='title') THEN
        ALTER TABLE topics ADD COLUMN title TEXT;
    END IF;
END $$;

-- 添加 topic_type 列
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='topics' AND column_name='topic_type') THEN
        ALTER TABLE topics ADD COLUMN topic_type TEXT;
    END IF;
END $$;

-- 添加 question_count 列
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='topics' AND column_name='question_count') THEN
        ALTER TABLE topics ADD COLUMN question_count INTEGER;
    END IF;
END $$;

-- 添加 exam_takers 列
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='topics' AND column_name='exam_takers') THEN
        ALTER TABLE topics ADD COLUMN exam_takers INTEGER;
    END IF;
END $$;

-- 添加 answer_count 列（必需）
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='topics' AND column_name='answer_count') THEN
        ALTER TABLE topics ADD COLUMN answer_count INTEGER NOT NULL DEFAULT 0;
    END IF;
END $$;

-- 添加 duration 列（必需）
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='topics' AND column_name='duration') THEN
        ALTER TABLE topics ADD COLUMN duration TEXT NOT NULL DEFAULT '1-2分钟';
    END IF;
END $$;

-- 添加 is_new_topic 列
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='topics' AND column_name='is_new_topic') THEN
        ALTER TABLE topics ADD COLUMN is_new_topic BOOLEAN DEFAULT false;
    END IF;
END $$;

-- 添加 questions 列（JSONB，用于 Part1）
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='topics' AND column_name='questions') THEN
        ALTER TABLE topics ADD COLUMN questions JSONB;
    END IF;
END $$;

-- 添加 answer 列（JSONB，必需）
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='topics' AND column_name='answer') THEN
        ALTER TABLE topics ADD COLUMN answer JSONB NOT NULL DEFAULT '[]'::jsonb;
    END IF;
END $$;

-- 添加 story_group 列（Part2 使用）
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='topics' AND column_name='story_group') THEN
        ALTER TABLE topics ADD COLUMN story_group TEXT;
    END IF;
END $$;

-- 添加 group_color 列（Part2 使用）
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='topics' AND column_name='group_color') THEN
        ALTER TABLE topics ADD COLUMN group_color TEXT;
    END IF;
END $$;

-- 添加 question_points 列（Part2 使用）
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='topics' AND column_name='question_points') THEN
        ALTER TABLE topics ADD COLUMN question_points JSONB;
    END IF;
END $$;

-- 添加 analysis 列（Part2 使用）
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='topics' AND column_name='analysis') THEN
        ALTER TABLE topics ADD COLUMN analysis TEXT;
    END IF;
END $$;

-- 添加 keywords_memo 列（Part2 使用）
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='topics' AND column_name='keywords_memo') THEN
        ALTER TABLE topics ADD COLUMN keywords_memo JSONB;
    END IF;
END $$;

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_topics_part ON topics(part);
CREATE INDEX IF NOT EXISTS idx_topics_part_type ON topics(part, topic_type);
CREATE INDEX IF NOT EXISTS idx_topics_id ON topics(id);
CREATE INDEX IF NOT EXISTS idx_topics_topic_type ON topics(topic_type);

-- 添加约束
DO $$ 
BEGIN
    -- 确保 part 列有约束
    IF NOT EXISTS (SELECT 1 FROM pg_constraint 
                   WHERE conname = 'topics_part_check') THEN
        ALTER TABLE topics ADD CONSTRAINT topics_part_check 
            CHECK (part IN ('1', '2', '3'));
    END IF;
END $$;

-- 添加更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_topics_updated_at ON topics;
CREATE TRIGGER update_topics_updated_at BEFORE UPDATE
    ON topics FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
