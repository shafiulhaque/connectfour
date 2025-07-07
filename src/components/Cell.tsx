import React from 'react';

type Props = {
  value: string;
  onClick: () => void;
};

const Cell: React.FC<Props> = ({ value, onClick }) => {
  return (
    <div className="cell" onClick={onClick}>
      <div className={`disc ${value.toLowerCase()}`}></div>
    </div>
  );
};

export default Cell;