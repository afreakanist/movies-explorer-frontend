import { useState, useEffect } from "react";
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
  didSearhFail,
  areAnyResults,
  setAreAnyResults,
  onFilter,
}) {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  useEffect(() => {
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
          savedMovies={savedMovies}
          areShortFilmsIncluded={areShortFilmsIncluded}
          onSaving={onSaving}
          didSearchFail={didSearhFail}
          areAnyResults={areAnyResults}
          setAreAnyResults={setAreAnyResults}
          isFirstVisit={isFirstVisit}
        />
      </div>
    </main>
  );
}

export default SavedMovies;
