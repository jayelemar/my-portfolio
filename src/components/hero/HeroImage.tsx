'use client';

import { fadeIn } from "@/lib/variant";
import DevImage from "../common/DevImage";
import { motion } from 'framer-motion'

const HeroImage = () => {
  return (
    <div className="hidden xl:flex ">
      <motion.div 
        variants={fadeIn('up', .9)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false, amount: 0.2}}
        className="bg-[url('/hero/shape-2-light.svg')]  dark:bg-[url('/hero/shape-2-dark.svg')]  w-[480px] h-[780px] bg-no-repeat absolute right-1 -top-[70px]">
      </motion.div>
      <motion.div
        variants={fadeIn('up', 1)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false, amount: 0.2}}
      >
        <DevImage 
          containerStyles={`
            w-[433px] h-[577px] bg-no-repeat absolute -top-28 right-10 scale-[.8]
          `} 
          imgSrc='/hero/dev.png'
        />
      </motion.div>
    </div>
  )
}

export default HeroImage