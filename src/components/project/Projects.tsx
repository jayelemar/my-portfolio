"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import ProjectSelector from "./ProjectSelector";
import ProjectReveal from "./ProjectReveal";
import { scrollToSection } from "@/lib/navigation";
import {
  projectEntrance,
  projectCarouselEntrance,
  projectSlideEntrance,
  projectTiming,
  useProjectEntrance,
} from "./useProjectEntrance";

const featuredProjects = projectData.filter((project) => project.featured);
const otherProjects = projectData.filter((project) => !project.featured);

const Projects = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const requestedProject = useRef(0);
  const navigating = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { ref: stageRef, reduceMotion, visit } = useProjectEntrance();

  const showProject = useCallback((index: number, instant = false) => {
    index = Math.max(0, Math.min(featuredProjects.length - 1, index));
    const gallery = galleryRef.current;
    const item = gallery?.children[index] as HTMLElement | undefined;
    if (!gallery || !item) return;
    requestedProject.current = index;
    navigating.current = true;
    setActiveProject(index);
    gallery.scrollTo({
      left:
        item.getBoundingClientRect().left -
        gallery.getBoundingClientRect().left +
        gallery.scrollLeft,
      behavior:
        instant || window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
    });
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      navigating.current = false;
    }, 150);
  }, []);

  const updateActiveProject = () => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const items = Array.from(gallery.children) as HTMLElement[];
    const left = gallery.getBoundingClientRect().left;
    const closest = items.reduce(
      (best, item, index) =>
        Math.abs(item.getBoundingClientRect().left - left) <
        Math.abs(items[best].getBoundingClientRect().left - left)
          ? index
          : best,
      0,
    );
    if (navigating.current) {
      if (settleTimer.current) clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(() => {
        navigating.current = false;
        requestedProject.current = closest;
        setActiveProject(closest);
      }, 150);
    } else {
      requestedProject.current = closest;
      setActiveProject(closest);
    }
  };

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    let frame = 0;
    const resize = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (window.matchMedia("(min-width: 1024px)").matches)
          showProject(requestedProject.current, true);
      });
    });
    resize.observe(gallery);
    if (location.hash === "#projects") scrollToSection("projects");
    return () => {
      resize.disconnect();
      cancelAnimationFrame(frame);
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, [showProject]);

  const interruptGallery = () => {
    navigating.current = false;
    if (settleTimer.current) clearTimeout(settleTimer.current);
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="mb-24 scroll-mt-32 lg:scroll-mt-20 xl:mb-32"
    >
      <div className="container mx-auto max-w-[1264px]">
        <div
          ref={stageRef}
          className="flex min-h-[calc(100svh-4.75rem)] flex-col justify-center py-6 sm:py-8"
        >
          <ProjectReveal
            sequence
            reduceMotion={reduceMotion}
            entranceKey={visit}
          >
            {(controls) => (
              <>
                <ProjectHeader controls={controls} />
                <motion.div
                  variants={projectEntrance}
                  initial={false}
                  animate={controls}
                  custom={projectTiming.selectors}
                  className="mb-6 hidden flex-wrap items-center justify-between gap-4 lg:flex"
                >
                  <ProjectSelector
                    style="segmented"
                    names={featuredProjects.map((project) => project.name)}
                    active={activeProject}
                    onSelect={showProject}
                    reduceMotion={reduceMotion}
                    controlsId="featured-projects"
                  />
                  <div className="flex items-center gap-3">
                    <span
                      className="min-w-12 text-center text-sm tabular-nums text-muted-foreground"
                      role="status"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {activeProject + 1} of {featuredProjects.length}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-11 rounded-full"
                      aria-label="Previous featured project"
                      aria-controls="featured-projects"
                      disabled={activeProject === 0}
                      onClick={() => showProject(requestedProject.current - 1)}
                    >
                      <ArrowLeft size={20} aria-hidden="true" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-11 rounded-full"
                      aria-label="Next featured project"
                      aria-controls="featured-projects"
                      disabled={activeProject === featuredProjects.length - 1}
                      onClick={() => showProject(requestedProject.current + 1)}
                    >
                      <ArrowRight size={20} aria-hidden="true" />
                    </Button>
                  </div>
                </motion.div>
                <motion.div
                  variants={projectSlideEntrance}
                  initial={false}
                  animate={controls}
                  custom={projectTiming.slide}
                >
                  <div
                    id="featured-projects"
                    ref={galleryRef}
                    onScroll={updateActiveProject}
                    onWheel={interruptGallery}
                    onTouchStart={interruptGallery}
                    onPointerDown={interruptGallery}
                    className="relative grid gap-5 lg:flex lg:snap-x lg:snap-mandatory lg:gap-8 lg:overflow-x-auto lg:overscroll-x-contain lg:pb-5"
                    style={{
                      scrollbarColor: "hsl(var(--border)) transparent",
                      scrollbarWidth: "thin",
                    }}
                  >
                    {featuredProjects.map((project, index) => (
                      <div
                        key={project.name}
                        className="min-w-0 scroll-mt-20 lg:w-full lg:flex-none lg:snap-start"
                      >
                        <ProjectCard
                          project={project}
                          index={index}
                          variant="featured"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </ProjectReveal>
        </div>

        <ProjectReveal
          sequence
          className="mt-16"
          reduceMotion={reduceMotion}
          entranceKey={visit}
        >
          {(controls) => (
            <>
              <div className="mb-8 flex flex-col items-start gap-2 lg:pr-28">
                <motion.h3
                  variants={projectEntrance}
                  initial={false}
                  animate={controls}
                  className="text-3xl font-bold tracking-tight"
                >
                  More things I’ve built
                </motion.h3>
                <motion.p
                  variants={projectEntrance}
                  initial={false}
                  animate={controls}
                  custom={projectTiming.description}
                  className="text-sm text-muted-foreground"
                >
                  Experiments and personal projects
                </motion.p>
              </div>
              <motion.div
                variants={projectCarouselEntrance}
                initial={false}
                animate={controls}
                custom={projectTiming.selectors}
              >
                <div className="grid gap-5 md:grid-cols-2 lg:hidden">
                  {otherProjects.map((project, index) => (
                    <ProjectCard
                      key={project.name}
                      project={project}
                      index={featuredProjects.length + index}
                      variant="compact"
                      entrance={{
                        controls,
                        delay:
                          projectTiming.selectors +
                          index * projectTiming.cardStagger,
                      }}
                    />
                  ))}
                </div>
                <Carousel
                  opts={{
                    align: "start",
                    slidesToScroll: 1,
                    loop: false,
                    duration: reduceMotion ? 0 : 25,
                  }}
                  className="hidden w-full lg:block"
                  aria-label="More projects"
                >
                  <CarouselContent className="-ml-6">
                    {otherProjects.map((project, index) => (
                      <CarouselItem
                        key={project.name}
                        className="basis-1/3 pl-6"
                        aria-label={`${index + 1} of ${otherProjects.length}`}
                      >
                        <ProjectCard
                          project={project}
                          index={featuredProjects.length + index}
                          variant="compact"
                          entrance={{
                            controls,
                            delay:
                              projectTiming.selectors +
                              index * projectTiming.cardStagger,
                          }}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-top-16 left-auto right-14 size-11 translate-y-0 rounded-full" />
                  <CarouselNext className="-top-16 right-0 size-11 translate-y-0 rounded-full" />
                </Carousel>
              </motion.div>
            </>
          )}
        </ProjectReveal>
      </div>
    </section>
  );
};

export default Projects;
