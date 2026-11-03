"use client";

import { UserRound } from "lucide-react";
import { skillSet } from "./AboutData";
import AboutTabs from "./AboutTabs";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { aboutItemReveal } from "./aboutMotion";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.1 });
  const reduceMotion = useReducedMotion();
  const entranceControls = useAnimationControls();
  const [replayKey, setReplayKey] = useState(0);
  const [pageVisible, setPageVisible] = useState(true);
  const active = inView && pageVisible;

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    const replayNavigation = (event: MouseEvent) => {
      if (
        !inView ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (!link || (link.target && link.target !== "_self")) return;
      const destination = new URL(link.href, window.location.href);
      if (
        destination.origin === window.location.origin &&
        destination.pathname === window.location.pathname &&
        destination.hash === "#about"
      ) {
        setReplayKey((key) => key + 1);
      }
    };
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    document.addEventListener("click", replayNavigation);
    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
      document.removeEventListener("click", replayNavigation);
    };
  }, [inView]);

  useEffect(() => {
    entranceControls.stop();
    if (reduceMotion) {
      entranceControls.set("visible");
    } else if (active) {
      entranceControls.set("rest");
      void entranceControls.start("visible");
    } else {
      entranceControls.set("rest");
    }
    return () => entranceControls.stop();
  }, [active, entranceControls, reduceMotion, replayKey]);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative mb-24 flex min-h-[calc(100svh-4.75rem)] scroll-mt-20 items-center py-6 sm:py-8 lg:mb-32 lg:pb-12"
    >
      <div className="container mx-auto">
        <motion.h2
          id="about-heading"
          variants={aboutItemReveal}
          initial={false}
          animate={entranceControls}
          className="mb-6 flex items-center justify-center gap-2 text-center text-3xl font-bold tracking-[-0.03em] sm:mb-10 sm:gap-3 sm:text-4xl md:text-5xl"
        >
          <UserRound
            aria-hidden="true"
            className="size-7 shrink-0 text-forest-ink sm:size-9 md:size-11"
          />
          About Me
        </motion.h2>
        <div className="about-content mx-auto max-w-[960px]">
          <AboutTabs
            skillSet={skillSet}
            entranceControls={entranceControls}
            sectionActive={active}
            replayKey={replayKey}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
