"use client";

import { fadeIn } from "@/lib/variant";
import DevImage from "../common/DevImage";
import { motion } from "framer-motion";

const HeroImage = () => {
  return (
    <div className="hidden xl:flex ">
      <motion.div
        variants={fadeIn("up", 0.9)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="absolute -right-12 -top-[95px] h-[936px] w-[584px] bg-[url('/hero/shape-2-light.svg')] bg-no-repeat dark:bg-[url('/hero/shape-2-dark.svg')]"
      ></motion.div>
      <motion.div
        variants={fadeIn("up", 1)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
      >
        <DevImage
          containerStyles={`
            w-[433px] h-[577px] bg-no-repeat absolute -top-24 right-10
          `}
          imgSrc="/hero/dev.png"
        />
      </motion.div>
    </div>
  );
};

export default HeroImage;
