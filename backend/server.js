require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const questionRoutes = require('./routes/questions');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/questions', questionRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Quiz API is running successfully with MongoDB',
    timestamp: new Date().toISOString()
  });
});

// Simple test route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Quiz API! (MongoDB)',
    endpoints: {
      health: '/api/health',
      questions: '/api/questions',
      submit: '/api/questions/submit (POST)'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`❓ Questions API: http://localhost:${PORT}/api/questions`);
});