import React, { useEffect, useState } from 'react'

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useProductStore } from '@/store/store'
import { useNavigate } from 'react-router-dom'

const CategoryCarousel = ({ type }) => {
    const { products } = useProductStore();
    const [categoryProducts, setCategoryProducts] = useState([])
    const navigate = useNavigate();

    const getCategoryProducts = () => {
        let filteredProducts = [];
        if (type === "Tüm Ürünler") {
            setCategoryProducts(products);
        } else {
            filteredProducts = products.filter(product =>
                product.categories.includes(type) && product.stock > 0
            );
            setCategoryProducts(filteredProducts);
        }
    }

    useEffect(() => {
        getCategoryProducts();
    }, [products])

    return (
        categoryProducts.length <= 0 ? null : (
            <div className="w-full text-center py-6 px-2" >
                <h3 className='text-2xl font-bold tracking-tighter sm:text-4xl pt-2 pb-6 text-[#E3020F]'>
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
                            <CarouselItem key={product._id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 cursor-pointer hover:opacity-90" onClick={() => navigate('/parca/' + product.part + '/' + product._id, { state: { id: product._id } })}>
                                <div>
                                    <Card className="h-[340px] border-slate-300">
                                        <CardContent>
                                            <img
                                                loading="lazy"
                                                alt={product?.name}
                                                className="w-full object-cover h-[200px] pb-2"
                                                src={product?.images[0]}
                                            />
                                            <div className='flex flex-col justify-around items-center h-[140px]'>
                                                <div className='h-full flex items-center justify-center text-center font-medium px-2'>{product?.name}</div>
                                                <span className='h-full w-full text-2xl font-bold bg-green-600 text-white flex justify-center items-center'>
                                                    {product.price === "FİYAT SORUNUZ" ? "FİYAT SORUNUZ"
                                                        : product.price + ' ₺'}
                                                </span>
                                            </div>
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