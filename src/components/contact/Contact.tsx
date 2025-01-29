"use client";

import React from "react";
import ContactForm from "./ContactForm";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variant";
import ContactInfo from "./ContactInfo";
import ContactHeader from "./ContactHeader";

const Contact = () => {
  return (
    <section id="contact" className="scroll-mt-12">
      <div className="container mx-auto mb-16 xl:h-[55vh] ">
        {/* header */}
        <ContactHeader />

        <div className="lg  flex flex-col gap-x-6  md:mx-0 md:flex-row md:items-center md:justify-between xl:mx-10">
          {/* text & illustration*/}
          <ContactInfo />
          {/* form */}
          <motion.div
            variants={fadeIn("left", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.1 }}
            className="md:basis-4/5"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
