import React from 'react'
import Navbar from '@/components/navbar'
import CustomCarousel from '@/components/custom-carousel'
import CategoriesSection from './components/categories-section'
import CategoryCarousel from './components/category-carousel'

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <CustomCarousel />
            <CategoriesSection />
            <CategoryCarousel />
        </div>
    )
}

export default Dashboard