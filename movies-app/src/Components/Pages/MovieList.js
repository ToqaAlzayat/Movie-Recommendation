import "./MovieList.css"
import React, { useState, useEffect } from 'react';
import axiosInstance from "../axiosIn";
import movieCard from "../MovieCard/movieCard";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const API_KEY = '89bdb7e7'; 
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = async (page) => {
    try {
      // Use axiosInstance to fetch the list of movies
      const response = await axiosInstance.get('', {
        params: {
          s: 'movie',
          type: 'movie',
          page: page,
        }
      });

      if (response.data.Response === 'True') {
        const moviesList = response.data.Search;

        // Fetch detailed data for each movie in parallel
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
      <h2>Movies List</h2>
      <div className="container">
      <div className="row">
        {movies.map((movie) => (
         movieCard(movie)
        ))}
                  </div>

      </div>
      <div className="pagination d-flex justify-content-center">
        <button className='btn page-btn' onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>Previous</button>
        <span className="page-num">Page {currentPage} of {totalPages}</span>
        <button className='btn page-btn' onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default MoviesList;
