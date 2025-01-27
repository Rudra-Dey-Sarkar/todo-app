"use client"
import React, { useState, useEffect, useContext } from 'react'
import AddTask from '../AddTask/AddTask'
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import { getCookie } from 'cookies-next';
import TaskModal from '../TaskModal/TaskModal';

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
    repeat: boolean,
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
function ControlTaskModal(taskModal: boolean, setTaskModal: React.Dispatch<React.SetStateAction<boolean>>, id: string, setTaskId: React.Dispatch<React.SetStateAction<string>>) {
    if (taskModal === false) {
        setTaskId(id);
        setTaskModal(true);
    } else {
        setTaskModal(false);
    }
}


function AllTasks() {
    const [dependancy, setDependancy] = useState<boolean>(false);
    const [taskModal, setTaskModal] = useState<boolean>(false);
    const [taskId, setTaskId] = useState<string>("");
    const [tasks, setTasks] = useState<AdvanceTaskDataType | any[]>([]);
    const [user, setUser] = useState<UserDataType | any[]>([]);
    const { isPresent, setIsPresent }: any = useContext(GlobalContext);
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
        <div className='w-full'>
            <div className='w-full pt-12 px-3 bg-gradient-to-b from-[#D0FFD21A] to-[#3579371A]'>
                <p className='text-[#1B281BB8] font-semibold'>All Tasks</p>
                <div className='flex justify-between items-center pt-12 pb-7 '>
                    <div className='flex gap-x-7'>
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

                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15 4V2M15 4V6M15 4H10.5M3 10V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V10M3 10H21M3 10V6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4H7M21 10V6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4H18.5M7 2V6"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {tasks.length > 0 ?
                <div className='flex'>
                    <div className='px-3 w-full h-full'>
                        {tasks?.map((task: AdvanceTaskDataType[0], index: number) =>
                            <div key={index}>
                                <p className='text-[1rem] font-semibold underline my-3'>{task[0]}</p>
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
                                                    onClick={() => ControlTaskModal(taskModal, setTaskModal, t._id, setTaskId)}>{t?.taskName}</p>
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
                        <TaskModal setTaskModal={setTaskModal} taskId={taskId} dependancy={dependancy} setDependancy={setDependancy} />
                    }
                </div>
                :
                <div>Task Not Available</div>}

        </div>
    )
}

export default AllTasks