import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import carousel1 from '../assets/carousel-1.jpeg'

const CustomCarousel = () => {
    return (
        <Carousel className="hidden sm:block mx-auto w-full" opts={{
            loop: true
        }}
            plugins={[
                Autoplay({
                    delay: 3000,
                }),
            ]}>
            <CarouselContent>
                <CarouselItem key={carousel1} >
                    <div>
                        <Card>
                            <CardContent className=" h-[450px] flex items-center justify-center p-0">
                                <img src={carousel1} className="h-full" />
                            </CardContent>
                        </Card>
                    </div >
                </CarouselItem>
                {/* {
                    Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div>
                                <Card className="bg-[#F7F7F7]">
                                    <CardContent className="flex h-[450px] items-center justify-center">
                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))
                } */}
            </CarouselContent >
        </Carousel >
    )
}

export default CustomCarousel