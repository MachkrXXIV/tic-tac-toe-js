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
  const screen = document.querySelector(".container");
  const boardCells = document.querySelectorAll(".board-cell");
  const p1Score = document.querySelector(".p1-score");
  const p2Score = document.querySelector(".p2-score");
  const turnIndicator = document.querySelector(".turn-header");
  const popup = document.querySelector(".popup");
  const winMessage = document.querySelector(".popupMessage");
  const newGame = document.querySelector(".reset");
  const newRound = document.querySelector(".playAgain");

  p1Score.classList.toggle("spotlight");
  boardCells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      if (e.target.textContent !== "") return;
      gameController.makeMove(parseInt(e.target.dataset.index));
      updateBoard();
    });
  });

  newGame.addEventListener("click", () => {
    gameBoard.clear();
    gameController.resetRound();
    gameController.resetScores();
    togglePopup();
    updateBoard();
  });

  newRound.addEventListener("click", () => {
    gameBoard.clear();
    gameController.resetRound();
    togglePopup();
    updateBoard();
  });

  const blurScreen = () => {
    screen.classList.toggle("blur");
  };

  const updateBoard = () => {
    for (let i = 0; i < boardCells.length; i++) {
      boardCells[i].textContent = gameBoard.getCell(i);
    }
  };

  const currentTurnIndicator = (player) => {
    turnIndicator.textContent =
      player === "X" ? "Player 1's turn" : "Player 2's turn";
    p1Score.classList.remove("spotlight");
    p2Score.classList.remove("spotlight");
    if (player === "X") {
      p1Score.classList.toggle("spotlight");
    } else {
      p2Score.classList.toggle("spotlight");
    }
  };

  const scoreBoard = (p1, p2) => {
    p1Score.textContent = `Player 1's Score: ${p1}`;
    p2Score.textContent = `Player 2's Score: ${p2}`;
  };

  const gameEndMessage = (result) => {
    setTimeout(() => {
      togglePopup();
    }, 1500);
    if (result === "Draw") {
      winMessage.textContent = "It's a draw!";
    } else {
      winMessage.textContent =
        result === "X" ? "Player 1 Wins!" : "Player 2 Wins!";
    }
  };

  const togglePopup = () => {
    popup.classList.toggle("hidden");
    blurScreen();
  };

  const highlightWinningCells = (combination) => {
    
  }

  return { gameEndMessage, currentTurnIndicator, scoreBoard };
})();

const playerFactory = (sign) => {
  // only job is to create players
  let _sign = sign;
  let _score = 0;
  const getSign = () => _sign;
  const getScore = () => _score;
  const increaseScore = () => _score++;
  const resetScore = () => (_score = 0);
  return { getSign, getScore, increaseScore, resetScore };
};

const gameController = (() => {
  const player1 = playerFactory("X");
  const player2 = playerFactory("O");
  let gameOver = false;
  let roundNum = 1;

  const makeMove = (cellIndex) => {
    gameBoard.setCell(cellIndex, getCurrentTurn());
    if (checkWin(cellIndex)) {
      if (getCurrentTurn() === "X") {
        player1.increaseScore();
      } else {
        player2.increaseScore();
      }
      displayController.gameEndMessage(getCurrentTurn());
      displayController.scoreBoard(player1.getScore(), player2.getScore());
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

  const getWinningCombo = ()=> {
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

    const possibleCombos = winConditions.filter((combination) => combination.includes(cellIndex))
    for (let i = 0; i < possibleCombos.length) {
      if (possibleCombos[i].every((cell) => gameBoard.getCell(cell) === getCurrentTurn())) {
        return possibleCombos[i];
      }
    }
  }

  const resetRound = () => {
    roundNum = 1;
    gameOver = false;
    displayController.currentTurnIndicator(player1.getSign());
  };

  const resetScores = () => {
    player1.resetScore();
    player2.resetScore();
    displayController.scoreBoard(player1.getScore(), player2.getScore());
  };

  return { makeMove, getCurrentTurn, resetRound, resetScores, getWinningCombo };
})();
// use contains for fa-x or fa-o
