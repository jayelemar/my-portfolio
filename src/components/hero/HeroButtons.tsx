"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Download, Send } from "lucide-react";
import { DOWNLOAD_CV } from "@/lib/constant";
import { motion, type AnimationControls } from "framer-motion";
import { heroReveal, heroTiming } from "./heroMotion";

const HeroButtons = ({ controls }: { controls: AnimationControls }) => {
  return (
    <div
      onFocusCapture={() => controls.set("visible")}
      className="mx-auto mb-12 flex w-full flex-col gap-3 xs:mb-0 lg:mb-12 lg:flex-row lg:justify-center xl:mx-0 xl:mb-5 xl:justify-start"
    >
      <motion.div
        variants={heroReveal}
        initial={false}
        animate={controls}
        custom={{ delay: heroTiming.buttonsDelay }}
      >
        <Button
          asChild
          className="h-11 w-44 gap-2 rounded-full text-base motion-safe:hover:scale-105"
        >
          <Link href="#contact">
            Contact Me <Send size={18} />
          </Link>
        </Button>
      </motion.div>

      <motion.div
        variants={heroReveal}
        initial={false}
        animate={controls}
        custom={{ delay: heroTiming.buttonsDelay + heroTiming.controlStagger }}
      >
        <Button
          asChild
          variant={"secondary"}
          className="btn-secondary h-11 w-44 gap-2 rounded-full text-base"
        >
          <Link
            href={DOWNLOAD_CV}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV <Download size={18} />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default HeroButtons;
