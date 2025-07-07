import React, { useState } from 'react';
import Cell from './Cell';

const ROWS = 6;
const COLS = 7;

type Player = 'Red' | 'Yellow';

type Props = {
  winner: string | null;
  setWinner: (p: string | null) => void;
};

const Board: React.FC<Props> = ({ winner, setWinner }) => {
  const [grid, setGrid] = useState<string[][]>(
    Array.from({ length: ROWS }, () => Array(COLS).fill(''))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>('Red');

  const handleClick = (col: number) => {
    if (winner) return;

    for (let row = ROWS - 1; row >= 0; row--) {
      if (!grid[row][col]) {
        const newGrid = grid.map(r => [...r]);
        newGrid[row][col] = currentPlayer;
        setGrid(newGrid);

        if (checkWin(newGrid, row, col, currentPlayer)) {
          setWinner(currentPlayer);
        } else {
          setCurrentPlayer(currentPlayer === 'Red' ? 'Yellow' : 'Red');
        }
        break;
      }
    }
  };

  const checkWin = (grid: string[][], row: number, col: number, player: string): boolean => {
    const directions = [
      [0, 1], [1, 0], [1, 1], [1, -1] // setting it to horizontal, vertical, and diagonal
    ];

    return directions.some(([dx, dy]) => {
      let count = 1;
      for (let dir of [-1, 1]) {
        let r = row + dir * dx;
        let c = col + dir * dy;
        while (r >= 0 && r < ROWS && c >= 0 && c < COLS && grid[r][c] === player) {
          count++;
          r += dir * dx;
          c += dir * dy;
        }
      }
      return count >= 4;
    });
  };

  return (
    <div className="board">
      {grid.map((row, rIdx) => (
        <div key={rIdx} className="row">
          {row.map((cell, cIdx) => (
            <Cell key={cIdx} value={cell} onClick={() => handleClick(cIdx)} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;