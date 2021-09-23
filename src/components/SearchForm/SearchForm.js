import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";

function SearchForm({
  movies,
  savedMovies,
  onSearchMovie,
  setAreShortFilmsIncluded,
  setIsPending,
}) {
  const [movieValue, setMovieValue] = useState("");
  const location = useLocation().pathname;

  const handleMovieValueChange = (e) => {
    setMovieValue(e.target.value);
  };

  const handleFilter = (e) => {
    setAreShortFilmsIncluded(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    const movieList = location === "/movies" ? movies : savedMovies;
    onSearchMovie(movieValue, movieList, location);
  };

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <div className="search__find-group">
          <label htmlFor="movie" className="search__label">
            <input
              id="movie"
              name="movie"
              className="search__input"
              placeholder="Фильм"
              value={movieValue}
              onChange={handleMovieValueChange}
              required
            />
          </label>
          <button className="search__btn">Найти</button>
        </div>
        <div className="search__filter-container">
          <label htmlFor="short" className="search__filter-switch">
            <input
              id="short"
              type="checkbox"
              name="short"
              className="search__filter-input"
              defaultChecked
              onChange={handleFilter}
            />
            <span className="search__filter-slider"></span>
          </label>
          <span className="search__filter-caption">Короткометражки</span>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
