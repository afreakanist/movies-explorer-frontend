import { useState } from "react";
import useFormValidation from "../../utils/hooks/useFormValidation";
import "./SearchForm.css";

function SearchForm({
  onSearchMovie,
  areShortFilmsIncluded,
  setAreShortFilmsIncluded,
  setIsPending,
  setIsFirstVisit,
  setAreAnyResults,
  onFilter,
}) {
  const [errorText, setErrorText] = useState("");
  const { values, isValid, handleChange } = useFormValidation({
    movie: "",
  });

  const handleFilter = (e) => {
    setAreShortFilmsIncluded(!areShortFilmsIncluded);
    onFilter(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setIsPending(true);
      setAreAnyResults(true);
      setErrorText("");
      onSearchMovie(values.movie);
    } else {
      setErrorText("Нужно ввеcти ключевое слово");
    }
    setIsFirstVisit(false);
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
              checked={areShortFilmsIncluded}
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
