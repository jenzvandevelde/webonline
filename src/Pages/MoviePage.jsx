import React from 'react'
import Header from '../MovieComponents/Header';
import '../assets/Startup.css'
import Movie from '../MovieComponents/Movie'


const MoviePage = () => {
  return (
    <div className='body'>
    <div className='container'>
        <Header/>
        <Movie/>
        <div className='footerbutton'/>
    </div>
    </div>
  )
}

export default MoviePage