'use client';

import DevImage from "../common/DevImage";

const HeroImage = () => {
  return (
    <div className="hidden xl:flex ">
      <div 
        className="bg-[url('/hero/shape-2-light.svg')]  dark:bg-[url('/hero/shape-2-dark.svg')]  w-[480px] h-[780px] bg-no-repeat absolute right-1 -top-[70px]">
      </div>
      <DevImage 
        containerStyles={`
          w-[433px] h-[577px] bg-no-repeat absolute -top-28 right-10 scale-[.8]
        `} 
        imgSrc='/hero/dev.png'
      />
    </div>
  )
}

export default HeroImage