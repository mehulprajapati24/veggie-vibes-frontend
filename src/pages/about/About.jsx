import React from 'react'
import { FaQuoteLeft } from "react-icons/fa";
import AboutImg from '../../assets/featured.webp'

const About = () => {
  return (
    <div className='px-6 lg:px-12 py-10'>
        <h2 className='text-center text-3xl mb-4 font-semibold text-secondary sm:text-5xl sm:leading-relaxed'>
            About
        </h2>

        <p className='text-center sm:w-1/2 mx-auto mb-20'>
            Constantly trying new recipes enhances culinary skills and creativity, making cooking a fun and rewarding experience.
        </p>

        {/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}

<div className='overflow-hidden flex md:flex-row flex-col justify-between items-center sm:my-20 my-4 md:gap-20 gap-12 px-5 lg:px-10'>

<div className='text-start sm:w-1/2'>
    <h1 className='text-3xl font-semibold text-secondary sm:text-4xl sm:leading-relaxed'>Vegan foodie who loves to experiment with recipes</h1>
    <p className='mt-4 text-[#5c5c5c] text-justify'>Sharing and exploring vegan recipes can build a sense of community, connecting with like-minded individuals through cooking classes, social media, or local vegan groups. This can lead to new friendships and a supportive network of fellow food enthusiasts. </p>
    <p className='mt-4 text-[#5c5c5c] text-justify'>Constantly trying new recipes enhances culinary skills and creativity, making cooking a fun and rewarding experience. </p>
    <div className='lg:mt-0 lg:flex-shrink-0'>
        <div className='mt-12 inline-flex'>
            <button className='py-4 px-8 bg-btnColor text-white hover:text-secondary hover:bg-white w-full transition ease-in duration-200 text-center text-base font-semibold border border-[#9c702a] rounded-lg'>View Recipe</button>
        </div>
    </div>
</div>

<div>
    <img src={AboutImg} alt="Featured Image" className='rounded-md'/>
</div>

</div>

    <div className='container mx-auto px-6 py-10'>
        <div className='flex flex-col md:flex-row items-center justify-between relative w-100 h-auto md:h-64 bg-white shadow-2xl rounded-lg p-8'>
            <div className='w-8/12 text-2xl'>
                <FaQuoteLeft className='float-left mr-2'/>

                <span className='flex'>We are team of developers with hundreds hours spend on coding, we create professional apps, webs.</span>

            </div>

            <div>
                <button className='py-4 px-8 bg-btnColor text-white hover:text-secondary hover:bg-white w-full transition ease-in duration-200 text-center text-base font-semibold border border-[#9c702a] rounded-lg'>Call Now</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default About