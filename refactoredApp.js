// data variables to keep track of
let dices, currentScore, cumulativeScores, winningScore, gamePlaying, activePlayer;

// DOM variables - Buttons
let newGameDOM = document.querySelector('.btn-new');
let rollDiceDOM = document.querySelector('.btn-roll');
let holdDOM = document.querySelector('.btn-hold');
let enterWinningScoreDOM = document.querySelector('#scoreToWin');

// DOM variables - displays
let playerNameDOM, playerCumulScore, playerRoundScore, dicesDOM, playerPanel, msgDOM;

dicesDOM = function (dice) {
    return document.querySelector(`#dice-${dice}`);
}

playerNameDOM = function (player) {
    return document.querySelector(`#name-${player}`);
}

playerCumulScoreDOM = function (player) {
    return document.querySelector(`#score-${player}`);
}

playerRoundScoreDOM = function (player) {
    return document.querySelector(`#current-${player}`);
}

playerPanelDOM = function (player) {
    return document.querySelector(`.player-${player}-panel`)
}

msgDOM = document.querySelector('#message');

init();

// a function that initializes and resets the game
function init() {
    // define initialized values;
    dices = [0, 0];
    cumulativeScores = [0, 0];
    currentScore = 0;
    winningScore = enterWinningScoreDOM.value || 40;
    gamePlaying = true;
    activePlayer = 0;

    // display initial setup
    for (let i = 0; i <= 1; i++) {
        let player = i;
        playerCumulScoreDOM(player).textContent = 0;
        playerRoundScoreDOM(player).textContent = 0;
    }

    // set active
    playerPanelDOM(0).classList.add('active');
    playerPanelDOM(1).classList.remove('active');

    // remove winner
    playerPanelDOM(0).classList.remove('winner');
    playerPanelDOM(1).classList.remove('winner');
    playerNameDOM(0).textContent = 'Player 1';
    playerNameDOM(1).textContent = 'Player 2';

    setMsg('Game Started!');

    // hide dices
    dicesDOM(0).style.display = 'none';
    dicesDOM(1).style.display = 'none';
}

function setMsg(message) {
    msgDOM.textContent = message;
}

// a function that changes active player
function changePlayer() {
    // remove active display
    playerPanelDOM(activePlayer).classList.toggle('active');

    // reset roundscores
    currentScore = 0;
    playerRoundScoreDOM(activePlayer).textContent = 0;

    // change active player 
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // add active display
    playerPanelDOM(activePlayer).classList.toggle('active');

}

// buttons - event handling
// New Game
// Reset the game
// Both players cumulative scores return 0
// Both player score of the round return 0
// Winning Score is 20 if undefined
// Dice are not displayed initially
newGameDOM.addEventListener('click', init);

// Roll Dice
rollDiceDOM.addEventListener('click', function () {
    if (gamePlaying) {
        // Generate two dices
        for (let i = 0; i <= 1; i++) {
            dices[i] = Math.ceil(Math.random() * 6);

            // Display the corresponding dice
            dicesDOM(i).src = `dice-${dices[i]}.png`;
            dicesDOM(i).style.display = 'block';
        }


        // If one of them is 1, round score is lost and next player goes
        if (dices[0] === 1 || dices[1] === 1) {
            setMsg('One was rolled. Next Player\'s turn.')
            changePlayer();
        } else {
            // add and display current score
            currentScore += dices[0] + dices[1];
            playerRoundScoreDOM(activePlayer).textContent = currentScore;
            setMsg('Nice Roll. Keep rolling? Or it is time to hold?')
        }
        // If two sixes in a row are rolled, cumulative score is lost and next player goes
    }
});
// Hold
holdDOM.addEventListener('click', function () {
    if (gamePlaying) {
        // Add current score to cumulative score and display the change
        cumulativeScores[activePlayer] += currentScore;
        currentScore = 0;
        playerCumulScoreDOM(activePlayer).textContent = cumulativeScores[activePlayer];
        playerRoundScoreDOM(activePlayer).textContent = currentScore;

        if (cumulativeScores[activePlayer] >= winningScore) {
            playerNameDOM(activePlayer).textContent = 'Winner!'
            playerPanelDOM(activePlayer).classList.add('winner');
            setMsg(`Player ${activePlayer + 1} won!`)
        } else {
            setMsg('Next Player\'s turn.')
            changePlayer();
        }
    }
});