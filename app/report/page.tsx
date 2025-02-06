'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
import Cookies from 'js-cookie';

interface MoodData {
  name: string;
  stress: number;
  happiness: number;
  energy: number;
  focus: number;
  calmness: number;
  description: string;
  date: string;
  doctor: string;
}

const Report: React.FC = () => {
  const [moodData, setMoodData] = useState<MoodData>({
    name: 'John Doe',
    stress: 50,
    happiness: 75,
    energy: 40,
    focus: 60,
    calmness: 80,
    description: 'Patient is feeling good but reports being a bit stressed.',
    date: new Date().toLocaleDateString(),
    doctor: 'Dr. Jane Smith'
  });

  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedSettings = Cookies.get('user-settings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setDarkMode(settings.darkMode);
      } catch (e) {
        console.error('Error parsing settings from cookie:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderProgressBar = (value: number, color: string): JSX.Element => (
    <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
      <div
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
      <Card className={`max-w-4xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <CardHeader className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} pb-6`}>
          <div className="flex flex-col items-center justify-center mb-4">
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'} p-4 rounded-full shadow-md mb-4`}>
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <img
                  src="data:image/png;base64,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"
                  alt="Hospital Logo"
                  width={50}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <CardTitle className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Mental Health Clinic Report
            </CardTitle>
          </div>
          <div className={`flex justify-center space-x-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <span>Confidential</span>
            <span>•</span>
            <span>Patient Assessment</span>
            <span>•</span>
            <span>{moodData.date}</span>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-100'} border rounded-lg p-6 mb-8`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Patient Name</label>
                <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{moodData.name}</p>
              </div>
              <div className="space-y-2">
                <label className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Report Date</label>
                <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{moodData.date}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Mood Assessment</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Stress Level</span>
                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{moodData.stress}%</span>
                  </div>
                  {renderProgressBar(moodData.stress, 'bg-red-500')}
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Happiness</span>
                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{moodData.happiness}%</span>
                  </div>
                  {renderProgressBar(moodData.happiness, 'bg-green-500')}
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Energy</span>
                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{moodData.energy}%</span>
                  </div>
                  {renderProgressBar(moodData.energy, 'bg-yellow-500')}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Focus</span>
                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{moodData.focus}%</span>
                  </div>
                  {renderProgressBar(moodData.focus, 'bg-blue-500')}
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Calmness</span>
                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{moodData.calmness}%</span>
                  </div>
                  {renderProgressBar(moodData.calmness, 'bg-purple-500')}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Clinical Notes</h3>
            </div>
            <div className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'} border rounded-lg p-6`}>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{moodData.description}</p>
            </div>
          </div>

          <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'} pt-6 mt-8`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Attending Physician</label>
                <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{moodData.doctor}</p>
              </div>
              <div className="space-y-2">
                <label className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Digital Signature</label>
                <div className={`h-12 border-b-2 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}></div>
              </div>
            </div>
          </div>
        </CardContent>

        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} px-6 py-4 rounded-b-lg`}>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center`}>
            This is a confidential report generated by the Mental Health Clinic.
            Please handle with appropriate privacy and security measures.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Report;