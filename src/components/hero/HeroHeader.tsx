import React from 'react'
import HeroText from './HeroText'
import HeroButtons from './HeroButtons'
import Socials from '../common/Socials'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/variant'


const HeroHeader = () => {
  return (
    <div className="flex max-w-2xl flex-col justify-center items-center xl:items-start text-center mx-auto xl:mx-0 xl:text-left">
      <HeroText />
      <div className="mt-12 xs:mt-6">
        <HeroButtons />
      </div>
      {/* socials */}
      <motion.div
        variants={fadeIn('up', 1.6)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false, amount: 0.2}} 
        className="xs:mt-6"
      >
        <Socials 
          containerStyles='flex justify-between items-center text-center gap-x-6 mx-auto xl:mx-0' 
          iconStyles='text-foreground text-3xl hover:text-primary transition-all hover:scale-110'
        />
      </motion.div>
    </div>
  )
}

export default HeroHeader