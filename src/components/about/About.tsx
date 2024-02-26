'use client';

import { CircleUserRound } from "lucide-react";
import { SkillSetProps, skillSet } from "./AboutData";
import AboutTabs from "./AboutTabs";
import AboutImage from "./AboutImage";
import { Suspense } from "react";
import Spinner from "../common/Spinner";

const About = () => {
  const getData = (arr: SkillSetProps[], title: string): SkillSetProps | undefined => {
    return arr.find((item) => item.title === title);
  };

  return (
    <section id="about"  className="h-[85vh] xl:mt-32 mb-44 xl:mb-40 xl:py-24 relative flex  justify-center items-center">
      <div className="container mx-auto overflow-hidden">
        <h2  className="mb-6 text-center mx-auto text-4xl font-bold relative w-max flex items-center justify-between gap-x-3 ">
          <CircleUserRound size={35} className="text-primary"/>About Me
        </h2>
        <div className="flex flex-col xl:flex-row justify-center items-center xl:items-start xl:justify-between">
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