import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from "../axiosIn";
import MovieCard from "../MovieCard/movieCard";

const MoviesByGenre = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const location = useLocation();
  const genre = location.state?.query; // Access the genre from state passed through navigate

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    if (genre) {
      fetchMoviesByGenre(genre, currentPage);
    }
  }, [genre, currentPage]);

  const fetchMoviesByGenre = async (genre, page) => {
    try {
      // Use axiosInstance to fetch the list of movies by genre
      const response = await axiosInstance.get('/search', {
        params: {
          s: genre,
          type: 'movie',
          page: page,
        }
      });

      if (response.data.Response === 'True') {
        const moviesList = response.data.Search;

        // Fetch detailed data for each movie in parallel
        const detailedMoviesPromises = moviesList.map(movie =>
          axiosInstance.get(`/movie/${movie.imdbID}`)

        );
        
        const detailedMovies = await Promise.all(detailedMoviesPromises);
        const detailedMoviesData = detailedMovies.map(res => res.data);
        
        setMovies(detailedMoviesData);
        const totalResults = response.data.totalResults;
        setTotalPages(Math.ceil(totalResults / ITEMS_PER_PAGE));
      } else {
        console.error(response.data.Error);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
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
      <h2>{genre} Movies</h2>
      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-6">
            {<MovieCard key={movie.imdbID} movie={movie} /> }
          </div>
        ))}
      </div>
      <div className="pagination d-flex justify-content-center">
        <button className='btn page-btn' onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>Previous</button>
        <span className="page-num">Page {currentPage} of {totalPages}</span>
        <button className='btn page-btn' onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default MoviesByGenre;
