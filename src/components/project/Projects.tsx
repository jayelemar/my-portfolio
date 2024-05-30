"use client";

import ProjectCard from "./projectCard/ProjectCard";
import { projectData } from "./ProjectData";
import ProjectHeader from "./ProjectHeader";

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative mb-44 scroll-mt-16 xl:mb-48 xl:scroll-mt-24"
    >
      <div className="container mx-auto flex flex-col items-center justify-center gap-2">
        {/* text */}
        <ProjectHeader />

        {/* Projects */}
        <div className="grid grid-cols-2 gap-8">
          {projectData.map((project, index) => {
            return (
              <ProjectCard
                key={index}
                project={project}
                containerStyles="col-span-2 md:max-w-4xl"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
