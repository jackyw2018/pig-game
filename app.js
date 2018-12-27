/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let totalScores, currentScores, activePlayer, gamePlaying, previousRoll;

init();


function init() {
    totalScores = [0, 0];
    currentScores = 0;
    activePlayer = 0;
    previousRoll = 0;
    gamePlaying = true;

    function resetPlayer(activePlayer) {
        document.querySelector(`#current-${activePlayer}`).textContent = 0;
        document.querySelector(`#score-${activePlayer}`).textContent = 0;
    }

    resetPlayer(1);
    resetPlayer(0);

    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('#name-0').textContent = 'PLAYER 1'
    document.querySelector('#name-1').textContent = 'PLAYER 2'
    document.querySelector('.dice').style.display = 'none';
}

function changePlayer() {
    previousRoll = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
    (activePlayer === 0) ? activePlayer++ : activePlayer--;
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
}

document.querySelector('.dice').style.display = 'none';

// roll dice button function
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. generate a random number
        let dice = Math.ceil(Math.random() * 6);
        let diceDOM = document.querySelector('.dice');
        // 2. display the result
        diceDOM.style.display = 'block';
        diceDOM.src = `dice-${dice}.png`;

        // 3. update the round score if the rolled number was not a 1
        if (dice > 1) {
            currentScores += dice;
            if (previousRoll === 6 && currentScores === 6) {
                document.querySelector(`#score-${activePlayer}`).textContent = 0;
                document.querySelector(`#current-${activePlayer}`).textContent = 0;
                totalScores[activePlayer] = 0;
                currentScores = 0;
                changePlayer();
            } else {
                previousRoll = currentScores;
                document.querySelector(`#current-${activePlayer}`).textContent = currentScores;
            }
        } else {
            currentScores = 0;
            document.querySelector(`#current-${activePlayer}`).textContent = currentScores;
            changePlayer();
        };

    }
})

// hold button function
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // modify total
        totalScores[activePlayer] += currentScores;
        document.querySelector(`#score-${activePlayer}`).textContent = totalScores[activePlayer];
        // reset current
        currentScores = 0;
        document.querySelector(`#current-${activePlayer}`).textContent = currentScores;
        // change player
        
        let winningScore = document.getElementById('scoreToWin').value || 20;
        // if player wins
        if (totalScores[activePlayer] >= winningScore) {
            document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            gamePlaying = false;
        } else {
            changePlayer();
        }
    }
})

// new game button
document.querySelector('.btn-new').addEventListener('click', init);

