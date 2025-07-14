import React, { useState } from 'react';
import Cell from './Cell';

const TOTAL_ROWS = 6;
const TOTAL_COLUMNS = 7;

type Player = 'Red' | 'Yellow';

type Props = {
  winner: string | null;
  setWinner: (p: string | null) => void;
};

const Board: React.FC<Props> = ({ winner, setWinner }) => {
  const [grid, setGrid] = useState<string[][]>(
    Array.from({ length: TOTAL_ROWS }, () => Array(TOTAL_COLUMNS).fill(''))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>('Red');

  const handleClick = (col: number) => {
    if (winner) return;

    for (let row = TOTAL_ROWS - 1; row >= 0; row--) {
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

  const checkWin = (grid: string[][], row: number, column: number, player: string): boolean => {
    const directions = [
      [0, 1], // horizontal
      [1, 0], // vertical
      [1, 1], // diagonal down-right
      [1, -1] // diagonal down-left
    ];

    return directions.some(([rowDelta, colDelta]) => {
      let consecutiveCount = 1;
      for (let direction of [-1, 1]) {
        let currentRow = row + direction * rowDelta;
        let currentColumn = column + direction * colDelta;

        while (
          currentRow >= 0 &&
          currentRow < TOTAL_ROWS &&
          currentColumn >= 0 &&
          currentColumn < TOTAL_COLUMNS &&
          grid[currentRow][currentColumn] === player
        ) {
          consecutiveCount++;
          currentRow += direction * rowDelta;
          currentColumn += direction * colDelta;
        }
      }
      return consecutiveCount >= 4;
    });
  };

  return (
    <div className="board">
      {grid.map((rowArray, rowIndex) => (
        <div key={rowIndex} className="row">
          {rowArray.map((cellValue, columnIndex) => (
            <Cell key={columnIndex} value={cellValue} onClick={() => handleClick(columnIndex)} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
