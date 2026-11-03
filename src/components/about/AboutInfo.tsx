import React from "react";
import { info } from "./AboutData";
import { GraduationCap } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const informationContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.22,
    },
  },
};

const informationItemVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface AboutInfoProps {
  containerStyles: string;
}

const AboutInfo = ({ containerStyles }: AboutInfoProps) => {
  return (
    <motion.div
      variants={informationContainerVariants}
      initial="hidden"
      animate="show"
      className={containerStyles}
    >
      {info.map((item) => {
        return (
          <motion.div
            variants={informationItemVariants}
            className="m-6 mx-auto flex items-center gap-x-4 text-balance pl-4 text-left xl:mx-0"
            key={item.text}
          >
            <div className="text-primary">{item.icon}</div>
            <div className="">{item.text}</div>
          </motion.div>
        );
      })}
      <motion.div
        variants={informationItemVariants}
        className="m-6 mx-auto hidden items-center gap-x-4 text-balance pl-4 text-left md:flex xl:mx-0"
      >
        <div className="text-primary">
          <GraduationCap size={25} />
        </div>
        <div className="flex flex-col gap-x-2 text-left lg:flex-row">
          <span className="">Bachelor of Science in</span>
          <span className="">Electronics Engineering</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutInfo;
