"use client";

import type { Variants } from "framer-motion";

export const projectTiming = {
  duration: 0.3,
  description: 0.05,
  selectors: 0.1,
  slide: 0.15,
  slideDuration: 0.3,
  cardStagger: 0.05,
};

export const projectCarouselEntrance: Variants = {
  rest: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.2, delay },
  }),
};

export const projectEntrance: Variants = {
  rest: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: projectTiming.duration,
      delay,
      ease: [0.22, 0.61, 0.36, 1],
    },
  }),
};

export const projectSlideEntrance: Variants = {
  rest: { opacity: 0, x: -32, y: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "tween",
      duration: projectTiming.slideDuration,
      delay,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};
