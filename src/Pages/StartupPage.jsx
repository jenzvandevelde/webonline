import React from 'react'

import '../assets/Startup.css'
import Banner from '../StartupComponents/Banner'
import Movie from '../StartupComponents/Movie'
import Header from '../MovieComponents/Header';


const StartupPage = () => {
  return (
    <div className='body'>
    <div className='container'>
      <Header/>
      <Banner/>
      <Movie/>
      <div className='footerbutton'/>
    </div>
    </div>
  )
}

export default StartupPage