import React ,{useState}from "react";
import "./navbar.css";
import Logo from "../../Images/MovieLogo.png";
import LogoName from "../../Images/MovieMingle.png";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [searchQuery, setSearchQuary] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("/search-results", { state: { query: searchQuery } });
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/genre/${category.toLowerCase()}`, { state: { query: category } });
  };
  

  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img className="Logo" src={Logo} alt="Logo" />
            <img className="LogoName" src={LogoName} alt="Logo Name" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/movies">
                  Movies
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                {["Action", "Adventure", "Animation", "Comedy", "Drama", "Family", "Romance", "Sci-Fi", "Horror", "History"].map(
                  (category) => (
                    <li key={category}>
                      <button
                        className="dropdown-item"
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category}
                      </button>
                    </li>
                  )
                )}
              </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/favourites">
                  Favourites
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/watchLater">
                  Watch Later
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-3 "
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e)=>setSearchQuary(e.target.value)}
                style={{ width: "350px" }}
              />
              <button className="btn search-btn" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
