import type { Variants } from "framer-motion";

export const aboutReveal: Variants = {
  rest: ({ reduce = false } = {}) => ({ opacity: 0.65, y: reduce ? 0 : 16 }),
  visible: ({ delay = 0, reduce = false } = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: reduce ? 0 : delay,
      duration: reduce ? 0.08 : 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const aboutAccent: Variants = {
  rest: ({ reduce = false } = {}) => ({ scaleX: reduce ? 1 : 0 }),
  visible: ({ reduce = false } = {}) => ({
    scaleX: 1,
    transition: { duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const aboutSkillTiming = {
  introDuration: 0.3,
  duration: 0.3,
  stagger: 0.1,
};

export const aboutItemReveal: Variants = {
  rest: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: aboutSkillTiming.duration,
      delay,
      ease: [0.25, 0.6, 0.3, 0.8],
    },
  }),
};

export const aboutTabTiming = { exit: 0.2, pause: 0.1, enter: 0.4 };
export const aboutTabDuration =
  aboutTabTiming.exit + aboutTabTiming.pause + aboutTabTiming.enter;

export const aboutPanelReveal: Variants = {
  hidden: ({ direction, reduce }: { direction: number; reduce: boolean }) => ({
    opacity: 0,
    y: reduce ? 0 : -direction * 8,
    transition: {
      duration: reduce ? 0 : aboutTabTiming.exit,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  visible: ({ reduce }: { reduce: boolean }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: reduce ? 0 : aboutTabTiming.enter,
      delay: reduce ? 0 : aboutTabTiming.exit + aboutTabTiming.pause,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};
