"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';

type TasksDataType = [{
  _id: string,
  userId: string,
  taskName: string,
  date: string,
  steps: [string],
  notes: string,
  important: boolean,
  reminder: boolean,
  status: boolean,
}]

async function ViewSpecificTaskData(id: string, setTasks: React.Dispatch<React.SetStateAction<any[] | TasksDataType>>) {
  try {
    const response = await fetch("/api/view-specific-tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: id })
    });

    const resData = await response.json();
    if (resData?.status === 200) {
      setTasks(resData?.message);
    } else {
      console.log(resData?.message);
    }
  } catch (errors) {
    console.log("Cannot Proceed To View Task Data Due To :-", errors);
  }
}
function EditTask({taskId , setEF}:{taskId:string, setEF:React.Dispatch<React.SetStateAction<boolean>>}) {
  const [tasks, setTasks] = useState< TasksDataType | any[]>([]);
  useEffect(()=>{
    ViewSpecificTaskData(taskId, setTasks);
  },[])
  const form = useForm< TasksDataType[0]>({
    defaultValues: {
      _id: taskId,
      taskName: tasks[0]?.taskName,
      date: tasks[0]?.date,
    }
  });

  const { register, handleSubmit, formState: { errors } } = form;
  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className='grid border-2 border-gray-300 p-2'>
        <button onClick={()=>console.log(tasks)}>test</button>
      <label htmlFor="text">Enter Task Name</label>
      <input type="text"
        {...register("taskName", { required: true })}
        className='border-2 border-gray-300 p-1' />
      {errors?.taskName && <p className='text-[12px] text-red-500'>Task Name Is Required</p>}

      <label htmlFor="date">date Password</label>
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

export default EditTask