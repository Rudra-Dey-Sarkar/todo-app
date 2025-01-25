"use client"
import React, {useEffect} from 'react'
import { GlobalContextWrapper} from '../../GlobalContext/GlobalContext'
import ConnectDB from '../../actions/db';

function ClientLayout({ children }: { children: React.ReactNode }) {
    useEffect(()=>{
        ConnectDB();
    },[]);
    return (
        <GlobalContextWrapper>
            <div className='w-full h-[100vh]'>
                {children}
            </div>
        </GlobalContextWrapper>
    )
}

export default ClientLayout