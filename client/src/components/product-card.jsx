import React from 'react'
import { Card, CardContent } from './ui/card'
import { twJoin } from 'tailwind-merge'
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div key={product._id} className="grid cursor-pointer hover:opacity-90" onClick={() => navigate('/parca/' + product.part + '/' + product._id, { state: { id: product._id } })}>
            <Card className={twJoin(
                "h-[420px]",
                product.stock === 0 && 'opacity-60')}  >
                <CardContent className="p-0">
                    <img
                        loading="lazy"
                        alt={product?.name}
                        className="w-full object-cover h-[200px]"
                        src={product?.images[0]}
                    />
                    <div className='flex flex-col justify-start items-start pt-1 px-2 h-[195px]'>
                        <div className='h-[140px]'>
                            <span className='font-light text-xs'>Marka: Suzuki </span>
                            <div className='py-1 font-semibold'>{product?.name}</div>
                            <div className='font-light text-xs'>Modeller: {product?.models.map((model, i) => model + ((i !== product?.models.length - 1) ? ' | ' : ""))}</div>
                            <div className='font-light text-xs'>OEM: {product?.oem}</div>
                        </div>
                        <div className={twJoin(
                            "pt-1 text-center font-bold text-xl w-full h-[45px] gap-2",
                            product.stock === 0 ? "text-red-600" : "text-green-600"
                        )}>
                            {product.price === "FİYAT SORUNUZ" ? "FİYAT SORUNUZ" : product.stock === 0 ? "" : product.price + ' ₺'}
                        </div>
                    </div>
                    <div className={twJoin(
                        'w-full h-[25px] flex items-center justify-center text-white font-bold text-sm',
                        product.stock === 0 ? "bg-red-600" : "bg-green-600")
                    }>
                        {product.stock === 0 ? "STOKTA YOK" : "STOKTA"}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductCard