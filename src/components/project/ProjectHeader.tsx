"use client";
import { motion, type AnimationControls } from "framer-motion";
import { FolderCode } from "lucide-react";
import { projectEntrance, projectTiming } from "./useProjectEntrance";

const ProjectHeader = ({ controls }: { controls: AnimationControls }) => {
  return (
    <div className="mx-auto mb-6 flex w-full flex-col items-center text-center sm:mb-8">
      <motion.h2
        id="projects-heading"
        variants={projectEntrance}
        initial={false}
        animate={controls}
        className="mb-3 flex items-center justify-center gap-2 text-3xl font-bold tracking-[-0.03em] sm:gap-3 sm:text-4xl md:text-5xl"
      >
        <FolderCode
          aria-hidden="true"
          className="size-7 shrink-0 text-forest-ink sm:size-9 md:size-11"
        />
        My Projects
      </motion.h2>

      <motion.p
        variants={projectEntrance}
        initial={false}
        animate={controls}
        custom={projectTiming.description}
        className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
      >
        Selected work across product, commerce, and emerging technology.
      </motion.p>
    </div>
  );
};

export default ProjectHeader;
