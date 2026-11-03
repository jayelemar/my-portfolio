"use client";

import { GraduationCap } from "lucide-react";
import { info, type infoProps } from "./AboutData";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { aboutItemReveal, aboutSkillTiming } from "./aboutMotion";

const personalDetails: infoProps[] = [
  ...info.filter(({ label }) => label !== "Name"),
  {
    label: "Education",
    text: "Bachelor of Science in Electronics Engineering",
    icon: <GraduationCap size={20} />,
  },
];

const AboutInfo = ({
  containerStyles,
  active,
  replayKey,
}: {
  containerStyles: string;
  active: boolean;
  replayKey: number;
}) => {
  const ref = useRef<HTMLDListElement>(null);
  const controls = useAnimationControls();

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
    <dl
      ref={ref}
      className={cn(
        "divide-y divide-border/70 md:grid md:h-full md:grid-rows-4",
        containerStyles,
      )}
    >
      {personalDetails.map(({ icon, text, label, href }, index) => (
        <motion.div
          key={label}
          variants={aboutItemReveal}
          initial={false}
          animate={controls}
          custom={
            aboutSkillTiming.introDuration + index * aboutSkillTiming.stagger
          }
          className="grid min-w-0 items-start py-3 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-x-8 md:content-center"
        >
          <dt className="flex min-h-7 items-center gap-3 text-sm font-medium leading-5 text-muted-foreground sm:min-h-11">
            <span aria-hidden="true" className="shrink-0 text-forest-ink">
              {icon}
            </span>
            {label}
          </dt>
          <dd className="min-w-0 pl-8 text-base leading-7 sm:pl-0 sm:text-right">
            {href ? (
              <a
                href={href}
                onFocus={() => controls.set("visible")}
                className="inline-flex min-h-11 max-w-full items-start rounded-sm py-2 underline decoration-foreground/30 underline-offset-4 transition-colors hover:text-forest-ink hover:decoration-current"
              >
                <span className="break-all">{text}</span>
              </a>
            ) : (
              <span className="block py-2">{text}</span>
            )}
          </dd>
        </motion.div>
      ))}
    </dl>
  );
};

export default AboutInfo;
