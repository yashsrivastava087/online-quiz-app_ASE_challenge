import React from 'react';

const Question = ({ question, selectedAnswer, onAnswerSelect, questionNumber }) => {
  const options = [
    { key: 'A', value: question.option_a },
    { key: 'B', value: question.option_b },
    { key: 'C', value: question.option_c },
    { key: 'D', value: question.option_d }
  ];

  return (
    <div className="question">
      <h2 className="question-text">
        Q{questionNumber}: {question.question_text}
      </h2>
      
      <div className="options-container">
        {options.map(option => (
          <div
            key={option.key}
            className={`option ${selectedAnswer === option.key ? 'selected' : ''}`}
            onClick={() => onAnswerSelect(option.key)}
          >
            {option.key}. {option.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
