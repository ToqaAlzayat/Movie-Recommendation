import "./MovieList.css";
import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosIn"; 
import MovieCard from "../MovieCard/MovieCard";

const MoviesList = () => {
  const [allMovies, setAllMovies] = useState([]); // Store all movies
  const [filteredMovies, setFilteredMovies] = useState([]); // Store filtered movies for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [releaseDate, setReleaseDate] = useState('');
  const [genres, setGenres] = useState('');
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const ITEMS_PER_PAGE = 10;
  const MAX_MOVIES = 100; // Max number of movies to fetch for filtering

  const availableGenres = [
    "Animation", "Action", "Adventure", "Comedy", "Horror", "Fantasy", "Drama", 
    "Documentary", "Family", "Sci-Fi", "Romance", "Crime", "Western", 
    "Biography", "Mystery", "Sport", "Thriller"
  ];

  const availableReleaseDates = Array.from({ length: 30 }, (_, i) => 2024 - i);
  const availableRatings = Array.from({ length: 10 }, (_, i) => (10 - i).toString());

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

    setLoading(true); // Start loading indicator
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

          const detailedMoviesPromises = moviesList.map(movie =>
            axiosInstance.get(`/movie/${movie.imdbID}`)
          );

          const detailedMovies = await Promise.all(detailedMoviesPromises);
          const detailedMoviesData = detailedMovies.map(res => res.data);

          moviesData = [...moviesData, ...detailedMoviesData];
          totalFetched += detailedMoviesData.length;

          if (moviesData.length >= MAX_MOVIES || response.data.totalResults <= totalFetched) {
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
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false); // End loading indicator
    }
  };

  // Apply filters and sort movies by rating
const applyFiltersAndSort = () => {
  const filtered = allMovies.filter(movie => {
    const movieYear = movie.Year ? movie.Year.match(/\d{4}/)[0] : ''; // Extract the year from the movie.Year string

    const matchesReleaseDate = !releaseDate || movieYear === releaseDate.toString();
    const matchesGenres = !genres || (movie.Genre && movie.Genre.includes(genres));
    const matchesRating = !rating || (parseFloat(movie.imdbRating) >= parseFloat(rating) && parseFloat(movie.imdbRating) <= (parseFloat(rating) + 0.9));

    return matchesReleaseDate && matchesGenres && matchesRating;
  });

  // Sort filtered movies by rating (from highest to lowest)
  filtered.sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating));

  setFilteredMovies(filtered.slice(0, ITEMS_PER_PAGE)); // Show first page of results
  setCurrentPage(1);
  setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
};


  // Handle page change for pagination
  const handlePageChange = (direction) => {
    let newPage = currentPage;
    if (direction === 'next' && currentPage < totalPages) {
      newPage++;
    } else if (direction === 'prev' && currentPage > 1) {
      newPage--;
    }

    const startIndex = (newPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    setFilteredMovies(allMovies.slice(startIndex, endIndex));
    setCurrentPage(newPage);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mt-2">
      {loading ? (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
    
      ) : (
        <>
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
                <li><a className="dropdown-item" href="#" onClick={() => setReleaseDate('')}>Reset</a></li>
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
                <li><a className="dropdown-item" href="#" onClick={() => setGenres('')}>Reset</a></li>
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
                <li><a className="dropdown-item" href="#" onClick={() => setRating('')}>Reset</a></li>
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
              <div className="no-movies-found">
                <p>No movies found. Try adjusting your filters.</p>
                <button className="btn btn-primary" onClick={() => { 
                  setReleaseDate(''); 
                  setGenres(''); 
                  setRating('');
                }}>Reset Filters</button>
              </div>
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
        </>
      )}
    </div>
  );
};

export default MoviesList;
