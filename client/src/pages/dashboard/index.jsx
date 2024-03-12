import React from 'react'
import Navbar from '@/components/navbar'
import CustomCarousel from '@/components/custom-carousel'
import CategoriesSection from './components/categories-section'

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <CustomCarousel />
            <CategoriesSection />
        </div>
    )
}

export default Dashboard