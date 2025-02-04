"use client"
import React, { useState, useEffect, useContext } from 'react'
import AddTask from '../AddTask/AddTask'
import { GlobalContext } from '../../GlobalContext/GlobalContext'
import { usePathname } from 'next/navigation'

type UserDataType = [{
    name: string,
    email: string,
    password: string
}]

type TasksDataType = [{
    _id: string,
    userId: string,
    taskName: string,
    date: string,
    steps: [string],
    notes: string,
    important: boolean,
    reminder: boolean,
    status: boolean,
}]

function Topbox({ setAF }: { setAF: React.Dispatch<React.SetStateAction<boolean>> }) {
    const pathname = usePathname();
    const { isDarkMode, setIsDarkMode }: any = useContext(GlobalContext);

    return (
        <div className={`w-full pt-12 px-3 ${isDarkMode === true ? "bg-gradient-to-b from-[#3579371A] to-[#02540a]" : "bg-gradient-to-b from-[#D0FFD21A] to-[#3579371A]"}`}>
            <p className={`${isDarkMode === true ? "text-white" : "text-[#1B281BB8]"}  font-semibold`}>{pathname==="/today" ? "Add A Task" : pathname==="/all-tasks" ? "View All Tasks" : "Important Tasks" }</p>
            <div className='flex justify-between items-center pt-12 pb-7 '>
                <div className='flex gap-x-7'>
                    <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_5_2269)">
                            <path
                                d="M21.6734 18.5534C21.0306 17.9802 20.4677 17.3232 20.0001 16.6C19.4891 15.6019 19.1831 14.5116 19.1001 13.3934V10.1C19.1045 8.34376 18.4675 6.64633 17.3086 5.32666C16.1498 4.007 14.5489 3.15592 12.8068 2.93335V2.07335C12.8068 1.83731 12.713 1.61093 12.5461 1.44402C12.3792 1.27712 12.1528 1.18335 11.9168 1.18335C11.6807 1.18335 11.4544 1.27712 11.2875 1.44402C11.1205 1.61093 11.0268 1.83731 11.0268 2.07335V2.94668C9.30029 3.1853 7.71876 4.04152 6.57513 5.35675C5.4315 6.67199 4.80327 8.35711 4.80678 10.1V13.3934C4.72382 14.5116 4.4178 15.6019 3.90678 16.6C3.44737 17.3216 2.89358 17.9785 2.26011 18.5534C2.189 18.6158 2.13201 18.6927 2.09293 18.7789C2.05384 18.8651 2.03357 18.9587 2.03345 19.0534V19.96C2.03345 20.1368 2.10369 20.3064 2.22871 20.4314C2.35373 20.5564 2.5233 20.6267 2.70011 20.6267H21.2334C21.4103 20.6267 21.5798 20.5564 21.7049 20.4314C21.8299 20.3064 21.9001 20.1368 21.9001 19.96V19.0534C21.9 18.9587 21.8797 18.8651 21.8406 18.7789C21.8016 18.6927 21.7446 18.6158 21.6734 18.5534ZM3.42011 19.2934C4.04024 18.694 4.58636 18.0226 5.04678 17.2934C5.69064 16.088 6.0659 14.7575 6.14678 13.3934V10.1C6.12034 9.31871 6.2514 8.54007 6.53214 7.81046C6.81289 7.08086 7.23759 6.41521 7.78095 5.85315C8.3243 5.2911 8.97521 4.84413 9.6949 4.53887C10.4146 4.2336 11.1884 4.07629 11.9701 4.07629C12.7519 4.07629 13.5256 4.2336 14.2453 4.53887C14.965 4.84413 15.6159 5.2911 16.1593 5.85315C16.7026 6.41521 17.1273 7.08086 17.4081 7.81046C17.6888 8.54007 17.8199 9.31871 17.7934 10.1V13.3934C17.8743 14.7575 18.2496 16.088 18.8934 17.2934C19.3539 18.0226 19.9 18.694 20.5201 19.2934H3.42011Z"
                                fill="currentColor"
                            />
                            <path
                                d="M12 22.8533C12.42 22.8436 12.823 22.6858 13.1378 22.4076C13.4525 22.1294 13.6588 21.7489 13.72 21.3333H10.2134C10.2764 21.7602 10.4923 22.1497 10.8209 22.4293C11.1496 22.7089 11.5686 22.8595 12 22.8533Z"
                                fill="currentColor"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_5_2269">
                                <rect width={24} height={24} fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                    <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15 4V2M15 4V6M15 4H10.5M3 10V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V10M3 10H21M3 10V6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4H7M21 10V6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4H18.5M7 2V6"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                {pathname === "/today" &&
                    <button
                        className={`${isDarkMode === true ? "bg-green-500 text-white" : "bg-[#35793729] text-[#357937]"} px-5 py-2 rounded-[10px] font-semibold`}
                        onClick={() => setAF(true)}>ADD TASK</button>
                }
            </div>
        </div>
    )
}

export default Topbox