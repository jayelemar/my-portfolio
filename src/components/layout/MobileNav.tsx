'use client';
import React from 'react'
import Logo from '../common/Logo'
import Nav from './Nav'
import Socials from '../common/Socials'

import { Sheet, SheetContent } from '../ui/sheet'
import { useMobileNavStore } from '@/store/MobileNavStore';


const MobileNav = () => {
  const {isOpen } = useMobileNavStore()

  return (
    <div className='z-50'>
      <Sheet open={isOpen}>
        <SheetContent>
          <div className="flex flex-col items-center justify-between h-full py-8">
            <div className="flex flex-col items-center gap-y-32">
              <Logo  />
              <Nav 
                containerStyles='flex flex-col gap-y-6 items-center' 
                linkStyles='text-2xl' 
                activeLinkStyles=''
              />

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