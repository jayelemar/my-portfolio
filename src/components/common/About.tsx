'use client';


import DevImage from "./DevImage";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import AboutSkillList from "./AboutSkillList";
import { CircleUserRound, GraduationCap, HomeIcon, MailIcon, PhoneCall, User2 } from "lucide-react";
import { SiCss3, SiHtml5, SiJavascript, SiReact, SiReactquery, SiRedux, SiTailwindcss, SiTypescript } from "react-icons/si";
import { FaSass } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FaNodeJs } from "react-icons/fa";
import { SiExpress, SiFirebase } from "react-icons/si";

type infoProps = {
  icon: React.ReactElement,
  text: string,
}

const info: infoProps[] = [
  {
    icon: <User2 size={23} />,
    text: "Jay Elemar Termulo",
  },
  {
    icon: <PhoneCall size={20} />,
    text: "+63 969 256 1601",
  },
  {
    icon: <MailIcon size={20} />,
    text: "jetermulo@gmail.com",
  },
  {
    icon: <HomeIcon size={20} />,
    text: "Bulacan, Philippines",
  }
]

type DataProps = {
  name: string,
  imgPath: React.ReactElement,
  color?: string
}

export type SkillSetProps = {
  title: string,
  data: DataProps[],
}

const skillSet: SkillSetProps[]  = [
  {
    title: 'Frontend Development',
    data: [
      {
        name: 'HTML5',
        imgPath: <SiHtml5 size={60} />,
        color: 'text-[#f76119]'
      },
      {
        name: 'CSS3',
        imgPath: <SiCss3 size={60} />,
        color: 'text-[#1872b6]'
      },
      {
        name: 'Javascript',
        imgPath: <SiJavascript size={60} />, 
        color: 'text-[#efd81d]'
      },
      {
        name: 'Sass',
        imgPath: <FaSass size={60} />,
        color: 'text-[#c66394]'
      },
      {
        name: 'Tailwind',
        imgPath: <SiTailwindcss size={60} />,
        color: 'text-[#08b1cf]'
      },

      {
        name: 'Typescript',
        imgPath: <SiTypescript size={60} />,
        color: 'text-[#0076c6]'
      },
      {
        name: 'React',
        imgPath: <SiReact size={60} />,
        color: 'text-[#00d1f7]'
      },

      {
        name: 'NextJS 13',
        imgPath: <TbBrandNextjs size={60} />,
        color: 'text-black'
      },
      {
        name: 'Redux Toolkit',
        imgPath: <SiRedux size={60} />,
        color: 'text-[#7248b6]'
      },
      {
        name: 'React Query',
        imgPath: <SiReactquery size={60} />,
        color: 'text-[#f73f51]'
      },
    ]
  },
  {
    title: 'Backend Development',
    data: [
      {
        name: 'NodeJS',
        imgPath: <FaNodeJs size={60} />,
        color: 'text-[#509941]'
      },
      {
        name: 'ExpressJS',
        imgPath: <SiExpress size={60} />,
      },
      {
        name: 'Firebase',
        imgPath: <SiFirebase size={60} />,
        color: 'text-[#f7c52a]'
      },
      {
        name: 'MongoDB',
        imgPath: <SiHtml5 size={25} />
      },
      {
        name: 'Insomia',
        imgPath: <SiHtml5 size={25} />
      },
    ]
  },
  {
    title: 'Others',
    data: [
      {
        name: 'VScode',
        imgPath: <SiHtml5 size={25} />
      },
      {
        name: 'Git',
        imgPath: <SiHtml5 size={25} />
      },
      {
        name: 'Github',
        imgPath: <SiHtml5 size={25} />
      },
      {
        name: 'Figma',
        imgPath: <SiHtml5 size={25} />
      },
      {
        name: 'Postman',
        imgPath: <SiHtml5 size={25} />
      },
      {
        name: 'Insomia',
        imgPath: <SiHtml5 size={25} />
      },


    ]
  },
]

const About = () => {
  const getData = (arr: SkillSetProps[], title: string): SkillSetProps | undefined => {
    return arr.find((item) => item.title === title);
  };

  return (
    <section className="xl:h-[860px] pb-12 xl:py-24">
      <div className="container mx-auto ">
        <h2 className="mb-8 xl:mb-16 text-center mx-auto text-4xl font-bold relative w-max flex items-center justify-between gap-x-3 ">
          <CircleUserRound size={35} className="text-primary"/>About Me</h2>
        <div className="flex flex-col xl:flex-row">
          {/* Image */}
          <div className="hidden xl:flex flex-1 relative ">
            <DevImage 
              containerStyles="bg-[url('/about/shape-light.svg')] dark:bg-[url('/about/shape-dark.svg')] w-[505px] h-[505px] bg-no-repeat relative "
              imgSrc='/about/developer.png'
            />
          </div>
          {/* Tabs */}
          <div className="flex-1">
            <Tabs defaultValue="skillset">
              <TabsList className="w-full grid xl:grid-cols-2 xl:max-w-[530px] xl:border dark:bg-background dark:border-none">
                <TabsTrigger className="w-[220px] xl:w-auto" value="skillset" >Skills and Technologies</TabsTrigger>
                <TabsTrigger className="w-[220px xl:w-auto" value="info" >Personal Information</TabsTrigger>
              </TabsList>
              <div className="text-lg mt-12 xl:mt-8 ">
                {/* Tabs Content */}
                <TabsContent value="skillset">
                  <div className="text-center xl:text-left">
                    <div className="">
                      <div className="border-b border-border mb-4">
                        {/* Skill List */}
                        <AboutSkillList skillSet={skillSet} getData={getData}/>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="info">
                  <div className="">
                    <h3></h3>
                    <p></p>
                  </div>
                  {/* Personal Info */}
                  <div className="grid xl:grid-cols-2 gap-4 mb-12 text-left">
                    {info.map((item, index) => {
                      return (
                        <div className="flex items-center gap-x-4 mx-auto xl:mx-0 text-left text-balance" key={index}>
                          <div className="text-primary">{item.icon}</div>
                          <div className="">{item.text}</div>
                        </div>
                      )
                    })}
                    <div className=" items-center gap-x-4 mx-auto xl:mx-0 text-left text-balance hidden md:flex">
                      <div className="text-primary"><GraduationCap size={25} /></div>
                      <div className="text-left">
                        <p className="mb-2">Bachelor of Science in</p>
                        <p className="mb-0">Electronics Engineering</p>
                      </div>
                    </div>
                  </div>
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