"use client";

import { useEffect, useRef, useState } from "react";
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
  const [replayEntrance, setReplayEntrance] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      controls.stop();
      controls.set("visible");
    } else if (!onScreen) {
      if (revealed.current) setReplayEntrance(true);
      controls.stop();
      if (replayEntrance) controls.set("hidden");
      revealed.current = false;
    } else if (active && !revealed.current) {
      revealed.current = true;
      // CSS starts the first entrance before hydration. Replay with the
      // existing controls only after leaving and returning to Hero.
      if (replayEntrance) {
        controls.set("hidden");
        void controls.start("visible");
      }
    }
  }, [active, controls, onScreen, reduceMotion, replayEntrance]);

  return (
    <div
      ref={ref}
      data-hero-replay={replayEntrance}
      className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center xl:mx-0 xl:items-start xl:text-left"
    >
      <HeroText controls={controls} />
      <div className="hero-enter hero-enter-buttons mt-12 xs:mt-6">
        <HeroButtons controls={controls} />
      </div>
      {/* socials */}
      <div className="hero-enter hero-enter-socials xs:mt-6">
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
