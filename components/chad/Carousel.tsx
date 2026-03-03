"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import bg from '@/assets/hm-agricu-home.jpg';

interface Props {
  items: {name: string, title: string, subTitle: string}[]
}

export function CarouselPlugin({items}:Props ) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <div
      //   style={{
      //   background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bg.src}) no-repeat center center/cover`,
      // }}
      className=" p-4 bg-[#f3f0f0]"
    >

    <h2 className="text-2xl sm:text-4xl font-semibold sm:font-bold text-primary py-10 text-center">
      What our Investor Say
    </h2>
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xl items-center justify-center mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}    
    >
      <CarouselContent className="">
        {items.map((_, index) => (
          <CarouselItem key={index} className="">
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-center text-center p-6 gap-7 max-h-[400px]">
                  <div className=" flex flex-col gap-2.5">
                    <h4 className="text-2xl font-semibold">{_.name }</h4>
                    <p className="text-lg font-light text-[#0078FF]">{_.title }</p>
                  </div>
                  <div className=" my-4">
                    <p className=" text-lg leading-7 font-medium">
                      {_.subTitle}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
      </div>
  )
}
