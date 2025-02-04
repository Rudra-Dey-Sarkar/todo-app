"use client"
import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form';


type UserDataType = {
  picUrl: string,
  name: string,
  email: string,
  password: string
}
function ControlVisible(isVisible: boolean, setIsVisible: React.Dispatch<React.SetStateAction<boolean>>) {
  if (isVisible === false) {
    setIsVisible(true);
  } else {
    setIsVisible(false);
  }
}
function ProfileDetails({ form }: { form: UseFormReturn<UserDataType, any, undefined> }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
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
      <div className='flex border-2 border-gray-300 p-1 gap-x-1'>
        <input
          type={`${isVisible === false ? "password" : "text"}`}
          {...register("password", { required: true })}
          className='w-full h-full' />
        <button
          type='button'
          onClick={() => ControlVisible(isVisible, setIsVisible)}>
          {isVisible === false ?
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g id="Edit / Show">
                <g id="Vector">
                  <path
                    d="M3.5868 13.7788C5.36623 15.5478 8.46953 17.9999 12.0002 17.9999C15.5308 17.9999 18.6335 15.5478 20.413 13.7788C20.8823 13.3123 21.1177 13.0782 21.2671 12.6201C21.3738 12.2933 21.3738 11.7067 21.2671 11.3799C21.1177 10.9218 20.8823 10.6877 20.413 10.2211C18.6335 8.45208 15.5308 6 12.0002 6C8.46953 6 5.36623 8.45208 3.5868 10.2211C3.11714 10.688 2.88229 10.9216 2.7328 11.3799C2.62618 11.7067 2.62618 12.2933 2.7328 12.6201C2.88229 13.0784 3.11714 13.3119 3.5868 13.7788Z"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12Z"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            </svg>
            :
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg">

              <path d="M0 0h48v48H0z" fill="none" />
              <g id="Shopicon">
                <path
                  fill="currentColor"
                  d="M11.957,33.215L7.172,38L10,40.828l5.305-5.305C17.867,36.992,20.788,38,24,38c12,0,20-14,20-14s-2.954-5.16-7.957-9.215 L40.828,10L38,7.172l-5.305,5.305C30.133,11.008,27.212,10,24,10C12,10,4,24,4,24S6.954,29.16,11.957,33.215z M33.204,17.624 c2.668,2.091,4.747,4.638,5.996,6.369C36.728,27.396,31.024,34,24,34c-2.048,0-3.973-0.563-5.742-1.43l1.684-1.684 C21.133,31.589,22.517,32,24,32c4.418,0,8-3.582,8-8c0-1.483-0.411-2.867-1.114-4.058L33.204,17.624z M20.149,25.023 C20.062,24.694,20,24.356,20,24c0-2.206,1.794-4,4-4c0.356,0,0.694,0.062,1.023,0.149L20.149,25.023z M27.851,22.977 C27.938,23.306,28,23.644,28,24c0,2.206-1.794,4-4,4c-0.356,0-0.694-0.062-1.023-0.149L27.851,22.977z M24,14 c2.048,0,3.973,0.563,5.742,1.43l-1.684,1.684C26.867,16.411,25.483,16,24,16c-4.418,0-8,3.582-8,8 c0,1.483,0.411,2.867,1.114,4.058l-2.318,2.318c-2.668-2.091-4.747-4.638-5.997-6.369C11.272,20.604,16.976,14,24,14z" />
              </g>
            </svg>
          }

        </button>
      </div>
    </form>
  )
}

export default ProfileDetails