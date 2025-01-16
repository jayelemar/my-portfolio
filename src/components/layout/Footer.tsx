"use client";

import Socials from "../common/Socials";

const Footer = () => {
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-2 xl:mx-auto">
        <div className=" flex flex-col items-center justify-between">
          {/* socials */}
          <Socials
            containerStyles="flex gap-x-6 mx-auto xl:mx-0 mb-8 xl:mb-4"
            iconStyles="text-primary hover:scale-125 transition-all text-[20px] dark:text-white/70"
          />

          {/* copyright */}
          <div className="text-muted-foreground">
            <p>
              Copyright &copy;{" "}
              <span className="whitespace-nowrap">Jay Elemar Termulo.</span>{" "}
              <span className="whitespace-nowrap">All rights reserved.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
