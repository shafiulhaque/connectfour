import React, { useState } from 'react';
import Board from './components/Board';

const App: React.FC = () => {
  const [winner, setWinner] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  const restartGame = () => {
    setWinner(null);
    setKey(prev => prev + 1);
  };

  return (
    <div className="app">
      <button onClick={restartGame} className="restart-button">Restart Game</button>
      <h1>Connect Four</h1>
      <Board key={key} setWinner={setWinner} winner={winner} />
      {winner && <h2>{winner} wins!</h2>}
    </div>
  );
};

export default App;