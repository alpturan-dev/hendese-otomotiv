import { parts } from '@/constants/constants'
import React from 'react'
import logo from '../../../assets/logo.jpeg'

const CategoriesSection = () => {
    return (
        <div className="py-6 space-y-6 lg:py-12 bg-[#F7F7F7]">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:gap-8 lg:px-6 xl:gap-10">
                <div className="space-y-3">
                    <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">Yedek Parçalar</h2>
                    <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-base/relaxed dark:text-gray-400">
                        Farklı kategorilerimize göz atarak ihtiyacınız olan parçaları bulun.
                    </p>
                </div>
                <div className="grid w-full grid-cols-2 items-stretch justify-center mx-auto sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                    {parts.map((part, index) => (
                        <div
                            key={index}
                            className="h-48 flex flex-col items-center justify-center mx-4 my-2 rounded-md border border-gray-200 bg-white text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                            href="#"
                        >
                            <img
                                alt={part}
                                className='h-[140px] w-full'
                                src={logo}
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                            <span className='h-[52px] pt-4'>{part}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoriesSection