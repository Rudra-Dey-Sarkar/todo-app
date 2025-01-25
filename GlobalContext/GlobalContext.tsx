"use client"
import React,{createContext, useEffect, useState} from 'react'

const GlobalContext = createContext< any | undefined>(undefined);

const GlobalContextWrapper = ({children}:any)=> {
    const [test, setTest]= useState<string>("test");

    useEffect(() => {

        if (typeof window !== "undefined") {
          const savedTest = localStorage.getItem("test");
          if (savedTest) {
            setTest(savedTest);
          }
        }

      }, []);
  return (
    <GlobalContext.Provider value={{test, setTest}}>
        {children}
    </GlobalContext.Provider>
  )
}

export {GlobalContextWrapper, GlobalContext}