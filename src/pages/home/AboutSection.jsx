import React, { useEffect } from 'react'
import AboutImg from '../../assets/about-image.jpg'
import { Link } from 'react-router-dom'

const AboutSection = () => {

  return (
    <div className='overflow-hidden flex md:flex-row flex-col justify-between items-center sm:my-20 my-4 md:gap-20 gap-12 px-5 lg:px-10'>

        <div className='text-start sm:w-1/2'>
            <h1 className='text-3xl font-semibold text-secondary sm:text-4xl sm:leading-relaxed'>Vegan foodie who loves to experiment with recipes</h1>
            <p className='mt-4 text-[#5c5c5c] text-justify'>Sharing and exploring vegan recipes can build a sense of community, connecting with like-minded individuals through cooking classes, social media, or local vegan groups. This can lead to new friendships and a supportive network of fellow food enthusiasts. </p>
            <p className='mt-4 text-[#5c5c5c] text-justify'>Constantly trying new recipes enhances culinary skills and creativity, making cooking a fun and rewarding experience. </p>
            <div className='lg:mt-0 lg:flex-shrink-0'>
                <div className='mt-12 inline-flex'>
                    <Link to="/recipes">
                        <button className='py-4 px-8 bg-btnColor text-white hover:text-secondary hover:bg-white w-full transition ease-in duration-200 text-center text-base font-semibold border border-[#9c702a] rounded-lg'>View Recipes</button>
                    </Link>
                </div>
            </div>
        </div>

        <div>
            <img src={AboutImg} alt="Featured Image" className='rounded-md'/>
        </div>

    </div>
  )
}

export default AboutSection