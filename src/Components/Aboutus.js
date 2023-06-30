import React from 'react'
import studygroup from './Images/studygroup.png'



const Aboutus = () => {
    return (
        <div className='w-full bg-white py-16 px-4' id='about'>
            <div className='max-w-[1240px] mx-auto grid lg:grid-cols-2'>
                <img src={studygroup} alt='' className='w-[500px] mx-auto my-8'/>
                <div className='flex flex-col justify-center'>
                    <p className='text-[#2380dd] font-bold'>OUR MISSION</p>
                    <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Understand what what we do and why</h1>
                    <p>This AI tool designed to become aware of each student's unique interests, goals, and career aspirations. By leveraging machine learning algorithms and natural language processing, 
                      it can provide personalized guidance and mentorship that is tailored to each student's needs.</p>
                    <a className='bg-[#2380dd] w-[200px] rounded-lg font-bold my-6 mx-auto md:mx-0 py-4 text-white text-center' href='/demo'>Explore More</a>
                </div>
            </div>
        </div>
    )
}

export default Aboutus