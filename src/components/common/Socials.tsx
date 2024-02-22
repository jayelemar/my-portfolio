'use client';

import { RiLinkedinFill, RiGithubFill, RiFacebookFill} from 'react-icons/ri'
import Link from 'next/link';
import { FC } from 'react';

const icons = [
  {
    path: 'https://www.linkedin.com/in/jay-termulo/',
    name: <RiLinkedinFill/>
  },
  {
    path: 'https://github.com/jayelemar',
    name: <RiGithubFill/>
  },
  {
    path: 'https://facebook.com/jayelemar.termulo/',
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
          <Link href={icon.path} target='_blank' key={index} className={iconStyles} aria-label={`See more details in my ${icon.name} account`} >
            {icon.name }
          </Link>
        )
      })}
    </div>
  )
}

export default Socials