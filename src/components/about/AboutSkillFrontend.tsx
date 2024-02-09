import React, { FC } from 'react'
import { AboutSkillListProps } from './AboutSkillList'

import Image from 'next/image'
import { DataProps } from './AboutData'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'



const AboutSkillFrontend:FC<AboutSkillListProps> = ({ skillSet, getData }) => {
  return (
    <article className="flex flex-col relative top-0 right-0  w-[230px] h-[30px]">
      <div className="grid grid-cols-2 gap-x-2 gap-y-6 pt-4 w-auto">
        {getData(skillSet, 'Frontend' )?.data.map((item:DataProps, index:number) => {
          const {name, imgPath, color} = item
          return (
            <div key={index} className="flex flex-col items-center justify-center text-center gap-y-[7px] z-10">
              <HoverCard>
                <HoverCardTrigger>
                  <div className={`${color} hover:scale-125`}>{imgPath}</div>
                </HoverCardTrigger>
              <HoverCardContent className=' absolute py-0 left-0 bottom-0 bg-white/30 rounded-full px-2 w-min'>
              <span className=" w-auto text-center mx-auto text-base font-semibold whitespace-nowrap text-foreground  cursor-default px-2 h-6 outline-none">
                {name}
              </span>
              </HoverCardContent>
            </HoverCard>
            </div>
          )
        })}
        <div className="flex flex-col items-center justify-center text-center gap-y-1.5">
          <HoverCard>
            <HoverCardTrigger>
              <Image src='/about/zustand-logo.png' alt="" width={80} height={80} className="relative left-4 hover:scale-125"/>
            </HoverCardTrigger>
            <HoverCardContent className='z-50  border p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 absolute py-0 left-0 bottom-0 bg-white/30 rounded-full px-2 w-min'>
              <p className="w-auto  text-center mx-auto text-sm font-semibold whitespace-nowrap text-foreground cursor-default px-2">
            Zustand
          </p>

              </HoverCardContent>
              </HoverCard>
        </div>
      </div>
    </article>
  )
}

export default AboutSkillFrontend