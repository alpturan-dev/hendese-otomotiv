import React, { useEffect, useState } from 'react'

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useProductStore } from '@/store/store'

const CategoryCarousel = ({ type }) => {
    const { products } = useProductStore();
    const [categoryProducts, setCategoryProducts] = useState([])

    const getCategoryProducts = () => {
        let filteredProducts = [];
        if (type === "Tüm Ürünler") {
            setCategoryProducts(products);
        } else {
            filteredProducts = products.filter(product =>
                product.categories.includes(type)
            );
            setCategoryProducts(filteredProducts);
        }
        console.log("filteredProducts", filteredProducts);
    }

    useEffect(() => {
        getCategoryProducts();
    }, [products])

    return (
        categoryProducts.length <= 0 ? null : (
            <div div className="container text-center py-6" >
                <h3 className='text-2xl font-bold tracking-tighter sm:text-2xl pt-2 pb-6 text-[#E3020F]'>
                    {type}
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
                        {categoryProducts.length > 0 && categoryProducts?.map((product) => (
                            <CarouselItem key={product._id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 cursor-pointer hover:opacity-90">
                                <div className='px-1'>
                                    <Card>
                                        <CardContent>
                                            {/* <span className="text-3xl font-semibold">{index + 1}</span> */}
                                            <img
                                                alt={product?.name}
                                                className="pt-2 object-cover"
                                                src={product?.images[0]}
                                            />
                                            <div className='pt-3 font-semibold'>{product?.name}</div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        )
    )
}

export default CategoryCarousel