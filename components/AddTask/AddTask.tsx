"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';

type UserDataType = [{
  name: string,
  email: string,
  password: string
}]

type TaskDataType = {
  userId: string,
  taskName: string,
  date: string,
  steps: [string],
  important: boolean,
  reminder: boolean,
  status: boolean,
}

async function AddTaskData(data:TaskDataType, setAF: React.Dispatch<React.SetStateAction<boolean>>){

  try {
    const response = await fetch("/api/add-tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    
    const resData = await response.json();
    if (resData?.status===200) {
      toast.success("Task Added Successfully");
      setAF(false);
    } else {
      toast.error(resData?.message);
    }
  } catch (errors) {
    console.log("Cannot Proceed To Add Task Due To :-", errors);
    toast.error("Cannot Add Task");
  }
}

function AddTask({user, setAF}:{user:UserDataType | any[], setAF:React.Dispatch<React.SetStateAction<boolean>>}) {
  const form = useForm<TaskDataType>({
    defaultValues: {
      userId: user[0]?.email,
      taskName: "",
      date: "",
    }
  });

  const { register, handleSubmit, formState: { errors } } = form;
  return (
    <form
      onSubmit={handleSubmit((data) =>  AddTaskData(data, setAF))}
      className='grid border-2 border-gray-300 p-2'>

      <label htmlFor="text">Enter Task Name</label>
      <input type="text"
        {...register("taskName", { required: true })}
        className='border-2 border-gray-300 p-1' />
      {errors?.taskName && <p className='text-[12px] text-red-500'>Task Name Is Required</p>}

      <label htmlFor="date">Enter Password</label>
      <input
        type="date"
        {...register("date", { required: true })}
        className='border-2 border-gray-300 p-1' />
      {errors?.date && <p className='text-[12px] text-red-500'>Date Is Required</p>}

      <button
        type='submit'
        className='bg-gray-300 p-2 mt-2 font-semibold'>Add Task</button>
    </form>
  )
}

export default AddTask