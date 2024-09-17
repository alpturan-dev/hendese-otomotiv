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
import { Helmet } from 'react-helmet'

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
        document.title = "Hendese Otomotiv | Suzuki Çıkma Yedek Parça";
        document.querySelector('meta[property="og:title"]').setAttribute('content', "Hendese Otomotiv | Sakarya Arifiye Suzuki Çıkma Yedek Parça");
        document.querySelector('meta[property="og:description"]').setAttribute('content', "Sakarya Arifiye Suzuki Çıkma Yedek Parça");
        document.querySelector('meta[property="og:image"]').setAttribute('content', "https://i.ibb.co/hRvXYN3/logo.jpg");
        document.querySelector('meta[property="og:url"]').setAttribute('content', "https://www.hendeseoto.com");
        getProducts();
    }, [])

    return (
        <div>
            <Helmet>
                <title>Hendese Otomotiv | Suzuki Çıkma Yedek Parça</title>
                <meta property="og:title" content="Hendese Otomotiv | Sakarya Arifiye Suzuki Çıkma Yedek Parça" />
                <meta property="og:description" content="Sakarya Arifiye Suzuki Çıkma Yedek Parça" />
                <meta property="og:image" content="https://i.ibb.co/hRvXYN3/logo.jpg" />
                <meta property="og:url" content="https://www.hendeseoto.com" />
            </Helmet>
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