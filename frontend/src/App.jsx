import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout.jsx';
import Hero from './Pages/Hero.jsx';
import ViewCar from './Pages/ViewCar.jsx';
import Settings from './Pages/Settings.jsx';
import CarProvider from './components/CarContext.jsx';
import Profile from './Pages/Profile.jsx';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '', element: <Hero /> }, // Render Hero only at root path
        { path: 'viewcar', element: <ViewCar /> },
        { path: 'settings', element: <Settings /> },
        { path: 'profile', element: <Profile /> },
      ],
    },
  ]
);

function App() {
  return (
    <CarProvider>
      <RouterProvider router={router} />
    </CarProvider>
  );
}

export default App; // Export the App component as the default export
