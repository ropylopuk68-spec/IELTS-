-- 创建或更新 topics 表
-- 此脚本会自动检测表是否存在，如果不存在则创建，如果存在则添加缺失的列

-- 首先检查表是否存在，如果不存在则创建
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'topics') THEN
        -- 创建表
        CREATE TABLE topics (
            id TEXT PRIMARY KEY,
            part TEXT NOT NULL CHECK (part IN ('1', '2', '3')),
            question TEXT NOT NULL,
            question_cn TEXT,
            title TEXT,
            topic_type TEXT,
            question_count INTEGER,
            exam_takers INTEGER,
            answer_count INTEGER NOT NULL DEFAULT 0,
            duration TEXT NOT NULL DEFAULT '1-2分钟',
            is_new_topic BOOLEAN DEFAULT false,
            questions JSONB,
            answer JSONB NOT NULL DEFAULT '[]'::jsonb,
            story_group TEXT,
            group_color TEXT,
            question_points JSONB,
            analysis TEXT,
            keywords_memo JSONB,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- 创建索引
        CREATE INDEX idx_topics_part ON topics(part);
        CREATE INDEX idx_topics_part_type ON topics(part, topic_type);
        CREATE INDEX idx_topics_id ON topics(id);
        CREATE INDEX idx_topics_topic_type ON topics(topic_type);
        
        RAISE NOTICE '表 topics 已创建';
    ELSE
        RAISE NOTICE '表 topics 已存在，开始添加缺失的列...';
        
        -- 添加 part 列（如果不存在）
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='topics' AND column_name='part') THEN
            ALTER TABLE topics ADD COLUMN part TEXT;
            RAISE NOTICE '已添加列: part';
        END IF;
        
        -- 添加 question_cn 列
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='topics' AND column_name='question_cn') THEN
            ALTER TABLE topics ADD COLUMN question_cn TEXT;
            RAISE NOTICE '已添加列: question_cn';
        END IF;
        
        -- 添加 title 列
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='topics' AND column_name='title') THEN
            ALTER TABLE topics ADD COLUMN title TEXT;
            RAISE NOTICE '已添加列: title';
        END IF;
        
        -- 添加 topic_type 列
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='topics' AND column_name='topic_type') THEN
            ALTER TABLE topics ADD COLUMN topic_type TEXT;
            RAISE NOTICE '已添加列: topic_type';
        END IF;
        
        -- 添加 question_count 列
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='topics' AND column_name='question_count') THEN
            ALTER TABLE topics ADD COLUMN question_count INTEGER;
            RAISE NOTICE '已添加列: question_count';
        END IF;
        
        -- 添加 exam_takers 列
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='topics' AND column_name='exam_takers') THEN
            ALTER TABLE topics ADD COLUMN exam_takers INTEGER;
            RAISE NOTICE '已添加列: exam_takers';
        END IF;
        
        -- 添加 answer_count 列（必需）
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='topics' AND column_name='answer_count') THEN
            -- 如果表中有数据，需要先设置默认值，然后添加 NOT NULL 约束
            ALTER TABLE topics ADD COLUMN answer_count INTEGER DEFAULT 0;
            UPDATE topics SET answer_count = 0 WHERE answer_count IS NULL;
            ALTER TABLE topics ALTER COLUMN answer_count SET NOT NULL;
            RAISE NOTICE '已添加列: answer_count';
        END IF;
        
        -- 添加 duration 列（必需）
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='topics' AND column_name='duration') THEN
            ALTER TABLE topics ADD COLUMN duration TEXT DEFAULT '1-2分钟';
            UPDATE topics SET duration = '1-2分钟' WHERE duration IS NULL;
            ALTER TABLE topics ALTER COLUMN duration SET NOT NULL;
            RAISE NOTICE '已添加列: duration';
        END IF;
        
        -- 添加 is_new_topic 列
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='topics' AND column_name='is_new_topic') THEN
            ALTER TABLE topics ADD COLUMN is_new_topic BOOLEAN DEFAULT false;
            RAISE NOTICE '已添加列: is_new_topic';
        END IF;
        
        -- 添加 questions 列（JSONB，用于 Part1）
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='topics' AND column_name='questions') THEN
            ALTER TABLE topics ADD COLUMN questions JSONB;
            RAISE NOTICE '已添加列: questions';
        END IF;
        
        -- 添加 answer 列（JSONB，必需）
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='topics' AND column_name='answer') THEN
            ALTER TABLE topics ADD COLUMN answer JSONB DEFAULT '[]'::jsonb;
            UPDATE topics SET answer = '[]'::jsonb WHERE answer IS NULL;
            ALTER TABLE topics ALTER COLUMN answer SET NOT NULL;
            RAISE NOTICE '已添加列: answer';
        END IF;
        
        -- 添加 story_group 列（Part2 使用）
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='topics' AND column_name='story_group') THEN
            ALTER TABLE topics ADD COLUMN story_group TEXT;
            RAISE NOTICE '已添加列: story_group';
        END IF;
        
        -- 添加 group_color 列（Part2 使用）
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='topics' AND column_name='group_color') THEN
            ALTER TABLE topics ADD COLUMN group_color TEXT;
            RAISE NOTICE '已添加列: group_color';
        END IF;
        
        -- 添加 question_points 列（Part2 使用）
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='topics' AND column_name='question_points') THEN
            ALTER TABLE topics ADD COLUMN question_points JSONB;
            RAISE NOTICE '已添加列: question_points';
        END IF;
        
        -- 添加 analysis 列（Part2 使用）
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='topics' AND column_name='analysis') THEN
            ALTER TABLE topics ADD COLUMN analysis TEXT;
            RAISE NOTICE '已添加列: analysis';
        END IF;
        
        -- 添加 keywords_memo 列（Part2 使用）
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='topics' AND column_name='keywords_memo') THEN
            ALTER TABLE topics ADD COLUMN keywords_memo JSONB;
            RAISE NOTICE '已添加列: keywords_memo';
        END IF;
        
        -- 添加 created_at 列
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='topics' AND column_name='created_at') THEN
            ALTER TABLE topics ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
            RAISE NOTICE '已添加列: created_at';
        END IF;
        
        -- 添加 updated_at 列
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='topics' AND column_name='updated_at') THEN
            ALTER TABLE topics ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
            RAISE NOTICE '已添加列: updated_at';
        END IF;
    END IF;
END $$;

-- 创建索引（如果不存在）
CREATE INDEX IF NOT EXISTS idx_topics_part ON topics(part);
CREATE INDEX IF NOT EXISTS idx_topics_part_type ON topics(part, topic_type);
CREATE INDEX IF NOT EXISTS idx_topics_id ON topics(id);
CREATE INDEX IF NOT EXISTS idx_topics_topic_type ON topics(topic_type);

-- 添加约束（如果不存在）
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint 
                   WHERE conname = 'topics_part_check') THEN
        ALTER TABLE topics ADD CONSTRAINT topics_part_check 
            CHECK (part IN ('1', '2', '3'));
        RAISE NOTICE '已添加约束: topics_part_check';
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

-- 完成提示
DO $$ 
BEGIN
    RAISE NOTICE '✅ 表 topics 已准备就绪！';
END $$;
