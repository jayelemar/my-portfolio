"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationControls,
  type AnimationControls,
} from "framer-motion";

const rest = { opacity: 0, y: 20 };
const visible = { opacity: 1, y: 0 };

type ProjectRevealProps = {
  children: ReactNode | ((controls: AnimationControls) => ReactNode);
  reduceMotion: boolean;
  entranceKey: number;
  className?: string;
  sequence?: boolean;
};

export default function ProjectReveal({
  children,
  reduceMotion,
  entranceKey,
  className,
  sequence = false,
}: ProjectRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  useEffect(() => {
    controls.stop();
    if (reduceMotion) {
      controls.set(sequence ? "visible" : visible);
      return () => controls.stop();
    }

    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    let armed = true;
    let ready = false;
    let observer: IntersectionObserver;

    const reveal = () => {
      if (document.hidden) {
        controls.stop();
        controls.set(sequence ? "rest" : rest);
        armed = true;
      } else if (ready && armed) {
        armed = false;
        controls.set(sequence ? "rest" : rest);
        void controls.start(
          sequence
            ? "visible"
            : {
                ...visible,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              },
        );
      }
    };

    const observe = () => {
      // Tall mobile stacks should enter after the same visible distance as a
      // desktop carousel, rather than waiting for a fraction of the full stack.
      const height = element.getBoundingClientRect().height;
      const visibleHeight = Math.max(1, window.innerHeight - 112);
      const threshold = Math.min(
        0.2,
        (visibleHeight * 0.2) / Math.max(1, height),
      );
      observer?.disconnect();
      observer = new IntersectionObserver(
        ([entry]) => {
          ready = entry.isIntersecting && entry.intersectionRatio >= threshold;
          if (!entry.isIntersecting) {
            armed = true;
            controls.stop();
            controls.set(sequence ? "rest" : rest);
          }
          reveal();
        },
        { rootMargin: "-80px 0px -32px 0px", threshold: [0, threshold] },
      );
      observer.observe(element);
    };

    controls.set(sequence ? "rest" : rest);
    observe();
    const resize = new ResizeObserver(observe);
    resize.observe(element);
    window.addEventListener("resize", observe, { passive: true });
    document.addEventListener("visibilitychange", reveal);
    return () => {
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("resize", observe);
      document.removeEventListener("visibilitychange", reveal);
      controls.stop();
    };
  }, [controls, reduceMotion, entranceKey, sequence]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={false}
        animate={sequence ? undefined : controls}
        onFocusCapture={() => {
          controls.stop();
          controls.set(sequence ? "visible" : visible);
        }}
      >
        {typeof children === "function" ? children(controls) : children}
      </motion.div>
    </div>
  );
}
