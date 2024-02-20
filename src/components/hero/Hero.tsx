'use client'; 

import { RiArrowDownSFill } from 'react-icons/ri'
import HeroImage from './HeroImage';
import HeroHeader from './HeroHeader';

const Hero = () => {
  return (
    <section  id='hero'  className='py-0 h-[85vh] mb-44 xl:mb-96 xl:py-4 bg-hero bg-no-repeat bg-bottom bg-cover dark:bg-none  '>
      <div className="container mx-auto">
        <div  className="flex justify-between gap-x-8 relative ">
          <HeroHeader />
          <HeroImage />
          {/* down icon */}
          <div className='hidden xl:flex absolute left-2/4 -bottom-16 animate-bounce '>
            <RiArrowDownSFill className='text-3xl text-primary'/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero