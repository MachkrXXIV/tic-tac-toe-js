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
    _board = [];
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
  const restartBtn = document.querySelector;
  boardCells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      e;
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
};
// use contains for fa-x or fa-o
