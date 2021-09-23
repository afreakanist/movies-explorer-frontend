import { useState } from "react";
import { useLocation } from "react-router-dom";
import useFormValidation from "../../utils/hooks/useFormValidation";
import "./SearchForm.css";

function SearchForm({
  movies,
  savedMovies,
  onSearchMovie,
  setAreShortFilmsIncluded,
  setIsPending,
}) {
  const [errorText, setErrorText] = useState("");
  const location = useLocation().pathname;
  const { values, isValid, handleChange } = useFormValidation({
    movie: "",
  });

  const handleFilter = (e) => {
    setAreShortFilmsIncluded(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setIsPending(true);
      setErrorText("");
      const movieList = location === "/movies" ? movies : savedMovies;
      onSearchMovie(values.movie, movieList, location);
    } else {
      setErrorText("Нужно ввеcти ключевое слово");
    }
  };

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <div className="search__find-group">
          <label htmlFor="movie" className="search__label">
            <input
              id="movie"
              name="movie"
              className="search__input"
              placeholder="Фильм"
              value={values.movie}
              onChange={handleChange}
              maxLength="30"
              required
            />
          </label>
          <button className="search__btn">Найти</button>
        </div>
        <span className="search__error">{errorText}</span>
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
