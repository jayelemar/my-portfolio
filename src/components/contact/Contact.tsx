'use client';

import React from 'react'
import { info } from '../about/AboutData'
import ContactForm from './ContactForm';


const Contact = () => {
  const filteredInfo = info.filter((item) => item.text !== "Jay Elemar Termulo" )

  return (
    <section id='contact' className='scroll-mt-12'>
      <div className="container mx-auto mb-16 ">
        {/* text header */}
        <div>
          <div className="flex items-center gap-x-4 text-primary text-lg mb-4">
            <span className='w-[30px] h-0.5 bg-primary'></span>
            Say Hello !
          </div>
        <h1 className='h1 max-w-md md:w-auto md:whitespace-nowrap'>Lets Work Together.</h1>
        </div>

        <div className="md:mx-0  gap-x-6 flex flex-col md:flex-row md:justify-between md:items-center xl:mx-10">
                  {/* text & illustration*/}
          <div className="flex flex-col md:basis-2/5 pt-4 md:pt-8 mb-6 md:mb-12 xl:mb-0">
          {/* text  */}
          <div className="flex flex-col justify-center">
            <p className='flex subtitle max-w-full text-lg font-base text-muted-foreground text-balance'>I&apos;m available for freelance & full time positions. 
            </p>
            <p className='flex subtitle max-w-full mb-6 text-lg font-base text-muted-foreground'>
              Contact me and lets talk.
            </p>
          </div>
          <div className="flex flex-col gap-y-4 md:gap-y-12 mb-12 md:mb-10 text-base">
            {/* info */}
            { filteredInfo.map((info, index) => {
              return (
                <div key={index} className="flex items-center text-center gap-x-8 ">
                  <span className='text-primary'>{info.icon}</span>
                <div className="text-muted-foreground">{info.text}</div>
              </div>
              )
            })}
          </div>
          </div>
          {/* form */}
          <div className="md:basis-4/5">
          <ContactForm />
          </div>
        </div>








      </div>
    </section>
  )
}

export default Contact