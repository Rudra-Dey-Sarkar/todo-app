"use client"
import React, { useState, useEffect, useContext } from 'react'
import LogReg from '../LogReg/LogReg'
import { GlobalContext } from '../../GlobalContext/GlobalContext';

function Main() {
  const { isActive, setIsActive }: any = useContext(GlobalContext);
  const { isDarkMode, setIsDarkMode }: any = useContext(GlobalContext);
  return (
    <div className={`grid w-full h-[100vh] justify-center items-center ${isDarkMode===true?"text-white":"text-black"}`}>
      <div className={`grid justify-center items-center gap-y-5 w-fit h-fit border-4 ${isDarkMode===true ? "border-[#02540a]" : "border-[#35793729]"} p-5 rounded-[10px]`}>
        <div className='flex items-center'>
          <svg
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            width="70px"
            height="70px"
            fill="#000000">
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              <path
                style={{
                  fill: "#3F9142",
                }}
                d="M413.318,303.035c0,113.956-92.714,206.659-206.659,206.659C92.704,509.694,0,416.99,0,303.035 C0,189.089,92.704,96.376,206.659,96.376C320.605,96.376,413.318,189.089,413.318,303.035z"
              />
              <g>
                <path
                  style={{
                    fill: "#FFFFFF",
                  }}
                  d="M206.659,138.392c-90.787,0-164.641,73.855-164.641,164.641s73.855,164.641,164.641,164.641 c90.777,0,164.641-73.855,164.641-164.641S297.436,138.392,206.659,138.392z M206.659,438.07 c-74.463,0-135.035-60.583-135.035-135.035s60.572-135.035,135.035-135.035c74.453,0,135.025,60.583,135.025,135.035 S281.112,438.07,206.659,438.07z"
                />
                <path
                  style={{
                    fill: "#FFFFFF",
                  }}
                  d="M206.659,211.71c-50.362,0-91.324,40.963-91.324,91.324s40.963,91.324,91.324,91.324 c50.352,0,91.325-40.963,91.325-91.324S257.011,211.71,206.659,211.71z M206.659,364.753c-34.027,0-61.718-27.691-61.718-61.718 s27.691-61.718,61.718-61.718s61.718,27.691,61.718,61.718S240.686,364.753,206.659,364.753z"
                />
              </g>
              <path
                style={{
                  fill: "#3F9142",
                }}
                d="M413.318,303.035c0,113.956-92.714,206.659-206.659,206.659V96.376 C320.605,96.376,413.318,189.089,413.318,303.035z"
              />
              <g>
                <path
                  style={{
                    fill: "#FFFFFF",
                  }}
                  d="M297.984,303.035c0,50.361-40.973,91.324-91.325,91.324v-29.607 c34.027,0,61.718-27.691,61.718-61.718s-27.691-61.718-61.718-61.718v-29.607C257.011,211.71,297.984,252.672,297.984,303.035z"
                />
                <path
                  style={{
                    fill: "#FFFFFF",
                  }}
                  d="M371.3,303.035c0,90.787-73.865,164.641-164.641,164.641v-29.607 c74.453,0,135.025-60.583,135.025-135.035s-60.572-135.035-135.025-135.035v-29.607C297.436,138.392,371.3,212.247,371.3,303.035z"
                />
              </g>
              <polygon
                style={{
                  fill: "#ffc370",
                }}
                points="512,76.431 313.573,274.859 206.671,307.615 206.656,307.629 239.448,200.72 383.52,56.663 437.877,2.306 "
              />
              <polygon
                style={{
                  fill: "#ffc370",
                }}
                points="512,76.431 313.573,274.859 206.671,307.615 474.927,39.358 "
              />
              <polygon
                style={{
                  fill: "#FFDBA8",
                }}
                points="313.58,274.858 313.575,274.863 238.467,297.876 206.671,307.62 206.654,307.625 216.413,275.824 239.448,200.726 "
              />
              <polygon
                style={{
                  fill: "#FFDBA8",
                }}
                points="313.58,274.858 313.575,274.863 238.467,297.876 206.671,307.62 276.506,237.784 "
              />
              <polygon
                style={{
                  fill: "#FFFFFF",
                }}
                points="238.467,297.876 206.671,307.62 206.654,307.625 216.413,275.824 "
              />
              <rect
                x={413.427}
                y={12.437}
                transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 813.1192 -207.1051)"
                style={{
                  fill: "#3F9142",
                }}
                width={72.052}
                height={104.826}
              />
              <rect
                x={415.977}
                y={30.23}
                transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 795.3254 -164.1483)"
                style={{
                  fill: "#FFFFFF",
                }}
                width={31.363}
                height={104.826}
              />
              <rect
                x={431.959}
                y={57.154}
                transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 857.8501 -188.5973)"
                style={{
                  fill: "#3F9142",
                }}
                width={72.052}
                height={52.429}
              />
              <polygon
                style={{
                  fill: "#FFFFFF",
                }}
                points="227.44,286.85 238.467,297.876 206.671,307.62 "
              />
              <rect
                x={434.507}
                y={74.955}
                transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 840.0579 -145.6249)"
                style={{
                  fill: "#FFFFFF",
                }}
                width={31.363}
                height={52.429}
              />
            </g>
          </svg>
          <p className='text-[#3F9142] font-bold text-[2rem]'>GoalFocusedMind</p>
        </div>
        <p className={`${isDarkMode===true?"text-white":"text-black"} text-center font-semibold`}>Plan smarter, work better, stay productive!</p>
        <div className='grid justify-center items-center gap-y-5 w-fit h-fit m-auto bg-[#EEF6EF] p-5 '>
          <p className='w-fit text-[1.2rem] font-bold text-black'>Please Login or Register</p>
          <button
            onClick={() => setIsActive(true)}
            className='border-2 border-[#35793729] w-fit h-fit m-auto py-1 px-4 rounded-[10px] shadow-[0px_0px_5px_5px_green] font-semibold hover:scale-105 text-black'>Login/Register</button>

          {isActive === true &&
            <div
              className='fixed inset-0 flex justify-center items-center bg-black text-black bg-opacity-50 z-50'
              onClick={() => setIsActive(false)}>
              <div
                className='bg-white p-5 rounded-md shadow-lg'
                onClick={(e) => e.stopPropagation()}>
                <LogReg />
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Main