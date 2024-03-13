'use client';

import { FC, memo } from "react"
import { Link } from "react-scroll"
import { useMobileNavStore } from "@/store/MobileNavStore";
import { links } from "./NavData";

export type NavProps = {
  containerStyles: string,
  linkStyles: string,
  activeLinkStyles:string,
}

const Nav:FC<NavProps> = ({ containerStyles, linkStyles, activeLinkStyles }) => {
  const {isOpen, setIsOpen } = useMobileNavStore()

  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index) => (
        <Link 
          key={index} 
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
          <span className="capitalize cursor-pointer">{link.name}</span>
        </Link>
      ))}
    </nav>
  );
}

export default memo(Nav);