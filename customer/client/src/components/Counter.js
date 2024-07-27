import React from 'react';

function Counter({ initialValue, onUpdate }) {
  const handleIncrement = () => {
    onUpdate(initialValue + 1); // Pass the updated count directly
  };

  const handleDecrement = () => {
    if (initialValue > 0) {
      onUpdate(initialValue - 1); // Pass the updated count directly
    }
  };

  return (
    <div>
      <button onClick={handleDecrement}>-</button>
      <span>{initialValue}</span>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
}

export default Counter;
