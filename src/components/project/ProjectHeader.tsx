import React from "react";
import { SiCodeforces } from "react-icons/si";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variant";

const ProjectHeader = () => {
  return (
    // <div className="mx-auto mb-6 flex h-[15vh] w-full flex-col justify-center text-center xl:mx-0 xl:text-left ">
    <div className="mx-auto mb-6 flex w-full flex-col justify-center text-center xl:relative xl:top-40 xl:mx-0 xl:mb-4 xl:h-auto xl:text-left">
      <motion.h2
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="relative mx-auto mb-4 flex w-max items-center justify-center gap-x-3 text-4xl font-bold xl:mx-0 xl:mb-2"
      >
        <SiCodeforces size={35} className="text-primary" />
        My Projects
      </motion.h2>

      <motion.p
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="text-center xl:mb-0 xl:text-left"
      >
        Check out some of my works
      </motion.p>
    </div>
  );
};

export default ProjectHeader;
