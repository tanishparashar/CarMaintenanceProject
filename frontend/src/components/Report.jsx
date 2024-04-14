import React from 'react';

function Report({ predictionData }) {
  return (
    <div className="report w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="block text-gray-700 text-lg font-bold mb-2">Car Report</h2>
      <p><strong>Car Make:</strong> {predictionData['Car Make']}</p>
      <p><strong>Car Model:</strong> {predictionData['Car Model']}</p>
      <p><strong>Car Year:</strong> {predictionData['Car Year']}</p>
      <p><strong>Engine Type:</strong> {predictionData['Engine Type']}</p>
      <p><strong>Fuel Type:</strong> {predictionData['Fuel Type']}</p>
      <p><strong>Mileage:</strong> {predictionData['Mileage']}</p>
      <p><strong>Prediction:</strong> {predictionData['Prediction']}</p>
    </div>
  );
}

export default Report;