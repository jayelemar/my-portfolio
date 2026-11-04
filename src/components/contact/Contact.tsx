"use client";

import React from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import ContactHeader from "./ContactHeader";

const Contact = () => {
  return (
    <section id="contact" className="scroll-mt-36 lg:scroll-mt-24">
      <div className="container mx-auto mb-16 xl:min-h-[55vh]">
        {/* header */}
        <ContactHeader />

        <div className="flex flex-col gap-x-12 gap-y-6 md:flex-row md:items-start md:justify-between">
          {/* text & illustration*/}
          <ContactInfo />
          {/* form */}
          <div className="min-w-0 flex-1 lg:min-h-[394px]">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
