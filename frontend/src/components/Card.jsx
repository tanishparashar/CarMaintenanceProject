import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Card({deleteCar, carId, carMake, carModel, carYear, engineType, fuelType, mileage }) {
  // State to store the card data

  const deleteCarCard = async () => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/cars/${carId}`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      deleteCar(); // Update the parent component state
      console.log(response.data);
    } catch (error) {
      console.error(`Error deleting car: ${error}`);
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={'/car-card.webp'}  className="rounded-xl" alt="car" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{carMake} {carModel} {carYear}</h2>
        <p>Engine Type: {engineType}</p>
        <p>Fuel Type: {fuelType}</p>
        <p>Mileage: {mileage}</p>
        <div className="card-actions">
          <button className="btn btn-primary">Check report</button>
          <button className="btn btn-secondary" onClick={deleteCarCard}>Delete Car</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
