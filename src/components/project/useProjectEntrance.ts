"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, type Variants } from "framer-motion";

export const projectTiming = {
  duration: 0.5,
  description: 0.3,
  selectors: 0.6,
  slide: 0.9,
  slideDuration: 0.8,
  cardStagger: 0.2,
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

export function useProjectEntrance() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: "some" });
  const [reduceMotion, setReduceMotion] = useState(true);
  const [visit, setVisit] = useState(0);

  useEffect(() => {
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)");
    const preference = () => setReduceMotion(pref.matches);
    const navigation = (event: MouseEvent) => {
      if (
        !inView ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (!link || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href, location.href);
      if (
        url.origin === location.origin &&
        url.pathname === location.pathname &&
        url.hash === "#projects"
      )
        setVisit((n) => n + 1);
    };
    preference();
    pref.addEventListener("change", preference);
    document.addEventListener("click", navigation);
    return () => {
      pref.removeEventListener("change", preference);
      document.removeEventListener("click", navigation);
    };
  }, [inView]);

  return { ref, reduceMotion, visit };
}
