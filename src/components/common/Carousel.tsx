'use client';

import { CarouselContent, Carousel, CarouselItem } from "../ui/carousel";
import { EmblaPluginType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import { FC } from "react";

type CarouselProps = {
  plugins?: EmblaPluginType[]
}

const CarouselList:FC<CarouselProps> = () => {
  return (
<>
    <Carousel
      opts={{ align: 'start', loop: true}}
      plugins={[
        Autoplay({ 
          delay: 2000,
          jump: true,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>.1.</CarouselItem>
        <CarouselItem>.2.</CarouselItem>
        <CarouselItem>.3.</CarouselItem>
      </CarouselContent>

    </Carousel>
    </>
  )
}

export default CarouselList