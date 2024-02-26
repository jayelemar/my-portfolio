'use client';

import Image from "next/image";
import { FC,  } from "react";
import { DataProps, SkillSetProps } from "./AboutData";
import { HoverCard, HoverCardTrigger } from "../ui/hover-card";



export type AboutSkillListProps = {
  skillSet: SkillSetProps[],
  getData: (arr: SkillSetProps[], title: string) => SkillSetProps | undefined;
}

const AboutSkillList:FC<AboutSkillListProps> = ({ skillSet, getData }) => {


  return (

      <div className="grid grid-cols-4 sm:grid-cols-5 gap-y-5 pt-2 gap-x-4 sm:gap-x-8 xl:gap-x-4 w-auto relative  right-0 xl:right-10 h-[345px]  xl:h-[255px]">
        {getData(skillSet, 'Frontend' )?.data.map((item:DataProps, index:number) => {
          const {name, imgPath, color} = item
          return (
            <div key={index} className="flex flex-col items-center justify-center text-center gap-y-[7px] z-10">
              <HoverCard>
                <HoverCardTrigger className='flex flex-col justify-center items-center text-center'>
                  <>
                    <div className={`${color} hover:scale-125`}>{imgPath}</div>
                    <p className=" text-center w-auto  font-medium whitespace-nowrap text-muted-foreground text-[10px] cursor-default ">
                      {name}
                    </p>
                  </>
                </HoverCardTrigger>
            </HoverCard>
            </div>
          )
        })}
        <div className="flex flex-col items-center justify-start text-">
          <HoverCard>
            <HoverCardTrigger>
              <>
              <Image 
                src='/about/zustand-logo.png' 
                alt="zustand" 
                width={46} 
                height={46} 
                className="relative hover:scale-125"
              />
              <p className="w-auto text-center mx-auto relative bottom-0.5 font-medium whitespace-nowrap text-muted-foreground text-[10px] cursor-default ">
                Zustand
              </p>
              </>
            </HoverCardTrigger>
              </HoverCard>
        </div>
        {getData(skillSet, 'Backend' )?.data.map((item:DataProps, index:number) => {
          const {name, imgPath, color} = item
          return (
            <div key={index} className="flex flex-col items-center justify-center text-center">
              <HoverCard>
                <HoverCardTrigger className='flex flex-col justify-center items-center text-center'>
                  <>
                    <div className={`${color} hover:scale-125`}>{imgPath}</div>
                    <p className="w-auto text-center mx-auto  font-medium whitespace-nowrap text-muted-foreground text-[10px] cursor-default ">
                      {name}
                    </p>
                  </>
                </HoverCardTrigger>
            </HoverCard>
            </div>
          )
        })}
      </div>

  )
}

export default AboutSkillList