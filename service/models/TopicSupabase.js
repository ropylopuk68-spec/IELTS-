/**
 * Supabase Topic 模型
 * 用于操作 topics 表
 */

const { supabase } = require('../config/supabase');

class Topic {
  /**
   * 查找所有主题
   * @param {Object} filters - 筛选条件 { part, topicType, category }
   * @returns {Promise<Array>}
   */
  static async find(filters = {}) {
    let query = supabase.from('topics').select('*');
    
    if (filters.part) {
      query = query.eq('part', filters.part);
    }
    
    if (filters.topicType) {
      query = query.eq('topic_type', filters.topicType);
    }
    
    if (filters.category && filters.part === '2') {
      query = query.ilike('story_group', `%${filters.category}%`);
    }
    
    const { data, error } = await query
      .order('exam_takers', { ascending: false })
      .order('id');
    
    if (error) throw error;
    return data || [];
  }

  /**
   * 根据 ID 查找单个主题
   * @param {string} id - 主题 ID
   * @returns {Promise<Object|null>}
   */
  static async findOneById(id) {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // 未找到记录
      throw error;
    }
    return data;
  }

  /**
   * 按 part 查找主题
   * @param {string} part - Part 编号 (1, 2, 3)
   * @param {Object} options - 选项 { topicType, limit, skip }
   * @returns {Promise<Object>} { data, total }
   */
  static async findByPart(part, options = {}) {
    let query = supabase
      .from('topics')
      .select('*', { count: 'exact' })
      .eq('part', part);
    
    if (options.topicType) {
      query = query.eq('topic_type', options.topicType);
    }
    
    query = query.order('exam_takers', { ascending: false }).order('id');
    
    if (options.skip) {
      query = query.range(options.skip, options.skip + (options.limit || 1000) - 1);
    } else if (options.limit) {
      query = query.limit(options.limit);
    }
    
    const { data, error, count } = await query;
    
    if (error) throw error;
    
    return {
      data: data || [],
      total: count || 0,
      part: part
    };
  }

  /**
   * 创建或更新主题（upsert）
   * @param {Object} topicData - 主题数据
   * @returns {Promise<Object>}
   */
  static async upsert(topicData) {
    // 转换字段名为数据库列名
    const dbData = this._transformToDbFormat(topicData);
    
    const { data, error } = await supabase
      .from('topics')
      .upsert(dbData, {
        onConflict: 'id',
        ignoreDuplicates: false
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  /**
   * 创建新主题
   * @param {Object} topicData - 主题数据
   * @returns {Promise<Object>}
   */
  static async create(topicData) {
    const dbData = this._transformToDbFormat(topicData);
    
    const { data, error } = await supabase
      .from('topics')
      .insert(dbData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  /**
   * 更新主题
   * @param {string} id - 主题 ID
   * @param {Object} topicData - 更新的数据
   * @returns {Promise<Object>}
   */
  static async update(id, topicData) {
    const dbData = this._transformToDbFormat(topicData);
    dbData.updated_at = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('topics')
      .update(dbData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  /**
   * 删除主题
   * @param {string} id - 主题 ID
   * @returns {Promise<boolean>}
   */
  static async delete(id) {
    const { error } = await supabase
      .from('topics')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }

  /**
   * 删除所有主题
   * @returns {Promise<number>} 删除的记录数
   */
  static async deleteMany() {
    const { data, error } = await supabase
      .from('topics')
      .delete()
      .neq('id', 'dummy'); // 删除所有记录（使用一个不存在的条件）
    
    if (error) throw error;
    return data?.length || 0;
  }

  /**
   * 获取统计信息
   * @returns {Promise<Array>}
   */
  static async getStats() {
    const { data, error } = await supabase
      .from('topics')
      .select('part');
    
    if (error) throw error;
    
    // 按 part 分组统计
    const stats = data.reduce((acc, topic) => {
      const part = topic.part;
      if (!acc[part]) {
        acc[part] = { _id: part, count: 0 };
      }
      acc[part].count++;
      return acc;
    }, {});
    
    return Object.values(stats);
  }

  /**
   * 将 JavaScript 对象字段名转换为数据库列名（snake_case）
   * @private
   */
  static _transformToDbFormat(data) {
    return {
      id: data.id,
      part: data.part,
      question: data.question,
      question_cn: data.questionCN || data.question_cn || null,
      title: data.title || null,
      topic_type: data.topicType || data.topic_type || null,
      question_count: data.questionCount || data.question_count || null,
      exam_takers: data.examTakers || data.exam_takers || null,
      answer_count: data.answerCount || data.answer_count,
      duration: data.duration,
      is_new_topic: data.isNewTopic !== undefined ? data.isNewTopic : (data.is_new_topic !== undefined ? data.is_new_topic : false),
      questions: data.questions || null,
      answer: data.answer || null,
      story_group: data.storyGroup || data.story_group || null,
      group_color: data.groupColor || data.group_color || null,
      question_points: data.questionPoints || data.question_points || null,
      analysis: data.analysis || null,
      keywords_memo: data.keywordsMemo || data.keywords_memo || null
    };
  }

  /**
   * 将数据库记录转换为 JavaScript 对象（camelCase）
   * @private
   */
  static _transformFromDbFormat(data) {
    if (!data) return null;
    
    return {
      id: data.id,
      part: data.part,
      question: data.question,
      questionCN: data.question_cn,
      title: data.title,
      topicType: data.topic_type,
      questionCount: data.question_count,
      examTakers: data.exam_takers,
      answerCount: data.answer_count,
      duration: data.duration,
      isNewTopic: data.is_new_topic,
      questions: data.questions,
      answer: data.answer,
      storyGroup: data.story_group,
      groupColor: data.group_color,
      questionPoints: data.question_points,
      analysis: data.analysis,
      keywordsMemo: data.keywords_memo,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }
}

module.exports = Topic;
