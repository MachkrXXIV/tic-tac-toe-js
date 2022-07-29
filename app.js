const gameBoard = (() => {
  // manipulate board
  let _board = new Array(9);

  const getCell = (index) => {
    return _board[index];
  };

  const setCell = (index, sign) => {
    _board[index] = sign;
  };

  const clear = () => {
    for (let i = 0; i < _board.length; i++) {
      board[i] = undefined;
    }
  };

  return {
    getCell,
    setCell,
    clear,
  };
})();

const displayController = (() => {
  // affects what is on screen html
  const boardCells = document.querySelectorAll(".board-cell");
  const restartBtn = document.querySelector(".reset");
  const p1Score = document.querySelector(".p1-score");
  const p2Score = document.querySelector(".p2-score");
  const turnIndicator = document.querySelector(".turn-header");
  boardCells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      gameController.e.target.dataset.index;
    });
  });
})();

const playerFactory = (sign) => {
  // only job is to create players
  let _sign = sign;
  const getSign = () => _sign;
  return { sign, getSign };
};

const gameController = () => {
  const player1 = playerFactory("X");
  const player2 = playerFactory("O");
  let gameOver = false;
  let roundNum = 1;
  let currentTurnSign = "X";

  const makeMove = (cellIndex) => {
    gameBoard.setCell(cellIndex, currentTurnSign);
    if (checkWin(cellIndex)) {
      return;
    }
    if (round === 9) {
      return;
    }
    round++;
    return;
  };

  const checkWin = (cellIndex) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // return true if win
    return winConditions
      .filter((combination) => combination.includes(cellIndex))
      .some((possibleCombination) =>
        possibleCombination.every((index) => gameBoard.getCell(index) === turn)
      );
  };
  return { makeMove, checkWin };
};
// use contains for fa-x or fa-o
