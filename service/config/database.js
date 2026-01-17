const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/backend-service');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    console.error('请确保 MongoDB 正在运行，或检查 MONGODB_URI 环境变量');
    process.exit(1);
  }
};

module.exports = connectDB;