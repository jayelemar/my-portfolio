import { HomeIcon, MailIcon, PhoneIcon } from 'lucide-react'
import React from 'react'
import { info } from '../about/AboutData'
import Form from './Form'

const Contact = () => {
  const filteredInfo = info.filter((item) => item.text !== "Jay Elemar Termulo" )

  return (
    <section>
      <div className="container mx-auto">

        {/* text & illustration*/}
        <div className="grid xl:grid-cols-2 pt-12 xl:h-[480px] mb-6 xl:mb-24">
          {/* text  */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-x-4 text-primary text-lg mb-4">
              <span className='w-[30px] h-0.5 bg-primary'></span>
              Say Hello !
            </div>
            <h1 className='h1 max-w-md mb-8'>Lets Work Together.</h1>
            <p className='subtitle max-w-[400px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores nulla magni adipisci tempore.
            </p>
          </div>
          {/* illustration */}
          <div className="hidden xl:flex w-full h-[670px]  bg-no-repeat bg-[url('/contact/illustration.svg')]  bg-contain bg-center relative top-8 right-8 scale-[.8]
          ">

          </div>
        </div>

        {/* info text and form  */}
        <div className="grid xl:grid-cols-2 mb-24 xl:mb-32">
          <div className="flex flex-col gap-y-4 xl:gap-y-14 mb-12 xl:mb-24 text-base">
            {/* info */}
            { filteredInfo.map((info, index) => {
              return (
                <div key={index} className="flex items-center text-center gap-x-8 ">
                  <span className='text-primary'>{info.icon}</span>
                <div className="">{info.text}</div>
              </div>
              )
            })}
          </div>
          
          {/* form */}
          <div className="">
            <Form />
          </div>
        </div>


      </div>
    </section>
  )
}

export default Contact