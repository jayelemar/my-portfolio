'use client';


import { Card, CardHeader } from '../ui/card'
import { FC } from 'react';
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
          <ProjectCardHeader 
            desktopImage={desktopImage} 
            mobileImage={mobileImage}
          />
        </CardHeader>

        <ProjectCardBody 
          category={category} 
          name={name} 
          description={description} 
          link={link} 
          github={github}
        />

      </Card>



  )
}

export default ProjectCard