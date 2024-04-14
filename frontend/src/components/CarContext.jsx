// CarContext.jsx
import React, { createContext, useState } from 'react';

export const CarContext = createContext();

const CarProvider = ({ children }) => {
  const [carCount, setCarCount] = useState(0);

  const incrementCarCount = () => {
    setCarCount(prevCount => prevCount + 1);
  };
  const decrementCarCount = () => {
    setCarCount(prevCount => prevCount - 1);
  };

  return (
    <CarContext.Provider value={{ carCount, incrementCarCount, decrementCarCount }}>
      {children}
    </CarContext.Provider>
  );
};

export default CarProvider;
