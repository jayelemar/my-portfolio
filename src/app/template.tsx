"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
};

const Template = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      className="overflow-x-clip"
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{
        type: "tween",
        ease: "linear",
        delay: 0.2,
        duration: 0.4,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Template;
