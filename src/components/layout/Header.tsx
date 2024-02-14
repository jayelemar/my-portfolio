'use client';

import { usePathname } from "next/navigation";
import { ThemeToggleBtn } from "../common/ThemeToggleBtn";
import Logo from "../common/Logo";
import MobileNav from "./MobileNav";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import { useMobileNavStore } from "@/store/MobileNavStore";
import { AlignJustify } from "lucide-react";

const Header = () => {

  // header style event transition
  const [header, setHeader] = useState(false)
  const pathname = usePathname()
  useEffect(() => {
    const scrollYPos = window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false)
    })

    // remove event
    return () => window.removeEventListener('scroll', () => scrollYPos )
  }, [])
  
  // Mobile Nav Event
  const { setIsOpen } = useMobileNavStore()
  const handleClick = (e:React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpen(true)
  };

  return (
    <header className={`${
        header 
          ? "py-4 bg-white shadow-lg dark:bg-accent" 
          : "py-6 dark:bg-transparent"
      } sticky top-0 z-30 transition-all
      ${pathname === '/' && 'bg-[#fef9f5]'}
      `

      }
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Logo/>
          
            {/* nav */}
          <div className="flex items-center gap-4 xl:gap-6">
            <div className="hidden xl:flex">
              <Nav 
                containerStyles='flex justify-center items-center gap-10' 
                linkStyles='relative hover:text-primary/60 transition-all duration-300 text-lg font-medium' 
                activeLinkStyles='text-primary'
              />
            </div>
            <ThemeToggleBtn />
            {/* mobile nav */}
            <div className="flex xl:hidden">
              <AlignJustify 
                size={30} 
                className="cursor-pointer lg:hidden"
                onClick={handleClick}
              />
            <MobileNav/>
            </div>
          </div>
        </div>
      </div>

    </header>
  )
}

export default Header