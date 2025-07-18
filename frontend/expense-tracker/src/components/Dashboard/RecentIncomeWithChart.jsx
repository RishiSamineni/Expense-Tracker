import React from 'react';
import { useState, useEffect } from "react";
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#1d8af0", "#FA2C37", "#FF6900", "#0519ff"]


const RecentIncomeWithChart = ({data, totalIncome}) => {

    console.log("Incoming props.data:", data);

    const [chartData, setChartData] = useState([]);
    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount,
        }));

        setChartData(dataArr);
    };

    useEffect(() => {
        prepareChartData();
        console.log("Chart Input Data:", data);
        return () => {};
    }, [data]);


  return (
    <div className='card'>
        <div className='flex items-center justify-center'>
            <h5 className='text-lg'>Last 60 Days Income</h5>
        </div>
        <CustomPieChart data={chartData} label="Total Income" totalAmount={`₹${totalIncome}`} colors={COLORS} showTextAnchor />
    </div>
  )
}

export default RecentIncomeWithChart