import React from 'react'
import { Card, CardContent } from './ui/card'
import { twJoin } from 'tailwind-merge'
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div key={product._id} className="grid cursor-pointer hover:opacity-90" onClick={() => navigate('/parca/' + product.part + '/' + product._id, { state: { id: product._id } })}>
            <Card className={twJoin(
                "h-[315px] shadow-lg",
                product.stock === 0 && 'opacity-60')}  >
                <CardContent className="p-0">
                    <img
                        loading="lazy"
                        alt={product?.name}
                        className="w-full object-cover h-[140px]"
                        src={product?.images[0]}
                    />
                    <div className='flex flex-col justify-start items-start pt-1 px-2 h-[155px]'>
                        <div className='h-[100px]'>
                            <span className='font-light text-xs'>Marka: Suzuki </span>
                            <div className='py-1 font-semibold text-base text-pretty line-clamp-2 overflow-hidden text-ellipsis'>
                                {product?.name}
                            </div>
                            {/* <div className='font-light text-xs'>Modeller: {product?.models.map((model, i) => model + ((i !== product?.models.length - 1) ? ' | ' : ""))}</div> */}
                            <div className='font-light text-xs'>OEM: {product?.oem}</div>
                        </div>
                        <div className={twJoin(
                            "my-auto py-auto text-center font-bold w-full h-[25px] gap-2")}>
                            {product.price === "FİYAT SORUNUZ" ? "FİYAT SORUNUZ" : product.stock === 0 ? "" : product.price + ' ₺'}
                        </div>
                    </div>
                    <div className={twJoin(
                        'w-full h-[20px] flex items-center justify-center text-white font-bold text-xs',
                        product.stock === 0 ? "bg-red-600" : "bg-[#406800]")
                    }>
                        {product.stock === 0 ? "STOKTA YOK" : "STOKTA"}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductCard