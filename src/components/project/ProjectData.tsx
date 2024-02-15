export type ProjectType = {
  image: string,
  category: string,
  name: string
  description:string,
  link: string,
  github: string,
}




export const projectData:ProjectType[] = [
  {
    image: '/work/1.png',
    category: 'NextJS 13',
    name: 'Bike Me',
    description: 'A full stack e-commerce bike store using NextJS, React, Tailwind CSS,  Sanity.io and Stripe ',
    link: 'https://bike-me.vercel.app/',
    github: 'https://github.com/jayelemar/bike-shop-app.git',

  },
  {
    image: '/work/2.png',
    category: 'Vite',
    name: 'Dada Website',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
    link: '/',
    github: '/',
  },
  {
    image: '/work/3.png',
    category: 'React',
    name: 'Kaka Website',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
    link: '/',
    github: '/',
  }
]