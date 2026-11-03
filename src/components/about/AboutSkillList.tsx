"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { SkillSetProps } from "./AboutData";
import { aboutReveal } from "./aboutMotion";

export type AboutSkillListProps = { skillSet: SkillSetProps[] };

const AboutSkillList = ({ skillSet }: AboutSkillListProps) => {
  const reduceMotion = useReducedMotion();
  return (
    <div>
      {skillSet.map(({ title, data }, index) => (
        <motion.section
          key={title}
          aria-label={title}
          variants={aboutReveal}
          custom={{ delay: 0.3 + index * 0.14, reduce: reduceMotion }}
          className="grid gap-5 border-t border-border py-7 xl:grid-cols-[144px_minmax(0,1fr)] xl:gap-6"
        >
          <h4 className="text-base font-semibold leading-6 text-forest-ink">
            {title}
          </h4>
          <ul className="flex min-w-0 max-w-[40rem] flex-wrap gap-x-6 gap-y-5">
            {data.map(({ name, imgPath, color }) => (
              <li
                key={name}
                className="flex min-w-0 max-w-full items-center gap-2"
              >
                <span
                  aria-hidden="true"
                  className={`flex size-6 shrink-0 items-center justify-center [&>svg]:max-h-6 [&>svg]:max-w-6 ${color ?? ""}`}
                >
                  {imgPath}
                </span>
                <span className="min-w-0 text-sm font-medium leading-6">
                  {name.includes("/") ? (
                    <>
                      {name.split("/")[0]}/<wbr />
                      {name.split("/")[1]}
                    </>
                  ) : (
                    name
                  )}
                </span>
              </li>
            ))}
          </ul>
        </motion.section>
      ))}
    </div>
  );
};

export default AboutSkillList;
