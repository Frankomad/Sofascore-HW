import { openModal } from './modal.js';
import { exampleLeaderboard } from './initialData.js';

const startButton = document.getElementById('start-btn');

export function saveResult(statistics) {
    const playerNameForm = `
        <div class="modal-header">
            <button id="close-button">&times;</button>
            <h2>Enter Your Name</h2>
        </div>
        <div class="modal-body">
            <label for="player-name">Name:</label>
            <input type="text" id="player-name">
            <button id="save-result-button">Save</button>
        </div>
    `;
    
    openModal(playerNameForm); 
    const saveButton = document.getElementById('save-result-button');

    saveButton.addEventListener('click', function() {
        saveResultAndClose(statistics);
    });

    const modal = document.getElementById('modal-dialog');
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
};

function saveResultAndClose(statistics) {
    const playerNameInput = document.getElementById('player-name');
    const playerName = playerNameInput.value.trim();
    if (playerName) {
        const result = {
            playerName: playerName,
            points: statistics.totalPoints,
            correctAnswers: statistics.correctAnswers,
            averageResponseTime: (statistics.totalResponseTime / 15).toFixed(2),
            averagePointsPerQuestion: (statistics.totalPoints / 15).toFixed(2),
            percentageCorrectAnswers: ((statistics.correctAnswers / 15) * 100).toFixed(0)
        };

        let leaderboard = getLeaderboardData() || [];

        leaderboard.push(result);

        leaderboard.sort((a, b) => b.points - a.points);

        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        renderLeaderboard();
        closeModal(); 
        startButton.style.display = 'none';
        alert('Result saved successfully!');
    } else {
        alert('Player name cannot be empty.');
    }
}

function closeModal() {
    const modal = document.getElementById('modal-dialog');
    modal.close();
}

export function populateExampleLeaderboard() {
    if (getLeaderboardData()) {
        return;
    }

    exampleLeaderboard.sort((a, b) => b.points - a.points);

    localStorage.setItem('leaderboard', JSON.stringify(exampleLeaderboard));
};

function getLeaderboardData() {
    return JSON.parse(localStorage.getItem('leaderboard')) || [];
}

export function renderLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = ''; 

    const leaderboardData = getLeaderboardData();
    if (leaderboardData.length === 0) {
        leaderboardList.innerHTML = '<li>No results yet!</li>';
    } else {
        leaderboardData.forEach((result, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${index + 1}. ${result.playerName}: ${result.points} points`;
            listItem.addEventListener('click', () => openModal(prepareHTML(result)));
            leaderboardList.appendChild(listItem);
        });
    }
}

function prepareHTML(user) {
    return `
    <button id="close-button">&times;</button>
    <h2>${user.playerName}'s Score Details</h2>
    <p>Player Name: ${user.playerName}</p>
    <p>Points: ${user.points}</p>
    <p>Correct Answers: ${user.correctAnswers}</p>
    <p>Average Response Time: ${user.averageResponseTime} seconds</p>
    <p>Average Points Per Question: ${user.averagePointsPerQuestion}</p>
    <p>Percentage Correct Answers: ${user.percentageCorrectAnswers}%</p>
`;
}


