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
          <div className="col-md-8 mt-3">
            <h2 className="mb-4" style={{ color: "#20448C" }}>{movie.Title}</h2>
            <div className="m-5">
            <p><strong style={{ color: "#6482AD" }}>Genre:</strong> {movie.Genre}</p>
            <p><strong style={{ color: "#6482AD" }}>Plot:</strong> {movie.Plot}</p>
            <p><strong style={{ color: "#6482AD" }}>Actors:</strong> {movie.Actors}</p>
            <p><strong style={{ color: "#6482AD" }}>Director:</strong> {movie.Director}</p>
            <p><strong style={{ color: "#6482AD" }}>Release Year:</strong> {movie.Year}</p>
            <p><strong style={{ color: "#6482AD" }}>IMDB Rating:</strong> {movie.imdbRating}</p>
            </div>
          </div>
        </div>
      </div>
    );

};
export default MovieDetails;