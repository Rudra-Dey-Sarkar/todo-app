"use client"
import React, { useContext } from 'react'
import { GlobalContext } from '../../GlobalContext/GlobalContext';

function Footer() {
    const { isDarkMode, setIsDarkMode }: any = useContext(GlobalContext);
    return (
        <div className={`flex justify-center items-center ${isDarkMode===true ? "bg-[#02540a] text-white" : "bg-[#EEF6EF]"}  px-2 py-3`}>
            <p className='font-semibold'> &copy; 2024 Rudra Dey Sarkar</p>
        </div>
    )
}

export default Footer