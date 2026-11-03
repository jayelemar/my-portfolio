"use client";

import { RiLinkedinFill, RiGithubFill, RiFacebookFill } from "react-icons/ri";
import Link from "next/link";
import { FC } from "react";
import { motion, type AnimationControls, type Variants } from "framer-motion";

const icons = [
  {
    path: "https://www.linkedin.com/in/jay-termulo/",
    label: "LinkedIn",
    name: <RiLinkedinFill />,
  },
  {
    path: "https://github.com/jayelemar",
    label: "GitHub",
    name: <RiGithubFill />,
  },
  {
    path: "https://facebook.com/jayelemar.termulo/",
    label: "Facebook",
    name: <RiFacebookFill />,
  },
];

type SocialsProps = {
  containerStyles: string;
  iconStyles: string;
  reveal?: {
    controls: AnimationControls;
    variants: Variants;
    delay: number;
    stagger: number;
  };
};

const Socials: FC<SocialsProps> = ({ containerStyles, iconStyles, reveal }) => {
  return (
    <div className={`${containerStyles}`}>
      {icons.map((icon, index) => {
        const link = (
          <Link
            href={icon.path}
            target="_blank"
            rel="noopener noreferrer"
            key={icon.path}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm ${iconStyles}`}
            aria-label={`Jay Elemar on ${icon.label}`}
          >
            {icon.name}
          </Link>
        );
        return reveal ? (
          <motion.span
            key={icon.path}
            initial={false}
            animate={reveal.controls}
            variants={reveal.variants}
            custom={{ delay: reveal.delay + index * reveal.stagger }}
            onFocusCapture={() => reveal.controls.set("visible")}
            className="inline-flex"
          >
            {link}
          </motion.span>
        ) : (
          link
        );
      })}
    </div>
  );
};

export default Socials;
