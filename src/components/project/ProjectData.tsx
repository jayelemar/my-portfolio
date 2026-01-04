export type ProjectType = {
  desktopImage: string;
  mobileImage: string;
  category: string;
  name: string;
  description: string;
  link: string;
  github?: string;
  figma?: string;
  isProject?: boolean;
};

export const projectData: ProjectType[] = [
  {
    desktopImage: "/work/Duty_Free_Desktop3.png",
    mobileImage: "/work/Duty_Free_Mobile.png",
    category: "React.js",
    name: "Duty Free Philippines",
    description:
      "E-commerce platform for Duty Free Philippines. The platform is built with Laravel and React js. It has a feature to manage the products, orders, and other necessary information needed for the operation of the store.",
    link: "https://shop.dutyfree.gov.ph",
    isProject: true,
  },
  {
    desktopImage: "/work/Futr_Desktop5.png",
    mobileImage: "/work/Futr_Mobile.png",
    category: "Next.js",
    name: "Futr",
    description:
      "a decentralized social media application designed for Web3 enthusiasts to engage, predict trends, and interact. Built using Next.js for the frontend and NestJS for the backend, the platform integrates real-time communication, user profiles, and interactive prediction features tailored for topics around the world.",
    link: "https://beta.futr.gg",
    isProject: true,
  },
  {
    desktopImage: "/work/BackToTheFutr_Desktop2.png",
    mobileImage: "/work/BackToTheFutr_Mobile.png",
    category: "Next.js",
    name: "Back To The Futr",
    description:
      "BackToTheFutr.com is the official hub for the Back to the Future franchise—offering canon news, upcoming events, licensed merchandise, film updates, cast announcements, curated collectibles, screenings, and fan experiences directly from the creators.",
    link: "https://www.backtothefutr.com",
    isProject: true,
  },

  {
    desktopImage: "/work/1.png",
    mobileImage: "/work/bike-me-mobile.png",
    category: "Next.js",
    name: "Bike Me",
    description:
      "A full stack e-commerce bike store using NextJS, React, Tailwind CSS,  Sanity.io and Stripe ",
    link: "https://bike-me.vercel.app/",
    github: "https://github.com/jayelemar/bike-shop-app.git",
  },

  {
    desktopImage: "/work/2.png",
    mobileImage: "/work/leave-mobile.png",
    category: "React.js",
    name: "Leave Management System",
    description:
      "A full stack leave management system using Vite, React, Tailwind CSS, React Hook Form, Zustand, Express.JS and MongoDB",
    link: "https://leave-management-app-client.vercel.app/",
    github: "https://github.com/jayelemar/leave-management-app-client",
  },
  {
    desktopImage: "/work/4.png",
    mobileImage: "/work/anime-mobile.png",
    category: "Figma",
    name: "Figma to Landing Page",
    description: "A anime figma design conversion to a website landing page",
    link: "https://lws-exam.vercel.app/",
    figma:
      "https://www.figma.com/design/qlfZvhc4LlyWG4R9lidRPR/Test?node-id=28-122&t=ngfzJp3xDrXIP4QH-0",
  },
  {
    desktopImage: "/work/3.png",
    mobileImage: "/work/port-mobile.png",
    category: "NextJS",
    name: "My Portfolio",
    description:
      "A static site using NextJS, Tailwind CSS, Nodemailer and React Hook Form.",
    link: "https://elemar.site/",
    github: "https://github.com/jayelemar/my-portfolio",
  },
];
