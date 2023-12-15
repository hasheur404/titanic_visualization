import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const GraphComponent: React.FC<{ data: { age: number }[] }> = ({ data }) => {
  return (
    <div style={{ width: '1000px', height: '500px', margin: 'auto' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            bottom: 20,
            left: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="age" />
          <YAxis type="number" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="age" stroke="#8884d8" name="Age" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphComponent;
