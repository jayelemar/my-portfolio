'use client';

import ProjectCard from "./ProjectCard";
import { projectData } from "./ProjectData";
import ProjectHeader from "./ProjectHeader";

const Projects = () => {
  return (
    <section id="projects" className="relative  mb-44 xl:mb-48 scroll-mt-16 xl:scroll-mt-24">
      <div className="container mx-auto flex flex-col justify-center items-center gap-2">

        {/* text */}
        <ProjectHeader />
        
        {/* Projects */}
        <div className="grid grid-cols-1 gap-4">
          {projectData.map((project, index) => {
            return (
              <ProjectCard key={index} project={project}/>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Projects