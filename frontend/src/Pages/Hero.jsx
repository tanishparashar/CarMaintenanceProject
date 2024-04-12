import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login'; // Import the Login component
import Signup from '../components/Signup'; // Import the Login component
import axios from 'axios'; // Import axios


const Hero = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Track login status
  const [showSignup, setShowSignup] = useState(false);

  
  
  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    if (token) {
      setLoggedIn(true); // If a token exists, set loggedIn to true
    }
  }, []);
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      await axios.post('http://127.0.0.1:8000/api/users/logout/', {}, 
      {
        headers: { Authorization: `Token ${token}` } // Create an Authorization header with the token
      }
      ); // Pass the config object as the third argument to axios.post
      setLoggedIn(false); // Set login status to false
      localStorage.removeItem('token');
      toggleLogin();
      console.log('Logout successful!');
    } catch (error) {
      console.error(error);
    }
  };
  
  const toggleLogin = () => {
    if (loggedIn) {
      setLoggedIn(false); // If logged in, set loggedIn state to false (Logout clicked)
    } else {
      setShowLogin(!showLogin); // Toggle the showLogin state
    }
  };

  const handleCreateAccountClick = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleLoginSubmit = () => {
    // Here you would handle successful login
    setLoggedIn(true); // Set login status to true
    toggleLogin();
    console.log('Login successful!');
  };

  const handleSignupSubmit = () => {
    // Here you would handle successful signup
    // setLoggedIn(true); // Set login status to true
    setShowSignup(false); // Hide the Signup component
    console.log('Signup successful!');
  };



  return (
    <>
      <div className='flex flex-wrap w-screen '>
        <div className="navbar-start bg-inherit text-white w-full fixed top-0 z-50">
          <div className="container mx-auto py-4 flex items-center justify-between">
            <a className="text-xl font-bold cursor-pointer">Logo and text</a>
            {loggedIn ? (
              <button className="btn btn-primary font-semibold cursor-pointer " onClick={handleLogout}>Logout</button>
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
              
            </div>
          </div>
        </div>
      </div>
      {showLogin && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            {/* Render the Login component here */}
            {/* <Login onSubmit={handleLoginSubmit} /> */}
            <Login onSubmit={handleLoginSubmit} onCreateAccountClick={handleCreateAccountClick} />
          </div>
        </div>
      )}
      {showSignup && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded shadow-lg">
      <Signup onSubmit={handleSignupSubmit} />
    </div>
  </div>
)}
    </>
  );
};

export default Hero;
