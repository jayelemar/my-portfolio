"use client";
import { Card, CardHeader } from "../../ui/card";
import { FC } from "react";
import { ProjectType } from "../ProjectData";
import ProjectCardHeader from "./ProjectCardHeader";
import ProjectCardBody from "./ProjectCardBody";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variant";

type ProjectCardProps = {
  project: ProjectType;
  containerStyles: string;
};

const ProjectCard: FC<ProjectCardProps> = ({ project, containerStyles }) => {
  const {
    desktopImage,
    mobileImage,
    link,
    category,
    name,
    description,
    github,
    figma,
    isProject,
  } = project;
  return (
    <motion.div
      className={containerStyles}
      variants={fadeIn("left", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
    >
      <Card className="group relative flex flex-col overflow-hidden">
        <CardHeader className="xl:w-full">
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
          figma={figma}
          isProject={isProject}
        />
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
