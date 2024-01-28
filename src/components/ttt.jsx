import React, { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import { calculateWinner, isBoardFull, findBestMove } from "./minimax";
import "./style.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(3).fill(Array(3).fill(null)));
  const [isPlayerX, setIsPlayerX] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setWinner(result);
    } else if (!isPlayerX) {
      // If it's the bot's turn, make a move
      const { row, col } = findBestMove(board);
      makeMove(row, col);
    }
  }, [board, isPlayerX]);

  const makeMove = (row, col) => {
    if (board[row][col] || winner) {
      return;
    }

    const newBoard = board.map((e) => [...e]); // Ensure immutability
    newBoard[row][col] = isPlayerX ? "X" : "O";
    setBoard(newBoard);
    setIsPlayerX(!isPlayerX);
  };

  const resetGame = () => {
    setBoard(Array(3).fill(Array(3).fill(null)));
    setIsPlayerX(true);
    setWinner(null);
  };

  return (
    <div>
      <h1>Defeat Me!</h1>

      <GameBoard board={board} onClick={makeMove} />

      {winner && <p className="result">You lose 😅</p>}
      {isBoardFull(board) && !winner && <p>It's a draw!</p>}

      <div className="card">
        <button className="reset" onClick={resetGame}>
          Try again?
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
