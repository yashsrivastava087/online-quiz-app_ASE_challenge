import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';
function App() {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState('');

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Loading questions from:', API_BASE_URL);
      
      const response = await axios.get(`${API_BASE_URL}/questions`);
      console.log('Questions response:', response.data);
      
      if (response.data.success) {
        setQuestions(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to load questions');
      }
    } catch (err) {
      console.error('Error loading questions:', err);
      setError('Failed to load questions. Please check if the backend server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = () => {
    if (questions.length === 0) {
      setError('No questions available. Please try again.');
      return;
    }
    setCurrentScreen('quiz');
    setError('');
  };

  const handleAnswerSelect = (questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const submitQuiz = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/questions/submit`, {
        answers: userAnswers
      });
      
      if (response.data.success) {
        setQuizResults(response.data.data);
        setCurrentScreen('results');
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      console.error('Error submitting quiz:', err);
      setError('Failed to submit quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const restartQuiz = () => {
    setUserAnswers({});
    setQuizResults(null);
    setCurrentScreen('start');
    setError('');
    loadQuestions();
  };

  return (
    <div className="App">
      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading questions...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={loadQuestions} className="btn btn-primary">
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {currentScreen === 'start' && (
            <StartScreen 
              onStartQuiz={startQuiz}
              questionCount={questions.length}
            />
          )}

          {currentScreen === 'quiz' && (
            <QuizScreen
              questions={questions}
              userAnswers={userAnswers}
              onAnswerSelect={handleAnswerSelect}
              onSubmitQuiz={submitQuiz}
              onRestartQuiz={() => setCurrentScreen('start')}
            />
          )}

          {currentScreen === 'results' && quizResults && (
            <ResultsScreen
              results={quizResults}
              questions={questions}
              onRestartQuiz={restartQuiz}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;