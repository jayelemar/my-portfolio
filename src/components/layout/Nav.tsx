import { FC, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

const links = [
  { path: '/', name: 'home'},
  { path: '#about', name: 'about'},
  { path: '#projects', name: 'my projects'},
  { path: '#contact', name: 'contact'},
]



type NavProps = {
  containerStyles: string,
  linkStyles: string,
  underlineStyles:string
}


const scrollToSection = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Nav:FC<NavProps> = ({ containerStyles, linkStyles, underlineStyles }) => {
  const path = usePathname()
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index)=> {
        return (
          <Link 
            href={link.path} 
            key={index}
            className={`capitalize ${linkStyles}`}
          >
            {link.path === path && (
              <motion.span 
                initial={{ y: '-100%' }}
                animate={{ y: scrollPosition < 100 ? 0 : '-100%' }}
                transition={{ type: 'tween' }}
                layoutId="underline"
                className={`${underlineStyles}`}
                onClick={() => scrollToSection('projects')}
              />
            )}
            { link.name }
          </Link>
        )
      })}
    </nav>
  )
}

export default Nav