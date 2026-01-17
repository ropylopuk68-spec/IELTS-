const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// 从环境变量获取 Supabase 配置
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('错误: 请设置 SUPABASE_URL 和 SUPABASE_SERVICE_ROLE_KEY 环境变量');
  console.error('请查看 SUPABASE_SETUP.md 了解如何获取这些值');
  process.exit(1);
}

// 创建 Supabase 客户端（使用 service_role key 以拥有完整权限）
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// 测试连接
async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('topics')
      .select('count', { count: 'exact', head: true });
    
    if (error && error.code !== 'PGRST116') { // PGRST116 是表不存在的错误
      throw error;
    }
    
    console.log('Supabase 连接成功！');
    return true;
  } catch (error) {
    console.error('Supabase 连接失败:', error.message);
    console.error('请检查:');
    console.error('1. SUPABASE_URL 和 SUPABASE_SERVICE_ROLE_KEY 是否正确');
    console.error('2. topics 表是否已创建');
    console.error('3. 网络连接是否正常');
    return false;
  }
}

module.exports = { supabase, testConnection };
