import Navbar from '@/components/navbar';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductSection from './components/product-section';
import Hr from '@/components/hr';
import Footer from '@/components/footer';
import { ProductPageSkeleton } from '@/components/skeleton';
import { Helmet } from 'react-helmet-async';

const Product = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({})

    const getProduct = async () => {
        setLoading(true)
        await axios
            .get(import.meta.env.VITE_API_URL + '/api/products/' + params.id)
            .then((response) => {
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
            {!loading && product._id && (
                <Helmet>
                    <title>{`${product.name} | Hendese Otomotiv`}</title>
                    <meta property="og:title" content={`${product.name} | Hendese Otomotiv`} />
                    <meta property="og:description" content={product.description} />
                    <meta property="og:image" content={product.images[0]} />
                    <meta property="og:url" content={`https://www.hendeseoto.com/parca/` + product.part + '/' + product._id} />
                    <meta property="og:type" content="website" />
                </Helmet>
            )}
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