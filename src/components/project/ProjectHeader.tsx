import React from 'react'
import { SiCodeforces } from 'react-icons/si'

const ProjectHeader = () => {
  return (
    <div className="mx-auto xl:mx-0 text-center xl:text-left mb-6 h-[15vh] flex flex-col justify-center w-full ">
      <h2 className="mb-8 xl:mb-6 mx-auto xl:mx-0 text-4xl font-bold relative w-max gap-x-3 flex justify-center items-center">
        <SiCodeforces size={35} className="text-primary"/>
        My Projects
      </h2>
      <p className="text-center xl:text-left">
        Check out some of my works
      </p>
    </div>
  )
}

export default ProjectHeader