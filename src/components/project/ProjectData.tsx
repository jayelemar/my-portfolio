export type ProjectType = {
  desktopImage: string,
  mobileImage: string,
  category: string,
  name: string
  description:string,
  link: string,
  github: string,
}




export const projectData:ProjectType[] = [
  {
    desktopImage: '/work/1.png',
    mobileImage: '/work/bike-me-mobile.png',
    category: 'NextJS 13',
    name: 'Bike Me',
    description: 'A full stack e-commerce bike store using NextJS, React, Tailwind CSS,  Sanity.io and Stripe ',
    link: 'https://bike-me.vercel.app/',
    github: 'https://github.com/jayelemar/bike-shop-app.git',

  },
  {
    desktopImage: '/work/2.png',
    mobileImage: '/work/leave-mobile.png',
    category: 'Vite',
    name: 'Leave Management System',
    description: 'A full stack leave management system using Vite, React, Tailwind CSS, React Hook Form, Zustand, Express.JS and MongoDB',
    link: 'https://leave-management-app-client.vercel.app/',
    github: 'https://github.com/jayelemar/leave-management-app-client',
  },
  {
    desktopImage: '/work/3.png',
    mobileImage: '/work/port-mobile.png',
    category: 'NextJS 13',
    name: 'My Portfolio',
    description: 'A static site using NextJS, Tailwind CSS, Nodemailer and React Hook Form.',
    link: 'https://elemar.site/',
    github: 'https://github.com/jayelemar/my-portfolio',
  }
]