import ContactReveal, { type ContactEntrance } from "./ContactReveal";

const ContactHeader = ({ entrance }: { entrance: ContactEntrance }) => (
  <ContactReveal entrance={entrance}>
    <h2
      id="contact-heading"
      className="mb-8 text-balance text-4xl font-bold tracking-tight md:text-5xl"
    >
      Let’s work together.
    </h2>
  </ContactReveal>
);

export default ContactHeader;
