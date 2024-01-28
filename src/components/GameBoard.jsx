import React from "react";

const GameBoard = ({ board, onClick }) => {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <ol key={rowIndex} className="board-col">
          {row.map((col, colIndex) => (
            <li key={colIndex} className="square">
              <button
                onClick={() => onClick(rowIndex, colIndex)}
                disabled={col !== null}
              >
                {col}
              </button>
            </li>
          ))}
        </ol>
      ))}
    </ol>
  );
};
export default GameBoard;
