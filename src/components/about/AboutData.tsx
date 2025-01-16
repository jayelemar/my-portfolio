import { HomeIcon, MailIcon, PhoneCall, User2 } from "lucide-react";
import {
  SiCss3,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiExpress,
  SiPrisma,
  SiMongodb,
  SiJest,
  SiFigma,
  SiRedux,
} from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { TbBrandNextjs } from "react-icons/tb";
import { FaNodeJs } from "react-icons/fa";

export type infoProps = {
  icon: React.ReactElement;
  text: string;
};

export const info: infoProps[] = [
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
  },
];

export type DataProps = {
  name: string;
  imgPath: React.ReactElement;
  color?: string;
};

export type SkillSetProps = {
  title: string;
  data: DataProps[];
};

export const skillSet: SkillSetProps[] = [
  {
    title: "Frontend",
    data: [
      {
        name: "HTML",
        imgPath: <SiHtml5 size={40} />,
        color: "text-[#dd4b25]",
      },
      {
        name: "CSS",
        imgPath: <SiCss3 size={40} />,
        color: "text-[#2862e9]",
      },
      {
        name: "Javascript",
        imgPath: <SiJavascript size={40} />,
        color: "text-[#efd81d]",
      },
      {
        name: "React.js",
        imgPath: <SiReact size={40} />,
        color: "text-[#00d1f7]",
      },
      {
        name: "Typescript",
        imgPath: <SiTypescript size={40} />,
        color: "text-[#0076c6]",
      },
      {
        name: "Next.js",
        imgPath: <TbBrandNextjs size={40} />,
        color: "dark:text-white",
      },

      {
        name: "Tailwind",
        imgPath: <SiTailwindcss size={40} />,
        color: "text-[#08b1cf]",
      },
      {
        name: "Redux TLK",
        imgPath: <SiRedux size={40} />,
        color: "text-[#7248b6]",
      },
    ],
  },
  {
    title: "Backend",
    data: [
      {
        name: "NodeJS",
        imgPath: <FaNodeJs size={40} />,
        color: "text-[#509941]",
      },
      {
        name: "Express.js",
        imgPath: <SiExpress size={40} />,
      },

      {
        name: "Prisma",
        imgPath: <SiPrisma size={40} />,
        color: "",
      },

      {
        name: "MySQL",
        imgPath: <GrMysql size={40} />,
        color: "text-[#015c87]",
      },
      {
        name: "MongoDB",
        imgPath: <SiMongodb size={40} />,
        color: "text-[#599636]",
      },
      {
        name: "Git",
        imgPath: <SiGit size={40} />,
        color: "text-[#e84d31]",
      },
      {
        name: "Github",
        imgPath: <SiGithub size={40} />,
      },
      {
        name: "Jest",
        imgPath: <SiJest size={40} />,
        color: "text-[#c03b13]",
      },
      {
        name: "Figma",
        imgPath: <SiFigma size={40} />,
        color: "",
      },
    ],
  },
];
