'use client';


import { Card, CardHeader } from '../../ui/card'
import { FC } from 'react';
import { ProjectType } from '../ProjectData';
import ProjectCardHeader from './ProjectCardHeader';
import ProjectCardBody from './ProjectCardBody';
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/variant';

type ProjectCardProps = {
  project: ProjectType
}

const ProjectCard:FC<ProjectCardProps> = ({ project }) => {
  const { desktopImage,mobileImage, link, category, name, description, github } = project
  return (
      <motion.div
        variants={fadeIn('left', 1.4)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false, amount: 0.1}}
      >
        <Card className='group overflow-hidden relative flex flex-col xl:flex-row'>
          <CardHeader className='xl:w-[700px]'>
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
      </motion.div>



  )
}

export default ProjectCard