"use client";
import React, { FC, memo } from "react";
import Logo from "../common/Logo";
import Socials from "../common/Socials";

import { Sheet, SheetContent } from "../ui/sheet";
import { useMobileNavStore } from "@/store/MobileNavStore";
import { links } from "./NavData";
import { motion } from "framer-motion";

import { NavProps } from "./Nav";
import { Link } from "react-scroll";
import { containerVariant, fadeIn, itemVariant } from "@/lib/variant";

const MobileNav: FC<NavProps> = ({
  containerStyles,
  linkStyles,
  activeLinkStyles,
}) => {
  const { isOpen, setIsOpen } = useMobileNavStore();
  const handleNavClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <Sheet open={isOpen} onOpenChange={handleNavClick}>
        <SheetContent>
          <div className="flex h-5/6 flex-col items-center justify-between">
            <Logo />
            <nav>
              <motion.nav
                variants={containerVariant}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.3 }}
                className={containerStyles}
              >
                {links.map((link, index) => (
                  <motion.div variants={itemVariant} key={index}>
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
                      <span className="cursor-pointer capitalize">
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            </nav>
            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
            >
              <Socials containerStyles="flex gap-x-4" iconStyles="text-3xl" />
            </motion.div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default memo(MobileNav);
