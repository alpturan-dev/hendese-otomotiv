import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '@/components/navbar'
import CustomCarousel from '@/components/custom-carousel'
import CategoriesSection from './components/categories-section'
import CategoryCarousel from './components/category-carousel'
import AllProducts from './components/all-products'
import { useProductStore } from '@/store/store'
import Hr from '@/components/hr'
import Footer from '@/components/footer'
import Loading from '@/components/loading'

const Dashboard = () => {
    const { products, setProducts } = useProductStore();
    const [loading, setLoading] = useState(false);

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

    return (
        <div>
            <Navbar />
            <CustomCarousel />
            <CategoryCarousel type="Yeni Ürünler" />
            <Hr />
            <CategoryCarousel type="İndirimli Ürünler" />
            <Hr />
            <CategoryCarousel type="Çok Satanlar" />
            <Hr />
            <AllProducts loading={loading} />
            {/* <CategoriesSection /> */}
            <Hr />
            <Footer />
        </div>
    )
}

export default Dashboard