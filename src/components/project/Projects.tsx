"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProjectCard from "./projectCard/ProjectCard";
import { projectData } from "./ProjectData";
import ProjectHeader from "./ProjectHeader";

const Projects = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const motionRef = useRef<HTMLDivElement | null>(null);
  const featuredProjects = projectData.filter((project) => project.featured);
  const otherProjects = projectData.filter((project) => !project.featured);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    const calculateScrollDistance = () => {
      if (!containerRef.current || !motionRef.current) return;

      const totalWidth = motionRef.current.scrollWidth;
      const visibleWidth = containerRef.current.offsetWidth;
      setScrollDistance(Math.max(0, totalWidth - visibleWidth));
    };

    calculateScrollDistance();

    const resizeObserver = new ResizeObserver(calculateScrollDistance);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (motionRef.current) resizeObserver.observe(motionRef.current);

    return () => resizeObserver.disconnect();
  }, [featuredProjects.length]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  const renderMoreWork = (layout: "grid" | "carousel") => (
    <div className="mt-16 lg:mt-[calc(21rem_-_50vh)]">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            More work
          </p>
          <h3 className="text-3xl font-bold tracking-tight">
            More things I’ve built
          </h3>
        </div>
        <span
          className={`hidden text-sm text-muted-foreground sm:block ${
            layout === "carousel" ? "lg:pr-28" : ""
          }`}
        >
          Experiments and personal projects
        </span>
      </div>

      {layout === "carousel" ? (
        <Carousel
          opts={{ align: "start", slidesToScroll: 1, loop: true }}
          className="w-full"
          aria-label="More projects"
        >
          <CarouselContent className="ml-0">
            {otherProjects.map((project, index) => (
              <CarouselItem
                key={project.name}
                className="px-3"
                style={{ flexBasis: "33.333333%" }}
                aria-label={`${index + 1} of ${otherProjects.length}`}
              >
                <ProjectCard
                  project={project}
                  index={featuredProjects.length + index}
                  variant="compact"
                  animationDelay={0.1 + index * 0.05}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-top-16 left-auto right-12 size-10 translate-y-0 border-primary/30 bg-background text-primary shadow-sm hover:bg-primary/10 hover:text-primary" />
          <CarouselNext
            variant="default"
            className="-top-16 right-0 size-10 translate-y-0 border border-primary bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
          />
        </Carousel>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {otherProjects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={featuredProjects.length + index}
              variant="compact"
              animationDelay={0.1 + index * 0.05}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section id="projects" className="relative mb-44 scroll-mt-24 xl:mb-48">
      <div className="container mx-auto lg:hidden">
        <div>
          <ProjectHeader />
          <div className="grid gap-5">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={index}
                variant="featured"
              />
            ))}
          </div>
          {renderMoreWork("grid")}
        </div>
      </div>

      <div className="hidden lg:block">
        <section
          ref={targetRef}
          className="relative"
          style={{ height: `${featuredProjects.length * 100 + 80}vh` }}
        >
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <div className="container mx-auto">
              <ProjectHeader />

              <div ref={containerRef} className="relative overflow-hidden">
                <motion.div
                  ref={motionRef}
                  style={{ x }}
                  className="flex gap-16 pr-[14%]"
                >
                  {featuredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.name}
                      project={project}
                      index={index}
                      variant="featured"
                      containerStyles="w-[86%] flex-shrink-0"
                      animationDelay={index === 0 ? 0.1 : 0.2}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto">{renderMoreWork("carousel")}</div>
      </div>
    </section>
  );
};

export default Projects;
