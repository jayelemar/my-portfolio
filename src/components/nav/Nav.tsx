"use client";

import { FC, memo } from "react";
import { Link } from "react-scroll";
import { useMobileNavStore } from "@/store/MobileNavStore";
import { links } from "./NavData";
import { motion } from "framer-motion";
import { containerVariant2, itemVariant2 } from "@/lib/variant";
import { cn } from "@/lib/utils";

export type NavProps = {
  containerStyles: string;
  linkStyles: string;
  activeLinkStyles: string;
};

const Nav: FC<NavProps> = ({
  containerStyles,
  linkStyles,
  activeLinkStyles,
}) => {
  const { isOpen, setIsOpen } = useMobileNavStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false); // Close mobile nav if open
  };

  return (
    <motion.nav
      variants={containerVariant2}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.3 }}
      className={`${containerStyles}`}
    >
      <button
        onClick={scrollToTop}
        className={cn("cursor-pointer", linkStyles)}
      >
        Home
      </button>

      {links.map((link, index) => (
        <motion.div variants={itemVariant2} key={index}>
          <Link
            to={link.path}
            smooth={true}
            duration={300}
            offset={link.offset}
            activeClass={activeLinkStyles}
            spy={true}
            hashSpy={true}
            spyThrottle={500}
            ignoreCancelEvents={false}
            className={linkStyles}
            onClick={() => setIsOpen(false)}
          >
            <span className="cursor-pointer capitalize">{link.name}</span>
          </Link>
        </motion.div>
      ))}
    </motion.nav>
  );
};

export default memo(Nav);
