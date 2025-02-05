'use client'

import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    emailUpdates: false,
    locationAccess: false,
    accountPrivacy: false
  });

  const handleChange = (event:any) => {
    const { name, checked } = event.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: checked
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-white">
      <div className="bg-white p-8 -mt-20  bg-gradient-to-r from-gray-300 to-white rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-xl font-bold text-gray-800 mb-6">Settings</h1>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <span>Enable Notifications</span>
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
              className="toggle"
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <input
              type="checkbox"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleChange}
              className="toggle"
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Email Updates</span>
            <input
              type="checkbox"
              name="emailUpdates"
              checked={settings.emailUpdates}
              onChange={handleChange}
              className="toggle"
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Location Access</span>
            <input
              type="checkbox"
              name="locationAccess"
              checked={settings.locationAccess}
              onChange={handleChange}
              className="toggle"
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Account Privacy</span>
            <input
              type="checkbox"
              name="accountPrivacy"
              checked={settings.accountPrivacy}
              onChange={handleChange}
              className="toggle"
            />
          </div>
        </div>
        <button
          onClick={() => alert("Settings Saved!")}
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
