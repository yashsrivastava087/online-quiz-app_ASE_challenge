import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ResultsScreen = ({ results, questions, onRestartQuiz }) => {
  const { score, total, percentage, results: detailedResults } = results;

  useEffect(() => {
    if (percentage >= 80) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
      
      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 80,
          origin: { x: 0, y: 0.6 }
        });
      }, 250);
      
      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 80,
          origin: { x: 1, y: 0.6 }
        });
      }, 500);
    } else if (percentage >= 60) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else if (percentage >= 40) {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 }
      });
    }
  }, [percentage]);

  const getResultItemClass = (isCorrect) => {
    return `result-item ${isCorrect ? 'correct' : 'incorrect'}`;
  };

  const getResultStatusClass = (isCorrect) => {
    return `result-status ${isCorrect ? 'correct' : 'incorrect'}`;
  };

  const getScoreMessage = () => {
    if (percentage >= 90) return "Outstanding! 🎉";
    if (percentage >= 80) return "Excellent! 👏";
    if (percentage >= 70) return "Great job! 👍";
    if (percentage >= 60) return "Good work! 😊";
    if (percentage >= 50) return "Not bad! 💪";
    return "Keep practicing! 📚";
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
          <p style={{ 
            fontSize: '1.3rem', 
            fontWeight: '600', 
            marginTop: '10px',
            background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {getScoreMessage()}
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