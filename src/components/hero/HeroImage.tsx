'use client';

import DevImage from "../common/DevImage";

const HeroImage = () => {
  return (
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
  )
}

export default HeroImage