import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import Footer from './Footer';
import FilterMenu from './FilterMenu';
import { Link } from 'react-router-dom'; // Import Link to navigate to MovieInfoPage

function Movie() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [displayedMovieCount, setDisplayedMovieCount] = useState(8);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('http://localhost:5173/src/assets/movies.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data);
        setFilteredMovies(data); // Initialize filteredMovies with all films
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    }

    fetchMovies();
  }, []);

  const displayedMovies = filteredMovies.slice(0, displayedMovieCount);

  const handleShowMore = () => {
    const additionalMovies = 8;
    const newDisplayedMovieCount = displayedMovieCount + additionalMovies;
    setDisplayedMovieCount(newDisplayedMovieCount);
    setShowMore(newDisplayedMovieCount < filteredMovies.length);
  };

  return (
    <div>
      <FilterMenu movies={movies} setFilteredMovies={setFilteredMovies} />
      <motion.div
        className="movie-shower"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {displayedMovies.map((movie, index) => (
          <motion.div
            className="movie"
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to={`/movie-info/${index}`}>
              <div className="movie-inner">
                <div className="movie-front">
                  <img src={movie.thumbnail} alt={movie.title} />
                </div>
                <div className="movie-back">
                  <div className="movie-info">
                    <p className="movie-title">{movie.title}</p>
                    <div className="year-genre">
                      <p className="movie-year">{movie.year}</p>
                      <p className="movie-genre">{movie.genres.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      <Footer setShowMore={handleShowMore} showMore={showMore} />
    </div>
  );
}

export default Movie;
