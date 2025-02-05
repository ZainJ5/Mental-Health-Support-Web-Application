'use client';

import SensorChart from '@/components/shared/Sensors/SensorChart';
import { useState } from 'react';

const Dashboard = () => {
  const [data, setData] = useState({
    id: 1,
    Stress: 18,
    Energy: 36,
    Happiness: 6,
    Focus: 112,
    Calmness: 29
  });

  return (
    <div className="p-5 bg-gradient-to-br from-gray-200 via-white to-gray-300 min-h-screen">
      <h1 className="text-xl font-bold mb-5 text-center text-gray-800">
        Hello, This is your Mental Health Support Dashboard Overview
      </h1>
      <div className="flex flex-col ">
        <div className="flex space-x-4">
          <div className="col-span-1 w-[50%] h-56 md:col-span-2 bg-gradient-to-r from-blue-200 to-blue-100 shadow-xl rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">Weekly Overview</h2>
          </div>
          <div className="col-span-1 md:col-span-2 w-[50%] h-56 bg-gradient-to-r from-green-200 to-green-100 shadow-xl rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">Monthly Overview</h2>
          </div>
        </div>
        <div className="mt-6">
          <div className="col-span-3  bg-gradient-to-r from-purple-200 to-purple-100 shadow-xl rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">Progress Tracking</h2>
            <SensorChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
