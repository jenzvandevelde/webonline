import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import Footer from './Footer';
import FilterMenu from './FilterMenu';
import { Link } from 'react-router-dom'; // Import Link to navigate to MovieInfoPage

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.5 },
      y: { duration: 0.5 },
    },
  },
};

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
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {displayedMovies.map((movie, index) => (
          <motion.div
            className="movie"
            variants={item}
            key={index}
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
