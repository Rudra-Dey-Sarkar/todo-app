"use client"
import React,{createContext, useEffect, useState} from 'react'
import { json } from 'stream/consumers';

const GlobalContext = createContext< any | undefined>(undefined);

const GlobalContextWrapper = ({children}:any)=> {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPresent, setIsPresent] = useState<boolean>(false);
    const [sidebar, setSidebar] = useState<boolean>(true);

    useEffect(() => {

        if (typeof window !== "undefined") {
          const savedIsActive = localStorage.getItem("active");
          const savedIsPresent = localStorage.getItem("present");
          const savedSidebar = localStorage.getItem("sidebar");
          if (savedIsActive) {
            setIsActive(JSON.parse(savedIsActive));
          }
          if(savedIsPresent){
            setIsPresent(JSON.parse(savedIsPresent));
          }
          if(savedSidebar){
            setSidebar(JSON.parse(savedSidebar));
          }
        }

      }, []);
  return (
    <GlobalContext.Provider value={{isActive, setIsActive, isPresent, setIsPresent, sidebar, setSidebar}}>
        {children}
    </GlobalContext.Provider>
  )
}

export {GlobalContextWrapper, GlobalContext}