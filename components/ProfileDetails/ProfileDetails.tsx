"use client"
import React from 'react'
import { UseFormReturn } from 'react-hook-form';


type UserDataType = {
    picUrl:string,
    name: string,
    email: string,
    password: string
  }

function ProfileDetails({form}:{form:UseFormReturn<UserDataType, any, undefined>}) {

  const { register, formState: { errors } } = form;
  return (
    <form className='grid border-2 border-gray-300 p-2'>

      <label htmlFor="name">Enter Name</label>
      <input
        type="text"
        {...register("name", { required: true })}
        className='border-2 border-gray-300 p-1' />

      <label htmlFor="email">Enter Email</label>
      <input type="email"
        {...register("email", { required: true })}
        className='border-2 border-gray-300 p-1' />

      <label htmlFor="password">Enter Password</label>
      <input
        type="password"
        {...register("password", { required: true })}
        className='border-2 border-gray-300 p-1' />
    </form>
  )
}

export default ProfileDetails