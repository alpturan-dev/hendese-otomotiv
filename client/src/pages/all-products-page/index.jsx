import React, { useEffect, useState } from 'react'
import AllProducts from '../dashboard/components/all-products'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useLocation } from 'react-router-dom'
import { useProductStore } from '@/store/store'
import axios from 'axios'

const AllProductsPage = () => {
    const { pathname } = useLocation();
    const [loading, setLoading] = useState(false);
    const { setProducts } = useProductStore();

    const getProducts = async () => {
        setLoading(true);
        await axios
            .get(import.meta.env.VITE_API_URL + "/api/products")
            .then((response) => {
                setProducts(response.data.data);
                console.log("response.data.data", response.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false)
            })
    };

    useEffect(() => {
        getProducts();
    }, [])

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='bg-[#F7F7F7]'>
            <Navbar />
            <AllProducts loading={loading} page={true} />
            <Footer />
        </div>
    )
}

export default AllProductsPage