import React from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '@/store/store'
import { twJoin, twMerge } from 'tailwind-merge';

const AllProducts = () => {
    const { products } = useProductStore();
    const navigate = useNavigate();
    return (
        <div className='w-full'>
            <div className="container py-6 px-auto w-full lg:w-3/4 max-w-[1000px]" >
                <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl text-[#E3020F]">Tüm Parçalar</h2>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8'>
                    {products.length > 0 && products?.map((product) => (
                        <div key={product._id} className="grid cursor-pointer hover:opacity-90 rounded-sm" onClick={() => navigate('/parca/' + product.part + '/' + product._id, { state: { id: product._id } })}>
                            <div>
                                <Card className={twJoin(
                                    "h-[560px] border-slate-400",
                                    product.stock === 0 && 'opacity-60')}  >
                                    <CardContent className="p-0">
                                        <img
                                            loading="lazy"
                                            alt={product?.name}
                                            className="w-full object-cover h-[300px]"
                                            src={product?.images[0]}
                                        />
                                        <div className='flex flex-col justify-start items-start pt-2 px-4 h-[220px]'>
                                            <span className='font-light text-xs'>Marka: Suzuki </span>
                                            <div className='py-3 font-semibold text-lg'>{product?.name}</div>
                                            <div className='font-light text-xs'>Model: {product?.model}</div>
                                            <div className='font-light text-xs'>OEM: {product?.oem}</div>
                                            <div className={twJoin(
                                                "pt-6 text-center font-bold text-2xl w-full h-full gap-2",
                                                product.stock === 0 ? "text-red-600" : "text-green-600"
                                            )}>
                                                {product.price === "FİYAT SORUNUZ" ? "FİYAT SORUNUZ" : product.stock === 0 ? "" : product.price + ' ₺'}
                                            </div>
                                        </div>
                                        <div className={twJoin(
                                            'w-full h-[40px] flex items-center justify-center text-white font-bold text-base',
                                            product.stock === 0 ? "bg-red-600" : "bg-green-600")
                                        }>
                                            {product.stock === 0 ? "STOKTA YOK" : "STOKTA VAR"}
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