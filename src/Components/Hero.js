import React from 'react'
import Typed from 'react-typed'

const Hero = () => {
    return (
        <div className='text-white bg-black '>
            <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
                <p className='text-[#2380dd] font-bold p-2'>DON'T HAVE ANY DIRECTION?</p>
                <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Skill ForeSight AI.</h1>
                <div className='flex justify-center items-center'>
                <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>Guided Path to Your Future </p>
                <Typed className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-3' strings={['Career', 'Job', 'Calling']}  typeSpeed={120} backSpeed={140} loop/>
                </div>
                <p className='md:text-2xl text-4xl font-bold text-gray-500'>Start your career journey with the help & assistance of Career Expert AI</p>
               <a href='/demo'><button className='bg-[#2380dd] w-[200px] rounded-lg font-bold my-6 mx-auto py-4 text-white '>Get Started</button></a>
            </div>
        </div>
    )
}

export default Hero