import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const CustomCarousel = () => {
    return (
        <Carousel className="mx-auto w-full" opts={{
            loop: true
        }}
            plugins={[
                Autoplay({
                    delay: 3000,
                }),
            ]}>
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div>
                            <Card>
                                <CardContent className="flex h-96 items-center justify-center">
                                    <span className="text-4xl font-semibold">{index + 1}</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}

export default CustomCarousel