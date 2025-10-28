import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from 'recharts';
import Data from "../../DataStore/DataStore.json";

const AnalyticsChart = () => {
  const monthlyData = Object.entries(Data.admins[0].revenue_details.monthly).map(([month, detail]) => ({
    month,
    total: detail.total
  }));
  console.log(monthlyData)

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#4f46e5" name="Total Revenue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
