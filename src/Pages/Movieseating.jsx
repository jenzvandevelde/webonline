import React from 'react'
import Header from '../MovieComponents/Header';
import '../assets/Startup.css'
import Seating from '../Movieseatingplan/Seating'


const Movieseating = () => {
  return (
    <div className='body'>
    <div className='container'>
        <Header/>
        <Seating/>
        <div className='footerbutton'/>
    </div>
    </div>
    
  )
}

export default Movieseating