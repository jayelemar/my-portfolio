'use client';

import { RiYoutubeFill, RiLinkedinFill, RiGithubFill, RiFacebookFill} from 'react-icons/ri'
import Link from 'next/link';
import { FC } from 'react';

const icons = [
  {
    path: '/',
    name: <RiLinkedinFill/>
  },
  {
    path: '/',
    name: <RiGithubFill/>
  },
  {
    path: '/',
    name: <RiFacebookFill/>
  },
]

type SocialsProps = {
  containerStyles: string,
  iconStyles: string,
}

const Socials:FC<SocialsProps> = ({ containerStyles, iconStyles }) => {
  return (
    <div className={`${containerStyles}`}>
      {icons.map((icon, index) => {
        return (
          <Link href={icon.path} key={index} className={iconStyles}>
            {icon.name }
          </Link>
        )
      })}
    </div>
  )
}

export default Socials