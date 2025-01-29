import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variant";

const ContactHeader = () => {
  return (
    <div>
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="mb-4 flex items-center gap-x-4 text-lg text-primary"
      >
        <span className="h-0.5 w-[30px] bg-primary"></span>
        Say Hello !
      </motion.div>
      <motion.h1
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.1 }}
        className="h1 max-w-md md:w-auto md:whitespace-nowrap "
      >
        Lets Work Together.
      </motion.h1>
    </div>
  );
};

export default ContactHeader;
