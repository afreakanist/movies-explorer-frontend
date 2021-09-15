import "./SearchForm.css";

function SearchForm() {
  return (
    <div className="search">
      <form className="search__form">
        <div className="search__find-group">
          <label htmlFor="movie" className="search__label">
            <input
              id="movie"
              name="movie"
              className="search__input"
              placeholder="Фильм"
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
