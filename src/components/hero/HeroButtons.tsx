'use client';

import Link from "next/link";
import { Button } from "../ui/button";
import { Download, Send } from "lucide-react";
import { motion } from 'framer-motion'
import { fadeIn } from "@/lib/variant";



const HeroButtons = () => {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:justify-center xl:justify-start w-full mx-auto xl:mx-0 mb-12 xs:mb-5 lg:mb-12 xl:mb-5">
      <motion.div
        variants={fadeIn('up', 1.2)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false, amount: 0.2}}
      >
      <Link href='#contact'>
        <Button className='gap-2 rounded-full text-base w-44 hover:scale-105'>
          Contact Me <Send size={18}/>
        </Button>
      </Link>
      </motion.div>

      <motion.div
        variants={fadeIn('up', 1.4)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false, amount: 0.2}}
      >
        <Link 
          href='https://drive.google.com/uc?id=16ISbek2KoUqtkvyVkx18GNjWJx0IIBjQ' 
          download
        >
          <Button variant={'secondary'} className='gap-2 rounded-full text-base w-44 btn-secondary'>
            Download CV <Download size={18}/>
          </Button>
        </Link>
      </motion.div>

    </div>
  )
}

export default HeroButtons