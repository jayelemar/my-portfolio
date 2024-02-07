'use client'; 

import HeroImage from './HeroImage'
import Socials from './Socials'
import { RiArrowDownSFill } from 'react-icons/ri'
import { Download, Send } from 'lucide-react';
import { Button } from "@/components/ui/button"
import Link from 'next/link'


const Hero = () => {
  return (
    <section className='py-12  h-[84vh] xl:py-4 bg-foreground/10 bg-hero bg-no-repeat bg-bottom bg-cover dark:bg-none'>
      
      <div className="container mx-auto">
        <div className="flex justify-between gap-x-8 relative">
          {/* text */}
          <div className="flex max-w-2xl flex-col justify-center items-center xl:items-start text-center mx-auto xl:mx-0 xl:text-left">
            <div className="text-sm uppercase font-semibold mb-4 text-primary tracking-wide absolute top-0 xl:top-6 xl:left-1">
              Web Developer
            </div>
            <h1 className='pt-10 text-5xl xl:text-[72px] xl:leading-[80px] tracking-tight mb-4 font-bold'>
              Hello, my name is <span className='whitespace-nowrap'>Jay Elemar</span>
            </h1>
            <p className='text-center xl:text-left text-muted-foreground text-xl mb-6 font-light max-w-lg'>
              brief description with insights into myself, my vocational journey, and what  i engage in professionally
            </p>
            {/* buttons */}
            <div className="flex flex-col gap-3 xl:flex-row w-full mx-auto xl:mx-0 mb-3 xl:mb-6">
              <Link href='/contact'>
                <Button className='gap-2 rounded-full text-base w-44'>
                  Contact Me <Send size={18}/>
                </Button>
              </Link>
              <Link href='/contact'>
                <Button variant={'secondary'} className='gap-2 rounded-full text-base w-44 bg-foreground/10'>
                  Download CV <Download size={18}/>
                </Button>
              </Link>
            </div>
            {/* socials */}
            <Socials 
              containerStyles='flex justify-between items-center text-center gap-x-6 mx-auto xl:mx-0' iconStyles='text-foreground text-3xl hover:text-primary transition-all'/>
          </div>

           {/* image */}
          <div className="hidden xl:flex ">
            <div 
              className="bg-[url('/hero/shape-2-light.svg')]  dark:bg-[url('/hero/shape-2-dark.svg')]  w-[500px] h-[800px] bg-no-repeat absolute right-0 -top-12">
            </div>

            <HeroImage 
              containerStyles={`
                w-[300px] h-[500px] bg-no-repeat absolute -top-28 right-16
              `} 
              imgSrc='/hero/dev.png'/>
          </div>

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