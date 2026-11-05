"use client";

import { usePathname } from "next/navigation";
import { ThemeToggleBtn } from "../common/ThemeToggleBtn";
import Logo from "../common/Logo";
import MobileNav from "../nav/MobileNav";
import Nav from "../nav/Nav";
import { useEffect, useState } from "react";
import { useMobileNavStore } from "@/store/MobileNavStore";
import { Button } from "../ui/button";

const Header = () => {
  // header style event transition
  const [header, setHeader] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const updateHeader = () => setHeader(window.scrollY > 50);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  // Mobile Nav Event
  const { isOpen, setIsOpen } = useMobileNavStore();

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
          <div>
            <Logo />
          </div>

          {/* nav */}
          <div className="flex items-center gap-4 xl:gap-6">
            <div className="hidden lg:flex">
              <Nav
                containerStyles="flex justify-center items-center gap-10"
                linkStyles="relative hover:text-primary transition-all duration-300 text-lg font-medium"
                activeLinkStyles="text-primary"
              />
            </div>
            <ThemeToggleBtn />

            {/* mobile nav */}
            <div className="flex lg:hidden">
              <Button
                id="mobile-navigation-trigger"
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Open navigation"
                aria-expanded={isOpen}
                aria-controls={isOpen ? "mobile-navigation" : undefined}
                aria-haspopup="dialog"
                className="size-11 rounded-full bg-muted/60 text-foreground hover:bg-muted lg:hidden"
                onClick={() => setIsOpen(true)}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M4 8h16M4 16h16" />
                </svg>
              </Button>
              <MobileNav
                containerStyles="flex flex-col gap-y-6 items-center"
                linkStyles="text-2xl"
                activeLinkStyles=""
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
