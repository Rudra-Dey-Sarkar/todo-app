import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form'

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

async function ViewSpecificTaskData(id: string | undefined, setTasks: React.Dispatch<React.SetStateAction<any[] | TasksDataType>>) {
  try {
    const response = await fetch("/api/view-specific-tasks-data", {
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
async function DeleteTaskData(id: string | undefined, dependancy: boolean, setDependancy: React.Dispatch<React.SetStateAction<boolean>>, setTaskModal: React.Dispatch<React.SetStateAction<boolean>>) {
  try {
    const response = await fetch("/api/remove-tasks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: id })
    });

    const resData = await response.json();
    if (resData?.status === 200) {
      setDependancy(dependancy === false ? true : false);
      setTaskModal(false);
    } else {
      console.log(resData?.message);
    }
  } catch (errors) {
    console.log("Cannot Proceed To View Task Data Due To :-", errors);
  }
}
async function EditTaskImportantData(id: string | undefined, important: boolean | undefined, dependancy: boolean, setDependancy: React.Dispatch<React.SetStateAction<boolean>>, dep: boolean, setDep: React.Dispatch<React.SetStateAction<boolean>>) {
  const data = {
    _id: id,
    important: important === false ? true : false
  }
  try {
    const response = await fetch("/api/edit-tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const resData = await response.json();
    if (resData?.status === 200) {
      setDep(dep === false ? true : false);
      setDependancy(dependancy === false ? true : false);
    } else {
      console.log(resData?.message);
    }
  } catch (errors) {
    console.log("Cannot Proceed To Edit Task Data Due To :-", errors);
  }
}
async function EditTaskStatusData(id: string, status: boolean, dependancy: boolean, setDependancy: React.Dispatch<React.SetStateAction<boolean>>, dep: boolean, setDep: React.Dispatch<React.SetStateAction<boolean>>) {
  const data = {
    _id: id,
    status: status === false ? true : false
  }
  try {
    const response = await fetch("/api/edit-tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const resData = await response.json();
    if (resData?.status === 200) {
      setDep(dep === false ? true : false);
      setDependancy(dependancy === false ? true : false);
    } else {
      console.log(resData?.message);
    }
  } catch (errors) {
    console.log("Cannot Proceed To Edit Task Data Due To :-", errors);
  }
}
async function EditTaskStepsData(data: TasksDataType[0], dependancy: boolean, setDependancy: React.Dispatch<React.SetStateAction<boolean>>, dep: boolean, setDep: React.Dispatch<React.SetStateAction<boolean>>, setAddStep: React.Dispatch<React.SetStateAction<boolean>>) {

  try {
    const response = await fetch("/api/edit-tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const resData = await response.json();
    if (resData?.status === 200) {
      setDep(dep === false ? true : false);
      setDependancy(dependancy === false ? true : false);
      setAddStep(false);
    } else {
      console.log(resData?.message);
    }
  } catch (errors) {
    console.log("Cannot Proceed To Edit Task Data Due To :-", errors);
  }
}
async function EditTaskReminderData(id: TasksDataType[0] | undefined, reminder: boolean | undefined, dependancy: boolean, setDependancy: React.Dispatch<React.SetStateAction<boolean>>, dep: boolean, setDep: React.Dispatch<React.SetStateAction<boolean>>) {
  const data = {
    _id: id,
    reminder: reminder === false ? true : false
  }
  try {
    const response = await fetch("/api/edit-tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const resData = await response.json();
    if (resData?.status === 200) {
      setDep(dep === false ? true : false);
      setDependancy(dependancy === false ? true : false);
    } else {
      console.log(resData?.message);
    }
  } catch (errors) {
    console.log("Cannot Proceed To Edit Task Data Due To :-", errors);
  }
}
function ControlAddStep(addStep: boolean, setAddStep: React.Dispatch<React.SetStateAction<boolean>>) {
  if (addStep === false) {
    setAddStep(true);
  } else {
    setAddStep(false);
  }
}

function TaskModal({ setTaskModal, taskData, dependancy, setDependancy, setEF }: { setTaskModal: React.Dispatch<React.SetStateAction<boolean>>, taskData: TasksDataType[0] | undefined, dependancy: boolean, setDependancy: React.Dispatch<React.SetStateAction<boolean>>, setEF: React.Dispatch<React.SetStateAction<boolean>> }) {
  const pathname = usePathname();
  const [tasks, setTasks] = useState<TasksDataType | any[]>([]);
  const [dep, setDep] = useState<boolean>(false);
  const [addStep, setAddStep] = useState<boolean>(false);

  const form = useForm<TasksDataType[0]>({
    defaultValues: {
      _id: taskData?._id,
      steps: []
    }
  });
  const { register, handleSubmit, formState: { errors } } = form;

  useEffect(() => {
    ViewSpecificTaskData(taskData?._id, setTasks);
  }, [dep]);

  return (
    <div className='grid gap-y-3 bg-[#EEF6EF] sm:w-[40vw] w-[75vw] min-h-[100vh] px-2'>
      <div className='grid w-full h-fit gap-y-2'>
        <div className='flex justify-between w-full h-fit px-3 border-b-2 border-[#35793729] hover:bg-[#35793729]'>
          <div className='flex justify-between gap-x-3 w-full h-full'>
            <button
              disabled={pathname === "/all-tasks"}
              onClick={() => EditTaskStatusData(tasks[0]?._id, tasks[0]?.status, dependancy, setDependancy, dep, setDep)}>
              {tasks[0]?.status === false ?
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 64 64"
                  role="img"
                  aria-label="Error icon">
                  <circle cx="32" cy="32" r="32" fill="#F44336" />
                  <line
                    x1="20"
                    y1="20"
                    x2="44"
                    y2="44"
                    stroke="#FFFFFF"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="20"
                    y1="44"
                    x2="44"
                    y2="20"
                    stroke="#FFFFFF"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg> :
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 100 100"
                >
                  <circle cx="50" cy="50" r="50" fill="#28a745" />
                  <polyline
                    points="30,50 45,65 70,35"
                    fill="none"
                    stroke="white"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>}
            </button>
            <p className='w-full h-full py-3 hover:cursor-pointer'>{tasks[0]?.taskName}</p>
          </div>
          <button
            disabled={pathname === "/all-tasks"}
            onClick={() => EditTaskImportantData(tasks[0]?._id, tasks[0]?.important, dependancy, setDependancy, dep, setDep)}>
            {tasks[0]?.important === false ?
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.4231 9.11812C22.3294 8.82986 22.1524 8.5758 21.9145 8.38795C21.6766 8.2001 21.3884 8.08686 21.0863 8.06249L15.555 7.61624L13.4194 2.45155C13.3039 2.17013 13.1073 1.92941 12.8547 1.76C12.602 1.59058 12.3047 1.50012 12.0005 1.50012C11.6963 1.50012 11.3989 1.59058 11.1463 1.76C10.8936 1.92941 10.6971 2.17013 10.5816 2.45155L8.44781 7.61531L2.91375 8.06249C2.61111 8.08809 2.32274 8.20243 2.08479 8.39119C1.84684 8.57994 1.66988 8.83472 1.57609 9.12361C1.4823 9.41249 1.47584 9.72263 1.55753 10.0152C1.63922 10.3077 1.80542 10.5696 2.03531 10.7681L6.25406 14.4084L4.96875 19.8516C4.89687 20.1473 4.91447 20.4577 5.01932 20.7434C5.12417 21.0291 5.31154 21.2771 5.55765 21.4562C5.80376 21.6352 6.09751 21.737 6.4016 21.7488C6.7057 21.7605 7.00643 21.6817 7.26563 21.5222L12 18.6084L16.7372 21.5222C16.9965 21.6798 17.2966 21.7571 17.5997 21.7445C17.9029 21.7318 18.1955 21.6298 18.4408 21.4512C18.6861 21.2726 18.873 21.0254 18.9781 20.7407C19.0832 20.4561 19.1017 20.1467 19.0313 19.8516L17.7413 14.4075L21.96 10.7672C22.1918 10.569 22.3595 10.3065 22.4419 10.013C22.5244 9.71939 22.5178 9.40796 22.4231 9.11812ZM20.985 9.63093L16.4194 13.5684C16.3153 13.6582 16.2378 13.7748 16.1955 13.9056C16.1532 14.0364 16.1476 14.1763 16.1794 14.31L17.5744 20.1975C17.578 20.2056 17.5783 20.2148 17.5754 20.2232C17.5724 20.2315 17.5664 20.2385 17.5584 20.2425C17.5416 20.2556 17.5369 20.2528 17.5228 20.2425L12.3928 17.0878C12.2747 17.0152 12.1387 16.9767 12 16.9767C11.8613 16.9767 11.7253 17.0152 11.6072 17.0878L6.47719 20.2444C6.46313 20.2528 6.45938 20.2556 6.44156 20.2444C6.43365 20.2403 6.42759 20.2334 6.42462 20.225C6.42166 20.2167 6.42202 20.2075 6.42563 20.1994L7.82063 14.3119C7.85242 14.1781 7.84685 14.0382 7.80452 13.9075C7.7622 13.7767 7.68475 13.66 7.58063 13.5703L3.015 9.6328C3.00375 9.62343 2.99344 9.61499 3.00281 9.58593C3.01219 9.55687 3.01969 9.56062 3.03375 9.55874L9.02625 9.07499C9.1637 9.0632 9.29523 9.01373 9.40638 8.93203C9.51753 8.85032 9.60399 8.73954 9.65625 8.61187L11.9644 3.02343C11.9719 3.00749 11.9747 2.99999 11.9972 2.99999C12.0197 2.99999 12.0225 3.00749 12.03 3.02343L14.3438 8.61187C14.3965 8.73958 14.4835 8.85025 14.5952 8.93164C14.7068 9.01303 14.8388 9.06199 14.9766 9.07312L20.9691 9.55687C20.9831 9.55687 20.9916 9.55687 21 9.58405C21.0084 9.61124 21 9.62156 20.985 9.63093Z"
                  fill="currentColor"
                />
              </svg> :
              <svg
                width={22}
                height={21}
                viewBox="0 0 22 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.4231 8.11812C21.3294 7.82986 21.1524 7.5758 20.9145 7.38795C20.6766 7.2001 20.3884 7.08686 20.0863 7.06249L14.555 6.61624L12.4194 1.45155C12.3039 1.17013 12.1073 0.929412 11.8547 0.759996C11.602 0.59058 11.3047 0.500122 11.0005 0.500122C10.6963 0.500122 10.3989 0.59058 10.1463 0.759996C9.89363 0.929412 9.69706 1.17013 9.58157 1.45155L7.44782 6.6153L1.91375 7.06249C1.61111 7.08809 1.32274 7.20243 1.08479 7.39118C0.846839 7.57994 0.669882 7.83472 0.57609 8.12361C0.482298 8.41249 0.475843 8.72263 0.557532 9.01516C0.639222 9.3077 0.805424 9.56962 1.03531 9.76812L5.25407 13.4084L3.96875 18.8516C3.89687 19.1473 3.91447 19.4577 4.01932 19.7434C4.12417 20.0291 4.31154 20.2771 4.55765 20.4562C4.80376 20.6352 5.09751 20.737 5.4016 20.7488C5.7057 20.7605 6.00643 20.6817 6.26563 20.5222L11 17.6084L15.7372 20.5222C15.9965 20.6798 16.2966 20.7571 16.5998 20.7445C16.9029 20.7318 17.1955 20.6298 17.4408 20.4512C17.6861 20.2725 17.873 20.0254 17.9781 19.7407C18.0832 19.4561 18.1017 19.1467 18.0313 18.8516L16.7413 13.4075L20.96 9.76718C21.1918 9.56902 21.3595 9.30652 21.4419 9.01296C21.5244 8.71939 21.5178 8.40796 21.4231 8.11812Z"
                  fill="currentColor"
                />
              </svg>}
          </button>
        </div>

        <div className='grid gap-y-2'>
          {pathname !== "/all-tasks" &&
            <button
              className='flex w-full gap-x-3 items-center px-3 py-3 border-b-2 border-[#35793729] hover:bg-[#35793729]'
              onClick={() => ControlAddStep(addStep, setAddStep)}>
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.16667 10.8333H0V9.16667H9.16667V0H10.8333V9.16667H20V10.8333H10.8333V20H9.16667V10.8333Z"
                  fill="black"
                />
              </svg>
              <p className='font-semibold'>Add Step</p>
            </button>
          }

          {addStep === true &&
            <form onSubmit={handleSubmit((data) => EditTaskStepsData(data, dependancy, setDependancy, dep, setDep, setAddStep))}>
              <label htmlFor="steps">Enter Steps :-</label>
              <div className='grid justify-center sm:flex sm:justify-between '>
                <input
                  type="text"
                  placeholder='Open computer'
                  {...register("steps", { required: true })}
                  className='p-1 my-1' />
                <button
                  type='submit'
                  className='border-2 border-gray-500 w-fit h-fit py-1 px-4 m-auto rounded-[5px]'>Add</button>
              </div>
              {errors?.steps && <p className='text-[12px] text-red-500'>Step is required</p>}
            </form>
          }

          <div className='bg-white p-2 max-h-[100px] overflow-y-auto'>
            <p className='mb-3 font-semibold border-b-2 border-gray-500'>Task Steps :-</p>
            {tasks?.map((task: TasksDataType[0], index: number) =>
              <div key={index}>
                {task?.steps?.length > 0 ?
                  <ul>
                    {task?.steps?.map((step: string, ind: number) =>
                      <li
                        key={ind}
                        className='font-semibold'>{ind + 1}. {step}</li>)}
                  </ul>
                  : <div>
                    <p>No Steps Available</p>
                  </div>}
              </div>)}
          </div>
        </div>

        {pathname !== "/all-tasks" &&
          <div>
            <button
              className={`flex w-full gap-x-3 items-center px-3 py-3 border-b-2 border-[#35793729] hover:bg-[#35793729] ${tasks[0]?.reminder === true ? "text-green-500" : "text-current"}`}
              onClick={() => EditTaskReminderData(taskData, tasks[0]?.reminder, dependancy, setDependancy, dep, setDep)}>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_5_2269)">
                  <path
                    d="M21.6734 18.5534C21.0306 17.9802 20.4677 17.3232 20.0001 16.6C19.4891 15.6019 19.1831 14.5116 19.1001 13.3934V10.1C19.1045 8.34376 18.4675 6.64633 17.3086 5.32666C16.1498 4.007 14.5489 3.15592 12.8068 2.93335V2.07335C12.8068 1.83731 12.713 1.61093 12.5461 1.44402C12.3792 1.27712 12.1528 1.18335 11.9168 1.18335C11.6807 1.18335 11.4544 1.27712 11.2875 1.44402C11.1205 1.61093 11.0268 1.83731 11.0268 2.07335V2.94668C9.30029 3.1853 7.71876 4.04152 6.57513 5.35675C5.4315 6.67199 4.80327 8.35711 4.80678 10.1V13.3934C4.72382 14.5116 4.4178 15.6019 3.90678 16.6C3.44737 17.3216 2.89358 17.9785 2.26011 18.5534C2.189 18.6158 2.13201 18.6927 2.09293 18.7789C2.05384 18.8651 2.03357 18.9587 2.03345 19.0534V19.96C2.03345 20.1368 2.10369 20.3064 2.22871 20.4314C2.35373 20.5564 2.5233 20.6267 2.70011 20.6267H21.2334C21.4103 20.6267 21.5798 20.5564 21.7049 20.4314C21.8299 20.3064 21.9001 20.1368 21.9001 19.96V19.0534C21.9 18.9587 21.8797 18.8651 21.8406 18.7789C21.8016 18.6927 21.7446 18.6158 21.6734 18.5534ZM3.42011 19.2934C4.04024 18.694 4.58636 18.0226 5.04678 17.2934C5.69064 16.088 6.0659 14.7575 6.14678 13.3934V10.1C6.12034 9.31871 6.2514 8.54007 6.53214 7.81046C6.81289 7.08086 7.23759 6.41521 7.78095 5.85315C8.3243 5.2911 8.97521 4.84413 9.6949 4.53887C10.4146 4.2336 11.1884 4.07629 11.9701 4.07629C12.7519 4.07629 13.5256 4.2336 14.2453 4.53887C14.965 4.84413 15.6159 5.2911 16.1593 5.85315C16.7026 6.41521 17.1273 7.08086 17.4081 7.81046C17.6888 8.54007 17.8199 9.31871 17.7934 10.1V13.3934C17.8743 14.7575 18.2496 16.088 18.8934 17.2934C19.3539 18.0226 19.9 18.694 20.5201 19.2934H3.42011Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 22.8533C12.42 22.8436 12.823 22.6858 13.1378 22.4076C13.4525 22.1294 13.6588 21.7489 13.72 21.3333H10.2134C10.2764 21.7602 10.4923 22.1497 10.8209 22.4293C11.1496 22.7089 11.5686 22.8595 12 22.8533Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_5_2269">
                    <rect width={24} height={24} fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className='font-semibold'>Reminder</p>
            </button>


            <button
              className="flex w-full gap-x-3 items-center px-[5px] py-3 border-b-2 border-[#35793729] hover:bg-[#35793729]"
              onClick={() => setEF(true)}>
              <svg
                width="36px"
                height="36px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.7 5.12758L19.266 6.37458C19.4172 6.51691 19.5025 6.71571 19.5013 6.92339C19.5002 7.13106 19.4128 7.32892 19.26 7.46958L18.07 8.89358L14.021 13.7226C13.9501 13.8037 13.8558 13.8607 13.751 13.8856L11.651 14.3616C11.3755 14.3754 11.1356 14.1751 11.1 13.9016V11.7436C11.1071 11.6395 11.149 11.5409 11.219 11.4636L15.193 6.97058L16.557 5.34158C16.8268 4.98786 17.3204 4.89545 17.7 5.12758Z"
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.033 7.61865C12.4472 7.61865 12.783 7.28287 12.783 6.86865C12.783 6.45444 12.4472 6.11865 12.033 6.11865V7.61865ZM9.23301 6.86865V6.11865L9.23121 6.11865L9.23301 6.86865ZM5.50001 10.6187H6.25001L6.25001 10.617L5.50001 10.6187ZM5.50001 16.2437L6.25001 16.2453V16.2437H5.50001ZM9.23301 19.9937L9.23121 20.7437H9.23301V19.9937ZM14.833 19.9937V20.7437L14.8348 20.7437L14.833 19.9937ZM18.566 16.2437H17.816L17.816 16.2453L18.566 16.2437ZM19.316 12.4937C19.316 12.0794 18.9802 11.7437 18.566 11.7437C18.1518 11.7437 17.816 12.0794 17.816 12.4937H19.316ZM15.8863 6.68446C15.7282 6.30159 15.2897 6.11934 14.9068 6.2774C14.5239 6.43546 14.3417 6.87397 14.4998 7.25684L15.8863 6.68446ZM18.2319 9.62197C18.6363 9.53257 18.8917 9.13222 18.8023 8.72777C18.7129 8.32332 18.3126 8.06792 17.9081 8.15733L18.2319 9.62197ZM8.30001 16.4317C7.8858 16.4317 7.55001 16.7674 7.55001 17.1817C7.55001 17.5959 7.8858 17.9317 8.30001 17.9317V16.4317ZM15.767 17.9317C16.1812 17.9317 16.517 17.5959 16.517 17.1817C16.517 16.7674 16.1812 16.4317 15.767 16.4317V17.9317ZM12.033 6.11865H9.23301V7.61865H12.033V6.11865ZM9.23121 6.11865C6.75081 6.12461 4.7447 8.13986 4.75001 10.6203L6.25001 10.617C6.24647 8.96492 7.58269 7.62262 9.23481 7.61865L9.23121 6.11865ZM4.75001 10.6187V16.2437H6.25001V10.6187H4.75001ZM4.75001 16.242C4.7447 18.7224 6.75081 20.7377 9.23121 20.7437L9.23481 19.2437C7.58269 19.2397 6.24647 17.8974 6.25001 16.2453L4.75001 16.242ZM9.23301 20.7437H14.833V19.2437H9.23301V20.7437ZM14.8348 20.7437C17.3152 20.7377 19.3213 18.7224 19.316 16.242L17.816 16.2453C17.8195 17.8974 16.4833 19.2397 14.8312 19.2437L14.8348 20.7437ZM19.316 16.2437V12.4937H17.816V16.2437H19.316ZM14.4998 7.25684C14.6947 7.72897 15.0923 8.39815 15.6866 8.91521C16.2944 9.44412 17.1679 9.85718 18.2319 9.62197L17.9081 8.15733C17.4431 8.26012 17.0391 8.10369 16.6712 7.7836C16.2897 7.45165 16.0134 6.99233 15.8863 6.68446L14.4998 7.25684ZM8.30001 17.9317H15.767V16.4317H8.30001V17.9317Z"
                  fill="currentColor"
                />
              </svg>
              <p className='font-semibold'>Edit</p>
            </button>
          </div>
        }
      </div>

      <div className='flex justify-between items-end w-full h-full px-2 py-7'>
        <button onClick={() => setTaskModal(false)}>
          <svg
            width={14}
            height={15}
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.4 14.5L0 13.1L5.6 7.5L0 1.9L1.4 0.5L7 6.1L12.6 0.5L14 1.9L8.4 7.5L14 13.1L12.6 14.5L7 8.9L1.4 14.5Z"
              fill="currentColor"
            />
          </svg>
        </button>

        {pathname !== "/all-tasks" &&
          <button onClick={() => DeleteTaskData(taskData?._id, dependancy, setDependancy, setTaskModal)}>
            <svg
              width={19}
              height={20}
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.02666 26.6417C4.25888 26.6417 3.61832 26.385 3.10499 25.8717C2.59166 25.3583 2.33443 24.7172 2.33332 23.9483V3.30834H0.666656V1.64167H7.33332V0.358337H17.3333V1.64167H24V3.30834H22.3333V23.95C22.3333 24.7167 22.0767 25.3572 21.5633 25.8717C21.05 26.3861 20.4089 26.6428 19.64 26.6417H5.02666ZM8.67999 21.6417H10.3467V6.64167H8.67999V21.6417ZM14.32 21.6417H15.9867V6.64167H14.32V21.6417Z"
                fill="currentColor"
              />
            </svg>
          </button>
        }
      </div>
    </div>
  )
}

export default TaskModal