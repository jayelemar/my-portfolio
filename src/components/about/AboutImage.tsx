import React from "react";
import DevImage from "../common/DevImage";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variant";

const AboutImage = () => {
  return (
    <div className="relative hidden flex-1 xl:flex">
      <motion.div
        variants={fadeIn("up", 0.8)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="relative bottom-4 left-10 h-[400px] w-[400px] bg-[url('/about/shape-light.svg')] bg-no-repeat dark:bg-[url('/about/shape-dark.svg')] "
      >
        <DevImage
          containerStyles="w-[338px] h-[450px] absolute  bottom-10 "
          imgSrc="/about/developer.png"
        />
      </motion.div>
    </div>
  );
};

export default AboutImage;
