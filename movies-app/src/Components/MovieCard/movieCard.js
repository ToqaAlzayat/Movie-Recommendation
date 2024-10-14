import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToFavorites, addToWatchLater } from "../../redux/actions";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  if (!movie || !movie.Poster) {
    return null;
  }

  const handleAddToFavorites = (e) => {
    setIsActive(!isActive); 
    e.stopPropagation();
    console.log("Adding to favorites:", movie);
    dispatch(addToFavorites(movie));

  };

  const handleAddToWatchLater = (e) => {
    e.stopPropagation();
    console.log("Adding to watch later:", movie);
    dispatch(addToWatchLater(movie));
  };

  return (
    <div className="card mb-3 m-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-12 col-md-4">
          <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: "none", color: "inherit" }}>
            <img
              src={movie.Poster}
              className="img-fluid rounded-start card-img"
              alt={movie.Title}
            />
          </Link>
        </div>
        <div className="col-12 col-md-8">
          <div className="card-body">
            <h5 className="card-title">Title: {movie.Title}</h5>
            <p className="card-text">Genre: {movie.Genre}</p>
            <p className="card-text">
              <small>
                Release Year: {movie.Year}
              </small>
            </p>
            <p className="card-text rate">
              <small className="fw-bold">
                Rate: {movie.imdbRating}
              </small>
            </p>

            <div className="row">
              <div className="col d-flex justify-content-end">
                <button
                  className={`heart m-2 ${isActive ? 'active' : ''}`}
                  onClick={handleAddToFavorites}
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  <i className="bi bi-heart-fill"></i>
                </button>
                <button
                  className="btn add-btn m-2"
                  onClick={handleAddToWatchLater}
                >
                  Watch Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
