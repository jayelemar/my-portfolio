'use client';

import Socials from "../common/Socials";

const Footer = () => {
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto">
        <div className=" flex flex-col items-center justify-between">

          {/* socials */}
          <Socials 
            containerStyles="flex gap-x-6 mx-auto xl:mx-0 mb-4" 
            iconStyles="text-primary hover:scale-125 transition-all text-[20px] dark:text-white/70"/>

          {/* copyright */}
          <div className="text-muted-foreground">
            Copyright &copy; Jay Elemar Termulo. All rights reserved.
          </div>

        </div>
      </div>  
    </footer>
  )
}

export default Footer