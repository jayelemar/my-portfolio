"use client";

import { usePathname } from "next/navigation";
import { ThemeToggleBtn } from "../common/ThemeToggleBtn";
import Logo from "../common/Logo";
import MobileNav from "../nav/MobileNav";
import Nav from "../nav/Nav";
import { useEffect, useState } from "react";
import { useMobileNavStore } from "@/store/MobileNavStore";
import { AlignJustify } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variant";

const Header = () => {
  // header style event transition
  const [header, setHeader] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const scrollYPos = window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    });

    // remove event
    return () => window.removeEventListener("scroll", () => scrollYPos);
  }, []);

  // Mobile Nav Event
  const { setIsOpen } = useMobileNavStore();
  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <header
      className={`${
        header
          ? "bg-white py-4 shadow-lg dark:bg-accent"
          : "py-6 dark:bg-transparent"
      } sticky top-0 z-30 transition-all
      ${pathname === "/" && "bg-[#fef9f5]"}
      `}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
          >
            <Logo />
          </motion.div>

          {/* nav */}
          <div className="flex items-center gap-4 xl:gap-6">
            <motion.div
              variants={fadeIn("left", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
              className="hidden lg:flex"
            >
              <Nav
                containerStyles="flex justify-center items-center gap-10"
                linkStyles="relative hover:text-primary/60 transition-all duration-300 text-lg font-medium"
                activeLinkStyles="text-primary"
              />
            </motion.div>
            <motion.div
              variants={fadeIn("down", 1.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
            >
              <ThemeToggleBtn />
            </motion.div>

            {/* mobile nav */}
            <motion.div
              variants={fadeIn("left", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
              className="flex xl:hidden"
            >
              <AlignJustify
                size={30}
                className="cursor-pointer lg:hidden"
                onClick={handleClick}
              />
              <MobileNav
                containerStyles="flex flex-col gap-y-6 items-center"
                linkStyles="text-2xl"
                activeLinkStyles=""
              />
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
