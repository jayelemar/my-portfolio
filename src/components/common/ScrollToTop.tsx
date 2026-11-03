"use client";

import React, { useState, useEffect } from "react";
import { TbSquareRoundedArrowUp } from "react-icons/tb";

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
          className="fixed bottom-8 right-8 z-20 hidden rounded-full bg-primary p-2 text-primary-foreground shadow-lg hover:bg-primary-hover sm:block"
        >
          <TbSquareRoundedArrowUp size={35} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
