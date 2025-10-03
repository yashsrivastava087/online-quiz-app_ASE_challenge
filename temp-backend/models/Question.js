const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question_text: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true
  },
  option_a: {
    type: String,
    required: [true, 'Option A is required'],
    trim: true
  },
  option_b: {
    type: String,
    required: [true, 'Option B is required'],
    trim: true
  },
  option_c: {
    type: String,
    required: [true, 'Option C is required'],
    trim: true
  },
  option_d: {
    type: String,
    required: [true, 'Option D is required'],
    trim: true
  },
  correct_option: {
    type: String,
    required: [true, 'Correct option is required'],
    enum: ['A', 'B', 'C', 'D'],
    uppercase: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);