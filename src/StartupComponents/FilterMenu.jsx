import React, { useState, useEffect } from 'react';

const FilterMenu = ({ movies, setFilteredMovies }) => {
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [showGenres, setShowGenres] = useState(false);

  useEffect(() => {
    const genresSet = new Set();
    const yearsSet = new Set(); // Houd unieke jaartallen bij
    movies.forEach((movie) => {
      movie.genres.forEach((genre) => {
        genresSet.add(genre);
      });
      yearsSet.add(movie.year); // Voeg het jaartal toe aan de set
    });
    const genresArray = Array.from(genresSet);
    genresArray.sort();
    setUniqueGenres(genresArray);

    const yearsArray = Array.from(yearsSet);
    yearsArray.sort((a, b) => b - a); // Sorteer de jaartallen van hoog naar laag
    setUniqueYears(yearsArray); // Bewaar de unieke jaartallen
  }, [movies]);

  const handleYearFilter = (year) => {
    setSelectedYear(year);
    filterMovies(year, selectedGenre, searchTerm);
  };

  const handleGenreFilter = (genre) => {
    setSelectedGenre(genre);
    setShowGenres(false); // Verberg genres dropdown
    filterMovies(selectedYear, genre, searchTerm);
  };

  const handleSearch = () => {
    filterMovies(selectedYear, selectedGenre, searchTerm);
  };

  const toggleGenresDropdown = () => {
    setShowGenres(!showGenres);
  };

  const filterMovies = (year, genre, search) => {
    let filteredMovies = [...movies];

    if (year !== 'All') {
      filteredMovies = filteredMovies.filter((movie) => movie.year === year);
    }

    if (genre !== 'All') {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genres.includes(genre)
      );
    }

    if (search !== '') {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredMovies(filteredMovies);
  };

  return (
    <div>
      <div className="filter-menu">
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="dropdown">
          <button className="dropdown-button" onClick={toggleGenresDropdown}>
            {selectedGenre} <span className="arrow-down">▼</span>
          </button>
          {showGenres && (
            <div className="dropdown-content" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              <a href="#" onClick={() => handleGenreFilter('All')}>
                All genres
              </a>
              {uniqueGenres.map((genre) => (
                <a href="#" key={genre} onClick={() => handleGenreFilter(genre)}>
                  {genre}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="dropdown">
          <button className="dropdown-button">
            {selectedYear} <span className="arrow-down">▼</span>
          </button>
          <div className="dropdown-content" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <a href="#" onClick={() => handleYearFilter('All')}>
              All the years
            </a>
            {uniqueYears.map((year) => (
              <a href="#" key={year} onClick={() => handleYearFilter(year)}>
                {year}
              </a>
            ))}
          </div>
        </div>
        {/* Filteropties */}
        <div className="filter-options">
          <button className="filter-option" onClick={() => handleYearFilter('Newest')}>
            Newest
          </button>
          <button className="filter-option" onClick={() => handleGenreFilter('Popular')}>
            Popular
          </button>
          <button className="filter-option" onClick={() => handleGenreFilter('Featured')}>
            Featured
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
