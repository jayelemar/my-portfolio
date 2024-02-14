'use client';

import { FC } from "react"
import { Link } from "react-scroll"
import { getOffset } from "@/lib/utils";
import { useMobileNavStore } from "@/store/MobileNavStore";


type LinkType = { 
    path: string,
    name: string,
    offset: number ,
}

const links:LinkType[] = [
  { 
    path: 'hero',
    name: 'home',
    offset: -120,
  },  
  { 
    path: 'about',
    name: 'about',
    offset: getOffset(0, -90),
  }, 
  { 
    path: 'projects',
    name: 'my projects',
    offset: -90,
  },  
  { 
    path: 'contact',
    name: 'contact',
    offset: getOffset(-80, -160),
  }, 
]

type NavProps = {
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

export default Nav