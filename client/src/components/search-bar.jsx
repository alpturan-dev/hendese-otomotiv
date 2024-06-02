import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from './ui/input'
import { useProductStore } from '@/store/store'

const SearchBar = () => {
    const navigate = useNavigate();
    const { products } = useProductStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query === "") {
            setFilteredProducts([])
        } else {
            const filtered = products.filter(product =>
                product.part.toLowerCase().includes(query.toLowerCase()) ||
                product.model.toLowerCase().includes(query.toLowerCase()) ||
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase()) ||
                product.oem.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    useEffect(() => { console.log("filteredProducts", filteredProducts) }, [filteredProducts]);

    return (
        <div className='w-[350px] lg:w-[440px] mx-auto px-auto'>
            <div className='relative h-10 flex items-center gap-2 mb-2 md:mb-0'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 bottom-0 w-6 h-6 my-auto left-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <Input type="text" placeholder="Parça Ara..." className="pl-12 pr-4" value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)} />
            </div>
            {filteredProducts.length > 0 &&
                <div className='w-[350px] lg:w-[440px] md:mt-2 bg-[#fff] z-50 absolute flex flex-1 flex-col justify-start mb-6 md:mb-0'>
                    {filteredProducts.map((product) =>
                        <div key={product._id} className='flex items-start justify-start border-b-2 rounded-sm cursor-pointer hover:opacity-90 hover:bg-gray-50'
                            onClick={() =>
                                navigate('/parca/' + product.part + '/' + product._id, { state: { id: product._id } })}>
                            <img loading="lazy" src={product.images[0]} className='size-20' />
                            <div className='flex flex-col py-1 px-2'>
                                <span className='font-light text-xs'>{product.part} | {product.model}</span>
                                <span className=''>{product.name}</span>
                            </div>
                        </div>)
                    }
                </div>
            }
        </div>
    )
}

export default SearchBar