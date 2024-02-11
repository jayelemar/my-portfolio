import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { AlignJustify } from 'lucide-react'
import Logo from '../common/Logo'
import Nav from './Nav'
import Socials from '../common/Socials'

const MobileNav = () => {
  // const {isOpen, setIsOpen} = useMobileNavStore()
  // const handleNavClick = () => {
  //   setIsOpen(!isOpen)
  // };
  return (
    <div>
      <Sheet 
        // open={isOpen} 
        // onOpenChange={handleNavClick}
      >
        <SheetTrigger asChild>
          <AlignJustify className='cursor-pointer'/>
        </SheetTrigger>
        <SheetContent>
          <div className="flex flex-col items-center justify-between h-full py-8">
            <div className="flex flex-col items-center gap-y-32">
              <Logo  />
              <Nav 
                containerStyles='flex flex-col gap-y-6 items-center' 
                linkStyles='text-2xl' 
                underlineStyles=''
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