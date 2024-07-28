import React from 'react';
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { RiCloseCircleLine } from "react-icons/ri";
import { Link } from 'react-router-dom'

const MobileNav = ({menuItems, onClose, onOpen, hideLeft}) => {
  return (
    <div className='h-16 flex justify-between items-center px-6 lg:px-12'>
        <Link to="/" className='font-bold text-xl text-btnColor'>
            Veggie-Vibes
        </Link>

        <button onClick={onOpen}>
            <HiMiniBars3BottomRight className='w-7 h-7'/>
        </button>

        <div className={`transition-all w-full h-full fixed bg-primary z-50 top-0 ${hideLeft} flex justify-center items-center`}>
            <button className='absolute right-8 top-32' onClick={onClose}>
                <RiCloseCircleLine className='w-7 h-7'/>
            </button>

            <div>
                <ul className='flex flex-col gap-8'>
                    {
                        menuItems?.map((menu, index) => (
                            <li key={index}>
                                <Link to={menu} className='font-medium capitalize text-secondary text-xl'>{menu}</Link>
                            </li>
                            ))
                    }
                </ul>

                {/* login and sign up button */}

                <ul className='flex items-center gap-4 font-medium mt-10'>
                    <li>
                        <button className='text-secondary px-4 py-2 rounded border border-black bg-slate-100 hover:bg-black hover:text-white active:bg-slate-700'>Log In</button>
                    </li>
                    <li>
                        <button className='text-secondary px-4 py-2 rounded border border-black bg-slate-100 hover:bg-black hover:text-white active:bg-slate-700'>Sign Up</button>
                    </li>
                </ul>


            </div>
        </div>
    </div>
  )
}

export default MobileNav