import Image from 'next/image'
import React, { FC } from 'react'

type ProjectCardHeader = {
  desktopImage: string,
  mobileImage: string,
}

const ProjectCardHeader:FC<ProjectCardHeader> = ({ desktopImage, mobileImage }) => {
  return (
    <div className="relative w-full h-[210px] sm:h-[300px] flex items-center justify-center lg:bg-[110%] lg:no-repeat overflow-hidden bg-green-50 "
    >
      <Image 
        src={desktopImage} 
        alt='' 
        width={300} 
        height={200} 
        priority   
        className='absolute group-hover:scale-110 transition-all duration-800 ease-in-out'
        loading='lazy'
      />

      <div className="w-[700px] flex justify-center items-center relative">
        <Image 
          src='/work/laptop-view.png' 
          alt='laptop-view' 
          width={470} 
          height={470} 
          priority 
          className='overflow-hidden z-10 hidden sm:flex' 
        />
        <Image 
          src={mobileImage} 
          alt='' 
          width={100} 
          height={470} 
          priority 
          className='overflow-hidden z-10  absolute w-[100px] right-24 top-[170px]'
          loading='lazy'
        />
      </div>
    </div>
  )
}

export default ProjectCardHeader