import React, { useState, useEffect } from 'react';
import Question from './Question';

const QuizScreen = ({ 
  questions, 
  userAnswers, 
  onAnswerSelect, 
  onSubmitQuiz, 
  onRestartQuiz 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); 
  const [timerActive, setTimerActive] = useState(true);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setTimerActive(false);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [timeLeft, timerActive]);

  const handleTimeUp = () => {
    onSubmitQuiz();
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleAnswer = (answer) => {
    onAnswerSelect(currentQuestion._id, answer);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimerClass = () => {
    if (timeLeft <= 60) return 'timer danger';
    if (timeLeft <= 120) return 'timer warning';
    return 'timer';
  };

  const unansweredQuestions = questions.filter(q => !userAnswers[q._id]).length;

  return (
    <div className="screen active">
      <div className="quiz-header">
        <div className="timer-container">
          <span className="timer-label">Time Left:</span>
          <div className={getTimerClass()}>
            {formatTime(timeLeft)}
          </div>
        </div>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">
            {currentQuestionIndex + 1}/{questions.length}
          </span>
        </div>
      </div>

      <div className="question-card">
        {currentQuestion && (
          <Question
            question={currentQuestion}
            selectedAnswer={userAnswers[currentQuestion._id]}
            onAnswerSelect={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
          />
        )}

        <div className="navigation-buttons">
          <button 
            onClick={handlePrevious}
            className="btn btn-secondary"
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>

          {currentQuestionIndex < questions.length - 1 ? (
            <button 
              onClick={handleNext}
              className="btn btn-primary"
            >
              Next
            </button>
          ) : (
            <button 
              onClick={() => {
                if (unansweredQuestions > 0) {
                  const proceed = window.confirm(
                    `You have ${unansweredQuestions} unanswered questions. Submit anyway?`
                  );
                  if (proceed) onSubmitQuiz();
                } else {
                  onSubmitQuiz();
                }
              }}
              className="btn btn-success"
            >
              Submit Quiz
            </button>
          )}
        </div>

        <div className="quiz-footer">
          <button 
            onClick={onRestartQuiz}
            className="btn btn-outline"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;