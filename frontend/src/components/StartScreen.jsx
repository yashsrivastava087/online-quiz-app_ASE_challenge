import React from 'react';

const StartScreen = ({ onStartQuiz, questionCount }) => {
  return (
    <div className="screen active">
      <div className="card">
        <h1>🎯 QuizMaster</h1>
        <p>Test your knowledge with our interactive quiz!</p>
        
        <div className="quiz-info">
          <div className="info-item">
            <span className="icon">📝</span>
            <span>{questionCount} Questions</span>
          </div>
          <div className="info-item">
            <span className="icon">⏱️</span>
            <span>Timer: 5 minutes</span>
          </div>
          <div className="info-item">
            <span className="icon">🎯</span>
            <span>Instant Results</span>
          </div>
        </div>

        <button 
          onClick={onStartQuiz} 
          className="btn btn-primary"
          disabled={questionCount === 0}
        >
          {questionCount === 0 ? 'Loading...' : 'Start Quiz'}
        </button>
      </div>
    </div>
  );
};

export default StartScreen;