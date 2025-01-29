import React from "react";
import { info } from "./AboutData";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variant";

interface AboutInfoProps {
  containerStyles: string;
}

const AboutInfo = ({ containerStyles }: AboutInfoProps) => {
  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className={containerStyles}
    >
      {info.map((item, index) => {
        return (
          <div
            className="m-6 mx-auto flex items-center gap-x-4 text-balance pl-4 text-left xl:mx-0"
            key={index}
          >
            <div className="text-primary">{item.icon}</div>
            <div className="">{item.text}</div>
          </div>
        );
      })}
      <div className=" m-6 mx-auto hidden items-center gap-x-4 text-balance pl-4 text-left md:flex xl:mx-0">
        <div className="text-primary">
          <GraduationCap size={25} />
        </div>
        <div className="flex flex-col gap-x-2 text-left lg:flex-row">
          <span className="">Bachelor of Science in</span>
          <span className="">Electronics Engineering</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutInfo;
