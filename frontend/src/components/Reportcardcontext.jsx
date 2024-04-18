import React, { useState, createContext, useContext } from 'react';

// Create a new context
const ReportCountContext = createContext();

// Define a context provider component
export const ReportCountProvider = ({ children }) => {
  const [reportCount, setReportCount] = useState(0);

  // Function to update the report count
  const updateReportCount = (newCount) => {
    setReportCount(newCount);
  };

  return (
    <ReportCountContext.Provider value={{ reportCount, updateReportCount }}>
      {children}
    </ReportCountContext.Provider>
  );
};

// Custom hook to access the report count and its updater function
export const useReportCount = () => {
  return useContext(ReportCountContext);
};
