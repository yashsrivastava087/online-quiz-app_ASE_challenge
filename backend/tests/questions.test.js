const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Question = require('../models/Question');

describe('Questions API', () => {
  beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect(process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/quizapp_test');
  });

  beforeEach(async () => {
    // Clear the database before each test
    await Question.deleteMany({});
  });

  afterAll(async () => {
    // Close the database connection after all tests
    await mongoose.connection.close();
  });

  describe('GET /api/questions', () => {
    it('should return all questions without correct answers', async () => {
      // Create test questions
      await Question.create([
        {
          question_text: 'Test Question 1',
          option_a: 'Option A',
          option_b: 'Option B',
          option_c: 'Option C',
          option_d: 'Option D',
          correct_option: 'A'
        },
        {
          question_text: 'Test Question 2',
          option_a: 'Option A2',
          option_b: 'Option B2',
          option_c: 'Option C2',
          option_d: 'Option D2',
          correct_option: 'B'
        }
      ]);

      const response = await request(app).get('/api/questions');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      
      // Check that correct answers are not included
      response.body.data.forEach(question => {
        expect(question.correct_option).toBeUndefined();
        expect(question.question_text).toBeDefined();
        expect(question.option_a).toBeDefined();
      });
    });
  });

  describe('POST /api/questions/submit', () => {
    it('should calculate score correctly', async () => {
      // Create test questions
      const questions = await Question.create([
        {
          question_text: 'Test Question 1',
          option_a: 'Option A',
          option_b: 'Option B',
          option_c: 'Option C',
          option_d: 'Option D',
          correct_option: 'A'
        },
        {
          question_text: 'Test Question 2',
          option_a: 'Option A2',
          option_b: 'Option B2',
          option_c: 'Option C2',
          option_d: 'Option D2',
          correct_option: 'B'
        }
      ]);

      const answers = {
        [questions[0]._id]: 'A', // Correct
        [questions[1]._id]: 'C'  // Wrong
      };

      const response = await request(app)
        .post('/api/questions/submit')
        .send({ answers });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.score).toBe(1);
      expect(response.body.data.total).toBe(2);
      expect(response.body.data.percentage).toBe(50);
      expect(response.body.data.results).toHaveLength(2);
    });

    it('should return error for invalid answers format', async () => {
      const response = await request(app)
        .post('/api/questions/submit')
        .send({ invalid: 'data' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});