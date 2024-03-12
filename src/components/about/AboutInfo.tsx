import React from 'react'
import { info } from "./AboutData";
import { GraduationCap } from 'lucide-react';

import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/variant';

const AboutInfo = () => {
  return (
    <motion.div 
      variants={fadeIn('up', 0.2)}
      initial='hidden'
      whileInView={'show'}
      viewport={{once:false, amount: 0.2}}
    >
      {info.map((item, index) => {
        return (
          <div 
            className="flex items-center gap-x-4 m-6 pl-4 mx-auto xl:mx-0 text-left text-balance" key={index}>
            <div className="text-primary">{item.icon}</div>
            <div className="">{item.text}</div>
          </div>
        )
      })}
      <div
        className=" items-center gap-x-4 m-6 pl-4 mx-auto xl:mx-0 text-left text-balance hidden md:flex"
      >
        <div className="text-primary"><GraduationCap size={25} /></div>
        <div className="text-left">
          <p className="">Bachelor of Science in</p>
          <p className="">Electronics Engineering</p>
        </div>
      </div>
    </motion.div>
  )
}

export default AboutInfo