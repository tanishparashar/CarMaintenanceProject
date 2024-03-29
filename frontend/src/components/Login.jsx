import React from 'react';
import { useForm } from 'react-hook-form';

function Login({ onSubmit }) {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const otpSent = watch("otpSent");

  const onSubmitHandler = (data) => {
    console.log(data);
    onSubmit();
  };

  const handleSendOtp = () => {
    // Here you would send the OTP to the user's email
    // For now, let's just simulate sending OTP
    
    setValue("otpSent", true); 
  };

  return (
    <div className='container mx-auto flex flex-col items-center justify-center h-full'>
      <div className='font-bold text-3xl text-black text-center mb-4'>Login</div>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full max-w-md">
        { !otpSent && (<div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            className={`input input-bordered w-full bg-gray-200 text-black px-4 py-2 rounded ${errors.name ? 'border-red-500' : ''}`}
            {...register('name', { required: true })}
          />
          {errors.name && <p className="text-red-500 font-semibold text-sm mt-1">Name is required</p>}
        </div>)}
        { !otpSent && (<div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className={`input input-bordered w-full bg-gray-200 text-black px-4 py-2 rounded ${errors.email ? 'border-red-500' : ''}`}
            {...register('email', { required: true })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
          <p className="text-sm text-gray-500 mt-1">OTP will be sent to the provided email</p>
        </div>)}
        {otpSent && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className={`input input-bordered w-full bg-gray-200 text-black px-4 py-2 rounded ${errors.otp ? 'border-red-500' : ''}`}
              {...register('otp', { required: true })}
            />
            {errors.otp && <p className="text-red-500 text-sm mt-1 font-semibold">OTP is required</p>}
          </div>
        )}
        {otpSent && (
          <button type="submit" className="btn btn-primary w-full max-w-md font-semibold py-2 rounded">Verify OTP</button>
        )}
        {!otpSent && (
          <button type="button" className="btn btn-primary w-full max-w-md font-semibold py-2 rounded" onClick={handleSendOtp}>Send OTP</button>
        )}
      </form>
    </div>
  );
}

export default Login;
