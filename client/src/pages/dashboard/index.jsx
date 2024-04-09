import React, { useEffect } from 'react'
import axios from 'axios'
import Navbar from '@/components/navbar'
import CustomCarousel from '@/components/custom-carousel'
import CategoriesSection from './components/categories-section'
import CategoryCarousel from './components/category-carousel'
import { useProductStore } from '@/store/store'
import AllProducts from './components/all-products'

const Dashboard = () => {
    const { products, setProducts } = useProductStore();

    const getProducts = async () => {
        await axios
            .get(import.meta.env.VITE_API_URL + "/api/products")
            .then((response) => {
                setProducts(response.data.data);
                console.log("response.data.data", response.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
    };

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <div className='bg-[#F7F7F7]'>
            <Navbar />
            <CustomCarousel />
            <AllProducts />
            <CategoriesSection />
            <CategoryCarousel type="Yeni Ürünler" />
            <CategoryCarousel type="İndirimli Ürünler" />
            <CategoryCarousel type="Çok Satanlar" />
        </div>
    )
}

export default Dashboard