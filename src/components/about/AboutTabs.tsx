import React, { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AboutSkillList from "./AboutSkillList";
import AboutInfo from "./AboutInfo";
import { SkillSetProps } from "./AboutData";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variant";

type AboutTabsProps = {
  skillSet: SkillSetProps[];
  getData: (arr: SkillSetProps[], title: string) => SkillSetProps | undefined;
};

const AboutTabs: FC<AboutTabsProps> = ({ skillSet, getData }) => {
  return (
    <motion.div
      variants={fadeIn("up", 0.6)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className="max-w-[700px] flex-1"
    >
      <Tabs defaultValue="skillset">
        <TabsList className="grid w-full dark:border-none dark:bg-background xl:max-w-[530px] xl:grid-cols-2 xl:border">
          <TabsTrigger className="w-[220px] xl:w-auto" value="skillset">
            Skills and Technologies
          </TabsTrigger>
          <TabsTrigger className="w-[220px xl:w-auto" value="info">
            Personal Information
          </TabsTrigger>
        </TabsList>
        <div className="mt-2 text-lg xl:mt-2 ">
          {/* Tabs Content */}
          <TabsContent value="skillset">
            {/* Skill List */}
            <motion.span
              variants={fadeIn("up", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
              className="h-[345px] text-balance text-[15px] text-primary xl:h-[255px] xl:text-base"
            >
              Here are the techonologies I worked with.
            </motion.span>
            <div className="mt-2 flex flex-col justify-center text-center xl:text-left">
              <AboutSkillList skillSet={skillSet} getData={getData} />
            </div>
          </TabsContent>
          <TabsContent value="info">
            <AboutInfo containerStyles="min-h-[280px] xl:min-h-[360px]" />
          </TabsContent>
        </div>
      </Tabs>
    </motion.div>
  );
};

export default AboutTabs;
