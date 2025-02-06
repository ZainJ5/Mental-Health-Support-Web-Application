'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import SensorChart from '@/components/shared/Sensors/SensorChart';

const Dashboard = () => {
  const [data, setData] = useState({
    id: 1,
    Stress: 18,
    Energy: 36,
    Happiness: 6,
    Focus: 112,
    Calmness: 29
  });

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedSettings = Cookies.get('user-settings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setDarkMode(settings.darkMode);
      } catch (error) {
        console.error('Error parsing settings from cookie:', error);
      }
    }
  }, []);

  return (
    <div
      className={`p-5 min-h-screen transition-colors duration-300 ${
darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
      }`}
    >
      <h1
        className={`text-xl font-bold mb-5 text-center transition-colors duration-300 ${
          darkMode ? 'text-gray-100' : 'text-gray-800'
        }`}
      >
        Hello, This is your Mental Health Support Dashboard Overview
      </h1>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div
            className={`w-full md:w-1/2 h-56 shadow-xl rounded-lg p-8 transition-colors duration-300 ${
              darkMode
                ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white'
                : 'bg-gradient-to-r from-blue-200 to-blue-100 text-gray-800'
            }`}
          >
            <h2 className="text-xl font-bold mb-4">Weekly Overview</h2>
          </div>
          <div
            className={`w-full md:w-1/2 h-56 shadow-xl rounded-lg p-8 transition-colors duration-300 ${
              darkMode
                ? 'bg-gradient-to-r from-green-900 to-green-800 text-white'
                : 'bg-gradient-to-r from-green-200 to-green-100 text-gray-800'
            }`}
          >
            <h2 className="text-xl font-bold mb-4">Monthly Overview</h2>
          </div>
        </div>
        <div
          className={`w-full shadow-xl rounded-lg p-8 transition-colors duration-300 ${
            darkMode
              ? 'bg-gradient-to-r from-purple-900 to-purple-800 text-white'
              : 'bg-gradient-to-r from-purple-200 to-purple-100 text-gray-800'
          }`}
        >
          <h2 className="text-xl font-bold mb-4">Progress Tracking</h2>
          <SensorChart data={data} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
