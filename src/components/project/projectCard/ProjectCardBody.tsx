import React, { FC } from 'react'
import { Badge } from '../../ui/badge'
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
    <div className=" h-full px-8 pt-0 pb-16 xl:py-6 xl:basis-1/2">
      <Badge className='uppercase text-sm font-medium mb-2 absolute top-4 left-5' >
        {category}
      </Badge>
      <h1 className='h4 mb-1 text-primary'>{name}</h1>
      <p className='text-muted-foreground text-lg mb-3'>{description}</p>
      <div className="flex">
        {/* buttons */}
        <div className='absolute flex gap-3'>
          <Link 
            href={link} 
            target='_blank' 
            className='bg-primary px-3 py-1 rounded-full flex gap-1 justify-center items-center  hover:scale-110 text-sm font-medium text-muted'
            aria-label='Click to see the Linked Project'
          >
              Demo <FiLink />
          </Link>
          <Link 
            href={github} 
            target='_blank' 
            className='bg-muted text-muted-foreground p-2 rounded-full hover:scale-125'
            aria-label='Click to see the Github Repot'
          >
            <FiGithub />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProjectCardBody