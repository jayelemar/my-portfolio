'use client';

import Link from 'next/link'

import { Card, CardHeader } from '../ui/card'
import Image from 'next/image';
import { FC } from 'react';
import { FiGithub, FiLink } from "react-icons/fi";
import { Badge } from '../ui/badge';
import { ProjectType } from './ProjectData';

type ProjectCardProps = {
  project: ProjectType
}

const ProjectCard:FC<ProjectCardProps> = ({ project }) => {
  const { desktopImage,mobileImage, link, category, name, description, github } = project
  return (

      <Card className='group overflow-hidden relative flex flex-col xl:flex-row  '>
        <CardHeader className='w-full'>
          {/* Image */}
          <div className="relative w-full h-[210px] sm:h-[300px] flex items-center justify-center lg:bg-[110%] lg:no-repeat overflow-hidden bg-green-50 "
          >
            <Image src={desktopImage} alt='' width={300} height={200} priority   
              className='absolute group-hover:scale-110 transition-all duration-800 ease-in-out '/>
            <div className="w-[700px] flex justify-center items-center relative">
              <Image src='/work/laptop-view.png' alt='laptop-view' width={470} height={470} priority className='overflow-hidden z-10 hidden sm:flex' />
              <Image src={mobileImage} alt='' width={100} height={470} priority className='overflow-hidden z-10  absolute w-[100px] right-24 top-[170px] ' />
            </div>
          </div>
        </CardHeader>

        <div className=" h-full px-8 pt-0 pb-16 lg:py-6">
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

      </Card>



  )
}

export default ProjectCard