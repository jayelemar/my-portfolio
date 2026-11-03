"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "@/lib/variant";

const HeroImage = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute right-0 top-1/2 -mt-6 hidden h-[520px] w-[500px] -translate-y-1/2 xl:block 2xl:h-[560px] 2xl:w-[540px]">
      <div className="relative isolate h-full w-full">
        <motion.div
          aria-hidden="true"
          variants={fadeIn("up", 0.9)}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="absolute inset-x-0 bottom-0 top-20 -z-10 bg-gradient-to-tr from-green-100 via-green-200 to-green-300 dark:from-green-950 dark:via-green-800 dark:to-green-400"
          style={{ borderRadius: "58% 42% 46% 54% / 40% 42% 58% 60%" }}
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
            className="absolute inset-x-0 bottom-0 top-20 overflow-hidden"
            style={{ borderRadius: "58% 42% 46% 54% / 40% 42% 58% 60%" }}
          >
            <Image
              src="/about/jay-elemar-termulo-transparent.png"
              width={1254}
              height={1254}
              alt=""
              sizes="(min-width: 1536px) 540px, 500px"
              className="absolute inset-x-0 bottom-0 h-auto w-full object-contain"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 82%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 82%, transparent 100%)",
              }}
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
