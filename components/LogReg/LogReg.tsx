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
                <div>
                    <Login />
                    <p>You don't have an account ? <button
                    onClick={()=>ControlLoginRegister(isLogin, setIsLogin)}
                    >Register</button></p>
                </div>
                :
                <div>
                    <Register />
                    <p>You already have an account ? <button
                    onClick={()=>ControlLoginRegister(isLogin, setIsLogin)}
                    >Login</button></p>
                </div>}
        </div>
    )
}

export default LogReg