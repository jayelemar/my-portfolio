'use client'; 

import Socials from './Socials'
import { RiArrowDownSFill } from 'react-icons/ri'
import { Download, Send } from 'lucide-react';
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import DevImage from './DevImage';


const Hero = () => {
  return (
    <section  id='hero'  className='py-0 h-[85vh] mb-12 xl:py-4 bg-hero bg-no-repeat bg-bottom bg-cover dark:bg-none  '>
      <div className="container mx-auto">
        <div  className="flex justify-between gap-x-8 relative ">
          {/* text */}
          <div className="flex max-w-2xl flex-col justify-center items-center xl:items-start text-center mx-auto xl:mx-0 xl:text-left">
            <div className="text-sm uppercase font-semibold mb-4 text-primary tracking-wide absolute top-4 xl:top-6 xl:left-1 whitespace-nowrap">
              Front End Developer
            </div>
            <h1   className='pt-10 text-5xl xl:text-[72px] xl:leading-[80px] tracking-tight mb-4 font-bold md:max-w-lg'>
              Hello, my <span className='inline xs:hidden'><br /></span>
              name is <span className='inline md:hidden'><br /></span>
              <span className='whitespace-nowrap'>Jay Elemar</span>
            </h1>
            <p className='text-center xl:text-left text-muted-foreground text-xl mb-4 font-light max-w-lg'>
              an aspiring developer with passion for design, automation and technologies
            </p>
            {/* buttons */}
            <div className="flex flex-col gap-3 lg:flex-row lg:justify-center xl:justify-start w-full mx-auto xl:mx-0 mb-16 xs:mb-5 lg:mb-12 xl:mb-5">
              <Link href='/contact'>
                <Button className='gap-2 rounded-full text-base w-44'>
                  Contact Me <Send size={18}/>
                </Button>
              </Link>
              <Link href='/contact'>
                <Button variant={'secondary'} className='gap-2 rounded-full text-base w-44 bg-foreground/10 hover:bg-foreground/15'>
                  Download CV <Download size={18}/>
                </Button>
              </Link>
            </div>
            {/* socials */}
            <Socials 
              containerStyles='flex justify-between items-center text-center gap-x-6 mx-auto xl:mx-0' 
              iconStyles='text-foreground text-3xl hover:text-primary transition-all'
            />
          </div>

           {/* image */}
          <div className="hidden xl:flex ">
            <div 
              className="bg-[url('/hero/shape-2-light.svg')]  dark:bg-[url('/hero/shape-2-dark.svg')]  w-[500px] h-[800px] bg-no-repeat absolute right-0 -top-20">
            </div>
            <DevImage 
              containerStyles={`
                w-[433px] h-[577px] bg-no-repeat absolute -top-32 right-8 scale-[.7]
              `} 
              imgSrc='/hero/dev.png'
            />
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