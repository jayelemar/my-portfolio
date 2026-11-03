"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { motion, useReducedMotion } from "framer-motion";

export const links = [
  { path: "/", name: "home" },
  { path: "about", name: "about" },
  { path: "projects", name: "my projects" },
  { path: "contact", name: "contact" },
];

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
  const { activeSection, scrollToElement } = useScrollToSection(links);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  return (
    <nav aria-label="Main navigation" className={containerStyles}>
      {links.map((link) => (
        <Link
          key={link.path}
          href={
            link.path === "/"
              ? "/"
              : `${pathname === "/" ? "" : "/"}#${link.path}`
          }
          onNavigate={(event) => {
            if (pathname === "/") {
              event.preventDefault();
              scrollToElement(link.path);
            }
          }}
          aria-current={activeSection === link.path ? "location" : undefined}
          className={cn(
            "group relative inline-flex min-h-11 items-center rounded-sm capitalize transition-colors duration-150",
            linkStyles,
            activeSection === link.path && activeLinkStyles,
          )}
        >
          {link.name}
          {activeSection === link.path && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary"
              initial={reduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
            />
          )}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
