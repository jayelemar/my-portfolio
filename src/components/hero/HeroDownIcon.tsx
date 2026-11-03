"use client";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variant";
import { RiArrowDownSFill } from "react-icons/ri";
import { useHeroMotion } from "./useHeroMotion";

const HeroDownIcon = () => {
  const { ref, active, reduceMotion } = useHeroMotion<HTMLDivElement>();
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute -bottom-8 left-1/2 hidden -translate-x-1/2 xl:flex"
    >
      <motion.div
        variants={fadeIn("up", 0.8)}
        initial={reduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <span
          className="block motion-safe:animate-bounce"
          style={{ animationPlayState: active ? "running" : "paused" }}
        >
          <RiArrowDownSFill className="text-3xl text-primary" />
        </span>
      </motion.div>
    </div>
  );
};

export default HeroDownIcon;
