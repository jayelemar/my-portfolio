"use client";
import HeroImage from "./HeroImage";
import HeroHeader from "./HeroHeader";
import HeroDownIcon from "./HeroDownIcon";

const Hero = () => {
  return (
    <section
      id="/"
      className="mb-8 flex min-h-[calc(100svh-5.75rem)] scroll-mt-16 items-center justify-center py-16 xl:min-h-[max(42rem,calc(100svh-5.75rem))]"
    >
      <div className="container mx-auto">
        <div className="relative flex justify-between gap-x-8 ">
          <HeroHeader />
          <HeroImage />
          <HeroDownIcon />
        </div>
      </div>
    </section>
  );
};

export default Hero;
