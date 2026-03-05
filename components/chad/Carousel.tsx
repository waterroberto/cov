"use client"
import Autoplay from "embla-carousel-autoplay"
import * as React from "react"

import bg from '@/assets/hm-agricu-home.jpg'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { BsStar } from "react-icons/bs"
import { FaStar } from "react-icons/fa"

interface Props {
  items: {name: string, title: string, subTitle: string}[]
}

export function CarouselPlugin({items}:Props ) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <div
   className="p-4 sm:px-8 lg:px-16 xl:px-32 py-16 items-center bg-white"
    >
           <div className=" mb-6 flex flex-col items-center justify-center">
              <span className="mb-4 text-xs p-2 px-4 flex items-center justify-center gap-2 border border-dark rounded-full text-dark w-fit">
                <BsStar /> Trusted by thousands of customers
              </span>
              <p className="text-primary text-center text-2xl md:text-4xl lg:text-5xl font-bold gradient-text">
                What our Investors Say
              </p>
              <p className="sm:text-lg text-center text-gray-600 my-4 max-w-3xl mx-auto">
       Trust in us to
                safeguard your financial future and investment with unwavering
                commitment
              </p>
            </div>
      
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-6xl items-center justify-center mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}    
    >
      <CarouselContent className="">
        {items.map((item, index) => (
          <CarouselItem key={index} 
            className="md:basis-1/2 lg:basis-1/3 mb-8"
          >
              <Card>
              <CardContent className="flex flex-col aspect-square items-center justify-center text-center p-6 gap-6 max-h-[300px]">
                  <div className="flex flex-col gap-2.5 items-center justify-center">
                    <h4 className="text-xl font-bold">{item.name }</h4>
                    <p className="font-medium text-[#0078FF]">{item.title}</p>
                      <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5]?.map((star, inx) => (
                      <FaStar
                        key={star}
                        color="#ffb403"
                      />
                    ))}
                  </div>
                  </div>
                  <div className=" my-4">
                    <p className="leading-7 text-gray-600">
                      {item.subTitle}
                    </p>
                  </div>
                </CardContent>
              </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious  className="size-12"/>
      <CarouselNext className="size-12"/>
    </Carousel>
      </div>
  )
}
