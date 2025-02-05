'use client';

import React, { useState } from 'react';

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

  const handleChange = (e: any) => {
    setMoodData({ ...moodData, [e.target.name]: e.target.value });
  };

  return (
    <div className="">
      <div className="bg-black text-white p-6 w-[900px] mx-auto mt-10 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Mood Logger</h1>
        <p className="mb-4">How do you feel today?</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block">Stress</label>
            <input
              type="range"
              name="stress"
              min="0"
              max="100"
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <label className="block">Happiness</label>
            <input
              type="range"
              name="happiness"
              min="0"
              max="100"
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <label className="block">Energy</label>
            <input
              type="range"
              name="energy"
              min="0"
              max="100"
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <label className="block">Focus</label>
            <input
              type="range"
              name="focus"
              min="0"
              max="100"
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <label className="block">Calmness</label>
            <input
              type="range"
              name="calmness"
              min="0"
              max="100"
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            placeholder="How are you feeling today?"
            className="w-full p-2 bg-gray-800 rounded"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Date</label>
          <input
            type="date"
            name="date"
            className="p-2 bg-gray-800 rounded w-full"
            onChange={handleChange}
          />
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 rounded py-2">
          Log Mood
        </button>
      </div>
    </div>
  );
};

export default MoodTracking;
