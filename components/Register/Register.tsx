"use client"
import React, { useContext } from 'react'
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { setCookie } from 'cookies-next';


type UserDataType = {
  name: string,
  email: string,
  password: string
}

async function RegisterUser(data: UserDataType, setIsActive: any,  setIsPresent:any) {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    
    const resData = await response.json();
    if (resData?.status===200) {
      setCookie("user", resData?.message);
      setIsActive(false);
      setIsPresent(true);
      toast.success("User Registered Successfully");
    } else {
      toast.error(resData?.message);
    }
  } catch (errors) {
    console.log("Cannot Proceed To Register User Due To :-", errors);
    toast.error("Cannot Register User");
  }
}

function Register() {
  const { isActive, setIsActive }: any = useContext(GlobalContext);
  const {isPresent, setIsPresent}:any = useContext(GlobalContext);

  const form = useForm<UserDataType>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  const { register, handleSubmit, formState: { errors } } = form;
  return (
    <form
      onSubmit={handleSubmit((data) => RegisterUser(data, setIsActive, setIsPresent))}
      className='grid border-2 border-gray-300 p-2'>
      <label htmlFor="name">Enter Name</label>
      <input
        type="text"
        {...register("name", { required: true })}
        className='border-2 border-gray-300 p-1' />
      {errors?.name && <p className='text-[12px] text-red-500'>Name Is Required</p>}

      <label htmlFor="email">Enter Email</label>
      <input type="email"
        {...register("email", { required: true })}
        className='border-2 border-gray-300 p-1' />
      {errors?.email && <p className='text-[12px] text-red-500'>Email Is Required</p>}

      <label htmlFor="password">Enter Password</label>
      <input
        type="password"
        {...register("password", { required: true })}
        className='border-2 border-gray-300 p-1' />
      {errors?.password && <p className='text-[12px] text-red-500'>Password Is Required</p>}

      <button
        type='submit'
        className='bg-gray-300 p-2 mt-2 font-semibold'>Register</button>
    </form>
  )
}

export default Register