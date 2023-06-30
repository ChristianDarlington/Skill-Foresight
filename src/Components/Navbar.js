import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import Logo from '../Components/Images/logo.png'

const Navbar = () => {

    const [click, setClick] = useState(false)
   
   
    const handleClick = () => setClick(!click)

    const closeMenu = () => setClick(false)

    return (
        <div className='flex justify-between items-center max-w-[1600px] mx-auto px-4 text-white h-24 bg-black'>    
                <a href='/' className='text-[#2380dd] font-bold w-full text-3xl'>
                    FORESIGHT.
                </a>
                <ul className='hidden md:flex'>
                    <li className='p-4'>
                        <a href='/' onClick={closeMenu}>Home</a>
                    </li>
                    <li className='p-4'>
                        <a href='#about' onClick={closeMenu}>About</a>
                    </li>
                    <li className='p-4'>
                        <a href='#testimonials' onClick={closeMenu}>Sponsors</a>
                    </li>
                    <li className='p-4'>
                        <a href='/demo' onClick={closeMenu}>Demo</a>
                    </li>
                </ul>            
                <div onClick={handleClick} className='block md:hidden'>
                    {click ? <FaTimes size={20}/> : <FaBars size={20}/>}
                
                </div>
                <div className={click ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'fixed left-[-100%]'}>
                <a href='/' className='text-[#2380dd] font-bold w-full text-3xl m-4'>
                    FORESIGHT.
                </a>
                <ul className='uppercase p-4'>
                    <li className='p-4 border-gray-600 border-b'>
                        <a href='/' onClick={closeMenu}>Home</a>
                    </li>
                    <li className='p-4 border-gray-600 border-b'>
                        <a href='#about' onClick={closeMenu}>About</a>
                    </li>
                    <li className='p-4 border-gray-600 border-b'>
                        <a href='#testimonials' onClick={closeMenu}>Sponsors</a>
                    </li>
                    <li className='p-4 border-gray-600 border-b'>
                        <a href='/demo' onClick={closeMenu}>Demo</a>
                    </li>
                </ul>        
                </div>    
        </div>
    )
}

export default Navbar