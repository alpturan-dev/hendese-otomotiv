import React from 'react'
import logo from '../assets/logo.jpeg'
import { Input } from './ui/input'
import { Mail, MapPin } from 'lucide-react'

const Navbar = () => {
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
            <div className='mx-auto w-full lg:w-3/4 max-w-[1000px] md:h-40 bg-[#F7F7F7] flex flex-col md:flex-row items-center md:px-8 lg:px-0' >
                <div className='w-full md:w-1/4 h-[120px] pt-6'>
                    <img src={logo} className='w-[8rem] md:w-[10rem] h-[5rem] md:h-[6rem] mx-auto md:mx-0' />
                </div>
                <div className="w-full md:w-2/4 flex flex-col gap-4">
                    <div>
                        <div className='text-xl md:text-2xl lg:text-3xl font-bold text-center mb-1'>Hendese Otomotiv</div>
                        <div className='text-base md:text-xl lg:text-2xl font-bold text-center underline underline-offset-4 decoration-[#E3020F]'><span className='text-[#E3020F]'>Suzuki</span> Çıkma Yedek Parça</div>
                    </div>
                    <div className='relative h-10 w-4/5 mx-auto flex items-center gap-2 mb-6 md:mb-0'>
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
                        <Input type="text" placeholder="Parça Ara..." className="pl-12 pr-4" />
                    </div>
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