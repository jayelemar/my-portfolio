import { getOffset } from "@/lib/getOffset";

export type LinkType = { 
  path: string,
  name: string,
  offset: number ,
}

export const links:LinkType[] = [
{ 
  path: 'hero',
  name: 'home',
  offset: -120,
},  
{ 
  path: 'about',
  name: 'about',
  offset: getOffset(-180, -90),  //desktop , mobile , negative upward, try 130 mobile 
}, 
{ 
  path: 'projects',
  name: 'my projects',
  offset: -90,
},  
{ 
  path: 'contact',
  name: 'contact',
  offset: getOffset(-85, -100),  //desktop , mobile , negative upward
}, 
]