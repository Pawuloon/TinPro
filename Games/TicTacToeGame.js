const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function initializeBoard()
{
    for (let i = 0; i < 9; i++)
    {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i.toString();
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }
}

function handleCellClick(event)
{
    const index = event.target.dataset.index;

    if (gameBoard[index] === '' && gameActive)
    {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinner();
        switchPlayer();
    }
}

function switchPlayer()
{
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner()
{
    const winningCombinations =
    [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations)
    {
        const [a, b, c] = combination;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c])
        {
            gameActive = false;
            alert(`Player ${currentPlayer} wins!`);
            return;
        }
    }

    if (!gameBoard.includes('') && gameActive)
    {
        gameActive = false;
        alert("It's a draw!");
    }
}

function resetGame()
{
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell =>
    {
        cell.textContent = '';
    });
}

initializeBoard();
resetButton.addEventListener('click', resetGame);