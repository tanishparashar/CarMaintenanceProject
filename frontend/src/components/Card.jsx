import React, { useEffect, useState } from 'react';

function Card({ carName, engineType }) {
  // State to store the card data
  const [cardData, setCardData] = useState({ carName: '', engineType: '' });

  useEffect(() => {
    // Retrieve card data from local storage when component mounts
    const storedCardData = localStorage.getItem('cardData');
    if (storedCardData) {
      setCardData(JSON.parse(storedCardData));
    }
  }, []); // Empty dependency array to run this effect only once on mount

  useEffect(() => {
    // Save card data to local storage whenever it changes
    localStorage.setItem('cardData', JSON.stringify(cardData));
  }, [cardData]);

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
      <img src={'/car-card.webp'}  className="rounded-xl" alt="car" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{carName}</h2>
        <p>Engine Type: {engineType}</p>
        <div className="card-actions">
          <button className="btn btn-primary">Check report</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
