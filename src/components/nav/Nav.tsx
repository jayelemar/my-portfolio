import { FC, memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { containerVariant2, itemVariant2 } from "@/lib/variant";

export type LinkType = {
  path: string;
  name: string;
};

export const links: LinkType[] = [
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

  return (
    <motion.nav
      variants={containerVariant2}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      className={containerStyles}
    >
      {links.map((link, index) => (
        <motion.div variants={itemVariant2} key={index}>
          <motion.button
            onClick={() => {
              scrollToElement(link.path);
            }}
            className={cn(
              "group relative cursor-pointer capitalize transition-colors duration-300",
              linkStyles,
              activeSection === link.path && `${activeLinkStyles}`,
            )}
          >
            {link.name}
            {activeSection === link.path && (
              <motion.span
                layout
                className="absolute bottom-0 left-0 h-[2px] bg-primary"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ width: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.button>
        </motion.div>
      ))}
    </motion.nav>
  );
};

export default memo(Nav);
