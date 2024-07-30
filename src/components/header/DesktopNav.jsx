import React from 'react'
import { Link } from 'react-router-dom'

const DesktopNav = ({menuItems}) => {
  return (
    <div className='h-16 flex justify-between items-center px-6 lg:px-12'>
        <Link to="/" className='font-bold text-2xl text-btnColor'>
            Veggie-Vibes
        </Link>

        <ul className='flex gap-7'>
            {
                menuItems?.map((menu, index)=>(
                    <li key={index}>
                        <Link to={menu === "home" ? "/" : menu} className='font-medium capitalize' text-secondary>{menu}</Link>
                    </li>
                ))
            }
        </ul>

        {/* login and sign up button */}

        <ul className='flex items-center gap-4 font-medium'>
            <li>
                <Link to="/login" className='text-secondary px-4 py-2 rounded border border-black bg-slate-100 hover:bg-black hover:text-white active:bg-slate-700'>Log In</Link>
            </li>
            <li>
                <Link to="/signup" className='text-secondary px-4 py-2 rounded border border-black bg-slate-100 hover:bg-black hover:text-white active:bg-slate-700'>Sign Up</Link>
            </li>
        </ul>
    </div>
  )
}

export default DesktopNav