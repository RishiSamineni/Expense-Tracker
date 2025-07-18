import React from 'react';
import CARD_2 from "../../assets/images/card2.jpg";
import { LuTrendingUpDown } from "react-icons/lu";

export const AuthLayout = ({ children }) => {
  return (
    <div className='flex'>
        <div className='w-screen h-screen nd:w-[60vw] px-12 pt-8 pb-12'>
            <h2 className='text-lg font-bold text-blue-500'>TrackMyExpense</h2>
            {children}
        </div>
        <div className="hidden md:block w-[40vw] h-screen bg-blue-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative ">
            <div className='w-48 h-48 rounded-[40px] bg-blue-500 absolute -top-7 -left-5' /> 
            <div className="w-48 h-56 rounded-[40px] border-[20px] border-blue-900 absolute top-[30%] -right-10" />
            <div className="w-48 h-48 rounded-[40px] bg-blue-700 absolute -bottom-7 -left-5" />

            <div className='grid grid-cols-1 z-20'>
                <StatusInfoCard icon={<LuTrendingUpDown />} label="Track Your Income and Expenses" value="4,75,000" color="bg-primary" />
            </div>

            <img src={CARD_2} alt="" className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15 " style={{ borderRadius: "7%" }} />
        </div>
    </div>
  )
}

export default AuthLayout

const StatusInfoCard = ({ icon, label, value, color }) => {
    return (
        
        <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-blue-400/10 border border-gray-200/50 z-10">
            <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
                {icon}
            </div>
            <div>
                <h5 className='text-xs text-gray-500 mb-1'>{label}</h5>
                <span className='text-[20px] font-semibold'>₹{value}</span>
            </div>
        </div>

    )
}