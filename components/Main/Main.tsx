"use client"
import React, { useState, useEffect, useContext } from 'react'
import LogReg from '../LogReg/LogReg'
import { GlobalContext } from '../../GlobalContext/GlobalContext';


function Main() {
  const { isActive, setIsActive }: any = useContext(GlobalContext);

  return (
    <div>
      <p>Please Login or Register</p>
      <button onClick={() => setIsActive(true)}>Login/Register</button>

      {isActive === true &&
        <div
          className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50'
          onClick={() => setIsActive(false)}>
          <div
            className='bg-white p-5 rounded-md shadow-lg'
            onClick={(e) => e.stopPropagation()}>
            <LogReg />
          </div>
        </div>
      }
    </div>
  )
}

export default Main