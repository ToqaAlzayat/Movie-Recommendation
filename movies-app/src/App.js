import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Pages/Home';
import MoviesList from './Components/Pages/MovieList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter as Router , Route ,Routes } from 'react-router-dom';


function App() {
  return (
    <>
  
     <Router>
     <Navbar />

      <Routes>
      <Route path='' element={<Home/>}></Route>
      <Route path='/movies' element={<MoviesList/>}></Route>
      </Routes>
      </Router>      
   
    </>
  );
}

export default App;
