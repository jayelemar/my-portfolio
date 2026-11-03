import React from "react";
import { SiCodeforces } from "react-icons/si";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variant";

const ProjectHeader = () => {
  return (
    <div className="mx-auto mb-6 flex w-full flex-col justify-center text-center lg:mx-0 lg:mb-8 lg:text-left">
      <motion.h2
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="relative mx-auto mb-3 flex w-max items-center justify-center gap-x-3 text-4xl font-bold lg:mx-0 lg:mb-2"
      >
        <SiCodeforces size={35} className="text-primary" />
        My Projects
      </motion.h2>

      <motion.p
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="text-center text-muted-foreground lg:text-left"
      >
        Selected work across product, commerce, and emerging technology.
      </motion.p>
    </div>
  );
};

export default ProjectHeader;
