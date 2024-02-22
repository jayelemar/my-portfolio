import Image from 'next/image'
import { FC } from 'react'

type DevImageProps = {
  containerStyles: string,
  imgSrc: string,
}
const DevImage:FC<DevImageProps> = ({ containerStyles, imgSrc}) => {
  return (
    <div className={`${containerStyles}`}>
      <Image src={imgSrc} fill sizes='30' priority alt='' loading="lazy" className='relative top-0 right-0' />
    </div>
  )
}

export default DevImage