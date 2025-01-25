"use client"
import React, { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next'
import LogReg from '../LogReg/LogReg'

function Main() {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <div>

      <p>Please Login or Register</p>
      <button>Login/Register</button>
      <div className=''>
        <div>
          <LogReg />
        </div>
      </div>
    </div>
  )
}

export default Main