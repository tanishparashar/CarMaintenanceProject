import React from 'react';
import { useForm } from 'react-hook-form';

function AddCarModal({ onSubmit, onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data.carName, data.engineType);
    onClose(); // Close the modal after submitting
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
              <label htmlFor="carMake" className="block font-semibold">Car Make:</label>
              <select {...register("carMake", { required: true })} className="input input-bordered w-full">
                {/* Replace with your actual options */}
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Ford">Ford</option>
              </select>
              {errors.carMake && <span className="text-red-500">This field is required</span>}
            </div>
          </div>
          <div className="w-1/2 pl-4">
            <div className="mb-4">
              <label htmlFor="carModel" className="block font-semibold">Car Model:</label>
              <select {...register("carModel", { required: true })} className="input input-bordered w-full">
                {/* Replace with your actual options */}
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Ford">Ford</option>
              </select>
              {errors.carModel && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="carYear" className="block font-semibold">Car Year:</label>
              <select {...register("carYear", { required: true })} className="input input-bordered w-full">
                {/* Replace with your actual options */}
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Ford">Ford</option>
              </select>
              {errors.carYear && <span className="text-red-500">This field is required</span>}
            </div>
          </div>
          <div className="w-full">
            <div className="mb-4">
              <label htmlFor="engineType" className="block font-semibold">Engine Type:</label>
              <select {...register("engineType", { required: true })} className="input input-bordered w-full">
                {/* Replace with your actual options */}
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Ford">Ford</option>
              </select>
              {errors.engineType && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="fuelType" className="block font-semibold">Fuel Type:</label>
              <select {...register("fuelType", { required: true })} className="input input-bordered w-full">
                {/* Replace with your actual options */}
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Ford">Ford</option>
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
