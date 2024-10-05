import "./MovieList.css";
import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosIn";
import MovieCard from "../MovieCard/MovieCard";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [releaseDate, setReleaseDate] = useState('');
  const [genres, setGenres] = useState('');
  const [rating, setRating] = useState('');
  const [availableGenres, setAvailableGenres] = useState([]);
  const [availableReleaseDates, setAvailableReleaseDates] = useState([]);
  const [availableRatings, setAvailableRatings] = useState([]);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  useEffect(() => {
    applyFilters();
  }, [releaseDate, genres, rating]);

  // Fetch movies and extract dynamic filters
  const fetchMovies = async (page) => {
    try {
      const response = await axiosInstance.get('', {
        params: {
          s: 'movie',
          type: 'movie',
          page: page,
        }
      });

      if (response.data.Response === 'True') {
        const moviesList = response.data.Search;

        // Fetch detailed data for each movie
        const detailedMoviesPromises = moviesList.map(movie =>
          axiosInstance.get('', {
            params: {
              i: movie.imdbID
            }
          })
        );
        
        const detailedMovies = await Promise.all(detailedMoviesPromises);
        const detailedMoviesData = detailedMovies.map(res => res.data);

        setMovies(detailedMoviesData);
        setFilteredMovies(detailedMoviesData); // Initial filtering data

        const totalResults = response.data.totalResults;
        setTotalPages(Math.ceil(totalResults / ITEMS_PER_PAGE));

        extractDynamicFilters(detailedMoviesData);
      } else {
        console.error(response.data.Error);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Extract dynamic filters (Release Dates, Genres, Ratings)
  const extractDynamicFilters = (moviesData) => {
    const genresSet = new Set();
    const releaseDatesSet = new Set();
    const ratingsSet = new Set();

    moviesData.forEach(movie => {
      if (movie.Genre) {
        movie.Genre.split(', ').forEach(genre => genresSet.add(genre));
      }
      if (movie.Year) {
        releaseDatesSet.add(movie.Year);
      }
      if (movie.imdbRating) {
        ratingsSet.add(movie.imdbRating);
      }
    });

    setAvailableGenres(Array.from(genresSet));
    setAvailableReleaseDates(Array.from(releaseDatesSet));
    setAvailableRatings(Array.from(ratingsSet));
  };

  // Apply filters client-side
  const applyFilters = () => {
    let filtered = [...movies];

    if (releaseDate) {
      filtered = filtered.filter(movie => movie.Year === releaseDate);
    }

    if (genres) {
      filtered = filtered.filter(movie => movie.Genre && movie.Genre.includes(genres));
    }

    if (rating) {
      filtered = filtered.filter(movie => movie.imdbRating && movie.imdbRating === rating);
    }

    setFilteredMovies(filtered);
  };

  // Reset filters
  const resetReleaseDate = () => {
    setReleaseDate('');
  };

  const resetGenres = () => {
    setGenres('');
  };

  const resetRating = () => {
    setRating('');
  };

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mt-2">
      <h2>Movies List</h2>

      {/* Filter buttons */}
      <div className="btn-group">
        
        {/* Release Date Filter */}
        <div className="btn-group">
          <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown">
            Release Date
          </button>
          <ul className="dropdown-menu">
            {availableReleaseDates.map((year) => (
              <li key={year}><a className="dropdown-item" href="#" onClick={() => setReleaseDate(year)}>{year}</a></li>
            ))}
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#" onClick={resetReleaseDate}>Reset</a></li>
          </ul>
        </div>
        
        {/* Genres Filter */}
        <div className="btn-group">
          <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown">
            Genres
          </button>
          <ul className="dropdown-menu">
            {availableGenres.map((genre) => (
              <li key={genre}><a className="dropdown-item" href="#" onClick={() => setGenres(genre)}>{genre}</a></li>
            ))}
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#" onClick={resetGenres}>Reset</a></li>
          </ul>
        </div>

        {/* Rating Filter */}
        <div className="btn-group">
          <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown">
            Rating
          </button>
          <ul className="dropdown-menu">
            {availableRatings.map((rating) => (
              <li key={rating}><a className="dropdown-item" href="#" onClick={() => setRating(rating)}>{rating}</a></li>
            ))}
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#" onClick={resetRating}>Reset</a></li>
          </ul>
        </div>
        
      </div>

      {/* Movies List */}
      <div className="row mt-3">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.imdbID} className="col-md-6">
              <MovieCard movie={movie} />
            </div>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination d-flex justify-content-center mt-3">
        <button className='btn page-btn' onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="page-num">Page {currentPage} of {totalPages}</span>
        <button className='btn page-btn' onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MoviesList;
