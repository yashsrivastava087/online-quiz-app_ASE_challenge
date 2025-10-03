const express = require('express');
const Question = require('../models/Question');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log('Fetching questions from MongoDB...');
    const questions = await Question.find({}, {
      question_text: 1,
      option_a: 1,
      option_b: 1,
      option_c: 1,
      option_d: 1
    }).sort({ createdAt: 1 });

    console.log(`✅ Found ${questions.length} questions`);
    res.json({
      success: true,
      data: questions
    });
  } catch (error) {
    console.error('❌ Error fetching questions:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching questions'
    });
  }
});

router.post('/submit', async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid answers format. Expected an object with question IDs as keys.'
      });
    }

    const questions = await Question.find({}).sort({ createdAt: 1 });
    
    let score = 0;
    const results = [];

    questions.forEach(question => {
      const userAnswer = answers[question._id];
      const isCorrect = userAnswer === question.correct_option;
      
      if (isCorrect) {
        score++;
      }

      results.push({
        questionId: question._id,
        questionText: question.question_text,
        userAnswer,
        correctAnswer: question.correct_option,
        isCorrect
      });
    });

    res.json({
      success: true,
      data: {
        score,
        total: questions.length,
        percentage: Math.round((score / questions.length) * 100),
        results
      }
    });

  } catch (error) {
    console.error('❌ Error submitting quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while processing quiz submission'
    });
  }
});

module.exports = router;