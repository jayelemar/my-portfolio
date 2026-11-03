import type { Variants } from "framer-motion";

export const greetingLines = ["Hello, my", "name is", "Jay Elemar"];

const lineDuration = 1.2;
const lineStagger = 0.2;
const controlStagger = 0.2;
const descriptionDuration = 1.2;
const descriptionDelay = greetingLines.length * lineStagger;

export const heroTiming = {
  lineDuration,
  lineStagger,
  controlStagger,
  descriptionDuration,
  descriptionDelay,
  buttonsDelay: descriptionDelay + controlStagger,
  socialsDelay: descriptionDelay + controlStagger * 3,
};

export const heroReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: ({ delay = 0, duration = 1.2 } = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      duration,
      delay,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  }),
};
