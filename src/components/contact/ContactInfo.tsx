import React from "react";
import { motion } from "framer-motion";
import { fadeIn, itemVariant } from "@/lib/variant";
import { info } from "../about/AboutData";

const ContactInfo = () => {
  const filteredInfo = info.filter(
    (item) => item.text !== "Jay Elemar Termulo",
  );
  return (
    <div className="mb-6 flex flex-col pt-4 md:mb-12 md:basis-2/5 md:pt-0 xl:mb-0">
      {/* text  */}
      <div className="flex flex-col justify-center">
        <motion.p
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.1 }}
          className="subtitle font-base flex max-w-full text-balance text-lg text-muted-foreground"
        >
          I&apos;m available for freelance & full time positions.
        </motion.p>
        <motion.p
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.1 }}
          className="subtitle font-base mb-6 flex max-w-full text-lg text-muted-foreground"
        >
          Contact me and lets talk.
        </motion.p>
      </div>
      <motion.div
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.1 }}
        className="mb-12 flex flex-col gap-y-4 text-base md:mb-10 md:gap-y-12"
      >
        {/* info */}
        {filteredInfo.map((info, index) => {
          return (
            <motion.div
              variants={itemVariant}
              key={index}
              className="flex items-center gap-x-8 text-center "
            >
              <span className="text-primary">{info.icon}</span>
              <div className="text-muted-foreground">{info.text}</div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ContactInfo;
