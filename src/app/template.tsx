"use client";

import { motion } from "framer-motion";
import { useRouteEntry } from "@/components/provider/RouteEntryProvider";
import { useEffect, type ReactNode } from "react";

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
};

const Template = ({ children }: { children: ReactNode }) => {
  const entered = useRouteEntry();
  // Paint the first document immediately; keep the fade for client navigation.
  const animateEntry = entered?.current ?? false;
  useEffect(() => {
    if (entered) entered.current = true;
  }, [entered]);
  return (
    <motion.div
      className="overflow-x-clip"
      variants={variants}
      initial={animateEntry ? "hidden" : false}
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
