"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../common/Logo";
import Socials from "../common/Socials";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "../ui/sheet";
import { useMobileNavStore } from "@/store/MobileNavStore";
import { links } from "./NavData";
import { NavProps } from "./Nav";
import { cn } from "@/lib/utils";
import { scrollToHome, scrollToSection } from "@/lib/navigation";

const MobileNav: FC<NavProps> = ({ containerStyles, linkStyles }) => {
  const { isOpen, setIsOpen } = useMobileNavStore();
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        id="mobile-navigation"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          document.getElementById("mobile-navigation-trigger")?.focus();
        }}
      >
        <SheetTitle className="sr-only">Site navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Explore Jay Elemar’s introduction, work, and contact details.
        </SheetDescription>
        <div className="flex h-5/6 flex-col items-center justify-between">
          <Logo />
          <nav aria-label="Main navigation" className={containerStyles}>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              onNavigate={(event) => {
                if (pathname === "/") {
                  event.preventDefault();
                  scrollToHome();
                }
              }}
              className={cn(
                "inline-flex min-h-11 items-center rounded-sm",
                linkStyles,
              )}
            >
              Home
            </Link>
            {links.map((link) => (
              <Link
                key={link.path}
                href={`${pathname === "/" ? "" : "/"}#${link.path}`}
                onClick={() => setIsOpen(false)}
                onNavigate={(event) => {
                  if (pathname === "/") {
                    event.preventDefault();
                    scrollToSection(link.path);
                  }
                }}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-sm capitalize",
                  linkStyles,
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <Socials containerStyles="flex gap-x-4" iconStyles="text-3xl" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
