import React from 'react'
import Marlins from '../Components/Images/Marlins.png'
import BankUnited from '../Components/Images/BankUnited.png'
import emerge from '../Components/Images/emerge.png'
import MiamiDade from '../Components/Images/Miami-dade-college.png'
import Kaseya from '../Components/Images/Kaseya-Logo.png'


const Sponsors = () => {
    return (
        <div className='max-w-[1140px] m-auto w-full px-4 py-16' id='testimonials'>
                <h2 className='text-center p-6 font-bold text-4xl'>Sponsors</h2>
            <div className='grid sm:grid-cols-5 gap-4'>
                    <div className=''>
                        <img className='w-full h-full object-cover' src={Marlins} alt='user1'/>
                    </div>
                    <div className='card'>
                        <img className='w-full h-full object-contain' src={BankUnited} alt='user1'/>       
                    </div>
                    <div className='card'>
                        <img className='w-full h-full object-cover' src={emerge} alt='user1'/>     
                    </div>
                    <div className='card'>
                        <img className='w-full h-full object-cover' src={Kaseya} alt='user1'/>     
                    </div>
                    <div className='card'>
                        <img className='w-full h-full object-cover' src={MiamiDade} alt='user1'/>     
                    </div>
            </div>
        </div>
    )
}

export default Sponsors