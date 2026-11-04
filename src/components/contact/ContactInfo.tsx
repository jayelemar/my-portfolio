import { info } from "../about/AboutData";
import ContactReveal, { type ContactEntrance } from "./ContactReveal";
import { contactTiming } from "./contactMotion";

const ContactInfo = ({ entrance }: { entrance: ContactEntrance }) => {
  const filteredInfo = info.filter(
    (item) => item.text !== "Jay Elemar Termulo",
  );
  return (
    <div className="flex min-w-0 flex-col gap-5 md:basis-2/5">
      {/* text  */}
      <div className="flex flex-col justify-center ">
        <ContactReveal entrance={entrance} delay={contactTiming.stagger}>
          <p className="subtitle font-base flex max-w-full text-balance text-lg text-muted-foreground ">
            I&apos;m available for freelance & full time positions.
          </p>
        </ContactReveal>
        <ContactReveal entrance={entrance} delay={contactTiming.stagger * 2}>
          <p className="subtitle font-base flex max-w-full text-lg text-muted-foreground">
            Contact me and let’s talk.
          </p>
        </ContactReveal>
      </div>
      <div className="flex flex-col gap-y-2 text-base md:gap-y-5">
        {/* info */}
        {filteredInfo.map((info, index) => {
          return (
            <ContactReveal
              key={info.label}
              entrance={entrance}
              delay={(index + 3) * contactTiming.stagger}
              className="flex min-h-11 items-center gap-x-5"
            >
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
            </ContactReveal>
          );
        })}
      </div>
    </div>
  );
};

export default ContactInfo;
