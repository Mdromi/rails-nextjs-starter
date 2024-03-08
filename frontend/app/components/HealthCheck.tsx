"use client";
import axios from 'axios';
import { useState } from 'react';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Define a function to check the health of the backend
const checkBackendHealth = async () => {
  try {
    // Make a GET request to the health endpoint
    const response = await axios.get(`${apiUrl}/health`);
    // Return the response data
    return response.data;
  } catch (error) {
    // Log any errors
    console.error('Error checking backend health:', error);
    // Return an object with an error message
    return { error: 'An error occurred while checking the backend health.' };
  }
};

// Example component
const HealthCheckComponent: React.FC = () => {
  // Define state to store health status
  const [healthStatus, setHealthStatus] = useState<any | null>(null);
  // Define state to track whether the button has been clicked
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  // Define a function to handle the health check
  const handleCheckHealth = async () => {
    // Call the checkBackendHealth function
    const status = await checkBackendHealth();
    // Update state with health status
    setHealthStatus(status);
    // Update state to indicate button clicked
    setButtonClicked(true);
  };

  return (
    <div className="bg-gray-900 bg-opacity-80 border border-gray-700 rounded-lg p-6 max-w-md mx-auto mt-4 text-center">
      <h1 className="text-2xl font-bold text-white mb-4">Health Check</h1>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        onClick={handleCheckHealth}
      >
        Check Backend Health
      </button>
      {/* Render health status or error message */}
      {buttonClicked && (
        <div className="text-white mt-4">
          {healthStatus?.error ? (
            <span className="text-red-500">&#x2022; {healthStatus.error}</span>
          ) : (
            <span className="text-green-500">&#x2022; {healthStatus?.message}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default HealthCheckComponent;
