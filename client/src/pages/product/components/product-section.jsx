import { Button } from "@/components/ui/button"
import { useState } from "react"
import { twJoin } from "tailwind-merge"
import { ArrowLeft, ArrowRight } from "lucide-react";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export default function ProductSection({ product }) {
    // Simple access to the helpers
    const [imgIndex, setImgIndex] = useState(0);
    const handleImgIndex = (direction) => {
        if (direction === "right" && imgIndex === product.images.length - 1) {
            setImgIndex(0)
            return
        }
        if (direction === "left" && imgIndex === 0) {
            setImgIndex(product.images.length - 1)
            return
        }
        setImgIndex(direction === "left" ? imgIndex - 1 : imgIndex + 1)
    }
    return (
        <div className='w-full'>
            <div className="sm:container mx-auto w-full lg:w-3/4 max-w-[1000px]" >
                <div className="grid md:grid-cols-2 gap-6 lg:gap-12 max-w-6xl px-2 sm:px-4 mx-auto py-6">
                    <div className="max-w-none w-full sm:max-w-[450px] flex flex-col">
                        <div className="relative flex items-center justify-center select-none">
                            <button className="z-50 cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 h-full flex items-center" onClick={() => handleImgIndex("left")}>
                                <div className="ml-2 rounded h-8 w-8 bg-white opacity-60 flex items-center">
                                    <ArrowLeft strokeWidth={4} className="pl-1" />
                                </div>
                            </button>
                            <Zoom>
                                <img
                                    src={product.images[imgIndex]}
                                    alt="Product Image"
                                    className="w-[%95] h-[%95] aspect-square object-cover border border-gray-200 rounded-lg overflow-hidden"
                                />
                            </Zoom>
                            <button className="cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 h-full flex items-center" onClick={() => handleImgIndex("right")}>
                                <div className="mr-2 rounded h-8 w-8 bg-white opacity-60 flex items-center">
                                    <ArrowRight strokeWidth={4} className="pl-1" />
                                </div>
                            </button>
                        </div>

                        <div className="pt-2 grid grid-cols-4 gap-2">
                            {product.images.map((img, i) => (
                                <button className="" key={i} onClick={() => setImgIndex(i)}>
                                    <img
                                        src={img}
                                        alt="Product Image"
                                        className={twJoin("w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] aspect-square object-cover border border-gray-200 rounded-lg overflow-hidden", i === imgIndex && "border-2 border-gray-900")}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 items-start">
                        <div className="grid gap-4">
                            <h1 className="font-bold text-xl lg:text-2xl sm:pb-4">{product.name}</h1>
                            <div className="grid gap-2 text-xs">
                                <div className="flex items-center gap-2">
                                    <TruckIcon className={twJoin("w-5 h-5",
                                        product.stock === 0 ? "text-red-500" : "text-[#406800]")} />
                                    <span className={twJoin("font-medium", product.stock === 0 ? "text-red-500" : "text-[#406800]")}>
                                        {product.stock === 0 ? "Stokta yok!" : "Stokta var - 1-2 iş günü içerisinde kargoya verilir"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <PackageIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                    <span className="text-gray-500 dark:text-gray-400">OEM: {product.oem}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                    <span className="text-gray-500 dark:text-gray-400">Araç Uyumu: {product?.models.map((model, i) => model + ((i !== product?.models.length - 1) ? ' | ' : ""))}</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full grid gap-4">
                            <p className="text-xs sm:text-base text-gray-500 dark:text-gray-400">
                                {product.description}
                            </p>
                            <div className="flex flex-col items-center sm:items-start gap-4 sm:gap-5 pt-2">
                                {product.stock > 0 &&
                                    <div className="text-xl sm:text-2xl font-bold">
                                        {product.price === "FİYAT SORUNUZ" ? "FİYAT SORUNUZ" : product.price + ' ₺'}
                                    </div>
                                }
                                <Button className="w-[200px] h-[60px] bg-[#406800] text-white">
                                    <a href="tel:+90-530-360-4105" className="text-base sm:text-xl py-4">
                                        Bizi Arayın <br /> +90 530 360 41 05
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CarIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <path d="M9 17h6" />
            <circle cx="17" cy="17" r="2" />
        </svg>
    )
}


function PackageIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
        </svg>
    )
}


function StarIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )
}


function TruckIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M15 18H9" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
            <circle cx="17" cy="18" r="2" />
            <circle cx="7" cy="18" r="2" />
        </svg>
    )
}