import React from 'react'
import DevImage from '../common/DevImage'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/variant'


const AboutImage = () => {
  return (
    <div className="hidden xl:flex flex-1 relative -top-12    ">
      <motion.div 
        variants={fadeIn('up', 0.8)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false, amount: 0.2}}
        className="bg-[url('/about/shape-light.svg')] dark:bg-[url('/about/shape-dark.svg')] w-[328px] h-[328px] bg-no-repeat relative left-12 top-10"
      >
        <DevImage 
          containerStyles="w-[281px] h-[375px]  absolute -top-4 left-10"
          imgSrc='/about/developer.png'
        />
      </motion.div>
    </div>
  ) 
}

export default AboutImage