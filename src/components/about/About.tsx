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
    <section id="about"  className="h-[85vh] mb-44 xl:mb-96 xl:py-24 relative scroll-mt-24 xl:-scroll-mt-2">
      <div className="container mx-auto ">
        <h2  className="mb-2 text-center mx-auto text-4xl font-bold relative w-max flex items-center justify-between gap-x-3 ">
          <CircleUserRound size={35} className="text-primary"/>About Me
        </h2>
        <div className="flex flex-col xl:flex-row justify-center items-center xl:items-start xl:justify-between">

          {/* Image */}
          <div className="hidden xl:flex flex-1 relative -top-6    ">
            <div className="bg-[url('/about/shape-light.svg')] dark:bg-[url('/about/shape-dark.svg')] w-[505px] h-[575px] bg-no-repeat relative scale-[.7] ">
            </div>
            <DevImage 
              containerStyles="w-[473px] h-[527px]  absolute -top-12 right-24 scale-[.7]"
              imgSrc='/about/developer.png'
            />
          </div>
          
          
          {/* Tabs */}
          <div className="flex-1 max-w-[700px]">
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
                  <span className="text-muted-foreground text-balance mx-auto hidden md:flex">Here are the techonologies and tools that i use everyday.</span>
                  <div className="flex flex-col justify-center text-center xl:text-left">
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