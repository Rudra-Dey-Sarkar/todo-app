import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { usePathname } from 'next/navigation'
import { GlobalContext } from '../../GlobalContext/GlobalContext'
import { deleteCookie } from 'cookies-next'

type UserDataType = [{
  name: string,
  email: string,
  password: string
}]

function ControlOptions(options: boolean, setOptions: React.Dispatch<React.SetStateAction<boolean>>) {
  if (options === true) {
    setOptions(false);
  } else {
    setOptions(true);
  }
}

function Logout(setIsPresent: any) {
  deleteCookie("user");
  setIsPresent(false);
}

function Sidebar({ user }: { user: UserDataType | any[] }) {
  const pathname = usePathname();
  const { isPresent, setIsPresent }: any = useContext(GlobalContext);
  const [options, setOptions] = useState<boolean>(false);
  const { sidebar, setSidebar }: any = useContext(GlobalContext);

  return (
    <div className= "w-fit h-[100vh]">
      <div className={`grid  ${sidebar === true ? "relative" : "hidden"} py-[60px] w-[230px] h-full`} >

        <div className="grid bg-[#EEF6EF] w-full h-full px-3" >
          <div className='flex justify-center items-center bg-[#EEF6EF]'>
            <div className='mt-7 absolute inset-0 w-full h-fit'>
              <img
                src="#"
                alt="picture"
                className='mx-auto w-[70px] h-[70px] rounded-full border-2 border-gray-500'
                onClick={() => ControlOptions(options, setOptions)} />

              {options === true &&
                <div className='bg-white grid'>
                  <Link href="/profile" className='px-2 py-3 hover:bg-[#35793729]'>
                    <p className='text-start'>My Profile</p>
                  </Link>

                  <button
                    className='px-2 py-3 hover:bg-[#35793729]'
                    onClick={() => Logout(setIsPresent)}>
                    <p className='text-start'>Logout</p>
                  </button>
                </div>
              }
            </div>
            <p className='font-semibold mt-7'>{user.length > 0 ? user[0].name : "Name"}</p>
          </div>

          <div className='bg-white w-full h-fit'>
            <Link href="/all-tasks" className={`flex justify-start items-center gap-x-3 px-2 py-3 hover:bg-[#35793729] ${pathname === "/all-tasks" ? "bg-[#35793729] text-[#357937]" : "bg-currentColor text-CurrentColor]"}`}>
              <svg
                width={24}
                height={25}
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.99809 16.9334H11.9981M7.99809 11.9334H15.9981M7.50009 4.43341C5.94409 4.48041 5.01709 4.65341 4.37509 5.29541C3.49609 6.17541 3.49609 7.59041 3.49609 10.4214V16.9274C3.49609 19.7594 3.49609 21.1744 4.37509 22.0544C5.25309 22.9334 6.66809 22.9334 9.49609 22.9334H14.4961C17.3251 22.9334 18.7391 22.9334 19.6171 22.0534C20.4971 21.1744 20.4971 19.7594 20.4971 16.9274V10.4214C20.4971 7.59141 20.4971 6.17541 19.6171 5.29541C18.9761 4.65341 18.0481 4.48041 16.4921 4.43341"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.49609 4.68341C7.49609 3.71741 8.28009 2.93341 9.24609 2.93341H14.7461C15.2102 2.93341 15.6553 3.11779 15.9835 3.44597C16.3117 3.77416 16.4961 4.21928 16.4961 4.68341C16.4961 5.14754 16.3117 5.59266 15.9835 5.92085C15.6553 6.24904 15.2102 6.43341 14.7461 6.43341H9.24609C8.78197 6.43341 8.33685 6.24904 8.00866 5.92085C7.68047 5.59266 7.49609 5.14754 7.49609 4.68341Z"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className='font-semibold'>All Task</p>
            </Link>

            <Link href="/today" className={`flex justify-start items-center gap-x-3 px-2 py-3 hover:bg-[#35793729] ${pathname === "/today" ? "bg-[#35793729] text-[#357937]" : ""}`}>
              <svg
                width={24}
                height={25}
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 10.9334H3M16 2.93341V6.93341M8 2.93341V6.93341M7.8 22.9334H16.2C17.8802 22.9334 18.7202 22.9334 19.362 22.6064C19.9265 22.3188 20.3854 21.8599 20.673 21.2954C21 20.6536 21 19.8136 21 18.1334V9.73341C21 8.05325 21 7.21317 20.673 6.57144C20.3854 6.00695 19.9265 5.54801 19.362 5.26039C18.7202 4.93341 17.8802 4.93341 16.2 4.93341H7.8C6.11984 4.93341 5.27976 4.93341 4.63803 5.26039C4.07354 5.54801 3.6146 6.00695 3.32698 6.57144C3 7.21317 3 8.05325 3 9.73341V18.1334C3 19.8136 3 20.6536 3.32698 21.2954C3.6146 21.8599 4.07354 22.3188 4.63803 22.6064C5.27976 22.9334 6.11984 22.9334 7.8 22.9334Z"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className='font-semibold'>Today</p>
            </Link>

            <Link href="/important" className={`flex justify-start items-center gap-x-3 px-2 py-3 hover:bg-[#35793729] ${pathname === "/important" ? "bg-[#35793729] text-[#357937]" : ""}`}>
              <svg
                width={24}
                height={25}
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_5_2229)">
                  <path
                    d="M22.4225 10.0514C22.3287 9.76315 22.1517 9.50909 21.9138 9.32124C21.6759 9.13339 21.3877 9.02015 21.0856 8.99578L15.5543 8.54953L13.4187 3.38484C13.3032 3.10342 13.1066 2.8627 12.854 2.69328C12.6013 2.52387 12.304 2.43341 11.9998 2.43341C11.6956 2.43341 11.3983 2.52387 11.1456 2.69328C10.893 2.8627 10.6964 3.10342 10.5809 3.38484L8.44714 8.54859L2.91308 8.99578C2.61043 9.02138 2.32207 9.13572 2.08412 9.32447C1.84617 9.51323 1.66921 9.76801 1.57542 10.0569C1.48163 10.3458 1.47517 10.6559 1.55686 10.9485C1.63855 11.241 1.80475 11.5029 2.03464 11.7014L6.25339 15.3417L4.96808 20.7848C4.8962 21.0806 4.9138 21.391 5.01865 21.6767C5.1235 21.9623 5.31087 22.2104 5.55698 22.3894C5.80309 22.5685 6.09684 22.6703 6.40093 22.6821C6.70503 22.6938 7.00576 22.6149 7.26496 22.4555L11.9993 19.5417L16.7365 22.4555C16.9958 22.6131 17.2959 22.6904 17.5991 22.6778C17.9022 22.6651 18.1949 22.5631 18.4401 22.3845C18.6854 22.2058 18.8724 21.9586 18.9774 21.674C19.0825 21.3894 19.101 21.08 19.0306 20.7848L17.7406 15.3408L21.9593 11.7005C22.1911 11.5023 22.3588 11.2398 22.4412 10.9462C22.5237 10.6527 22.5172 10.3413 22.4225 10.0514ZM20.9843 10.5642L16.4187 14.5017C16.3146 14.5915 16.2371 14.7081 16.1948 14.8389C16.1525 14.9697 16.1469 15.1096 16.1787 15.2433L17.5737 21.1308C17.5773 21.1389 17.5777 21.1481 17.5747 21.1565C17.5717 21.1648 17.5657 21.1717 17.5578 21.1758C17.5409 21.1889 17.5362 21.1861 17.5221 21.1758L12.3921 18.0211C12.274 17.9485 12.138 17.91 11.9993 17.91C11.8606 17.91 11.7247 17.9485 11.6065 18.0211L6.47652 21.1777C6.46246 21.1861 6.45871 21.1889 6.44089 21.1777C6.43298 21.1736 6.42692 21.1667 6.42395 21.1583C6.42099 21.15 6.42135 21.1408 6.42496 21.1327L7.81996 15.2452C7.85175 15.1114 7.84618 14.9715 7.80385 14.8407C7.76153 14.71 7.68407 14.5933 7.57996 14.5036L3.01433 10.5661C3.00308 10.5567 2.99277 10.5483 3.00214 10.5192C3.01152 10.4902 3.01902 10.4939 3.03308 10.492L9.02558 10.0083C9.16303 9.99649 9.29456 9.94702 9.40571 9.86531C9.51686 9.78361 9.60332 9.67282 9.65558 9.54516L11.9637 3.95672C11.9712 3.94078 11.974 3.93328 11.9965 3.93328C12.019 3.93328 12.0218 3.94078 12.0293 3.95672L14.3431 9.54516C14.3958 9.67287 14.4828 9.78353 14.5945 9.86493C14.7062 9.94632 14.8382 9.99528 14.9759 10.0064L20.9684 10.4902C20.9825 10.4902 20.9909 10.4902 20.9993 10.5173C21.0078 10.5445 20.9993 10.5548 20.9843 10.5642Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_5_2229">
                    <rect
                      width={24}
                      height={24}
                      fill="white"
                      transform="translate(0 0.933411)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <p className='font-semibold'>Important</p>
            </Link>
          </div>

          <div className='bg-white w-full h-fit py-5'>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Sidebar