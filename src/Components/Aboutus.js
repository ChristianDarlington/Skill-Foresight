import React from 'react'
import studygroup from './Images/studygroup.png'

import '../Styles/Aboutus.css'

const Aboutus = () => {
    return (
        <div className='about' id='about'>
            <div className='container'>
                <img src={studygroup} alt='' />
                <div className='col-2'>
                    <h2>About Us</h2>
                    <span className='line'></span>
                    <p>This AI tool designed to become aware of each student's unique interests, goals, and career aspirations. By leveraging machine learning algorithms and natural language processing, 
                      it can provide personalized guidance and mentorship that is tailored to each student's needs.</p>
                    <p>Helping the next generation of students find the best career path.</p>
                    <button className='button'>Explore More</button>
                </div>
            </div>
        </div>
    )
}

export default Aboutus