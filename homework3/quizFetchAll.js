import { decodeEntities, shuffleArray } from './util.js';
import { saveResult, populateExampleLeaderboard, renderLeaderboard } from './leaderboard.js';

document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const startButton = document.getElementById('start-btn');
    const restartButton = document.getElementById('restart-btn');
    const difficultySelect = document.getElementById('difficulty');
    const timeLimitInput = document.getElementById('time-limit');
    const timeValueOutput = document.getElementById('time-value');
    const typeOfQuestions = document.getElementById('type-of-questions');
    const modeMenu = document.getElementById('mode-menu');

    let questions = [];
    let currentQuestionIndex = 0;
    let selectedAnswer = '';
    let timerInterval; 
    let quizLength = 15;
    let quizRunning = false;
    let retryCount = 0;
    let multiplier = 1;
    let initialTime = 0;
    let statistics = {
        totalPoints: 0,
        correctAnswers: 0,
        totalResponseTime: 0,
    }; 
    
    timeLimitInput.addEventListener('input', () => {
        timeValueOutput.textContent = timeLimitInput.value;
    });

    restartButton.addEventListener('click', () => { 
        if (quizRunning) {
            restartQuiz();
        } else {
            backToMain();
        }
    });

    startButton.addEventListener('click', () => {
        if (startButton.textContent === 'Save Result') {
            saveResult(statistics);
        } else if (quizRunning) {    
            stopQuiz();
        } else {
            startQuiz();
        }
    });

    const startQuiz = () => {
        startButton.innerHTML = '<div class="loader"></div>';
        startButton.disabled = true;
        fetchQuestions();
    };

    const stopQuiz = () => {
        clearInterval(timerInterval);
        displayInitialText();
        restartQuizData();
        startButton.textContent = 'Start Quiz';
        restartButton.style.display = 'none';
        quizRunning = false;
    };

    const restartQuiz = () => {
        restartButton.innerHTML = '<div class="loader"></div>'
        clearInterval(timerInterval);
        displayInitialText("Loading questions...");
        fetchQuestions();
        restartQuizData();
        setButtonsDisabled(true)
    };

    const backToMain = () => {
        restartQuizData();
        quizContainer.display = 'flex';
        restartButton.style.display = 'none';
        startButton.style.display = 'flex';
        startButton.textContent = 'Start Quiz';
        modeMenu.style.display = 'flex';
        displayInitialText();   
    }

    const fetchQuestions = async () => {
        try {
            let apiUrl = `https://opentdb.com/api.php?amount=15`;
    
            if (difficultySelect.value !== 'random') {
                apiUrl += `&difficulty=${difficultySelect.value}`;
            }
    
            if (typeOfQuestions.value !== 'random') {
                apiUrl += `&type=${typeOfQuestions.value}`;
            }

            const response = await fetch(apiUrl);
         
            if (response.ok) {
                const data = await response.json();
                questions = data.results;
                initialTime = timeLimitInput.value;
                multiplier = calculateMultiplier();
                renderQuestion();
                setButtonsDisabled(false);
                quizRunning = true;
                restartButton.style.display = 'flex';
                startButton.textContent = 'Stop Quiz';
                restartButton.innerHTML = 'Restart';
            } else if (response.status === 429) {;
                setTimeout(fetchQuestions, 3000);
            } 

        } catch (error) {
            console.error('Error fetching questions:', error);
            retryFetchQuestions();
        }
    };
    
    const retryFetchQuestions = () => {
        if (retryCount < 3) {
            retryCount++;
            setTimeout(fetchQuestions, 3000);
        } else {
            restartButton.innerHTML = 'Restart';
            restartButton.disabled = false;
            console.error('Max retry attempts reached');
        }
    };

    const displayInitialText = (text = "Make your own Quiz!") => {
        const initialText = `
            <div class="initial-text">
                <h2>${text}</h2>
            </div>
        `;
        quizContainer.innerHTML = initialText;
    };

    const renderQuestion = () => {
        if (currentQuestionIndex === quizLength) {
            clearInterval(timerInterval);
            quizRunning = false;
            currentQuestionIndex = 0;
            restartButton.textContent = 'Go back'
            startButton.textContent = 'Save Result';
            quizContainer.innerHTML = `<h2 class="quiz-completed-text">Quiz completed! Total points: ${statistics.totalPoints}</h2>`;
            modeMenu.style.display = 'none';
            return;
        }

        const currentQuestion = questions[currentQuestionIndex];
        const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
        const shuffledAnswers = shuffleArray(allAnswers);
      
        const questionHTML = `
            <div>
                <h2>Question ${currentQuestionIndex + 1}</h2>
                <h2>Total Points: ${statistics.totalPoints}</h2>
            </div>
            <h3>${decodeEntities(currentQuestion.question)}</h3>
            <ul>${shuffledAnswers.map(answer =>
                `<li><button class="answer-btn">${answer}</button></li>`).join('')}
            </ul>
            <p id="feedback"></p>
            <p id="points"></p>
        `;
        quizContainer.innerHTML = questionHTML;
        startTimer();
    };

    const startTimer = () => {
        let remainingTime = initialTime;
        clearInterval(timerInterval);
        
        const answerButtons = document.querySelectorAll('.answer-btn');
        answerButtons.forEach(button => {
            button.style.width = '100%';
            button.addEventListener('click', () => handleAnswer(button.textContent, remainingTime));
        });

        timerInterval = setInterval(() => {
            remainingTime -= 0.01;
            if (remainingTime <= 0) {
                remainingTime = 0;
                clearInterval(timerInterval);
                handleTimeOut();
            }

            const percentageWidth = (remainingTime / initialTime) * 60 + 40;
            answerButtons.forEach(button => {
                button.style.width = `${percentageWidth}%`;
    
                if (remainingTime <= initialTime/3) {
                    button.classList.add('pulse-animation-warn');
                }
            });
    
            const points = calculatePoints(remainingTime); 
            document.getElementById('points').textContent = `Points: ${points}`;
        }, 10);
    };
    
    const calculatePoints = (remainingTime) => {
        return Math.floor(remainingTime/initialTime * 100 * multiplier); 
    }

    const updateFeedback = (isCorrect) => {
        const feedbackElement = document.getElementById('feedback');
        feedbackElement.textContent = isCorrect ? 'Correct!' : 'Incorrect!';
    };

    const handleAnswer = (answer, remainingTime) => {
        const correctAnswer = questions[currentQuestionIndex].correct_answer;
        selectedAnswer = answer;
        const isCorrect = selectedAnswer === correctAnswer;

        clearInterval(timerInterval);
        setButtonsDisabled(true);
    
        if (isCorrect) {
            const points = calculatePoints(remainingTime) 
            updateStatistics(true, initialTime - remainingTime, points);
        } else {
            updateStatistics(false, initialTime - remainingTime, 0);
        }
    
        updateFeedback(isCorrect);

        const answerButtons = document.querySelectorAll('.answer-btn');
    
        answerButtons.forEach(button => {
            button.disabled = true;
            button.classList.remove('pulse-animation-warn');

            if (button.textContent === correctAnswer) {
                button.classList.add('correct-answer');
                button.classList.add('pulse');
            } else if (button.textContent === selectedAnswer && selectedAnswer !== correctAnswer) {
                button.classList.add('incorrect-answer');
                button.classList.add('pulse');
            }

        });
    
        if (currentQuestionIndex < quizLength) {
            setTimeout(() => {
                currentQuestionIndex++;
                renderQuestion();
                setButtonsDisabled(false);
            }, 3000); 
        }
    };
    
    const handleTimeOut = () => {
        const correctAnswer = questions[currentQuestionIndex].correct_answer;
        updateFeedback(false); 
        const answerButtons = document.querySelectorAll('.answer-btn');

        answerButtons.forEach(button => {
            button.disabled = true;

            if (button.textContent === correctAnswer) {
                button.classList.add('correct-answer');
            }
        });

        if (currentQuestionIndex < quizLength) {
            setTimeout(() => {
                currentQuestionIndex++;
                renderQuestion();
            }, 3000); 
        }
    };

    function restartQuizData() {
        statistics = {
            correctAnswers: 0,
            totalResponseTime: 0,
            totalPoints: 0,
            questionsAnswered: 0
        };
        currentQuestionIndex = 0;
    }

    function setButtonsDisabled(isDisabled) {
        startButton.disabled = isDisabled;
        restartButton.disabled = isDisabled;
    }

    function calculateMultiplier() {
        let pointsMultiplier = 1;

        if (difficultySelect.value === 'hard') {
            pointsMultiplier *= 1.2;
        } else if (difficultySelect.value === 'medium') {
            pointsMultiplier *= 1.1;
        }

        if (typeOfQuestions.value === 'multiple') {
            pointsMultiplier *= 1.2;
        } else if (typeOfQuestions.value === 'random') {
            pointsMultiplier *= 1.1;
        } 

        return pointsMultiplier * (1 + (25 - initialTime) / 100);
    }

    function updateStatistics(isCorrect, responseTime, points) {
        statistics.totalResponseTime += responseTime;
        statistics.totalPoints += points;
        if (isCorrect) {
            statistics.correctAnswers++;
        }
    }

    populateExampleLeaderboard();
    displayInitialText(); 
    renderLeaderboard();
});
