"use client";

import { FC } from "react";
import { SkillSetProps } from "./AboutData";
import { motion } from "framer-motion";
import { containerVariant, itemVariant } from "@/lib/variant";

export type AboutSkillListProps = {
  skillSet: SkillSetProps[];
};

const AboutSkillList: FC<AboutSkillListProps> = ({ skillSet }) => {
  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.3 }}
      className="relative right-0 grid w-full grid-cols-4 gap-x-3 gap-y-5 pt-2 sm:grid-cols-5 sm:gap-x-6 xl:right-10 xl:gap-x-4"
    >
      {skillSet
        .flatMap(({ data }) => data)
        .map(({ name, imgPath, color }) => (
          <motion.div
            variants={itemVariant}
            key={name}
            className="z-10 flex min-w-0 flex-col items-center justify-start gap-y-[7px] text-center"
          >
            <div
              className={`${color ?? ""} transition-transform hover:scale-125`}
            >
              {imgPath}
            </div>
            <p className="w-full max-w-[88px] cursor-default whitespace-normal break-words text-center text-[10px] font-medium leading-tight text-muted-foreground">
              {name.slice(0, name.indexOf("/") + 1)}
              {name.includes("/") && <wbr />}
              {name.slice(name.indexOf("/") + 1)}
            </p>
          </motion.div>
        ))}
    </motion.div>
  );
};

export default AboutSkillList;
