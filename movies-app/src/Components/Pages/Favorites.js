import React from 'react';
import { useSelector } from 'react-redux';

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);

  return (
    <div>
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        <div className="row"> {/* Use row to structure the cards */}
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="col-md-8 mb-3"> {/* Column for each favorite movie */}
              <div className="card"> {/* Card for movie details */}
                <div className="row g-0"> {/* Row for image and content */}
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
        <p>No favorites yet!</p>
      )}
    </div>
  );
};

export default Favorites;
