import React from 'react';
import FeaturedImg from '../../assets/featured.webp'

const FeaturedSection = () => {
  return (
    <div className='overflow-hidden flex md:flex-row flex-col justify-between items-center sm:my-20 my-4 md:gap-20 gap-12 px-5 lg:px-10'>
        <div className='relative'>
            <div className='absolute top-4 left-5 bg-white text-secondary px-3 py-1 rounded-md uppercase tracking-wider'>Featured Recipe</div>
            <img src={FeaturedImg} alt="Featured Image" className='rounded-md'/>
        </div>

        <div className='text-start sm:w-1/2'>
            <h1 className='text-3xl font-semibold text-secondary sm:text-4xl sm:leading-relaxed'>Pineapple + Smoked Jackfruit Pizza</h1>
            <p className='mt-4 text-[#5c5c5c] text-justify'>The Pineapple + Smoked Jackfruit Pizza is a unique and flavorful combination that blends the sweetness of pineapple with the smoky, meaty texture of jackfruit. </p>
            <div className='lg:mt-0 lg:flex-shrink-0'>
                <div className='mt-12 inline-flex'>
                    <button className='py-4 px-8 bg-btnColor text-white hover:text-secondary hover:bg-white w-full transition ease-in duration-200 text-center text-base font-semibold border border-[#9c702a] rounded-lg'>View Recipe</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FeaturedSection