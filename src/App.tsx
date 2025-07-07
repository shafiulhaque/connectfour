import React, { useState } from 'react';
import Board from './components/Board';

const App: React.FC = () => {
  const [winner, setWinner] = useState<string | null>(null);

  return (
    <div className="app">
      <h1>Connect Four</h1>
      <Board setWinner={setWinner} winner={winner} />
      {winner && <h2>{winner} wins!</h2>}
    </div>
  );
};

export default App;