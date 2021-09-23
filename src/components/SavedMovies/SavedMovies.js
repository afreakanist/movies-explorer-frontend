import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

function SavedMovies({
  movies,
  savedMovies,
  onSearchMovie,
  areShortFilmsIncluded,
  setAreShortFilmsIncluded,
  isPending,
  setIsPending,
  onSaving,
}) {
  return (
    <main className="content movies">
      <div className="movies__wrapper">
        <SearchForm
          movies={movies}
          savedMovies={savedMovies}
          onSearchMovie={onSearchMovie}
          setAreShortFilmsIncluded={setAreShortFilmsIncluded}
          setIsPending={setIsPending}
        />
        {isPending && <Preloader />}
        <MoviesCardList
          movies={movies}
          savedMovies={savedMovies}
          areShortFilmsIncluded={areShortFilmsIncluded}
          onSaving={onSaving}
        />
      </div>
    </main>
  );
}

export default SavedMovies;
