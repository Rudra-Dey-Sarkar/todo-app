import React, { useState } from 'react'
import Register from '../Register/Register'
import Login from '../Login/Login'

function ControlLoginRegister(isLogin:boolean, setIsLogin: React.Dispatch<React.SetStateAction<boolean>>){
if(isLogin===false){
    setIsLogin(true);
}else{
    setIsLogin(false);
}
}

function LogReg() {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    return (
        <div>
            {isLogin === false ?
                <div className='grid gap-y-2'>
                    <Login />
                    <p>You don't have an account ? <button
                    onClick={()=>ControlLoginRegister(isLogin, setIsLogin)}
                    className='text-blue-600 font-semibold'>Register</button></p>
                </div>
                :
                <div className='grid gap-y-2'>
                    <Register />
                    <p>You already have an account ? <button
                    onClick={()=>ControlLoginRegister(isLogin, setIsLogin)}
                    className='text-blue-600 font-semibold'>Login</button></p>
                </div>}
        </div>
    )
}

export default LogReg