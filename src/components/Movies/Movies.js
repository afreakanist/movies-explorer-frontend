import { useState, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies({
  movies,
  setMovies,
  savedMovies,
  onSearchMovie,
  areShortFilmsIncluded,
  setAreShortFilmsIncluded,
  isPending,
  setIsPending,
  onSaving,
  didSearchFail,
  areAnyResults,
  setAreAnyResults,
  onFilter,
}) {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  useEffect(() => {
    setMovies([]);
    setAreAnyResults(true);
  }, []);

  return (
    <main className="content movies">
      <div className="movies__wrapper">
        <SearchForm
          onSearchMovie={onSearchMovie}
          onFilter={onFilter}
          areShortFilmsIncluded={areShortFilmsIncluded}
          setAreShortFilmsIncluded={setAreShortFilmsIncluded}
          setIsPending={setIsPending}
          setIsFirstVisit={setIsFirstVisit}
          setAreAnyResults={setAreAnyResults}
        />
        {isPending && <Preloader />}
        <MoviesCardList
          movies={movies}
          setMovies={setMovies}
          savedMovies={savedMovies}
          areShortFilmsIncluded={areShortFilmsIncluded}
          onSaving={onSaving}
          didSearchFail={didSearchFail}
          areAnyResults={areAnyResults}
          setAreAnyResults={setAreAnyResults}
          isFirstVisit={isFirstVisit}
        />
      </div>
    </main>
  );
}

export default Movies;
