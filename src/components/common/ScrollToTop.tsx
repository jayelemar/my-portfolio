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
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 hidden rounded-full bg-primary/80 p-2 text-white  shadow-lg hover:bg-primary focus:outline-none sm:block"
        >
          <TbSquareRoundedArrowUp size={35} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
