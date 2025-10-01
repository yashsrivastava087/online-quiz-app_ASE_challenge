import React from 'react';

const ResultsScreen = ({ results, questions, onRestartQuiz }) => {
  const { score, total, percentage, results: detailedResults } = results;

  const getResultItemClass = (isCorrect) => {
    return `result-item ${isCorrect ? 'correct' : 'incorrect'}`;
  };

  const getResultStatusClass = (isCorrect) => {
    return `result-status ${isCorrect ? 'correct' : 'incorrect'}`;
  };

  return (
    <div className="screen active">
      <div className="card results-card">
        <h1>📊 Quiz Results</h1>
        
        <div className="score-section">
          <div className="score-circle">
            <span className="score-percentage">{percentage}%</span>
          </div>
          <p className="score-text">
            You scored <span className="highlight">{score}</span> out of 
            <span className="highlight"> {total}</span>
          </p>
        </div>

        <div className="results-details">
          <h3>Detailed Results:</h3>
          {detailedResults.map((result, index) => {
            const question = questions.find(q => q._id === result.questionId);
            return (
              <div key={result.questionId} className={getResultItemClass(result.isCorrect)}>
                <div className={getResultStatusClass(result.isCorrect)}>
                  {result.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </div>
                <div className="question">{question?.question_text}</div>
                <div className="user-answer">
                  Your answer: {result.userAnswer || 'Not answered'}
                </div>
                <div className="correct-answer">
                  Correct answer: {result.correctAnswer}
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={onRestartQuiz} className="btn btn-primary">
          Take Quiz Again
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;