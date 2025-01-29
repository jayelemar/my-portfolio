"use client";

import { FC } from "react";
import { DataProps, SkillSetProps } from "./AboutData";
import { HoverCard, HoverCardTrigger } from "../ui/hover-card";
import { motion } from "framer-motion";
import { containerVariant, itemVariant } from "@/lib/variant";

export type AboutSkillListProps = {
  skillSet: SkillSetProps[];
  getData: (arr: SkillSetProps[], title: string) => SkillSetProps | undefined;
};

const AboutSkillList: FC<AboutSkillListProps> = ({ skillSet, getData }) => {
  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.3 }}
      className="relative right-0 grid w-auto grid-cols-4 gap-x-4 gap-y-5 pt-2 sm:grid-cols-5 sm:gap-x-8  xl:right-10 xl:gap-x-4"
    >
      {getData(skillSet, "Frontend")?.data.map(
        (item: DataProps, index: number) => {
          const { name, imgPath, color } = item;
          return (
            <motion.div
              variants={itemVariant}
              key={index}
              className="z-10 flex flex-col items-center justify-center gap-y-[7px] text-center"
            >
              <HoverCard>
                <HoverCardTrigger className="flex flex-col items-center justify-center text-center">
                  <>
                    <div className={`${color} hover:scale-125`}>{imgPath}</div>
                    <p className=" w-auto cursor-default  whitespace-nowrap text-center text-[10px] font-medium text-muted-foreground ">
                      {name}
                    </p>
                  </>
                </HoverCardTrigger>
              </HoverCard>
            </motion.div>
          );
        },
      )}
      {getData(skillSet, "Backend")?.data.map(
        (item: DataProps, index: number) => {
          const { name, imgPath, color } = item;
          return (
            <motion.div
              variants={itemVariant}
              key={index}
              className="flex flex-col items-center justify-center text-center"
            >
              <HoverCard>
                <HoverCardTrigger className="flex flex-col items-center justify-center text-center">
                  <>
                    <div className={`${color} hover:scale-125`}>{imgPath}</div>
                    <p className="mx-auto w-auto cursor-default  whitespace-nowrap text-center text-[10px] font-medium text-muted-foreground ">
                      {name}
                    </p>
                  </>
                </HoverCardTrigger>
              </HoverCard>
            </motion.div>
          );
        },
      )}
    </motion.div>
  );
};

export default AboutSkillList;
