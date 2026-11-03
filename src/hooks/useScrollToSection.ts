import { useMobileNavStore } from "@/store/MobileNavStore";
import { useEffect, useState } from "react";
import { scrollToSection } from "@/lib/navigation";

export const useScrollToSection = (links: { path: string; name: string }[]) => {
  const { setIsOpen } = useMobileNavStore();
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      links.forEach((link) => {
        const element = document.getElementById(link.path);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInView =
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2;

          if (isInView) {
            setActiveSection(link.path); // Update the active section
          }
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [links]);

  const scrollToElement = (id: string) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  return { activeSection, scrollToElement };
};
