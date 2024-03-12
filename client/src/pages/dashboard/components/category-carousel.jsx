import React from 'react'

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const CategoryCarousel = () => {
    return (
        <div className="container text-center py-6">
            <h3 className='text-2xl font-bold tracking-tighter sm:text-2xl md:text-3xl pt-2 pb-6 text-[#E3020F]'>
                Öne Çıkan Ürünler
            </h3>
            <Carousel
                opts={{
                    align: "start",
                    loop: true
                }}
                plugins={[
                    Autoplay({
                        delay: 2500,
                    }),
                ]}
            >
                <CarouselContent>
                    {Array.from({ length: 15 }).map((_, index) => (
                        <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                            <div className='px-1'>
                                <Card className="h-40">
                                    <CardContent className="flex items-center justify-center p-6">
                                        <span className="text-3xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                                <div className='pt-4 font-semibold'>Suzuki Grand Vitara J20A Silindir Kapağı</div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>

    )
}

export default CategoryCarousel