let player1Position = 0;
let player2Position = 0;
let player1InPlay = false;
let player2InPlay = false;
let currentPlayer = 1;

function roll() {
    if (currentPlayer !== 1) return;
    const diceValue = Math.floor(Math.random() * 6) + 1;
    const diceElement = document.getElementById('xdice');
    diceElement.classList.add('rolling');
    setTimeout(() => {
        diceElement.innerHTML = diceValue;
        diceElement.classList.remove('rolling');
        movePlayer(1, diceValue);
    }, 500);
}

function roll2() {
    if (currentPlayer !== 2) return;
    const diceValue = Math.floor(Math.random() * 6) + 1;
    const diceElement = document.getElementById('adice');
    diceElement.classList.add('rolling');
    setTimeout(() => {
        diceElement.innerHTML = diceValue;
        diceElement.classList.remove('rolling');
        movePlayer(2, diceValue);
    }, 500);
}

function movePlayer(player, steps) {
    let currentPosition, tokenClass, playerInPlay;
    if (player === 1) {
        currentPosition = player1Position;
        tokenClass = 'player1';
        playerInPlay = player1InPlay;
        if (steps === 6 || playerInPlay) {
            player1Position += steps;
            player1InPlay = true;
        }
    } else {
        currentPosition = player2Position;
        tokenClass = 'player2';
        playerInPlay = player2InPlay;
        if (steps === 6 || playerInPlay) {
            player2Position += steps;
            player2InPlay = true;
        }
    }
    updateBoard(currentPosition, player, tokenClass, steps);
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById('playerTurn').innerHTML = `Player ${currentPlayer}'s Turn`;
}

function updateBoard(position, player, tokenClass, steps) {
    // Remove old token
    const oldCell = document.querySelector(`.cell[data-position="${position}"] .${tokenClass}`);
    if (oldCell) {
        oldCell.remove();
    }
    // Calculate new position
    let newPosition;
    if (player === 1) {
        newPosition = player1Position;
    } else {
        newPosition = player2Position;
    }
    // Prevent movement beyond the board size
    if (newPosition >= 225) {
        newPosition = 224;
        alert(`Player ${player} wins!`);
        resetGame();
        return;
    }
    // Place new token
    const newCell = document.querySelector(`.cell[data-position="${newPosition}"]`);
    if (newCell) {
        const token = document.createElement('div');
        token.classList.add('token', tokenClass);
        newCell.appendChild(token);
    }
}

function resetGame() {
    player1Position = 0;
    player2Position = 0;
    player1InPlay = false;
    player2InPlay = false;
    currentPlayer = 1;
    document.getElementById('playerTurn').innerHTML = `Player 1's Turn`;
    document.querySelectorAll('.token').forEach(token => token.remove());
}

// Create Ludo Board
const board = document.getElementById('board');
let cellPosition = 0;

for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.position = cellPosition;
        cellPosition++;
        if ((i === 0 && j < 6) || (i === 14 && j > 8) || (j === 0 && i > 8) || (j === 14 && i < 6)) {
            cell.classList.add('start');
        } else if ((i === 6 && j === 6) || (i === 8 && j === 8)) {
            cell.classList.add('safe');
        }
        board.appendChild(cell);
    }
}
