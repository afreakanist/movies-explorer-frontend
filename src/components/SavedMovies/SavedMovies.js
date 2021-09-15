import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

function SavedMovies() {
  return (
    <main className="content movies">
      <div className="movies__wrapper">
        <SearchForm />
        <MoviesCardList />
      </div>
    </main>
  );
}

export default SavedMovies;
