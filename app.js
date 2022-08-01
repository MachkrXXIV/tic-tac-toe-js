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
      _board[i] = "";
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
      if (e.target.textContent !== "") return;
      gameController.makeMove(parseInt(e.target.dataset.index));
      updateBoard();
    });
  });

  restartBtn.addEventListener("click", () => {
    gameBoard.clear();
    updateBoard();
  });

  const updateBoard = () => {
    for (let i = 0; i < boardCells.length; i++) {
      boardCells[i].textContent = gameBoard.getCell(i);
    }
  };

  return { updateBoard };
})();

const playerFactory = (sign) => {
  // only job is to create players
  let _sign = sign;
  const getSign = () => _sign;
  return { getSign };
};

const gameController = (() => {
  const player1 = playerFactory("X");
  const player2 = playerFactory("O");
  let gameOver = false;
  let roundNum = 1;

  const makeMove = (cellIndex) => {
    gameBoard.setCell(cellIndex, getCurrentTurn());
    console.log(getCurrentTurn());
    if (checkWin(cellIndex)) {
      return;
    }
    if (roundNum === 9) {
      return;
    }
    roundNum++;
    return;
  };

  const getCurrentTurn = () => {
    return roundNum % 2 === 1 ? player1.getSign() : player2.getSign();
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
        possibleCombination.every(
          (index) => gameBoard.getCell(index) === getCurrentTurn()
        )
      );
  };

  const resetGame = () => {
    roundNum = 1;
    gameOver = false;
  };

  return { makeMove, getCurrentTurn, resetGame };
})();
// use contains for fa-x or fa-o
