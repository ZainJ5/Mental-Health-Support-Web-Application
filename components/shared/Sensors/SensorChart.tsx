'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from 'recharts';
  
  //@ts-ignore
  const SensorChart = ({data}) => {

    const formattedData = [
    { name: 'Stress', value: data.Stress },
    { name: 'Energy', value: data.Energy },
    { name: 'Happiness', value: data.Happiness },
    { name: 'Focus', value: data.Focus },
    { name: 'Calmness', value: data.Calmness }
    ];
  
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  };
  
  export default SensorChart;
  