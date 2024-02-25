import React from 'react'
import DevImage from '../common/DevImage'

const AboutImage = () => {
  return (
    <div className="hidden xl:flex flex-1 relative -top-12    ">
      <div className="bg-[url('/about/shape-light.svg')] dark:bg-[url('/about/shape-dark.svg')] w-[505px] h-[575px] bg-no-repeat relative scale-[.65] -top-8 left-0">
        <DevImage 
          containerStyles="w-[473px] h-[527px]  absolute -top-1 -right-3 "
          imgSrc='/about/developer.png'
        />
      </div>
    </div>
  ) 
}

export default AboutImage