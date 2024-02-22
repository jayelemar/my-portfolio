import React, { FC } from 'react'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { FiGithub, FiLink } from 'react-icons/fi'

type ProjectCardBodyType = {
  category: string,
  name: string,
  description: string,
  link: string,
  github: string,
}

const ProjectCardBody:FC<ProjectCardBodyType> = ({ category, name, description, link, github }) => {
  return (
    <div className=" h-full px-8 pt-0 pb-16 xl:py-6">
      <Badge className='uppercase text-sm font-medium mb-2 absolute top-4 left-5' >
        {category}
      </Badge>
      <h4 className='h4 mb-1'>{name}</h4>
      <p className='text-muted-foreground text-lg mb-2 '>{description}</p>
      <div className="flex">
        {/* buttons */}
        <div className='absolute flex gap-2'>
          <Link href={link} target='_blank' className='bg-primary px-2 py-1 rounded-full flex gap-1 justify-center items-center  hover:scale-110 text-sm font-medium text-muted'>
              Demo <FiLink />
            </Link>
          <Link href={github} target='_blank' className='bg-muted text-muted-foreground p-2 rounded-full hover:scale-110'>
            <FiGithub />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProjectCardBody