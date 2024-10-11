import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosIn";
const MovieDetails = ()=>{
    const {imdbID}= useParams();
    const [movie,setMovie]=useState(null);

    useEffect(()=>{
        fetchMovieDetails();
    },[imdbID]);

    const fetchMovieDetails = async()=>{
        try{
          const response = await axiosInstance.get(`/movie/${imdbID}`);
            setMovie(response.data);
        } catch(error){
            console.error('Error fetching movie details:', error);
        }

    };
    if (!movie) {
        return <div>Loading...</div>;
      }

    return(
        <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <img src={movie.Poster} className="img-fluid" alt={movie.Title} />
          </div>
          <div className="col-md-8">
            <h2>{movie.Title}</h2>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Release Year:</strong> {movie.Year}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          </div>
        </div>
      </div>
    );

};
export default MovieDetails;