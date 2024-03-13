'use client';

import { CircleUserRound } from "lucide-react";
import { SkillSetProps, skillSet } from "./AboutData";
import AboutTabs from "./AboutTabs";
import AboutImage from "./AboutImage";
import { Suspense } from "react";
import Spinner from "../common/Spinner";
import { motion } from 'framer-motion'
import { fadeIn } from "@/lib/variant";


const About = () => {
  const getData = (arr: SkillSetProps[], title: string): SkillSetProps | undefined => {
    return arr.find((item) => item.title === title);
  };

  return (
    <section id="about" className="relative my-24 mb-52">
      <div className="container mx-auto flex flex-col justify-center items-center gap-2">
        <motion.h2
          variants={fadeIn('up', 0.4)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once:false, amount: 0.2}}
          className="mb-6 text-center mx-auto text-4xl font-bold relative w-max flex items-center justify-between gap-x-3"
        >
          <CircleUserRound  size={35} className="text-primary"/>About Me
        </motion.h2>
        <div className="flex flex-col xl:flex-row justify-center items-center xl:items-start xl:justify-center w-full">
          {/* Image */}
          <Suspense fallback={<Spinner/>}>
            <AboutImage />
          </Suspense>
          {/* Tabs */}
          <AboutTabs skillSet={skillSet} getData={getData} />
        </div>
      </div>
    </section>
  )
}

export default About