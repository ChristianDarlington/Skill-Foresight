import React from 'react'
import '../Styles/Hero.css'

const Hero = () => {
    return (
        <div className='hero'>
            <div className='content'>
                <p>Don't have any direction?</p>
                <p>Wondering what the next step is?</p>
                <p>Skill ForeSight AI</p>
                <p>Guided Path to Your Future Career</p>
               <a href='/demo'><button className='button'>Get Started</button></a>
            </div>
        </div>
    )
}

export default Hero