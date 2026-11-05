"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-20 hidden h-12 w-12 items-center justify-center rounded-full bg-green-200 text-green-900 shadow-lg transition-colors hover:bg-green-300 dark:bg-green-300 dark:text-green-950 dark:hover:bg-green-200 sm:flex"
        >
          <ArrowUp size={22} strokeWidth={2} aria-hidden="true" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
