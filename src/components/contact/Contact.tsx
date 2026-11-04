"use client";

import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import ContactHeader from "./ContactHeader";

const Contact = () => {
  const [replayKey, setReplayKey] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [pageVisible, setPageVisible] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(preference.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    const replayNavigation = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (!link || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href, location.href);
      if (
        url.origin === location.origin &&
        url.pathname === location.pathname &&
        url.hash === "#contact"
      )
        setReplayKey((key) => key + 1);
    };
    updatePreference();
    updateVisibility();
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);
    document.addEventListener("click", replayNavigation);
    return () => {
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
      document.removeEventListener("click", replayNavigation);
    };
  }, []);

  const entrance = { replayKey, reduceMotion, pageVisible };
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-36 lg:scroll-mt-24"
    >
      <div className="container mx-auto mb-16 xl:min-h-[55vh]">
        {/* header */}
        <ContactHeader entrance={entrance} />

        <div className="flex flex-col gap-x-12 gap-y-6 md:flex-row md:items-start md:justify-between">
          {/* text & illustration*/}
          <ContactInfo entrance={entrance} />
          {/* form */}
          <div className="min-w-0 flex-1 lg:min-h-[394px]">
            <ContactForm entrance={entrance} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
