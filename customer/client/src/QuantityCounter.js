import React, { useState } from 'react';

const QuantityCounter = ({ quantity, onChange }) => {
  const [count, setCount] = useState(quantity);

  const handleIncrement = () => {
    setCount(count + 1);
    onChange(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
      onChange(count - 1);
    }
  };

  return (
    <div>
      <button onClick={handleDecrement}>-</button>
      <span>{count}</span>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

export default QuantityCounter;
