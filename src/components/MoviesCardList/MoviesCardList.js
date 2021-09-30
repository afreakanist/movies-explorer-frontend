import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({
  movies,
  savedMovies,
  areShortFilmsIncluded,
  onSaving,
  didSearchFail,
  areAnyResults,
  isFirstVisit,
}) {
  const location = useLocation().pathname;

  const moviesToRender = areShortFilmsIncluded
    ? movies
    : movies.filter((movie) => movie.duration > 40);

  const savedMoviesToRender = areShortFilmsIncluded
    ? savedMovies
    : savedMovies.filter((movie) => movie.duration > 40);

  const [currentMoviesChunk, setCurrentMovieChunk] = useState([]);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    if (location === "/movies") {
      const nextMoviesChunk = moviesToRender.slice(
        0,
        defineChunkSize().perPage
      );
      setCurrentMovieChunk(nextMoviesChunk);
    } else {
      const nextMoviesChunk = savedMoviesToRender.slice(
        0,
        defineChunkSize().perPage
      );
      setCurrentMovieChunk(nextMoviesChunk);
    }
  }, [windowSize, movies, savedMovies, areShortFilmsIncluded]);

  function debounce(fn, ms) {
    let timer;
    return (_) => {
      clearTimeout(timer);
      timer = setTimeout((_) => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }

  useEffect(() => {
    const handleResize = debounce(function handleResize() {
      setWindowSize(window.innerWidth);
    }, 1000);
    window.addEventListener("resize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function defineChunkSize() {
    switch (true) {
      case windowSize >= 1280:
        return { perPage: 12, add: 3 };
      case windowSize >= 768 && windowSize < 1280:
        return { perPage: 8, add: 2 };
      case windowSize >= 320 && windowSize < 768:
        return { perPage: 5, add: 2 };
      default:
        return { perPage: 12, add: 3 };
    }
  }

  const handleMoreBtnClick = () => {
    setCurrentMovieChunk(
      movies.slice(0, (currentMoviesChunk.length += defineChunkSize().add))
    );
  };

  return (
    <div className="movies-list">
      <div className="movies-list__grid">
        {location === "/movies" &&
          moviesToRender.length > 0 &&
          moviesToRender.reduce((chunk, movie) => {
            if (chunk.length < currentMoviesChunk.length) {
              const isSaved = savedMovies.some(
                (m) => m.movieId === String(movie.id)
              );
              chunk.push(
                <MoviesCard
                  key={movie.id}
                  movie={movie}
                  isSaved={isSaved}
                  location={location}
                  onSaving={onSaving}
                />
              );
            }
            return chunk;
          }, [])}
        {location === "/saved-movies" &&
          savedMoviesToRender.length > 0 &&
          savedMoviesToRender.reduce((chunk, movie) => {
            if (chunk.length < currentMoviesChunk.length) {
              chunk.push(
                <MoviesCard
                  key={movie.movieId}
                  movie={movie}
                  isSaved={true}
                  location={location}
                  onSaving={onSaving}
                />
              );
            }
            return chunk;
          }, [])}
        {!areAnyResults &&
          location === "/movies" &&
          !isFirstVisit &&
          moviesToRender.length === 0 && (
            <p className="movies-list__message">Ничего не найдено</p>
          )}
        {!areAnyResults &&
          location === "/saved-movies" &&
          savedMoviesToRender.length === 0 && (
            <p className="movies-list__message">Ничего не найдено</p>
          )}
        {location === "/movies" && didSearchFail && (
          <p className="movies-list__message">
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз
          </p>
        )}
      </div>
      {(location === "/movies" &&
        moviesToRender.length &&
        moviesToRender.length > currentMoviesChunk.length && (
          <button className="movies-list__btn" onClick={handleMoreBtnClick}>
            Ещё
          </button>
        )) ||
        null}
      {(location === "/saved-movies" &&
        savedMoviesToRender.length &&
        savedMoviesToRender.length > currentMoviesChunk.length && (
          <button className="movies-list__btn" onClick={handleMoreBtnClick}>
            Ещё
          </button>
        )) ||
        null}
      {(location === "/saved-movies" &&
        JSON.parse(localStorage.getItem("savedMovieList")).length === 0 &&
        savedMovies.length === 0 && (
          <p className="movies-list__message">Вы ещё не сохраняли фильмы</p>
        )) ||
        null}
    </div>
  );
}

export default MoviesCardList;
