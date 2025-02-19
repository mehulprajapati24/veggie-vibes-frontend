import React from 'react'
import Hero from '../../components/Hero'
import CategoryWrapper from '../category/CategoryWrapper'
import FeaturedSection from './FeaturedSection'
import LatestRecipe from './LatestRecipe'
import NewsLetter from './NewsLetter'
import AboutSection from './AboutSection'
import CompanyLogo from './CompanyLogo'
import Footer from '../../components/Footer'

const Home = () => {
  return (
    <div className='container mx-auto'>
      <div className='flex flex-col justify-center items-center w-full py-10'>
        <Hero/>
        <CategoryWrapper/>
      </div>

      <FeaturedSection/>
      <LatestRecipe/>
      <AboutSection/>
      <CompanyLogo/>
      <hr/>
      <NewsLetter/>
    </div>
  )
}

export default Home