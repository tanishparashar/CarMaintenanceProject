import React, { useContext, useState } from 'react';
import Card from './Card';
import AddCarModal from './AddCarModal';
import { CarContext } from './CarContext';




function ViewCar() {
  const [cars, setCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const {incrementCarCount } = useContext(CarContext)

  const handleAddCar = (carName, engineType) => {
    incrementCarCount();
    const newCar = {
      id: Math.random().toString(36).substring(7),
      carName,
      engineType
    };
    setCars([...cars, newCar]);
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
              <Card key={car.id}  carName={car.carName} engineType={car.engineType} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewCar;
