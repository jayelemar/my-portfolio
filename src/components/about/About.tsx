'use client';

import DevImage from "../common/DevImage";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import AboutSkillList from "./AboutSkillList";
import { CircleUserRound } from "lucide-react";

import { SkillSetProps, skillSet } from "./AboutData";
import AboutInfo from "./AboutInfo";



const About = () => {
  const getData = (arr: SkillSetProps[], title: string): SkillSetProps | undefined => {
    return arr.find((item) => item.title === title);
  };

  return (
    <section className="xl:h-[860px] pb-12 xl:py-24">
      <div className="container mx-auto ">
        <h2 className="mb-8 xl:mb-16 text-center mx-auto text-4xl font-bold relative w-max flex items-center justify-between gap-x-3 ">
          <CircleUserRound size={35} className="text-primary"/>About Me
        </h2>
        <div className="flex flex-col xl:flex-row justify-center items-center xl:items-start xl:justify-between">

          {/* Image */}
          <div className="hidden xl:flex flex-1 relative ">
            <DevImage 
              containerStyles="bg-[url('/about/shape-light.svg')] dark:bg-[url('/about/shape-dark.svg')] w-[505px] h-[505px] bg-no-repeat relative "
              imgSrc='/about/developer.png'
            />
          </div>
          
          
          {/* Tabs */}
          <div className="flex-1 max-w-[700px]">
            <Tabs defaultValue="skillset">
              <TabsList className="w-full grid xl:grid-cols-2 xl:max-w-[530px] xl:border dark:bg-background dark:border-none">
                <TabsTrigger className="w-[220px] xl:w-auto" value="skillset" >Skills and Technologies</TabsTrigger>
                <TabsTrigger className="w-[220px xl:w-auto" value="info" >Personal Information</TabsTrigger>
              </TabsList>
              <div className="text-lg mt-12 xl:mt-8 ">
                {/* Tabs Content */}
                <TabsContent value="skillset">
                  {/* Skill List */}
                  <div className="text-center xl:text-left">
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
          </div>
        </div>
      </div>
    </section>
  )
}

export default About