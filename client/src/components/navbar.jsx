import React from 'react'
import logo from '../assets/logo.png'
import { Input } from './ui/input'
import { Mail, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SearchBar from './search-bar'

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className='bg-[#E3020F] w-full text-white text-[11px] justify-center flex flex-col md:flex-row md:gap-8'>
                <div className='flex items-center justify-center py-1'>
                    <MapPin className='w-4 h-5' />
                    <span className='mx-2'>
                        Arifbey, Adnan Menderes Caddesi No:33A, 54580 Arifiye/SAKARYA
                    </span>
                </div>
                <div className='flex items-center justify-center py-1'>
                    <Mail className='w-4 h-5' />
                    <span className='mx-2'>
                        hendeseoto@gmail.com
                    </span>
                </div>
            </div>
            <div className='mx-auto w-full lg:w-3/4 max-w-[1000px] md:h-40 flex flex-col md:flex-row items-center md:px-8 lg:px-0' >
                <div className='w-full md:w-1/4 h-[120px] pt-6 cursor-pointer' onClick={() => navigate('/')}>
                    <img src={logo} className='w-[8rem] md:w-[10rem] h-[5rem] md:h-[6rem] mx-auto md:mx-0' />
                </div>
                <div className="w-full md:w-2/4 flex flex-col gap-4">
                    <div>
                        <div className='text-xl md:text-2xl lg:text-3xl font-bold text-center mb-1 cursor-pointer' onClick={() => navigate('/')}>Hendese Otomotiv</div>
                        <div className='text-base md:text-xl font-semibold text-center underline underline-offset-4 decoration-[#E3020F]'><span className='text-[#E3020F]'>Suzuki</span> Çıkma Yedek Parça</div>
                    </div>
                    <SearchBar />
                </div>
                <div className='w-1/4 md:flex-row items-center justify-end pt-12 hidden md:flex'>
                    <div className='flex flex-col items-center'>
                        Bize Ulaşın!
                        <span className='text-base md:text-xl text-[#E3020F] font-bold'>
                            +90 530 360 41 05
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar