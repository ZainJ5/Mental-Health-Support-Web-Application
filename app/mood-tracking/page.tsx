'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const MoodTracking = () => {
  const [moodData, setMoodData] = useState({
    stress: 0,
    happiness: 0,
    energy: 0,
    focus: 0,
    calmness: 0,
    description: '',
    date: ''
  });

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedSettings = Cookies.get('user-settings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setDarkMode(settings.darkMode);
      } catch (error) {
        console.error('Error parsing user settings cookie:', error);
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMoodData({ ...moodData, [e.target.name]: e.target.value });
  };

  return (
    <div className="px-4 py-6">
      {darkMode && (
        <style jsx global>{`
          input[type='date']::-webkit-calendar-picker-indicator {
            filter: invert(1);
          }
        `}</style>
      )}
      <div
        className={`
          max-w-4xl w-full mx-auto mt-10 rounded-lg shadow-lg 
          ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}
          p-6 transition-colors duration-300
        `}
      >
        <h1 className="text-3xl font-bold mb-4">Mood Logger</h1>
        <p className="mb-6 text-lg">How do you feel today?</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {[
            { label: 'Stress', name: 'stress', value: moodData.stress },
            { label: 'Happiness', name: 'happiness', value: moodData.happiness },
            { label: 'Energy', name: 'energy', value: moodData.energy },
            { label: 'Focus', name: 'focus', value: moodData.focus },
            { label: 'Calmness', name: 'calmness', value: moodData.calmness }
          ].map((item) => (
            <div key={item.name}>
              <label className="block font-medium mb-1">{item.label}</label>
              <div className="flex items-center">
                <input
                  type="range"
                  name={item.name}
                  min="0"
                  max="100"
                  value={item.value}
                  onChange={handleChange}
                  className="w-full accent-blue-600"
                />
                <span className="ml-2 font-semibold">{item.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-2">Description</label>
          <textarea
            name="description"
            placeholder="How are you feeling today?"
            value={moodData.description}
            onChange={handleChange}
            className={`
              w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100' 
                : 'bg-gray-100 border-gray-300 text-gray-900'
              }
            `}
            rows={4}
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={moodData.date}
            onChange={handleChange}
            className={`
              w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100' 
                : 'bg-gray-100 border-gray-300 text-gray-900'
              }
            `}
          />
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded transition duration-200"
          // onClick handler here 
        >
          Log Mood
        </button>
      </div>
    </div>
  );
};

export default MoodTracking;
