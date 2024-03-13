'use client';
import React, { FC, memo } from 'react'
import Logo from '../common/Logo'
import Socials from '../common/Socials'

import { Sheet, SheetContent } from '../ui/sheet'
import { useMobileNavStore } from '@/store/MobileNavStore';
import { links } from './NavData';

import { NavProps } from './Nav';
import { Link } from 'react-scroll';


const MobileNav:FC<NavProps> = ({ containerStyles, linkStyles, activeLinkStyles }) => {
  const {isOpen, setIsOpen} = useMobileNavStore()
  const handleNavClick = () => {
    setIsOpen(!isOpen)
  };

  return (
    <div className=''>
      <Sheet open={isOpen} onOpenChange={handleNavClick}>
        <SheetContent>
          <div className="flex flex-col items-center justify-between h-full py-0 gap-4">
            <Logo  />
            <div className="flex flex-col items-center h-full justify-center">

            <nav className={containerStyles}>
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

            </div>
            <Socials 
                containerStyles='flex gap-x-4' 
                iconStyles='text-3xl' 
              />
          </div>
        </SheetContent>

      </Sheet>
    </div>
  )
}

export default memo(MobileNav)