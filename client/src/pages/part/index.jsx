import Navbar from '@/components/navbar';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button';
import Loading from '@/components/loading';

const Part = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        setLoading(true)
        axios
            .get(import.meta.env.VITE_API_URL + '/api/products/part/' + params.parca)
            .then((response) => {
                console.log("response", response.data)
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setLoading(false)
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <Loading loading={loading}>
            <div>
                <Navbar />
                <div className='mx-auto w-full lg:w-3/4 max-w-[1000px]'>
                    <hr className='py-2' />
                    <div className='pb-2 text-2xl font-bold'>{params.parca}</div>
                    <div className='grid w-full grid-cols-2 items-stretch justify-center mx-auto sm:grid-cols-3 lg:grid-cols-4'>
                        {products?.map((product) => (
                            <div key={product._id} className='bg-white border border-gray-300 w-[210px] h-[470px] rounded-sm cursor-pointer'>
                                <img src={product.images[0]} className='w-full h-[280px]' />
                                <div className='flex flex-col py-4 px-2'>
                                    <span className='font-extralight text-xs'>
                                        {product.model}
                                    </span>
                                    <span className='font-semibold text-lg'>
                                        {product.name}
                                    </span>
                                    <span className='pt-2 font-extralight text-sm'>{product.oem}</span>
                                    <Button className="mt-4">Ürünü İncele</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Loading>
    )
}

export default Part