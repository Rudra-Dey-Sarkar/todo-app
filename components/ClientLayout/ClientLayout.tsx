"use client"
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../GlobalContext/GlobalContext'
import ConnectDB from '../../actions/db';
import { Toaster } from 'react-hot-toast';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';

type UserDataType = [{
    name: string,
    email: string,
    password: string
  }]

function ClientLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isPresent, setIsPresent }: any = useContext(GlobalContext);
    const [user, setUser] = useState<UserDataType | any[]>([]);

    useEffect(() => {
        ConnectDB();
    }, []);


    useEffect(() => {
        const cookies = getCookie("user");

        if (cookies !== undefined && typeof cookies === "string") {
            const userCookieData = JSON.parse(cookies);
            setIsPresent(true);
            setUser(userCookieData);
            router.push("/today");
        } else {
            console.log("cookies not present");
            setIsPresent(false);
            router.push("/");
        }
    }, [isPresent]);

    return (
        <div className='w-full h-[100vh]'>
            <Toaster />
            {isPresent === true &&
                <Topbar />
            }
            <div className='flex'>
                {isPresent === true &&
                    <Sidebar user={user}/>
                }
                {children}
            </div>
        </div>
    )
}

export default ClientLayout