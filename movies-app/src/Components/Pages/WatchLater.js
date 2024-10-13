import React from 'react';
import { useSelector } from 'react-redux';

const WatchLater = () => {
  const watchLater = useSelector((state) => state.watchLater);

  // Debugging: Log the watchLater state
  console.log("Watch Later Movies:", watchLater);

  return (
    <div>
      <h2>Watch Later</h2>
      {watchLater.length > 0 ? (
        <div className="row">
          {watchLater.map((movie) => (
            <div key={movie.imdbID} className="col-md-8 mb-3">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={movie.Poster}
                      className="img-fluid rounded-start"
                      alt={movie.Title}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Title: {movie.Title}</h5>
                      <p className="card-text">Genre: {movie.Genre}</p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          Release Year: {movie.Year}
                        </small>
                      </p>
                      <p className="card-text">
                        <small className="text-body-secondary">
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
        <p>No movies to watch later!</p>
      )}
    </div>
  );
};

export default WatchLater;
