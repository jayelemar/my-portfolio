import React, { FC } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import AboutSkillList from './AboutSkillList'
import AboutInfo from './AboutInfo'
import { SkillSetProps } from './AboutData'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/variant'



type AboutTabsProps = {
  skillSet: SkillSetProps[],
  getData: (arr: SkillSetProps[], title: string) => SkillSetProps | undefined;
}

const AboutTabs:FC<AboutTabsProps> = ({ skillSet, getData }) => {
  return (
    <motion.div
      variants={fadeIn('up', 0.6)}
      initial='hidden'
      whileInView={'show'}
      viewport={{once:false, amount: 0.2}}
      className="flex-1 max-w-[700px]"
    >
      <Tabs defaultValue="skillset">
        <TabsList className="w-full grid xl:grid-cols-2 xl:max-w-[530px] xl:border dark:bg-background dark:border-none">
          <TabsTrigger className="w-[220px] xl:w-auto" value="skillset" >
            Skills and Technologies
          </TabsTrigger>
          <TabsTrigger className="w-[220px xl:w-auto" value="info" >
            Personal Information
          </TabsTrigger>
        </TabsList>
        <div className="text-lg mt-2 xl:mt-2 ">
          {/* Tabs Content */}
          <TabsContent value="skillset">
            {/* Skill List */}
            <motion.span
              variants={fadeIn('up', .6)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once:false, amount: 0.2}}
              className="text-primary text-[15px] xl:text-base text-balance h-[345px] xl:h-[255px]"
            >
              Here are the techonologies I worked with.
            </motion.span>
            <div className="flex flex-col justify-center text-center xl:text-left mt-2">
              <AboutSkillList 
                skillSet={skillSet} 
                getData={getData} 
              />

            </div>
          </TabsContent>
          <TabsContent value="info">
            <AboutInfo/>
          </TabsContent>
        </div>
      </Tabs>
    </motion.div>
  )
}

export default AboutTabs