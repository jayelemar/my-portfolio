"use client";

import { motion, type AnimationControls } from "framer-motion";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { useHeroMotion } from "./useHeroMotion";
import { greetingLines, heroReveal, heroTiming } from "./heroMotion";

const roles = ["Full Stack Developer", "React JS Developer"];

const AnimatedRole = () => {
  const [text] = useTypewriter({
    words: roles,
    loop: false,
    typeSpeed: 80,
    deleteSpeed: 20,
    delaySpeed: 1500,
  });

  return (
    <>
      {text}
      <Cursor />
    </>
  );
};

const HeroText = ({ controls }: { controls: AnimationControls }) => {
  const { ref, active } = useHeroMotion<HTMLParagraphElement>();

  return (
    <>
      <p
        ref={ref}
        className="mb-4 min-h-5 whitespace-nowrap text-sm font-semibold uppercase leading-5 tracking-wide text-primary xl:pl-1"
      >
        <span className="sr-only">
          Full Stack Developer / React JS Developer
        </span>
        <span aria-hidden="true">{active ? <AnimatedRole /> : roles[0]}</span>
      </p>
      <h1 className="mb-5 text-[clamp(2.25rem,12vw,3rem)] font-bold leading-none tracking-tight md:max-w-lg xl:text-[72px] xl:leading-[80px]">
        {greetingLines.map((line, index) => (
          <motion.span
            key={line}
            variants={heroReveal}
            initial={false}
            animate={controls}
            custom={{
              delay: index * heroTiming.lineStagger,
              duration: heroTiming.lineDuration,
            }}
            className="hero-enter hero-enter-heading block whitespace-nowrap"
          >
            {line}
            {index < greetingLines.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </h1>
      <motion.p
        variants={heroReveal}
        initial={false}
        animate={controls}
        custom={{
          delay: heroTiming.descriptionDelay,
          duration: heroTiming.descriptionDuration,
        }}
        className="hero-enter hero-enter-description max-w-lg text-center text-xl font-light text-muted-foreground xl:text-left"
      >
        a software developer with passion for design, automation and
        technologies
      </motion.p>
    </>
  );
};

export default HeroText;
