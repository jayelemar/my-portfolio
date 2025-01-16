"use client";
import HeroImage from "./HeroImage";
import HeroHeader from "./HeroHeader";
import { Suspense } from "react";
import HeroDownIcon from "./HeroDownIcon";

const Hero = () => {
  return (
    <section
      id="/"
      className="mb-56 flex h-[85vh] items-center justify-center bg-hero bg-cover bg-bottom bg-no-repeat py-0 dark:bg-none xl:py-4 "
    >
      <div className="container mx-auto">
        <div className="relative flex justify-between gap-x-8 ">
          <HeroHeader />
          <Suspense>
            <HeroImage />
          </Suspense>
          <HeroDownIcon />
        </div>
      </div>
    </section>
  );
};

export default Hero;
