/*---- Constants ----*/
const PLAYERS = {
    "null" : "",
    "1" : "X",
    "-1" : "O",
}
 const WINNING_COMBOS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
 ]

/*---- Define State Variables ----*/
let board, turn, winner;

/*---- Cached element references ----*/
const msgEl = document.getElementById('msg');
const sqEl = document.querySelectorAll('td');

/*---- Event listeners ----*/
document.querySelector('.game-board').addEventListener('click', handleClick);
document.querySelector('button').addEventListener('click', init);

/*---- Functions ----*/

init();

function init() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null; 
    render();

}

function render() {
    board.forEach(function(sq, idx) {
        sqEl[idx].textContent = PLAYERS[sq];
    });
    if(winner) {    
        if (winner === 'T'){
            msgEl.innerHTML = "Try Again, We Have A Tie!"
        } else {
            msgEl.innerHTML = `${PLAYERS[winner].toUpperCase()} Wins!`;
        };
    } else { 
        msgEl.innerHTML = `${PLAYERS[turn].toUpperCase()}'s Turn!`;
    };
}

function handleClick(evt) {
    let idx = parseInt(evt.target.id.replace('sq', ''));
    if (board[idx] || winner) return;
    board[idx] = turn; 
    turn *= -1;
    winner = getWinner();
    render();
}

function getWinner() {
    for (let i = 0; i < WINNING_COMBOS.length; i++) {
        if (Math.abs(board[WINNING_COMBOS[i][0]] + board[WINNING_COMBOS[i][1]] + board[WINNING_COMBOS[i][2]]) === 3) return board[WINNING_COMBOS[i][0]];
    };
    if (board.includes(null)) return null;
    return 'T';
}

