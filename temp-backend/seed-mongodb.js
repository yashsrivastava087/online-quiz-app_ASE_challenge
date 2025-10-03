require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/database');

connectDB();

const Question = require('./models/Question');

const sampleQuestions = [
  {
    question_text: "What is the capital of France?",
    option_a: "London",
    option_b: "Berlin",
    option_c: "Paris",
    option_d: "Madrid",
    correct_option: "C"
  },
  {
    question_text: "Which language runs in a web browser?",
    option_a: "Java",
    option_b: "C",
    option_c: "Python",
    option_d: "JavaScript",
    correct_option: "D"
  },
  {
    question_text: "What does CSS stand for?",
    option_a: "Central Style Sheets",
    option_b: "Cascading Style Sheets",
    option_c: "Cascading Simple Sheets",
    option_d: "Cars SUVs Sailboats",
    correct_option: "B"
  },
  {
    question_text: "Which of these is a JavaScript framework?",
    option_a: "Django",
    option_b: "Flask",
    option_c: "React",
    option_d: "Laravel",
    correct_option: "C"
  },
  {
    question_text: "What year was JavaScript launched?",
    option_a: "1996",
    option_b: "1995",
    option_c: "1994",
    option_d: "None of the above",
    correct_option: "B"
  }
];

const seedDatabase = async () => {
  try {
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    await Question.insertMany(sampleQuestions);
    console.log('Sample questions inserted successfully into MongoDB');

    console.log('MongoDB database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(' Error seeding database:', error);
    process.exit(1);
  }
};

setTimeout(seedDatabase, 2000);