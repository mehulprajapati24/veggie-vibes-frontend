import React from 'react'
import { IoSearchOutline } from "react-icons/io5";

const Hero = () => {
  return (
    <div className='px-5 xl:px-10 md:w-1/2 mb-10'>
        <h1 className='mb-10 text-2xl xl:text-5xl text-center font-bold text-[#2A3342] leading-normal xl:leading-relaxed'>A blog template made for food <span className='text-orange-400'>influencers</span></h1>
        <form action="/search" className='bg-white p-4 rounded relative flex items-center'>
            <IoSearchOutline className='w-5 h-5 mr-2 text-neutral-300'/>
            <input className='outline-none w-full placeholder:text-[#6b8086]' type="search" name="query" placeholder='Search for a recipe' id='search' required />
        </form>
    </div>
  )
}

export default Hero