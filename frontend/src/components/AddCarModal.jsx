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
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4">
            <label htmlFor="carName" className="block font-semibold">Car Name:</label>
            <input {...register("carName", { required: true })} type="text" className="input input-bordered w-full" />
            {errors.carName && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="engineType" className="block font-semibold">Engine Type:</label>
            <input {...register("engineType", { required: true })} type="text" className="input input-bordered w-full" />
            {errors.engineType && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="text-right">
            <button type="submit" className="btn btn-primary">Add</button>
            <button type="button" className="btn btn-primary ml-2" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCarModal;
