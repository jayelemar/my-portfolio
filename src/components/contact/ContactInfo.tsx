import React from "react";
import { info } from "../about/AboutData";

const ContactInfo = () => {
  const filteredInfo = info.filter(
    (item) => item.text !== "Jay Elemar Termulo",
  );
  return (
    <div className="flex min-w-0 flex-col gap-5 md:basis-2/5">
      {/* text  */}
      <div className="flex flex-col justify-center ">
        <p className="subtitle font-base flex max-w-full text-balance text-lg text-muted-foreground ">
          I&apos;m available for freelance & full time positions.
        </p>
        <p className="subtitle font-base flex max-w-full text-lg text-muted-foreground">
          Contact me and let’s talk.
        </p>
      </div>
      <div className="flex flex-col gap-y-2 text-base md:gap-y-5">
        {/* info */}
        {filteredInfo.map((info, index) => {
          return (
            <div key={index} className="flex min-h-11 items-center gap-x-5">
              <span className="text-primary">{info.icon}</span>
              {info.href ? (
                <a
                  href={info.href}
                  className="flex min-h-11 min-w-0 items-center rounded-sm text-muted-foreground underline decoration-primary/40 underline-offset-4 hover:text-primary hover:decoration-primary"
                >
                  <span className="break-all">{info.text}</span>
                </a>
              ) : (
                <span className="text-muted-foreground">{info.text}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactInfo;
