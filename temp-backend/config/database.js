const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000, 
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('💡 Please check:');
    console.log('1. Your MongoDB Atlas username and password');
    console.log('2. Network Access in MongoDB Atlas (allow all IPs: 0.0.0.0/0)');
    console.log('3. Internet connection');
    process.exit(1);
  }
};

module.exports = connectDB;