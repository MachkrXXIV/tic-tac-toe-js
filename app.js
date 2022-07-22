const gameBoard = (() => {
  let _board = new Array(9);

  const getBoardSpot = (index) => {
    _board[index - 1];
    console.log(this);
  };

  const setBoardSpot = (index, player) => {
    _board[index - 1];
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

const playerFactory = (marker) => {
  let _marker = marker;
  const getMarker = () => _marker;
  const markBoard = 0;
  return { marker, markBoard };
};
