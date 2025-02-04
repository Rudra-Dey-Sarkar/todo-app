"use client"
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../GlobalContext/GlobalContext'
import { Toaster } from 'react-hot-toast';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import Footer from '../Footer/Footer';

type UserDataType = [{
    picUrl: string,
    name: string,
    email: string,
    password: string
}]

function ClientLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isPresent, setIsPresent }: any = useContext(GlobalContext);
    const { isDarkMode, setIsDarkMode }: any = useContext(GlobalContext);
    const [user, setUser] = useState<UserDataType | any[]>([]);

    useEffect(() => {
        const cookies = getCookie("user");

        if (cookies !== undefined && typeof cookies === "string") {
            const userCookieData = JSON.parse(cookies);
            setIsPresent(true);
            console.log(userCookieData);
            setUser(userCookieData);
            router.push("/today");
        } else {
            console.log("cookies not present");
            setIsPresent(false);
            router.push("/");
        }
    }, [isPresent]);

    return (
        <div className={`w-full h-full ${isDarkMode===true?"bg-black":"currentColor"}`}>
            <Toaster />
            {isPresent === true &&
                <Topbar />
            }
            <div className='flex w-full min-h-[100vh]'>
                {isPresent === true &&
                    <Sidebar user={user} />
                }
                {children}
            </div>
            {isPresent === true &&
                <Footer />
            }
        </div>
    )
}

export default ClientLayout