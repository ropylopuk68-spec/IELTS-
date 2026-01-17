-- IELTS App Topics 表结构
-- 用于存储 Part1、Part2、Part3 的题目和答案数据

-- 如果表已存在，先删除（注意：这会删除所有数据）
-- DROP TABLE IF EXISTS topics;

-- 创建 topics 表
CREATE TABLE IF NOT EXISTS topics (
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
CREATE INDEX IF NOT EXISTS idx_topics_part ON topics(part);
CREATE INDEX IF NOT EXISTS idx_topics_part_type ON topics(part, topic_type);
CREATE INDEX IF NOT EXISTS idx_topics_id ON topics(id);
CREATE INDEX IF NOT EXISTS idx_topics_topic_type ON topics(topic_type);

-- 添加更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_topics_updated_at BEFORE UPDATE
    ON topics FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 注释：说明各个字段的用途
COMMENT ON TABLE topics IS 'IELTS 题目数据表，存储 Part1、Part2、Part3 的题目和答案';
COMMENT ON COLUMN topics.id IS '题目唯一标识符';
COMMENT ON COLUMN topics.part IS '所属部分：1、2、3';
COMMENT ON COLUMN topics.question IS '题目内容（英文）';
COMMENT ON COLUMN topics.question_cn IS '题目中文翻译';
COMMENT ON COLUMN topics.title IS '题目标题（Part2 使用）';
COMMENT ON COLUMN topics.questions IS 'Part1 的多个问题（JSONB 格式）';
COMMENT ON COLUMN topics.answer IS '答案列表（JSONB 格式）';
COMMENT ON COLUMN topics.story_group IS 'Part2 的串题故事组';
COMMENT ON COLUMN topics.group_color IS 'Part2 的分组颜色';
