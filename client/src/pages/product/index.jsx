import Navbar from '@/components/navbar';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Loading from '@/components/loading';
import { useProductStore } from '@/store/store'
import ProductSection from './components/product-section';
import Hr from '@/components/hr';
import Footer from '@/components/footer';

const Product = () => {
    const params = useParams();
    let location = useLocation();
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({})

    const getProduct = async () => {
        setLoading(true)
        axios
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
        console.log("params", params)
        getProduct();
    }, [params.id])

    return (
        <Loading loading={loading}>
            <div className='bg-[#F7F7F7]'>
                <Navbar />
                {product._id && <ProductSection product={product} />}
            </div>
            <Hr />
            <Footer />
        </Loading>
    )
}

export default Product