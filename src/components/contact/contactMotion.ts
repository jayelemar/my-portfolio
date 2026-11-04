import type { Variants } from "framer-motion";

export const contactTiming = { duration: 0.3, stagger: 0.1, fields: 0.3 };

export const contactItemReveal: Variants = {
  rest: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: contactTiming.duration,
      delay,
      ease: [0.25, 0.6, 0.3, 0.8],
    },
  }),
};
