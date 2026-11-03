"use client";

import { useEffect, useRef } from "react";
import { GraduationCap } from "lucide-react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { info, skillSet } from "./AboutData";
import AboutSkillList from "./AboutSkillList";
import { aboutAccent, aboutReveal } from "./aboutMotion";

const About = () => {
  const reduceMotion = useReducedMotion();
  const controls = useAnimationControls();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;
    let armed = true;
    let observer: IntersectionObserver;
    const observe = () => {
      observer?.disconnect();
      const threshold = Math.min(
        0.15,
        (window.innerHeight * 0.25) / Math.max(section.offsetHeight, 1),
      );
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            controls.stop();
            controls.set("rest");
            armed = true;
          } else if (armed && entry.intersectionRatio >= threshold) {
            armed = false;
            controls.set("rest");
            void controls.start("visible");
          }
        },
        { threshold: [0, threshold] },
      );
      observer.observe(section);
    };
    observe();
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(observe);
    resizeObserver?.observe(section);
    window.addEventListener("resize", observe);
    return () => {
      observer.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", observe);
      controls.stop();
    };
  }, [controls, reduceMotion]);

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      initial={false}
      animate={controls}
      variants={{ rest: {}, visible: {} }}
      className="relative mb-24 scroll-mt-24 py-8 lg:mb-32 lg:py-12"
    >
      <div className="container mx-auto">
        <h2
          id="about-heading"
          className="relative isolate mb-10 w-fit text-4xl font-bold tracking-[-0.03em] md:text-5xl"
        >
          About me
          <motion.span
            aria-hidden="true"
            variants={aboutAccent}
            custom={{ reduce: reduceMotion }}
            className="absolute inset-x-0 bottom-0 -z-10 h-3 origin-left bg-[#ffeddf] dark:bg-[#353449]"
          />
        </h2>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16">
          <motion.div
            variants={aboutReveal}
            custom={{ delay: 0.12, reduce: reduceMotion }}
            className="min-w-0"
          >
            <p className="text-[22px] font-medium leading-relaxed">
              I’m Jay Elemar Termulo, a full stack developer with a focus on the
              frontend.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              I work with React, Next.js, and TypeScript, alongside building
              APIs and backend systems. I’m interested in design, automation,
              and modern web technologies.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {info
                .filter(({ label }) => label !== "Name")
                .map(({ icon, text, label, href }) => (
                  <li key={label} className="flex min-w-0 items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-forest-ink"
                    >
                      {icon}
                    </span>
                    <span className="sr-only">{label}: </span>
                    {href ? (
                      <a
                        href={href}
                        className="flex min-h-11 min-w-0 items-center rounded-sm text-sm underline-offset-4 transition-colors duration-150 hover:text-forest-ink hover:underline focus-visible:text-forest-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
                      >
                        <span className="break-all">{text}</span>
                      </a>
                    ) : (
                      <span>{text}</span>
                    )}
                  </li>
                ))}
              <li className="flex items-start gap-3 pt-2 leading-relaxed">
                <GraduationCap
                  aria-hidden="true"
                  size={23}
                  className="shrink-0 text-forest-ink"
                />
                <span>Bachelor of Science in Electronics Engineering</span>
              </li>
            </ul>
          </motion.div>
          <div className="min-w-0">
            <h3 className="mb-6 text-xl font-semibold tracking-tight">
              Skills &amp; technologies
            </h3>
            <AboutSkillList skillSet={skillSet} />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
