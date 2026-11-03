"use client";

import { useEffect, useRef } from "react";
import { useAnimationControls, useInView } from "framer-motion";
import { useHeroMotion } from "./useHeroMotion";
import HeroText from "./HeroText";
import HeroButtons from "./HeroButtons";
import Socials from "../common/Socials";
import { heroReveal, heroTiming } from "./heroMotion";

const HeroHeader = () => {
  const { ref, active, reduceMotion } = useHeroMotion<HTMLDivElement>();
  const onScreen = useInView(ref, { amount: "some" });
  const controls = useAnimationControls();
  const revealed = useRef(false);

  useEffect(() => {
    if (reduceMotion) {
      controls.stop();
      controls.set("visible");
    } else if (!onScreen) {
      controls.stop();
      controls.set("hidden");
      revealed.current = false;
    } else if (active && !revealed.current) {
      revealed.current = true;
      controls.set("hidden");
      void controls.start("visible");
    }
  }, [active, controls, onScreen, reduceMotion]);

  return (
    <div
      ref={ref}
      className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center xl:mx-0 xl:items-start xl:text-left"
    >
      <HeroText controls={controls} />
      <div className="mt-12 xs:mt-6">
        <HeroButtons controls={controls} />
      </div>
      {/* socials */}
      <div className="xs:mt-6">
        <Socials
          containerStyles="flex justify-between items-center text-center gap-x-6 mx-auto xl:mx-0"
          iconStyles="text-foreground text-3xl hover:text-primary transition-all hover:scale-110"
          reveal={{
            controls,
            variants: heroReveal,
            delay: heroTiming.socialsDelay,
            stagger: 0,
          }}
        />
      </div>
    </div>
  );
};

export default HeroHeader;
