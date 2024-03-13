'use client'; 

import { RiArrowDownSFill } from 'react-icons/ri'
import HeroImage from './HeroImage';
import HeroHeader from './HeroHeader';
import { Suspense } from 'react';
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/variant';

const Hero = () => {
  return (
    <section  id='hero'  className='py-0 h-[85vh] mb-56 xl:py-4 bg-hero bg-no-repeat bg-bottom bg-cover dark:bg-none flex justify-center items-center '>
      <div className="container mx-auto">
        <div  className="flex justify-between gap-x-8 relative ">
          <HeroHeader />
          <Suspense>
            <HeroImage />
          </Suspense>

          {/* down icon */}
          <motion.div
            variants={fadeIn('up', 0.8)}
            initial='hidden'
            whileInView={'show'}
            viewport={{once:false, amount: 0.2}}
            className='hidden xl:flex absolute left-2/4 -bottom-4 animate-bounce'
          >
            <RiArrowDownSFill className='text-3xl text-primary'/>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero