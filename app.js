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
  const popup = document.querySelector(".popup");
  const winMessage = document.querySelector(".popupMessage");
  const newGame = document.querySelector(".newGame");
  const newRound = document.querySelector(".playAgain");

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

  const currentTurnIndicator = (player) => {
    turnIndicator.textContent =
      player === "X" ? "Player 1's turn" : "Player 2's turn";
  };

  const scoreBoard = (p1, p2) => {
    p1Score.textContent = `Player 1's Score: ${p1}`;
    p2Score.textContent = `Player 2's Score: ${p2}`;
  };

  const gameEndMessage = (result) => {
    setTimeout(() => {
      popup.classList.toggle("hidden");
    }, 1000);
    if (result === "Draw") {
      winMessage.textContent = "It's a draw!";
    } else {
      winMessage.textContent =
        result === "X" ? "Player 1 Wins!" : "Player 2 Wins!";
    }
  };

  return { gameEndMessage, currentTurnIndicator };
})();

const playerFactory = (sign) => {
  // only job is to create players
  let _sign = sign;
  let _score = 0;
  const getSign = () => _sign;
  const getScore = () => _score;
  const increaseScore = () => _score++;
  return { getSign, getScore, increaseScore };
};

const gameController = (() => {
  const player1 = playerFactory("X");
  const player2 = playerFactory("O");
  let gameOver = false;
  let roundNum = 1;

  const makeMove = (cellIndex) => {
    gameBoard.setCell(cellIndex, getCurrentTurn());
    if (checkWin(cellIndex)) {
      displayController.gameEndMessage(getCurrentTurn());
      gameOver = true;
      return;
    }
    if (roundNum === 9) {
      displayController.gameEndMessage("Draw");
      return;
    }
    roundNum++;
    displayController.currentTurnIndicator(getCurrentTurn());
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
