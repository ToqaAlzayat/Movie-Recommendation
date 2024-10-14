import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);

  return (
<div className='container mt-2'>
  <h2>Favorites</h2>
  {favorites.length > 0 ? (
    <div className="row"> {/* Use row to structure the cards */}
      {favorites.map((movie) => (
        <div className="col-md-6">
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
        
                </div>
              </div>
            </div>
          </div>
          </div>
      ))}
    </div>
  ) : (
    <p>No favorites yet!</p>
  )}
</div>

  );
};

export default Favorites;
