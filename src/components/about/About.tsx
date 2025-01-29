"use client";

import { CircleUserRound } from "lucide-react";
import { SkillSetProps, skillSet } from "./AboutData";
import AboutTabs from "./AboutTabs";
import AboutImage from "./AboutImage";
import { Suspense } from "react";
import Spinner from "../common/Spinner";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variant";

const About = () => {
  const getData = (
    arr: SkillSetProps[],
    title: string,
  ): SkillSetProps | undefined => {
    return arr.find((item) => item.title === title);
  };

  return (
    <section
      id="about"
      className="relative my-24 mb-52 scroll-mt-52 xl:my-0 xl:mb-72 xl:scroll-mt-24"
    >
      <div className="container mx-auto flex flex-col items-center justify-center gap-2 xl:h-[85vh]">
        <motion.h2
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="relative mx-auto mb-6 flex w-max items-center justify-between gap-x-3 text-center text-4xl font-bold"
        >
          <CircleUserRound size={35} className="text-primary" />
          About Me
        </motion.h2>
        <div className="flex w-full flex-col items-center justify-center xl:flex-row xl:items-start xl:justify-center">
          {/* Image */}
          <Suspense fallback={<Spinner />}>
            <AboutImage />
          </Suspense>
          {/* Tabs */}
          <AboutTabs skillSet={skillSet} getData={getData} />
        </div>
      </div>
    </section>
  );
};

export default About;
