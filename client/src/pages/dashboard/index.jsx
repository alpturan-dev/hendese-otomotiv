import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '@/components/navbar'
import CustomCarousel from '@/components/custom-carousel'
import CategoryCarousel from './components/category-carousel'
import AllProducts from './components/all-products'
import { useProductStore } from '@/store/store'
import Hr from '@/components/hr'
import Footer from '@/components/footer'
import { SelectSeparator } from '@/components/ui/select'

const Dashboard = () => {
    const { setProducts } = useProductStore();
    const [loading, setLoading] = useState(false);

    const getProducts = async () => {
        setLoading(true);
        await axios
            .get(import.meta.env.VITE_API_URL + "/api/products")
            .then((response) => {
                setProducts(response.data.data);
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
            <SelectSeparator />
            {/* <CustomCarousel /> */}
            <CategoryCarousel type="Yeni Ürünler" />
            <SelectSeparator />
            <CategoryCarousel type="İndirimli Ürünler" />
            <SelectSeparator />
            <CategoryCarousel type="Çok Satanlar" />
            <SelectSeparator />
            <AllProducts loading={loading} />
            {/* <CategoriesSection /> */}
            <SelectSeparator />
            <Footer />
        </div>
    )
}

export default Dashboard