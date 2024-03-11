import React from 'react'
import logo from '../assets/logo.jpeg'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Mail, MapPin, Phone, Search } from 'lucide-react'

const Navbar = () => {
    return (
        <div>
            <div className='bg-[#E3020F] w-full text-white text-xs justify-center flex flex-col md:flex-row md:gap-8'>
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
            <div className='w-full md:h-40 bg-[#F7F7F7] flex flex-col md:flex-row items-center md:px-8 lg:px-16' >
                <div className='w-full md:w-1/4 h-[120px] pt-6'>
                    <img src={logo} className='w-[8rem] md:w-[10rem] h-[5rem] md:h-[6rem] mx-auto md:mx-0' />
                </div>
                <div className="w-full md:w-2/4 flex flex-col gap-4">
                    <div >
                        <div className='text-base md:text-xl lg:text-2xl font-bold text-center'>Hendese Otomotiv</div>
                        <div className='text-base md:text-xl lg:text-2xl font-bold text-center underline underline-offset-4 decoration-[#E3020F]'><span className='text-[#E3020F]'>Suzuki</span> Çıkma Yedek Parça</div>
                    </div>
                    <div className='relative h-10 w-4/5 mx-auto flex items-center gap-2 mb-6 md:mb-0'>
                        <Input type="search" id="search" placeholder="Parça Ara..." className=" focus:outline-[#E3020F]" />
                        <Button className="bg-[#E3020F] hover:bg-[#E3020F] hover:opacity-90 gap-2" type="submit">
                            <Search className='w-3 h-3' />
                            Ara</Button>
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