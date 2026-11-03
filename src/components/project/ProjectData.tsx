export type ProjectStatus = "active" | "inactive" | "demo";

export type ProjectType = {
  desktopImage: string;
  mobileImage: string;
  category: string;
  name: string;
  description: string;
  technologies: string[];
  featured: boolean;
  link: string;
  github?: string;
  figma?: string;
  status: ProjectStatus;
};

export const projectData: ProjectType[] = [
  {
    desktopImage: "/work/Gondoor_Desktop.png",
    mobileImage: "/work/Gondoor_Mobile.png",
    category: "AI Platform",
    name: "Gondoor",
    description:
      "An AI-powered operations platform that helps entrepreneurs launch, manage, and grow businesses with autonomous agents.",
    technologies: ["AI Agents", "Automation", "SaaS"],
    featured: true,
    link: "https://gondoor.app/en",
    status: "active",
  },
  {
    desktopImage: "/work/Duty_Free_Desktop3.png",
    mobileImage: "/work/Duty_Free_Mobile.png",
    category: "React.js",
    name: "Duty Free Philippines",
    description:
      "An e-commerce platform for browsing products and managing the operational flow behind Duty Free Philippines.",
    technologies: ["React", "Laravel", "E-commerce"],
    featured: true,
    link: "https://shop.dutyfree.gov.ph",
    status: "active",
  },
  {
    desktopImage: "/work/Futr_Desktop5.png",
    mobileImage: "/work/Futr_Mobile.png",
    category: "Next.js",
    name: "Futr",
    description:
      "A Web3 social platform for discussing global topics, predicting trends, and interacting with communities in real time.",
    technologies: ["Next.js", "NestJS", "Web3"],
    featured: true,
    link: "https://beta.futr.gg",
    status: "inactive",
  },
  {
    desktopImage: "/work/BackToTheFutr_Desktop2.png",
    mobileImage: "/work/BackToTheFutr_Mobile.png",
    category: "Next.js",
    name: "Back To The Futr",
    description:
      "The official franchise hub for news, events, licensed merchandise, screenings, and fan experiences.",
    technologies: ["Next.js", "Web Platform"],
    featured: true,
    link: "https://www.backtothefutr.com",
    status: "inactive",
  },

  {
    desktopImage: "/work/1.png",
    mobileImage: "/work/bike-me-mobile.png",
    category: "Next.js",
    name: "Bike Me",
    description:
      "A full-stack bicycle store for browsing products and completing secure Stripe payments.",
    technologies: ["Next.js", "Sanity", "Stripe"],
    featured: false,
    link: "https://bike-me.vercel.app/",
    github: "https://github.com/jayelemar/bike-shop-app.git",
    status: "demo",
  },

  {
    desktopImage: "/work/2.png",
    mobileImage: "/work/leave-mobile.png",
    category: "React.js",
    name: "Leave Management System",
    description:
      "A full-stack workflow for creating, reviewing, and managing employee leave requests.",
    technologies: ["React", "Express.js", "MongoDB"],
    featured: false,
    link: "https://leave-management-app-client.vercel.app/",
    github: "https://github.com/jayelemar/leave-management-app-client",
    status: "demo",
  },
  {
    desktopImage: "/work/4.png",
    mobileImage: "/work/anime-mobile.png",
    category: "Figma",
    name: "Figma to Landing Page",
    description:
      "A responsive landing page implementation translated from an anime-inspired Figma design.",
    technologies: ["Figma", "Responsive UI"],
    featured: false,
    link: "https://lws-exam.vercel.app/",
    figma:
      "https://www.figma.com/design/qlfZvhc4LlyWG4R9lidRPR/Test?node-id=28-122&t=ngfzJp3xDrXIP4QH-0",
    status: "demo",
  },
  {
    desktopImage: "/work/3.png",
    mobileImage: "/work/port-mobile.png",
    category: "NextJS",
    name: "My Portfolio",
    description:
      "A personal portfolio built with Next.js, Tailwind CSS, and a verified email contact flow.",
    technologies: ["Next.js", "Tailwind CSS", "React Hook Form"],
    featured: false,
    link: "https://elemar.site/",
    github: "https://github.com/jayelemar/my-portfolio",
    status: "demo",
  },
];
