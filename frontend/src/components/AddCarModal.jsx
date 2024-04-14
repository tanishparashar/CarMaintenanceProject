import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'; // Import axios


function AddCarModal({ onSubmit, onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');

  const car_models_dict = {
    'Toyota': {'Camry': 1992, 'Corolla': 1966, 'Rav4': 1994, 'Prius': 1997, 'Highlander': 2000, 'Tacoma': 1995,
               'Yaris': 1999, 'Sienna': 1997, 'Avalon': 1994, 'Supra': 1978},
    'Honda': {'Civic': 1972, 'Accord': 1976, 'CR-V': 1995, 'Pilot': 2002, 'Odyssey': 1994, 'Fit': 2001,
              'HR-V': 1999, 'Ridgeline': 2005, 'Insight': 1999, 'Passport': 1994},
    'Ford': {'Mustang': 1964, 'F-150': 1948, 'Escape': 2000, 'Explorer': 1990, 'Edge': 2006, 'Focus': 1998,
             'Fusion': 2005, 'Expedition': 1996, 'Ranger': 1983, 'Bronco': 1966},
    'Chevrolet': {'Cruze': 2008, 'Silverado': 1998, 'Equinox': 2004, 'Malibu': 1964, 'Traverse': 2008,
                  'Tahoe': 1992, 'Camaro': 1966, 'Suburban': 1935, 'Blazer': 1969, 'Trax': 2012},
    'BMW': {'3 Series': 1975, '5 Series': 1972, 'X3': 2003, 'X5': 1999, '7 Series': 1977, 'X1': 2009, 'X7': 2019,
            '4 Series': 2013, 'X6': 2008, '2 Series': 2014},
    'Mercedes-Benz': {'C-Class': 1993, 'E-Class': 1953, 'GLC': 2015, 'GLE': 1997, 'S-Class': 1972, 'GLA': 2013,
                      'A-Class': 1997, 'G-Class': 1979, 'CLS': 2004, 'SL': 1954},
    'Audi': {'A4': 1994, 'A6': 1994, 'Q5': 2008, 'Q7': 2005, 'A3': 1996, 'Q3': 2011, 'A5': 2007, 'Q8': 2018,
             'A7': 2010, 'TT': 1998},
    'Nissan': {'Altima': 1992, 'Maxima': 1981, 'Rogue': 2007, 'Sentra': 1982, 'Murano': 2002, 'Pathfinder': 1986,
               'Versa': 2006, 'Titan': 2003, 'Armada': 2003, 'Frontier': 1997},
    'Hyundai': {'Sonata': 1985, 'Elantra': 1990, 'Santa Fe': 2000, 'Tucson': 2004, 'Kona': 2017, 'Venue': 2019,
                'Accent': 1994, 'Palisade': 2018, 'Veloster': 2011, 'Nexo': 2018, 'Creta': 2014},
    'Maruti Suzuki': {'Swift': 2004, 'Baleno': 1999, 'Dzire': 2008, 'Celerio': 2014, 'Wagon R': 1999,
                      'Vitara Brezza': 2016, 'Ertiga': 2012, 'S-Presso': 2019, 'Alto': 1979, 'Ignis': 2016,
                      'S-Cross': 2013, 'XL6': 2019},
    'Tata': {'Tiago': 2016, 'Nexon': 2017, 'Safari': 1998, 'Altroz': 2019, 'Harrier': 2019, 'Tigor': 2017,
             'Hexa': 2017, 'Gravitas': 2020, 'Sierra': 1991, 'Punch': 2021, 'Nexon EV': 2020},
    'Mahindra': {'XUV500': 2011, 'Scorpio': 2002, 'Thar': 2010, 'Bolero': 2000, 'XUV300': 2019, 'Marazzo': 2018,
                 'Alturas G4': 2018, 'KUV100': 2016, 'TUV300': 2015, 'Verito': 2007, 'XUV700': 2021,
                 'eKUV100': 2019}
};

  useEffect(() => {
    if (carMake && carModel) {
      setCarYear(car_models_dict[carMake][carModel]);
    }
  }, [carMake, carModel]);


  const handleFormSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const userId = localStorage.getItem('userId');
      console.log(data);
      data = {
        owner: userId,
        carName: data.carName,
        carModel: data.carModel,
        carMake: data.carMake,
        carYear: data.carYear,
        engineType: data.engineType,
        fuelType: data.fuelType,
        mileage: data.mileage
      }
      const response = await axios.post('http://127.0.0.1:8000/api/cars/', data, 
      {
        headers: { Authorization: `Token ${token}` } // Create an Authorization header with the token
      }
      );
      console.log(response);
      onSubmit(data.carName, data.carMake, data.carModel, data.carYear, data.engineType, data.fuelType, data.mileage);
      onClose(); // Close the modal after submitting
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Car</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-wrap">
          <div className="w-1/2 pr-4">
            <div className="mb-4">
              <label htmlFor="carName" className="block font-semibold">Car Name:</label>
              <input {...register("carName", { required: true })} type="text" className="input input-bordered w-full" />
              {errors.carName && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="carModel" className="block font-semibold">Car Model:</label>
              <select {...register("carModel", { required: true })} className="input input-bordered w-full" onChange={(e) => setCarModel(e.target.value)}>
                {carMake && Object.keys(car_models_dict[carMake]).map(model => <option key={model} value={model}>{model}</option>)}
              </select>
              {errors.carModel && <span className="text-red-500">This field is required</span>}
            </div>
          </div>
          <div className="w-1/2 pl-4">
            <div className="mb-4">
              <label htmlFor="carMake" className="block font-semibold">Car Make:</label>
              <select {...register("carMake", { required: true })} className="input input-bordered w-full" onChange={(e) => setCarMake(e.target.value)}>
                {Object.keys(car_models_dict).map(make => <option key={make} value={make}>{make}</option>)}
              </select>
              {errors.carMake && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="carYear" className="block font-semibold">Car Year:</label>
              <input {...register("carYear")} type="number" className="input input-bordered w-full" value={carYear} readOnly />
              {errors.carYear && <span className="text-red-500">This field is required</span>}
            </div>
          </div>
          <div className="w-full">
            <div className="mb-4">
              <label htmlFor="engineType" className="block font-semibold">Engine Type:</label>
              <select {...register("engineType", { required: true })} className="input input-bordered w-full">
                {/* Replace with your actual options */}
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
              {errors.engineType && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="fuelType" className="block font-semibold">Fuel Type:</label>
              <select {...register("fuelType", { required: true })} className="input input-bordered w-full">
                {/* Replace with your actual options */}
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
              {errors.fuelType && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="mileage" className="block font-semibold">Mileage:</label>
              <input {...register("mileage", { required: true, valueAsNumber: true, min: 0 })} type="number" className="input input-bordered w-full" />
              {errors.mileage && <span className="text-red-500">This field is required and should be a positive number</span>}
            </div>
          </div>
          <div className="w-full text-right">
            <button type="submit" className="btn btn-primary">Add</button>
            <button type="button" className="btn btn-primary ml-2" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCarModal;
