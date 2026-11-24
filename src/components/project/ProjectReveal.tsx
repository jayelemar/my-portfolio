"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
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
  className?: string;
  sequence?: boolean;
};

export default function ProjectReveal({
  children,
  reduceMotion,
  className,
  sequence = false,
}: ProjectRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const phase = useRef<"unseen" | "entering" | "visible">("unseen");

  const showImmediately = useCallback(() => {
    phase.current = "visible";
    controls.stop();
    controls.set(sequence ? "visible" : visible);
  }, [controls, sequence]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    // SSR content already in view must not disappear when hydration finishes.
    if (
      phase.current !== "unseen" ||
      reduceMotion ||
      typeof IntersectionObserver === "undefined" ||
      (bounds.bottom > 80 && bounds.top < window.innerHeight - 32)
    ) {
      showImmediately();
      return;
    }

    let ready = false;
    let disposed = false;
    let observer: IntersectionObserver;

    const reveal = () => {
      if (document.hidden && phase.current === "entering") {
        showImmediately();
      } else if (!document.hidden && ready && phase.current === "unseen") {
        phase.current = "entering";
        void controls
          .start(
            sequence
              ? "visible"
              : {
                  ...visible,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                },
          )
          .then(() => {
            if (!disposed) phase.current = "visible";
          });
      }
    };

    const observe = () => {
      if (phase.current !== "unseen") return;
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
          if (!entry.isIntersecting && phase.current === "entering") {
            showImmediately();
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
      disposed = true;
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("resize", observe);
      document.removeEventListener("visibilitychange", reveal);
      controls.stop();
    };
  }, [controls, reduceMotion, sequence, showImmediately]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={false}
        animate={sequence ? undefined : controls}
        onFocusCapture={showImmediately}
      >
        {typeof children === "function" ? children(controls) : children}
      </motion.div>
    </div>
  );
}
