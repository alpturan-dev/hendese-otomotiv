import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '@/store/store'
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product-card';
import { SkeletonCard } from '@/components/skeleton';

const AllProducts = ({ loading, page = false }) => {
    const { products } = useProductStore();
    const navigate = useNavigate();
    return (
        <div className='w-full'>
            <div className="py-6 px-4 sm:mx-auto sm:px-auto w-full lg:w-3/4 max-w-[1000px]" >
                <div className='flex justify-between'>
                    <h2 className="text-xl font-bold tracking-tighter sm:text-2xl text-[#406800]">Tüm Parçalar</h2>
                    {!page && (
                        <div className='text-xs sm:text-base flex flex-col justify-end items-end sm:flex-row sm:pt-2'>
                            <span className='pt-1'>Toplam {products.length} ürün</span>
                            <span className='hidden sm:flex'>{`\xa0`}</span>
                            <a onClick={() => navigate('/tum-parcalar')} className='text-[#406800] underline cursor-pointer'>
                                devamı...
                            </a>
                        </div>
                    )}
                </div>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                {loading ?
                    (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                                <SkeletonCard />
                            ))}
                        </div>
                    ) : (
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                            {products.length > 0 && products?.map((product, i) => {
                                if (!page) {
                                    if (i < 10) {
                                        return (
                                            <ProductCard product={product} />
                                        )
                                    }
                                } else {
                                    return (
                                        <ProductCard product={product} />
                                    )
                                }
                            })}
                        </div>
                    )}
                {!page && (
                    <div className='mt-6 flex justify-center'>
                        <Button className='w-1/3 sm:w-1/5 md:w-1/4 text-center bg-[#406800]' onClick={() => navigate('/tum-parcalar')}>
                            Daha fazla parça göster
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllProducts