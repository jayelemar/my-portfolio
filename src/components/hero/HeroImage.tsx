"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeIn } from "@/lib/variant";

const HeroImage = () => {
  const reduceMotion = useReducedMotion();
  const portraitRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(portraitRef, { amount: 0.2 });
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  return (
    <div className="absolute right-0 top-1/2 -mt-6 hidden h-[520px] w-[500px] -translate-y-1/2 xl:block 2xl:h-[560px] 2xl:w-[540px]">
      <div
        ref={portraitRef}
        className="hero-portrait-stage relative isolate h-full w-full"
        data-animate={isInView && pageVisible}
      >
        <motion.div
          aria-hidden="true"
          variants={fadeIn("up", 0.9)}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="hero-portrait-shape hero-portrait-backdrop absolute inset-x-0 bottom-0 top-20 -z-10 bg-gradient-to-tr from-green-100 via-green-200 to-green-300"
        />
        <motion.div
          variants={fadeIn("up", 1.3)}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="absolute inset-0"
        >
          <div
            aria-hidden="true"
            className="hero-portrait-shape absolute inset-x-0 bottom-0 top-20 overflow-hidden"
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
