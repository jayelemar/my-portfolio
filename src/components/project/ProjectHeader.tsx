import React from 'react'
import { SiCodeforces } from 'react-icons/si'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/variant'

const ProjectHeader = () => {
  return (
    <div className="mx-auto xl:mx-0 text-center xl:text-left mb-6 h-[15vh] flex flex-col justify-center w-full ">
      <motion.h2
        variants={fadeIn('up', 0.4)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false, amount: 0.2}}
        className="mb-8 xl:mb-6 mx-auto xl:mx-0 text-4xl font-bold relative w-max gap-x-3 flex justify-center items-center"
      >
        <SiCodeforces size={35} className="text-primary"/>
        My Projects
      </motion.h2>

      <motion.p
        variants={fadeIn('up', 0.8)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false, amount: 0.2}}
        className="text-center xl:text-left"
      >
        Check out some of my works
      </motion.p>
    </div>
  )
}

export default ProjectHeader