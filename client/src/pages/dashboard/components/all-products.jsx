import React from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProductStore } from '@/store/store'

const AllProducts = () => {
    const { products } = useProductStore();

    return (
        <div className='bg-[#fff] w-full'>
            <div div className="container py-6 px-auto w-full lg:w-3/4 max-w-[1000px]" >
                <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl text-[#E3020F]">Tüm Parçalar</h2>
                <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
                    {products.length > 0 && products?.map((product) => (
                        <div key={product._id} className="grid cursor-pointer hover:opacity-90 rounded-sm">
                            <div className='px-1'>
                                <Card>
                                    <CardContent className="p-0">
                                        <img
                                            alt={product?.name}
                                            className="w-full object-cover"
                                            src={product?.images[0]}
                                        />
                                        <div className='flex flex-col justify-start items-start pt-2 px-6'>
                                            <span className='font-light text-xs'>Marka: Suzuki </span>
                                            <div className='py-3 font-semibold text-lg'>{product?.name}</div>
                                            <div className='font-light text-xs'>Model: {product?.model}</div>
                                            <div className='font-light text-xs'>OEM: {product?.oem}</div>
                                            <div className="py-3 flex flex-col w-full gap-2">
                                                <Button size="sm" variant="outline">
                                                    Ürünü İncele
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllProducts