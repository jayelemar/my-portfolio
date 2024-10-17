import { getOffset } from "@/lib/getOffset";

export type LinkType = {
  path: string;
  name: string;
  offset: number;
};

export const links: LinkType[] = [
  {
    path: "about",
    name: "about",
    offset: -100, //desktop , mobile , negative upward, try 130 mobile
  },
  {
    path: "projects",
    name: "my projects",
    offset: -100,
  },
  {
    path: "contact",
    name: "contact",
    offset: -100, //desktop , mobile , negative upward
  },
];
