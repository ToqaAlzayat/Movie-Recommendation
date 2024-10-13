import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Pages/Home';
import MoviesList from './Components/Pages/MovieList';
import SearchResults from './Components/Pages/SearchResults';
import MoviesByGenre from './Components/Pages/MoviesByGenre';
import MovieDetails from './Components/Pages/MovieDetails';
import Favorites from './Components/Pages/Favorites';
import WatchLater from './Components/Pages/WatchLater';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movies' element={<MoviesList />} />
          <Route path='/search-results' element={<SearchResults />} />
          <Route path='/genre/:genre' element={<MoviesByGenre />} />
          <Route path='/movie/:imdbID' element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watchLater" element={<WatchLater />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
