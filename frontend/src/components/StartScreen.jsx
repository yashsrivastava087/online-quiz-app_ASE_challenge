import React from 'react';

const StartScreen = ({ onStartQuiz, questionCount }) => {
  return (
    <div className="screen active">
      <div className="card floating">
        <h1>🎯 QuizMaster</h1>
        <p>Test your knowledge with our interactive quiz! Challenge yourself and see how much you really know.</p>
        
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
          {questionCount === 0 ? 'Loading...' : 'Start Challenge 🚀'}
        </button>
     
        <div style={{ 
          marginTop: '30px', 
          fontSize: '0.9rem', 
          color: 'var(--text-secondary)',
          opacity: 0.8
        }}>
          Ready to test your skills? Let's begin!
        </div>
      </div>
    </div>
  );
};

export default StartScreen;