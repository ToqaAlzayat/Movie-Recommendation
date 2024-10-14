import "./MovieList.css";
import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosIn"; // Make sure this is pointing to your server's base URL
import MovieCard from "../MovieCard/MovieCard";

const MoviesList = () => {
  const [allMovies, setAllMovies] = useState([]); // Store all movies
  const [filteredMovies, setFilteredMovies] = useState([]); // Store filtered movies for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [releaseDate, setReleaseDate] = useState('');
  const [genres, setGenres] = useState('');
  const [rating, setRating] = useState('');
  const [availableGenres, setAvailableGenres] = useState([]);
  const [availableReleaseDates, setAvailableReleaseDates] = useState([]);
  const [availableRatings, setAvailableRatings] = useState([]);

  const ITEMS_PER_PAGE = 10;
  const MAX_MOVIES = 100; // Max number of movies to fetch for filtering

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    applyFiltersAndSort(); // Apply filters and sorting whenever filters change
  }, [releaseDate, genres, rating, allMovies]);

  // Fetch all movies (up to a reasonable limit like 100)
  const fetchMovies = async () => {
    let moviesData = [];
    let page = 1;
    let totalFetched = 0;

    try {
      while (totalFetched < MAX_MOVIES) {
        const response = await axiosInstance.get('/search', {
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
            axiosInstance.get(`/movie/${movie.imdbID}`)
          );

          const detailedMovies = await Promise.all(detailedMoviesPromises);
          const detailedMoviesData = detailedMovies.map(res => res.data);

          moviesData = [...moviesData, ...detailedMoviesData];
          totalFetched += detailedMoviesData.length;

          if (moviesData.length >= MAX_MOVIES || !response.data.totalResults) {
            break;
          }

          page++; // Move to the next page
        } else {
          console.error(response.data.Error);
          break;
        }
      }

      setAllMovies(moviesData);
      setFilteredMovies(moviesData.slice(0, ITEMS_PER_PAGE)); // Initialize with the first page of filtered results
      setTotalPages(Math.ceil(moviesData.length / ITEMS_PER_PAGE));

      extractDynamicFilters(moviesData);
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

  // Apply filters and sort movies by rating
  const applyFiltersAndSort = () => {
    let filtered = [...allMovies];

    if (releaseDate) {
      filtered = filtered.filter(movie => movie.Year === releaseDate);
    }

    if (genres) {
      filtered = filtered.filter(movie => movie.Genre && movie.Genre.includes(genres));
    }

    if (rating) {
      filtered = filtered.filter(movie => movie.imdbRating && movie.imdbRating === rating);
    }

    // Sort filtered movies by rating (from highest to lowest)
    filtered.sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating));

    // Set filtered movies and reset to page 1
    setFilteredMovies(filtered.slice(0, ITEMS_PER_PAGE)); // Show first page of results
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  };

  // Reset filters
  const resetReleaseDate = () => setReleaseDate('');
  const resetGenres = () => setGenres('');
  const resetRating = () => setRating('');

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }

    // Display movies for the current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setFilteredMovies(allMovies.slice(startIndex, endIndex));

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
            <div key={movie.imdbID} className="col-12 col-md-6">
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
        <span className="mx-3 page-num">Page {currentPage} of {totalPages}</span>
        <button className='btn page-btn' onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MoviesList;
