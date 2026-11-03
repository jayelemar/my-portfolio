"use client";
import { Card } from "../../ui/card";
import type { FC } from "react";
import { motion, type AnimationControls } from "framer-motion";
import { projectEntrance } from "../useProjectEntrance";
import type { ProjectType } from "../ProjectData";
import ProjectCardHeader from "./ProjectCardHeader";
import ProjectCardBody from "./ProjectCardBody";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: ProjectType;
  index?: number;
  variant?: "featured" | "compact";
  containerStyles?: string;
  entrance?: { controls: AnimationControls; delay: number };
};

const ProjectCard: FC<ProjectCardProps> = ({
  project,
  variant = "featured",
  containerStyles,
  entrance,
}) => {
  const {
    desktopImage,
    mobileImage,
    link,
    name,
    description,
    technologies,
    github,
    figma,
    status,
  } = project;

  return (
    <motion.article
      initial={false}
      animate={entrance?.controls}
      variants={entrance ? projectEntrance : undefined}
      custom={entrance?.delay}
      aria-label={name}
      className={cn("h-full min-w-0", containerStyles)}
    >
      <Card
        className={cn(
          "group h-full overflow-hidden border-border/60 bg-card/70 shadow-none",
          variant === "featured" &&
            "grid grid-rows-[auto_1fr] lg:min-h-[440px] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-1",
          variant === "compact" && "flex flex-col",
        )}
      >
        <ProjectCardBody
          name={name}
          description={description}
          technologies={technologies}
          link={link}
          github={github}
          figma={figma}
          status={status}
          variant={variant}
        />
        <div
          className={cn(
            "order-first",
            variant === "featured" && "lg:order-last",
          )}
        >
          <ProjectCardHeader
            desktopImage={desktopImage}
            mobileImage={mobileImage}
            projectName={name}
            variant={variant}
          />
        </div>
      </Card>
    </motion.article>
  );
};

export default ProjectCard;
