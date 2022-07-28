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
      board[i] = "";
    }
  };

  return {
    getBoardSpot,
    setBoardSpot,
    clear,
  };
})();

const displayController = (() => {
  // affects what is on screen html
  const boardCells = document.querySelectorAll(".board-cell");
  const restartBtn = document.querySelector(".reset");
  boardCells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      e.target.dataset.index;
    });
  });
  return;
})();

const playerFactory = (sign) => {
  // only job is to create players
  let _sign = sign;
  const getSign = () => _sign;
  return { sign, getSign };
};

const gameController = () => {
  const playerX = playerFactory("X");
  const playerO = playerFactory("O");
  let isPlaying = false;
};
// use contains for fa-x or fa-o
