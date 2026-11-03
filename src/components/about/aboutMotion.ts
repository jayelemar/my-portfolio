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
