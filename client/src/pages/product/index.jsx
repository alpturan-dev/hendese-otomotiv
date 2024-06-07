import Navbar from '@/components/navbar';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductSection from './components/product-section';
import Hr from '@/components/hr';
import Footer from '@/components/footer';
import { ProductPageSkeleton } from '@/components/skeleton';

const Product = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({})

    const getProduct = async () => {
        setLoading(true)
        await axios
            .get(import.meta.env.VITE_API_URL + '/api/products/' + params.id)
            .then((response) => {
                console.log("response", response.data)
                setProduct(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setLoading(false)
    }

    useEffect(() => {
        getProduct();
    }, [params.id])

    return (
        <div>
            <Navbar />
            <hr className='h-1' />
            {loading
                ?
                <div className='w-full'>
                    <ProductPageSkeleton />
                </div>
                :
                product._id && <ProductSection product={product} />
            }
            <Hr />
            <Footer />
        </div>
    )
}

export default Product