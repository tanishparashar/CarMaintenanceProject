import React, { useContext, useState, useEffect } from 'react';
import Card from '../components/Card';
import AddCarModal from '../components/AddCarModal';
import { CarContext } from '../components/CarContext';
import axios from 'axios'; // Import axios





function ViewCar() {
  const [cars, setCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const {incrementCarCount, decrementCarCount, carCount } = useContext(CarContext)

  useEffect(() => {
    const getCars = async () => {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/cars/usercarslist/',{
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        setCars(response.data);
        console.log(response.data, "getlistData");
      } catch (error) {
        console.error(`Error fetching cars: ${error}`);
      }
    };

    getCars();
  }, [carCount]);

  const handleAddCar = () => {
    incrementCarCount();
  };

  const handleDeleteCar = () => {
    decrementCarCount();
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  

  return (
    <>
      <div className='container'>
        <div className='flex flex-wrap gap-2'>
          <button className="btn btn-primary m-4" onClick={handleToggleModal}>Add Car</button>
          {showModal && (
            <AddCarModal onSubmit={handleAddCar} onClose={handleToggleModal} />
          )}
          <div className="grid grid-cols-3 gap-4">
            {cars.map(car => (
              <Card deleteCar= {handleDeleteCar} key={car.id} carId={car.id} carMake={car.make} carModel={car.model} carYear={car.year} engineType={car.engine_type} fuelType={car.fuel_type} mileage={car.mileage} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewCar;
