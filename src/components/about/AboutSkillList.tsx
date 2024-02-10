'use client';

import Image from "next/image";
import { FC,  } from "react";

import { CarouselContent, Carousel, CarouselItem, CarouselPrevious, CarouselNext } from "../ui/carousel";
import AutoScroll from 'embla-carousel-auto-scroll'

import AboutSkillFrontend from "./AboutSkillFrontend";
import AboutSkillBackend from "./AboutSkillBackend";
import AboutSkillOthers from "./AboutSkillOthers";
import { SkillSetProps } from "./AboutData";



export type AboutSkillListProps = {
  skillSet: SkillSetProps[],
  getData: (arr: SkillSetProps[], title: string) => SkillSetProps | undefined;
}

const AboutSkillList:FC<AboutSkillListProps> = ({ skillSet, getData }) => {


  return (
    <div className="">
    <Carousel
      opts={{ align: 'start', loop: true, containScroll: "keepSnaps"}}
      plugins={[
        AutoScroll({ 
          speed: .5,
          startDelay: 100,
          playOnInit: true,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
      className="w-[500px]"
      
    >
      <CarouselContent className="">

        <CarouselItem>
          <AboutSkillFrontend skillSet={skillSet} getData={getData}  />
        </CarouselItem>
        <CarouselItem>
          <AboutSkillBackend skillSet={skillSet} getData={getData} />
        </CarouselItem>
        <CarouselItem>
          <AboutSkillOthers skillSet={skillSet} getData={getData} />
        </CarouselItem>
        <CarouselItem>
          <AboutSkillFrontend skillSet={skillSet} getData={getData} />
        </CarouselItem>
        <CarouselItem>
          <AboutSkillBackend skillSet={skillSet} getData={getData} />
        </CarouselItem>
        <CarouselItem>
          <AboutSkillOthers skillSet={skillSet} getData={getData} />
        </CarouselItem>
  
      </CarouselContent>
    </Carousel>
    </div>
  )
}

export default AboutSkillList