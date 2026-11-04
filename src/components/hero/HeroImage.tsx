"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeIn } from "@/lib/variant";

const accentAreas = {
  top: { x: [-25, 45], y: [-40, 0] },
  left: { x: [-20, 10], y: [-70, 70] },
  right: { x: [-20, 20], y: [-65, 35] },
  bottom: { x: [-8, 16], y: [-45, 55] },
} as const;

type AccentPoint = { x: number; y: number };

const pickAccentPoint = (
  area: (typeof accentAreas)[keyof typeof accentAreas],
  awayFrom?: AccentPoint,
): AccentPoint => {
  let point = { x: 0, y: 0 };
  for (let attempt = 0; attempt < 20; attempt++) {
    point = {
      x: area.x[0] + Math.random() * (area.x[1] - area.x[0]),
      y: area.y[0] + Math.random() * (area.y[1] - area.y[0]),
    };
    if (
      !awayFrom ||
      Math.hypot(point.x - awayFrom.x, point.y - awayFrom.y) >= 40
    )
      return point;
  }
  if (awayFrom) {
    return {
      x:
        Math.abs(area.x[0] - awayFrom.x) > Math.abs(area.x[1] - awayFrom.x)
          ? area.x[0]
          : area.x[1],
      y:
        Math.abs(area.y[0] - awayFrom.y) > Math.abs(area.y[1] - awayFrom.y)
          ? area.y[0]
          : area.y[1],
    };
  }
  return point;
};

const HeroImage = () => {
  const reduceMotion = useReducedMotion();
  const portraitRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(portraitRef, { amount: 0.2 });
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (!isInView || !pageVisible || !portraitRef.current) return;

    const accents = portraitRef.current.querySelectorAll<HTMLSpanElement>(
      ".hero-portrait-accent",
    );
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    let generation = 0;

    const stop = () => {
      generation++;
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };

    const start = () => {
      stop();
      if (preference.matches) return;
      const currentGeneration = generation;

      accents.forEach((accent, index) => {
        const area =
          accentAreas[accent.dataset.motion as keyof typeof accentAreas];
        const play = (previousEnd?: AccentPoint) => {
          if (generation !== currentGeneration) return;
          const from = pickAccentPoint(area, previousEnd);
          const to = pickAccentPoint(area, from);
          const frame = (progress: number, scale: number, opacity: number) => ({
            offset: progress,
            transform: `translate(${from.x + (to.x - from.x) * progress}px, ${from.y + (to.y - from.y) * progress}px) scale(${scale})`,
            opacity,
          });
          const animation = accent.animate(
            [
              frame(0, 0, 0),
              frame(0.18, 1, 1),
              frame(0.78, 0.85, 1),
              frame(1, 0, 0),
            ],
            {
              duration: 8500 + Math.random() * 2500,
              delay: previousEnd ? 0 : index * 650,
              easing: "linear",
              fill: "both",
            },
          );
          animations.add(animation);
          animation.finished
            .then(() => {
              animations.delete(animation);
              play(to);
              animation.cancel();
            })
            .catch(() => {});
        };
        play();
      });
    };

    start();
    preference.addEventListener("change", start);
    return () => {
      preference.removeEventListener("change", start);
      stop();
    };
  }, [isInView, pageVisible]);

  return (
    <div className="absolute right-0 top-1/2 -mt-6 hidden h-[520px] w-[500px] -translate-y-1/2 xl:block 2xl:h-[560px] 2xl:w-[540px]">
      <div
        ref={portraitRef}
        className="hero-portrait-stage relative isolate h-full w-full"
        data-animate={isInView && pageVisible}
      >
        <span
          aria-hidden="true"
          data-motion="top"
          className="hero-portrait-accent hero-portrait-accent-top pointer-events-none absolute left-[8%] top-[17%] h-4 w-4 bg-green-200 dark:bg-green-800"
        />
        <span
          aria-hidden="true"
          data-motion="left"
          className="hero-portrait-accent hero-portrait-accent-left pointer-events-none absolute left-[-44px] top-[72%] h-8 w-8 bg-green-200 dark:bg-green-800"
        />
        <span
          aria-hidden="true"
          data-motion="right"
          className="hero-portrait-accent hero-portrait-accent-right pointer-events-none absolute right-[-8px] top-[26%] h-11 w-11 bg-green-300 dark:bg-green-700"
        />
        <span
          aria-hidden="true"
          data-motion="bottom"
          className="hero-portrait-accent hero-portrait-accent-bottom pointer-events-none absolute right-[-12px] top-[70%] h-6 w-6 bg-green-200 dark:bg-green-800"
        />
        <motion.div
          variants={fadeIn("up", 1.3)}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="hero-portrait-composition absolute inset-0"
        >
          <div
            aria-hidden="true"
            className="hero-portrait-shape hero-portrait-backdrop absolute inset-x-0 bottom-0 top-20 overflow-hidden bg-gradient-to-tr from-green-100 via-green-200 to-green-300"
          >
            <Image
              src="/about/jay-elemar-termulo-transparent.png"
              width={1254}
              height={1254}
              alt=""
              sizes="(min-width: 1536px) 540px, 500px"
              className="hero-portrait-body absolute inset-x-0 bottom-0 h-auto w-full object-contain"
            />
          </div>
          <Image
            src="/about/jay-elemar-termulo-transparent.png"
            width={1254}
            height={1254}
            alt="Portrait of Jay Elemar Termulo in a dark suit"
            sizes="(min-width: 1536px) 540px, 500px"
            preload
            className="absolute inset-x-0 bottom-0 h-auto w-full object-contain"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 50%, transparent 64%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 50%, transparent 64%)",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroImage;
