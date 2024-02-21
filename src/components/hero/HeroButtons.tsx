'use client';

import Link from "next/link";
import { Button } from "../ui/button";
import { Download, Send } from "lucide-react";

const HeroButtons = () => {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:justify-center xl:justify-start w-full mx-auto xl:mx-0 mb-16 xs:mb-5 lg:mb-12 xl:mb-5">
      <Link href='#contact'>
        <Button className='gap-2 rounded-full text-base w-44'>
          Contact Me <Send size={18}/>
        </Button>
      </Link>
      <Link 
        href='https://drive.google.com/uc?id=16ISbek2KoUqtkvyVkx18GNjWJx0IIBjQ' 
        download
      >
        <Button variant={'secondary'} className='gap-2 rounded-full text-base w-44 bg-foreground/10 hover:bg-foreground/15'>
          Download CV <Download size={18}/>
        </Button>
      </Link>
    </div>
  )
}

export default HeroButtons