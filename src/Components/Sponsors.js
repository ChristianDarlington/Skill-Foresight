import React from 'react'
import Marlins from '../Components/Images/Marlins.png'
import BankUnited from '../Components/Images/BankUnited.png'
import emerge from '../Components/Images/emerge.png'
import MiamiDade from '../Components/Images/Miami-dade-college.png'
import Kaseya from '../Components/Images/Kaseya-Logo.png'
import '../Styles/Sponsors.css'

const Sponsors = () => {
    return (
        <div className='testimonials' id='testimonials'>
            <div className='container'>
                <h2>Sponsors</h2>
                <span className='line'></span>
                <div className='content'>
                    <div className='card'>
                        <img src={Marlins} alt='user1'/>
                    </div>
                    <div className='card'>
                        <img src={BankUnited} alt='user1'/>       
                    </div>
                    <div className='card'>
                        <img src={emerge} alt='user1'/>     
                    </div>
                    <div className='card'>
                        <img src={Kaseya} alt='user1'/>     
                    </div>
                    <div className='card'>
                        <img src={MiamiDade} alt='user1'/>     
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sponsors