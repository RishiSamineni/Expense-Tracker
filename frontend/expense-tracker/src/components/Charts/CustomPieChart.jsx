import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip />} />
        <Legend content={CustomLegend} />
        {showTextAnchor && (
          <g>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#666"
              fontSize="14px"
              fontWeight="400"
              dy={-25}
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#333"
              fontSize="20px"
              fontWeight="600"
              dy={8}
            >
              {totalAmount}
            </text>
          </g>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
