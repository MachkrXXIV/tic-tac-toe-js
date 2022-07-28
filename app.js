const gameBoard = (() => {
  // manipulate board
  let _board = new Array(9);

  const getBoardSpot = (index) => {
    _board[index];
  };

  const setBoardSpot = (index, sign) => {
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
  // affects what is on screen
  return;
})();

const playerFactory = (sign) => {
  let _sign = sign;
  const getSign = () => _sign;
  return { sign, getSign };
};

// use contains for fa-x or fa-o
