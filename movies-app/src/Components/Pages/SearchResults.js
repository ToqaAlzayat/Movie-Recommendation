import React,{useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../axiosIn";
import MovieCard from "../MovieCard/movieCard";

const SearchResults=()=>{
    const location = useLocation();
    const {query}=location.state||'';
    const [searchResults , setSearchResults]=useState([]);

    useEffect(()=>{
        if(query){
            performSearch(query);
        }
    },[query]);

    const performSearch = async (searchQuery) => {
        try {
          const response = await axiosInstance.get('/search', {
            params: {
              s: searchQuery,
            },
          });
          
         
          if (response.data.Response === 'True') {
            const moviesList = response.data.Search;
            const detailedMoviesPromises = moviesList.map((movie) =>
              axiosInstance.get(`/movie/${movie.imdbID}`)
            );
    
            const detailedMovies = await Promise.all(detailedMoviesPromises);
            const detailedMoviesData = detailedMovies.map((res) => res.data);
    
            setSearchResults(detailedMoviesData);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
          setSearchResults([]); 
        }
      };
      return (
        <div className="container mt-4">
          <h2>Search Results for "{query}"</h2>
          {searchResults.length > 0 ? (
            <div className="row">
              {searchResults.map((movie) => (
                <div  className="col-md-6 mb-4">
                  {<MovieCard key={movie.imdbID} movie={movie} /> } 
                </div>
              ))}
            </div>
          ) : (
            <p>No results found for "{query}".</p>
          )}
        </div>
      );
    };
    
    export default SearchResults;