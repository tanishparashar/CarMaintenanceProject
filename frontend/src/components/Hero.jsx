import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login'; // Import the Login component

const Hero = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Track login status

  const toggleLogin = () => {
    if (loggedIn) {
      setLoggedIn(false); // If logged in, set loggedIn state to false (Logout clicked)
    } else {
      setShowLogin(!showLogin); // Toggle the showLogin state
    }
  };

  const handleLoginSubmit = () => {
    // Here you would handle successful login
    setLoggedIn(true); // Set login status to true
    toggleLogin();
    console.log('Login successful!');
  };

  return (
    <>
      <div className='flex flex-wrap w-screen '>
        <div className="navbar-start bg-inherit text-white w-full fixed top-0 z-50">
          <div className="container mx-auto py-4 flex items-center justify-between">
            <a className="text-xl font-bold cursor-pointer">Logo and text</a>
            {loggedIn ? (
              <button className="btn btn-primary font-semibold cursor-pointer " onClick={toggleLogin}>Logout</button>
            ) : (
              <button className="btn btn-primary font-semibold cursor-pointer " onClick={toggleLogin}>Login</button>
            )}
          </div>
        </div>
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(/hero-img.jpg)' }}>
          {showLogin && (
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"></div>
          )}
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl text-white font-bold">Hello there</h1>
              {loggedIn && ( // Render "View Cars" button if logged in
                <Link to="ViewCar">
                  <button className="btn btn-primary font-semibold cursor-pointer ">View Cars</button>
                </Link>
              )}
              {!loggedIn && ( // Render the login button if not logged in
                <button className="btn btn-primary font-semibold cursor-pointer " onClick={toggleLogin}>Login</button>
              )}
            </div>
          </div>
        </div>
      </div>
      {showLogin && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            {/* Render the Login component here */}
            <Login onSubmit={handleLoginSubmit} />
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
