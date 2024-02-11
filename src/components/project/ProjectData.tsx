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
    name: 'Mexa Website',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
    link: '/',
    github: '/',

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