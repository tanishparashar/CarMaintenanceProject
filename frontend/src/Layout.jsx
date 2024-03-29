import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();

  // Check if the current path is the root path ("/")
  const isRootPath = location.pathname === '/';

  return (
    <>
      {!isRootPath && <Header />} {/* Conditionally render Header */}
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
