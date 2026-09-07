import { HomeIcon, MailIcon, PhoneCall, User2 } from "lucide-react";
import {
  SiDocker,
  SiExpo,
  SiFastapi,
  SiGithubactions,
  SiNestjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import {
  TbBrandNextjs,
  TbBrandOpenai,
  TbBrandReactNative,
} from "react-icons/tb";
import { FaNodeJs } from "react-icons/fa";
import {
  JavaScriptIcon,
  LangGraphIcon,
  PlaywrightIcon,
  VitestIcon,
} from "./SkillBrandIcons";

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
    title: "Web",
    data: [
      {
        name: "JavaScript",
        imgPath: <JavaScriptIcon />,
      },
      {
        name: "TypeScript",
        imgPath: <SiTypescript size={40} />,
        color: "text-[#0072b1] dark:text-[#58a6d8]",
      },
      {
        name: "React",
        imgPath: <SiReact size={40} />,
        color: "text-[#087ea4] dark:text-[#61dafb]",
      },
      {
        name: "Next.js",
        imgPath: <TbBrandNextjs size={40} />,
        color: "text-foreground",
      },
      {
        name: "Tailwind CSS",
        imgPath: <SiTailwindcss size={40} />,
        color: "text-[#0e7490] dark:text-[#38bdf8]",
      },
    ],
  },
  {
    title: "Mobile & Server",
    data: [
      {
        name: "React Native",
        imgPath: <TbBrandReactNative size={40} />,
        color: "text-[#087ea4] dark:text-[#61dafb]",
      },
      {
        name: "Expo",
        imgPath: <SiExpo size={40} />,
        color: "text-foreground",
      },
      {
        name: "Node.js",
        imgPath: <FaNodeJs size={40} />,
        color: "text-[#2f7629] dark:text-[#68a063]",
      },
      {
        name: "NestJS",
        imgPath: <SiNestjs size={40} />,
        color: "text-[#c51a3a] dark:text-[#ea2852]",
      },
      {
        name: "Python",
        imgPath: <SiPython size={40} />,
        color: "text-[#2f6592] dark:text-[#ffd343]",
      },
    ],
  },
  {
    title: "AI & Data",
    data: [
      {
        name: "FastAPI",
        imgPath: <SiFastapi size={40} />,
        color: "text-[#00796b] dark:text-[#39b5a5]",
      },
      {
        name: "OpenAI API",
        imgPath: <TbBrandOpenai size={40} />,
        color: "text-foreground",
      },
      {
        name: "LangGraph",
        imgPath: <LangGraphIcon />,
      },
      {
        name: "Postgres/pgvector",
        imgPath: <SiPostgresql size={40} />,
        color: "text-[#315e86] dark:text-[#5e9dcc]",
      },
      {
        name: "Redis",
        imgPath: <SiRedis size={40} />,
        color: "text-[#a42a1a] dark:text-[#ff4438]",
      },
    ],
  },
  {
    title: "Quality & Delivery",
    data: [
      {
        name: "Docker",
        imgPath: <SiDocker size={40} />,
        color: "text-[#086da5] dark:text-[#2496ed]",
      },
      {
        name: "Supabase",
        imgPath: <SiSupabase size={40} />,
        color: "text-[#238636] dark:text-[#3ecf8e]",
      },
      {
        name: "Vitest",
        imgPath: <VitestIcon />,
      },
      {
        name: "Playwright",
        imgPath: <PlaywrightIcon />,
      },
      {
        name: "GitHub Actions",
        imgPath: <SiGithubactions size={40} />,
        color: "text-[#0969da] dark:text-[#58a6ff]",
      },
    ],
  },
];
