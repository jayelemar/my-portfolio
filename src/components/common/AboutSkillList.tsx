'use client';

import Image from "next/image";
import { SkillSetProps } from "./About";

const AboutSkillList = ({ skillSet, getData }: { skillSet: SkillSetProps[], getData: (arr: SkillSetProps[], title: string) => SkillSetProps | undefined }) => {
  return (
    <>
    <div className="flex flex-col">
      <h3>Frontend Development</h3>
      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-x-2 gap-y-6 pt-4 w-auto xl:w-[550px]">
        {getData(skillSet, 'Frontend Development' )?.data.map((item, index) => {
          const {name, imgPath, color} = item
          return (
            <div key={index} className="flex flex-col items-center justify-center text-center gap-y-1 hover:scale-110">
              <div className={`${color}`}>{imgPath}</div>
              <p className="w-2/4 text-center mx-auto text-sm font-light whitespace-nowrap text-muted-foreground">
                {name}
              </p>
            </div>
          )
        })}
        <div className="flex flex-col items-center justify-center text-center hover:scale-110">
          <Image src='/about/zustand-logo.png' alt="" width={80} height={80} className="relative left-4"/>
          <p className="w-2/4 text-center mx-auto xl:mx-0 text-base font-light relative bottom-2">
            Zustand
          </p>
        </div>
      </div>
    </div>



      

    <div className="flex flex-col">
      <h3>Backend Development</h3>
      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-x-2 gap-y-6 pt-4 w-auto xl:w-[550px]">
        {getData(skillSet, 'Backend Development' )?.data.map((item, index) => {
          const {name, imgPath, color} = item
          return (
            <div key={index} className="flex flex-col items-center justify-center text-center gap-y-1 hover:scale-110">
              <div className={`${color}`}>{imgPath}</div>
              <p className="w-2/4 text-center mx-auto text-sm font-light whitespace-nowrap text-muted-foreground">
                {name}
              </p>
            </div>
          )
        })}
        <div className="flex flex-col items-center justify-center text-center hover:scale-110">
          <Image src='/about/zustand-logo.png' alt="" width={80} height={80} className="relative left-4"/>
          <p className="w-2/4 text-center mx-auto xl:mx-0 text-base font-light relative bottom-2">
            Zustand
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default AboutSkillList