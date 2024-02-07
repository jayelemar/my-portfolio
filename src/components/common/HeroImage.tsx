import Image from 'next/image'
import { FC } from 'react'

type HeroImageProps = {
  containerStyles: string,
  imgSrc: string,
}
const HeroImage:FC<HeroImageProps> = ({ containerStyles, imgSrc}) => {
  return (
    <div className={`${containerStyles}`}>
      <Image src={imgSrc} fill sizes='30' priority alt='' className='relative top-0 right-0' />
    </div>
  )
}

export default HeroImage