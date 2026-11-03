"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationControls,
  type AnimationControls,
} from "framer-motion";
import type { SkillSetProps } from "./AboutData";
import { cn } from "@/lib/utils";
import { aboutItemReveal, aboutSkillTiming } from "./aboutMotion";

export type AboutSkillListProps = {
  skillSet: SkillSetProps[];
  controls?: AnimationControls;
  active?: boolean;
  replayKey?: number;
};

const firstRow = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
];

const AboutSkillList = ({
  skillSet,
  controls: sharedControls,
  active = true,
  replayKey = 0,
}: AboutSkillListProps) => {
  const localControls = useAnimationControls();
  const controls = sharedControls ?? localControls;
  const ref = useRef<HTMLDivElement>(null);
  const allSkills = skillSet.flatMap(({ data }) => data);
  const skills = [
    ...firstRow.flatMap((name) =>
      allSkills.filter((item) => item.name === name),
    ),
    ...allSkills.filter(({ name }) => !firstRow.includes(name)),
  ];

  useEffect(() => {
    if (!active) {
      controls.stop();
      return;
    }
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let armed = true;
    const reveal = () => {
      if (preference.matches) {
        controls.stop();
        controls.set("visible");
      } else if (inView && armed) {
        armed = false;
        controls.set("rest");
        void controls.start("visible");
      } else if (!inView) {
        controls.stop();
        controls.set("rest");
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (!inView) armed = true;
      reveal();
    });
    const updatePreference = () => {
      armed = true;
      reveal();
    };
    reveal();
    observer.observe(element);
    preference.addEventListener("change", updatePreference);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", updatePreference);
      controls.stop();
    };
  }, [active, controls, replayKey]);

  return (
    <div ref={ref} className="about-skills">
      <motion.p
        variants={aboutItemReveal}
        initial={false}
        animate={controls}
        custom={0}
        className="about-skills-intro text-base leading-7 text-forest-ink"
      >
        Here are the technologies I’ve worked with.
      </motion.p>
      <ul
        aria-label="Technologies I’ve worked with"
        className="about-skills-grid"
      >
        {skills.map(({ name, imgPath, color }, index) => (
          <motion.li
            key={name}
            variants={aboutItemReveal}
            initial={false}
            animate={controls}
            custom={
              aboutSkillTiming.introDuration + index * aboutSkillTiming.stagger
            }
            className="flex min-h-24 min-w-0 flex-col items-center gap-2 text-center"
          >
            <span
              aria-hidden="true"
              className={cn(
                "about-skills-icon flex shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full",
                color,
              )}
            >
              {imgPath}
            </span>
            <span className="max-w-32 text-sm font-medium leading-5 text-muted-foreground">
              {name.includes("/") ? (
                <>
                  {name.split("/")[0]}/<wbr />
                  {name.split("/")[1]}
                </>
              ) : (
                name
              )}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default AboutSkillList;
