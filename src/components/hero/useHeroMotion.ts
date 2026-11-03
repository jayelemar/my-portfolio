"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export const useHeroMotion = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const [reduceMotion, setReduceMotion] = useState(true);
  const [pageVisible, setPageVisible] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(preference.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updatePreference();
    updateVisibility();
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  return {
    ref,
    active: inView && pageVisible && reduceMotion === false,
    reduceMotion,
  };
};
