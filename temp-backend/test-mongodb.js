require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB Connection...');
console.log('Connection String:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected Successfully!');
  process.exit(0);
})
.catch(error => {
  console.log('❌ MongoDB Connection Failed:');
  console.log('Error:', error.message);
  console.log('\n💡 Check:');
  console.log('1. MongoDB Atlas username/password');
  console.log('2. Network Access in MongoDB Atlas');
  console.log('3. Connection string format');
  process.exit(1);
});