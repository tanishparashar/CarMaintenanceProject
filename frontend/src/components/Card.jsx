import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

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

  const checkReport = async () => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/predictive/${carId}`, {}, {
        headers: {
          'Authorization': `Token ${token}`
        },
        responseType: 'blob', // to handle file download
      });
  
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
  
      // Create a URL for the blob
      const url = URL.createObjectURL(pdfBlob);
  
      // Open the URL in a new tab
      window.open(url, '_blank');
  
      // Save the URL in the state to be used for the download button
      setPdfUrl(url);
    } catch (error) {
      console.error(`Error checking report: ${error}`);
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
        <button className="btn btn-primary" onClick={checkReport}>Check report</button>
          <button className="btn btn-secondary" onClick={deleteCarCard}>Delete Car</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
