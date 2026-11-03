"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollToSection } from "@/hooks/useScrollToSection";

const homeLinks = [{ path: "/", name: "home" }];

const Logo = () => {
  const pathname = usePathname();
  const { scrollToElement } = useScrollToSection(homeLinks);

  return (
    <Link
      href="/"
      className="relative rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      aria-label="Home — scroll to top"
      onClick={(event) => {
        if (
          pathname !== "/" ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        )
          return;
        event.preventDefault();
        scrollToElement("/");
      }}
    >
      <Image src="/logo.svg" width={120} height={40} priority alt="elemar" />
    </Link>
  );
};

export default Logo;
