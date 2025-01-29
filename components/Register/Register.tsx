"use client"
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import { useForm, UseFormReturn } from 'react-hook-form';
import toast from 'react-hot-toast';
import { setCookie } from 'cookies-next';
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import PictureSelection from '../PictureSelection/PictureSelection';


type UserDataType = {
  picUrl: string,
  name: string,
  email: string,
  password: string
}

async function RegisterUser(data: UserDataType, setIsActive: any, setIsPresent: any) {

  if (data.name !== "" || data.email !== "" || data.password !== "") {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const resData = await response.json();
      if (resData?.status === 200) {
        console.log("data save :-",resData?.message);
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
  } else {
    toast.error("Please Fill All The Fields");
  }
}

function Register() {
  const { isActive, setIsActive }: any = useContext(GlobalContext);
  const { isPresent, setIsPresent }: any = useContext(GlobalContext);
  const [picUrl, setPicUrl] = useState<string>("");
  const [step, setStep] = useState<number>(1);

  const form = useForm<UserDataType>({
    defaultValues: {
      picUrl: "",
      name: "",
      email: "",
      password: ""
    }
  });
  const { register, handleSubmit, setValue, formState: { errors } } = form;
  return (
    <div>
      {step === 1 ? <ProfileDetails form={form} /> : <PictureSelection setValue={setValue} picUrl={picUrl} setPicUrl={setPicUrl} />}
      <form onSubmit={handleSubmit((data) => RegisterUser(data, setIsActive, setIsPresent))}>
        <div className='mt-3'>
          {errors?.name && <p className='text-[12px] text-red-500'>Name Is Required</p>}
          {errors?.email && <p className='text-[12px] text-red-500'>Email Is Required</p>}
          {errors?.password && <p className='text-[12px] text-red-500'>Password Is Required</p>}
        </div>
        <div className='flex justify-between mt-3'>
          <button
            type="button"
            onClick={() => {
              if (step > 1) {
                setStep(step - 1)
              }
            }}
            className='border-2 border-gray-500 w-fit h-fit py-1 px-4 rounded-[5px]'>Back</button>

          <button
            type={step !== 3 ? "button" : "submit"}
            onClick={() => {
              if (step <= 2) {
                setStep(step + 1)
              }
            }}
            className='border-2 border-gray-500 w-fit h-fit py-1 px-4 rounded-[5px]'>{step < 2 ? "Next" : "Register"}</button>
        </div>
      </form>
    </div>
  );
}

export default Register