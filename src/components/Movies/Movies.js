import { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies({
  movies,
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

  return (
    <main className="content movies">
      <div className="movies__wrapper">
        <SearchForm
          onSearchMovie={onSearchMovie}
          onFilter={onFilter}
          setAreShortFilmsIncluded={setAreShortFilmsIncluded}
          setIsPending={setIsPending}
          setIsFirstVisit={setIsFirstVisit}
          setAreAnyResults={setAreAnyResults}
        />
        {isPending && <Preloader />}
        <MoviesCardList
          movies={movies}
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
