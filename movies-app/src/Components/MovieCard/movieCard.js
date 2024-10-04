 import './MovieCard.css'
 function movieCard(movie) {
  return (
    <>
    <div className="card mb-3 m-3 mx-4" key ={movie.imdbID}style={{ maxWidth: '540px' }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={movie.Poster} className="img-fluid rounded-start card-img" alt="..."/>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Title : {movie.Title}</h5>
                <p className="card-text">Genre : {movie.Genre}</p>
                <p className="card-text"><small className="text-body-secondary">Release Year : {movie.Year}</small></p>
                <p className="card-text"><small className="text-body-secondary">Rate : {movie.imdbRating}</small></p>
              </div>
            </div>
          </div>
        </div>
    </>
  )
  }
  export default movieCard;




