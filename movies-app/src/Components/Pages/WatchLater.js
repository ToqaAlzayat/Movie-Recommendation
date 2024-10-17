import React from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { removeFromWATCH_LATER } from '../../redux/actions';
const WatchLater = () => {
  const watchLater = useSelector((state) => state.watchLater);
  const dispatch = useDispatch();

  const handleRemoveFromWatchLater = (imdbID) => {
    dispatch(removeFromWATCH_LATER(imdbID)); // Dispatch remove action
  };

  // Debugging: Log the watchLater state
  console.log("Watch Later Movies:", watchLater);

  return (
    <div className='container mt-2'>
      <h2>Watch Later</h2>
      {watchLater.length > 0 ? (
        <div className="row">
          {watchLater.map((movie) => (
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
                  <div className="col d-flex justify-content-end">
                      <button
                        className="btn btn-outline-danger mb-2"
                        onClick={() => handleRemoveFromWatchLater(movie.imdbID)}
                      >
                        Remove
                      </button>
                      </div>
                   </div>
                 </div>
               </div>
             </div>
             </div>

          ))}
        </div>
      ) : (
        <p>No movies to watch later!</p>
      )}
    </div>
  );
};

export default WatchLater;
