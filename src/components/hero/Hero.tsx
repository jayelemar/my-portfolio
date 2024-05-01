"use client";

import { RiArrowDownSFill } from "react-icons/ri";
import HeroImage from "./HeroImage";
import HeroHeader from "./HeroHeader";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variant";

const Hero = () => {
  return (
    <section
      id="h"
      className="mb-56 flex h-[85vh] items-center justify-center bg-hero bg-cover bg-bottom bg-no-repeat py-0 dark:bg-none xl:py-4 "
    >
      <div className="container mx-auto">
        <div className="relative flex justify-between gap-x-8 ">
          <HeroHeader />
          <Suspense>
            <HeroImage />
          </Suspense>

          {/* down icon */}
          <motion.div
            variants={fadeIn("up", 0.8)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="absolute -bottom-4 left-2/4 hidden animate-bounce xl:flex"
          >
            <RiArrowDownSFill className="text-3xl text-primary" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
