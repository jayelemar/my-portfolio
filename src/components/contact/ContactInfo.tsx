import React from "react";
import { info } from "../about/AboutData";

const ContactInfo = () => {
  const filteredInfo = info.filter(
    (item) => item.text !== "Jay Elemar Termulo",
  );
  return (
    <div className="mb-6 flex flex-col pt-4 md:mb-12 md:basis-2/5 md:pt-0 lg:pt-4 xl:mb-0">
      {/* text  */}
      <div className="flex flex-col justify-center ">
        <p className="subtitle font-base flex max-w-full text-balance text-lg text-muted-foreground ">
          I&apos;m available for freelance & full time positions.
        </p>
        <p className="subtitle font-base mb-6 flex max-w-full text-lg text-muted-foreground">
          Contact me and let’s talk.
        </p>
      </div>
      <div className="mb-12 flex flex-col gap-y-4 text-base md:mb-10 md:gap-y-12">
        {/* info */}
        {filteredInfo.map((info, index) => {
          return (
            <div key={index} className="flex items-center gap-x-8 text-center ">
              <span className="text-primary">{info.icon}</span>
              {info.href ? (
                <a
                  href={info.href}
                  className="flex min-h-11 min-w-0 items-center rounded-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
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
