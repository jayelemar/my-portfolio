import React, { FC } from 'react'
import { AboutSkillListProps } from './AboutSkillList'
import { DataProps } from './AboutData'

const AboutFrontEnd:FC<AboutSkillListProps> = ({ skillSet, getData }) => {
  return (
    <article className="flex flex-col relative top-0 right-0 w-[500px] h-[180px]">

    <div className="grid grid-cols-2 xl:grid-cols-3 mx-auto xl:mx-0 z-10">
    {getData(skillSet, 'Frontend' )?.data.map((item:DataProps, index:number) => {
        const {name, imgPath, color} = item
        return (
          <>
            <div className="flex justify-start items-center text-center hover:scale-[1.1]  cursor-default" key={index}>
              <div className={`${color} scale-[.4]`}>{imgPath}</div>
              <div className="text-base">{name}</div>
            </div>
          </>
        )
      })}
    </div>
  </article>
  )
}

export default AboutFrontEnd