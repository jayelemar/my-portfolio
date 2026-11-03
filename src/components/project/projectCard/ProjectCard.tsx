"use client";
import { Card } from "../../ui/card";
import { FC } from "react";
import { ProjectType } from "../ProjectData";
import ProjectCardHeader from "./ProjectCardHeader";
import ProjectCardBody from "./ProjectCardBody";
import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "@/lib/variant";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: ProjectType;
  index: number;
  variant?: "featured" | "compact";
  containerStyles?: string;
  animationDelay?: number;
};

const ProjectCard: FC<ProjectCardProps> = ({
  project,
  index,
  variant = "featured",
  containerStyles,
  animationDelay = 0.2,
}) => {
  const {
    desktopImage,
    mobileImage,
    link,
    category,
    name,
    description,
    technologies,
    github,
    figma,
    status,
  } = project;

  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("h-full", containerStyles)}
      variants={fadeIn("left", animationDelay)}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.2 }}
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
          category={category}
          name={name}
          description={description}
          technologies={technologies}
          link={link}
          github={github}
          figma={figma}
          status={status}
          index={index}
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
    </motion.div>
  );
};

export default ProjectCard;
