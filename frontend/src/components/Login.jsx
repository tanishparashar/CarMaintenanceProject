import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios



function Login({ onSubmit,onCreateAccountClick }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmitHandler = async (data) => {
    console.log(data);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/login/', data);
      console.log(response);
      localStorage.setItem("token", response.data.token);
      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container mx-auto flex flex-col items-center justify-center h-full'>
      <div className='font-bold text-3xl text-black text-center mb-4'>Login</div>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full max-w-md">
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className={`input input-bordered w-full bg-gray-200 text-black px-4 py-2 rounded ${errors.email ? 'border-red-500' : ''}`}
            {...register('email', { required: true })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className={`input input-bordered w-full bg-gray-200 text-black px-4 py-2 rounded ${errors.password ? 'border-red-500' : ''}`}
            {...register('password', { required: true })}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}
        </div>
        <button type="submit" className="btn btn-primary w-full max-w-md font-semibold py-2 rounded">Login</button>
      </form>
      <div className="mt-4">
      {/* <Link to="/signup" className="text-blue-500 hover:underline">Create account</Link> */}
      <Link onClick={onCreateAccountClick} className="text-blue-500 hover:underline">Create account</Link>
    </div>
    </div>
  );
}

export default Login;