'use client';
import React from 'react'
import Logo from '../common/Logo'
import Nav from './Nav'
import Socials from '../common/Socials'

import { Sheet, SheetContent } from '../ui/sheet'
import { useMobileNavStore } from '@/store/MobileNavStore';


const MobileNav = ({children}: {children: React.ReactNode}) => {
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

            {children}

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

export default MobileNav