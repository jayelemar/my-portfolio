"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { contactItemReveal } from "./contactMotion";

export type ContactEntrance = {
  replayKey: number;
  reduceMotion: boolean;
  pageVisible: boolean;
};

export default function ContactReveal({
  children,
  entrance: { replayKey, reduceMotion, pageVisible },
  delay = 0,
  className,
}: {
  children: ReactNode;
  entrance: ContactEntrance;
  delay?: number;
  className?: string;
}) {
  // Observe an untransformed frame so the entrance cannot change its own trigger.
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  useEffect(() => {
    controls.stop();
    const element = ref.current;
    if (!element) return;
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      controls.set({ opacity: 1, y: 0 });
      return;
    }
    const focused = () => element.contains(document.activeElement);
    if (!pageVisible) {
      controls.set(focused() ? { opacity: 1, y: 0 } : "rest");
      return;
    }

    let armed = true;
    let observer: IntersectionObserver;
    const observe = () => {
      const threshold = Math.min(
        0.2,
        (Math.max(1, window.innerHeight - 112) * 0.2) /
          Math.max(1, element.getBoundingClientRect().height),
      );
      observer?.disconnect();
      observer = new IntersectionObserver(
        ([entry]) => {
          if (focused()) {
            controls.stop();
            controls.set({ opacity: 1, y: 0 });
            armed = false;
          } else if (!entry.isIntersecting) {
            armed = true;
            controls.stop();
            controls.set("rest");
          } else if (entry.intersectionRatio >= threshold && armed) {
            armed = false;
            controls.set("rest");
            void controls.start("visible");
          }
        },
        { rootMargin: "-80px 0px -32px 0px", threshold: [0, threshold] },
      );
      observer.observe(element);
    };

    controls.set(focused() ? { opacity: 1, y: 0 } : "rest");
    observe();
    const resize = new ResizeObserver(observe);
    resize.observe(element);
    window.addEventListener("resize", observe, { passive: true });
    return () => {
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("resize", observe);
      controls.stop();
    };
  }, [controls, pageVisible, reduceMotion, replayKey]);

  return (
    <div ref={ref} className="flow-root min-w-0">
      <motion.div
        variants={contactItemReveal}
        initial={false}
        animate={controls}
        custom={delay}
        className={className}
        onFocusCapture={() => {
          controls.stop();
          controls.set({ opacity: 1, y: 0 });
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
