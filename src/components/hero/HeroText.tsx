'use client';
import { fadeIn } from '@/lib/variant';
import { motion } from 'framer-motion'
import { useTypewriter, Cursor } from 'react-simple-typewriter'

const HeroText = () => {
  const [ text ] = useTypewriter({
    words: ['Full Stack Developer', 'React JS Developer'],
    loop: false,
    deleteSpeed: 20,
  })

  return (
    <>
      <motion.p 
        variants={fadeIn('left', 0.4)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false, amount: 0.2}}
        className="text-sm uppercase font-semibold mb-4 text-primary tracking-wide absolute top-4 xs:top-0 xl:top-6 xl:left-1 whitespace-nowrap"
      >
        { text }
      <span className='text-primary'>
        <Cursor />
      </span>
      </motion.p>
      <motion.h1
        variants={fadeIn('up', 0.6)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false, amount: 0.2}}

        className='pt-10 text-5xl xl:text-[72px] xl:leading-[80px] tracking-tight mb-4 font-bold md:max-w-lg'
      >
        Hello, my <span className='inline xs:hidden'><br /></span>
        name is <span className='inline md:hidden'><br /></span>
        <span className='whitespace-nowrap'>Jay Elemar</span>
      </motion.h1>
      <motion.p
        variants={fadeIn('up', 0.8)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false, amount: 0.2}}
        className='text-center xl:text-left text-muted-foreground text-xl  font-light max-w-lg'>
        a self taught developer with passion for design, automation and technologies
      </motion.p>
    </>
  )
}

export default HeroText