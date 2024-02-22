'use client';

import Link from 'next/link'

import { Card, CardHeader } from '../ui/card'
import Image from 'next/image';
import { FC } from 'react';
import { FiGithub, FiLink } from "react-icons/fi";
import { Badge } from '../ui/badge';
import { ProjectType } from './ProjectData';
import ProjectCardHeader from './ProjectCardHeader';
import ProjectCardBody from './ProjectCardBody';

type ProjectCardProps = {
  project: ProjectType
}

const ProjectCard:FC<ProjectCardProps> = ({ project }) => {
  const { desktopImage,mobileImage, link, category, name, description, github } = project
  return (

      <Card className='group overflow-hidden relative flex flex-col xl:flex-row  '>
        <CardHeader className='w-full'>
          {/* Image */}
          <ProjectCardHeader desktopImage={desktopImage} mobileImage={mobileImage}/>

        </CardHeader>

        <ProjectCardBody 
          category={category} name={name} description={description} link={link} github={github}
        />

      </Card>



  )
}

export default ProjectCard