"use client"
import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import { getCookie } from 'cookies-next';
import TaskModal from '../TaskModal/TaskModal';
import Topbox from '../Topbox/Topbox';

type UserDataType = [{
    name: string,
    email: string,
    password: string
}]

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

type AdvanceTaskDataType = [
    [string, TasksDataType]
]



async function ViewTaskData(userId: string, setTasks: React.Dispatch<React.SetStateAction<any[] | TasksDataType>>) {
    const obj: Record<string, any> = {};
    try {
        const response = await fetch("/api/view-tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: userId })
        });

        const resData = await response.json();
        if (resData?.status === 200) {

            for (let i = 0; i < resData?.message?.length; i++) {
                if (!obj[resData?.message?.[i]?.date]) {
                    obj[resData?.message?.[i]?.date] = [];
                }
                obj[resData?.message?.[i]?.date].push(resData?.message?.[i]);
            }
            const newObj = Object.entries(obj);
            setTasks(newObj);
        } else {
            console.log(resData?.message);
        }
    } catch (errors) {
        console.log("Cannot Proceed To View Task Data Due To :-", errors);
    }
}
function ControlTaskModal(taskModal: boolean, setTaskModal: React.Dispatch<React.SetStateAction<boolean>>, task: TasksDataType[0], taskData: TasksDataType[0] | undefined, setTaskData: React.Dispatch<React.SetStateAction<TasksDataType[0] | undefined>>) {
    if (taskModal === false && task !== undefined) {
        setTaskData(task);
        setTaskModal(true);
    } else {
        setTaskModal(false);
    }
}


function AllTasks() {
    const { isPresent, setIsPresent }: any = useContext(GlobalContext);
    const { isDarkMode, setIsDarkMode }: any = useContext(GlobalContext);
    const [dependancy, setDependancy] = useState<boolean>(false);
    const [taskModal, setTaskModal] = useState<boolean>(false);
    const [AF, setAF] = useState<boolean>(false);
    const [EF, setEF] = useState<boolean>(false);
    const [taskData, setTaskData] = useState<TasksDataType[0] | undefined>(undefined);
    const [tasks, setTasks] = useState<AdvanceTaskDataType | any[]>([]);
    const [user, setUser] = useState<UserDataType | any[]>([]);
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];

    useEffect(() => {
        const cookies = getCookie("user");

        if (cookies !== undefined && typeof cookies === "string") {
            const userCookieData = JSON.parse(cookies);
            ViewTaskData(userCookieData?.[0]?.email, setTasks);
            setUser(userCookieData);
        } else {
            console.log("cookies not present");
        }
    }, [isPresent]);

    return (
        <div className={`w-full h-full ${isDarkMode === true ? "text-white" : ""}`}>
            <Topbox setAF={setAF} />

            {tasks.length > 0 ?
                <div className='flex'>
                    <div className='px-3 w-full h-full'>
                        {tasks?.map((task: AdvanceTaskDataType[0], index: number) =>
                            <div key={index}>
                                <p className='text-[1rem] font-semibold underline my-3'>{task[0]} :-</p>
                                {task[1]?.map((t: TasksDataType[0], ind: number) =>
                                    <div
                                        key={ind}>
                                        <div className='flex justify-between px-3 border-b-2 border-[#35793729] hover:bg-[#35793729]'>
                                            <div className='flex justify-between gap-x-3  w-full h-full'>
                                                <button>
                                                    {t?.status === false ?
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 64 64"
                                                            role="img"
                                                            aria-label="Error icon"
                                                        >
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
                                                <p className='w-full h-full py-3 hover:cursor-pointer'
                                                    onClick={() => ControlTaskModal(taskModal, setTaskModal, t, taskData, setTaskData)}>{t?.taskName}</p>
                                            </div>
                                            <button>
                                                {t?.important === false ?
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

                                    </div>
                                )}
                            </div>)}
                    </div>
                    {taskModal === true &&
                        <TaskModal setTaskModal={setTaskModal} taskData={taskData} dependancy={dependancy} setDependancy={setDependancy} setEF={setEF} />
                    }
                </div>
                :
                <div>Task Not Available</div>}

        </div>
    )
}

export default AllTasks