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
                  <div className={`${color} hover:scale-110`}>{imgPath}</div>
                </HoverCardTrigger>
                <HoverCardContent className='z-50 border text-popover-foreground shadow-md  absolute py-0 left-0 bottom-0 rounded-full px-1 w-min'>
              <p className="w-auto text-center mx-auto text-sm font-medium whitespace-nowrap text-foreground  cursor-default px-1 ">
                {name}
              </p>
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
            <HoverCardContent className='z-50 border text-popover-foreground shadow-md  absolute py-0 left-0 bottom-0 rounded-full px-1 w-min'>
              <p className="w-auto text-center mx-auto text-sm font-medium whitespace-nowrap text-foreground  cursor-default px-1 ">
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