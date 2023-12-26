import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../assets/Moviecard.css";
import Header from '../MovieComponents/Header';
import { Link } from 'react-router-dom';

function MovieInfoPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const response = await fetch('http://localhost:5173/src/assets/movies.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const selectedMovie = data[id];

        if (selectedMovie) {
          setMovie(selectedMovie);
        } else {
          console.log('Movie not found');
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    }

    fetchMovieData();
  }, [id]);

  const handleBuyTicket = () => {
    navigate('/seating', { state: { movie } });
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className='body'>
      <div className='container'>
        <Header/>
        <Link to="/Movie">
          <button type="submit" className="Goback">Ga terug</button>
        </Link>

        <p className='TitelMovieInfo'>Movie Info Page</p>

        <img src={movie.thumbnail} alt={movie.title} className="img-fluid-movieimg" />
      
        <p className='titelmovie'>{movie.title}</p>
        <p className='moviegenre'>{movie.genres.join(', ')}</p>
        <p className='movieyear'>{movie.year}</p>
        <p className='cast'>{movie.cast.join(', ')}</p>
        <p className='extract'>{movie.extract}</p>
        <button type="submit" className="buyticket" onClick={handleBuyTicket}>Koop Ticket</button>
      </div>
    </div>
  );
}

export default MovieInfoPage;
