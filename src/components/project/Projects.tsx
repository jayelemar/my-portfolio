"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import ProjectCard from "./projectCard/ProjectCard";
import { projectData } from "./ProjectData";
import ProjectHeader from "./ProjectHeader";

const Projects = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const motionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    if (containerRef.current && motionRef.current) {
      const totalWidth = motionRef.current.scrollWidth;
      const visibleWidth = containerRef.current.offsetWidth;
      setScrollDistance(totalWidth - visibleWidth);
    }
  }, [projectData.length]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  return (
    <section
      id="projects"
      className="relative mb-44 scroll-mt-16 xl:mb-48 xl:scroll-mt-24"
    >
      <div className="container mx-auto flex flex-col gap-2">
        {/* Mobile / tablet view */}
        <div className="grid grid-cols-2 gap-8 lg:hidden">
          <ProjectHeader />
          {projectData.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              containerStyles="col-span-2 md:max-w-4xl"
            />
          ))}
        </div>

        {/* Desktop horizontal carousel */}

        <section ref={targetRef} className="relative hidden h-[700vh] lg:block">
          <div
            ref={containerRef}
            className="sticky top-0 flex h-screen flex-col overflow-hidden"
          >
            {/* Header stays sticky until carousel ends */}
            <div className="sticky top-0 z-20 bg-neutral-900/0">
              <ProjectHeader />
            </div>

            <motion.div
              ref={motionRef}
              style={{ x }}
              className="mt-44 flex gap-8 px-8"
            >
              {projectData.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  containerStyles="w-[70vw] max-w-3xl flex-shrink-0"
                />
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Projects;
