import "./Home.css";
import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../axiosIn'; 
import MovieCard from "../MovieCard/movieCard";

const Home = () => {
  const [actionMovies, setActionMovies] = useState([]);
  const [adventureMovies, setAdventureMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);

  const actionScrollRef = useRef(null); 
  const adventureScrollRef = useRef(null);
  const dramaScrollRef = useRef(null);
  const comedyScrollRef = useRef(null);

  useEffect(() => {
    fetchTopRatedMovies('action', setActionMovies);
    fetchTopRatedMovies('adventure', setAdventureMovies);
    fetchTopRatedMovies('drama', setDramaMovies);
    fetchTopRatedMovies('comedy', setComedyMovies);
  }, []);

  // Generalized function to fetch and sort movies by genre
  const fetchTopRatedMovies = async (genre, setMovies) => {
    try {
      const response = await axiosInstance.get('/movies', {
        params: {
          genre: genre        }
      });

      if (response.status ===200) {
        const moviesList = response.data.slice(0, 10); // Get top 10 movies

        const detailedMoviesPromises = moviesList.map(movie =>
          axiosInstance.get(`/movie/${movie.imdbID}`)

        );

        const detailedMovies = await Promise.all(detailedMoviesPromises);
        const detailedMoviesData = detailedMovies.map(res => res.data);

        const sortedMovies = detailedMoviesData
          .filter(movie => movie.imdbRating) // Ensure the movie has a rating
          .sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating));

        setMovies(sortedMovies.slice(0, 10)); // Set top 10 movies
      } else {
        console.error(response.data.Error);
      }
    } catch (error) {
      console.error(`Error fetching ${genre} movies:`, error);
    }
  };

  const handleScroll = (direction, ref) => {
    const scrollDistance = 300; 
    if (direction === 'next') {
      ref.current.scrollBy({ left: scrollDistance, behavior: 'smooth' });
    } else {
      ref.current.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
    }
  };

  return (
    <>
    <div className="head">
      <div className="back text-center">
      <h1 style={{color:"#BF2A37"}}>Welcome to MovieMingle</h1>
      <p>Discover a world filled with amazing films and make your journey through cinema even more exciting! </p>
      <p>Browse, explore, and enjoy our unique recommendations tailored just for you.</p>
      <h3>Start now and enjoy watching movies!</h3>
      </div>

    </div>
    <div className="container mt-5">
      {/* Action Movies */}
      <h2>Top 10 Rated Action Movies</h2>
      <div className="scroll-buttons">
        <button className="scroll-btn" onClick={() => handleScroll('prev', actionScrollRef)}> &lt;</button>
        <div className="horizontal-scroll" ref={actionScrollRef}>
          <div className="movie-row">
            {actionMovies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} /> )}
          </div>
        </div>
        <button className="scroll-btn" onClick={() => handleScroll('next', actionScrollRef)}>&gt;</button>
      </div>

      {/* Adventure Movies */}
      <h2>Top 10 Rated Adventure Movies</h2>
      <div className="scroll-buttons">
        <button className="scroll-btn" onClick={() => handleScroll('prev', adventureScrollRef)}>&lt;</button>
        <div className="horizontal-scroll" ref={adventureScrollRef}>
          <div className="movie-row">
            {adventureMovies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} /> )}
          </div>
        </div>
        <button className="scroll-btn" onClick={() => handleScroll('next', adventureScrollRef)}>&gt;</button>
      </div>

      {/* Drama Movies */}
      <h2>Top 10 Rated Drama Movies</h2>
      <div className="scroll-buttons">
        <button className="scroll-btn" onClick={() => handleScroll('prev', dramaScrollRef)}>&lt;</button>
        <div className="horizontal-scroll" ref={dramaScrollRef}>
          <div className="movie-row">
            {dramaMovies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} /> )}
          </div>
        </div>
        <button className="scroll-btn" onClick={() => handleScroll('next', dramaScrollRef)}>&gt;</button>
      </div>

      {/* Comedy Movies */}
      <h2>Top 10 Rated Comedy Movies</h2>
      <div className="scroll-buttons">
        <button className="scroll-btn" onClick={() => handleScroll('prev', comedyScrollRef)}>&lt;</button>
        <div className="horizontal-scroll" ref={comedyScrollRef}>
          <div className="movie-row">
            {comedyMovies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} /> )}
          </div>
        </div>
        <button className="scroll-btn" onClick={() => handleScroll('next', comedyScrollRef)}>&gt;</button>
      </div>
    </div>
    </>
  );
};

export default Home;
