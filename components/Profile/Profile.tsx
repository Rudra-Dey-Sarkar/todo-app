"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { getCookie } from 'cookies-next';
import { GlobalContext } from '../../GlobalContext/GlobalContext';

type UserDataType = [{
    picUrl: string,
    name: string,
    email: string,
    password: string
}]

function Profile() {
    const { isPresent, setIsPresent }: any = useContext(GlobalContext);
    const [user, setUser] = useState<UserDataType | any[]>([]);

    useEffect(() => {
        const cookies = getCookie("user");

        if (cookies !== undefined && typeof cookies === "string") {
            const userCookieData = JSON.parse(cookies);
            setUser(userCookieData);
        } else {
            console.log("cookies not present");
        }
    }, [isPresent]);
    return (
        <div className='grid w-full h-full justify-center items-center'>
            <img
                src={user.length > 0 ? user[0]?.picUrl : "#"}
                alt="picture"
                className=' p-1 w-[200px] h-[200px] border-2 border-gray-500' />

                <p className='text-[1.2rem] font-semibold'>{user[0]?.name}</p>
                <p className='text-[1.2rem] font-semibold'>{user[0]?.email}</p>
                <p className='text-[1.2rem] font-semibold'>{user[0]?.password}</p>
        </div>
    )
}

export default Profile