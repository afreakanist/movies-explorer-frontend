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
}) {
  const location = useLocation().pathname;
  const movieList = areShortFilmsIncluded
    ? movies
    : movies.filter((movie) => {
        return movie.duration > 40;
      });

  const savedMovieList = areShortFilmsIncluded
    ? savedMovies
    : savedMovies.filter((movie) => {
        return movie.duration > 40;
      });

  const [currentMoviesChunk, setCurrentMovieChunk] = useState([]);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    if (location === "/movies") {
      const nextMoviesChunk = movieList.slice(0, defineChunkSize().perPage);
      setCurrentMovieChunk(nextMoviesChunk);
    } else {
      const nextMoviesChunk = savedMovieList.slice(
        0,
        defineChunkSize().perPage
      );
      setCurrentMovieChunk(nextMoviesChunk);
    }
  }, [windowSize]);

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
          movieList.length > 0 &&
          movieList.reduce((chunk, movie) => {
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
          savedMovieList.length > 0 &&
          savedMovieList.reduce((chunk, movie) => {
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
        {(movieList.length === 0 || savedMovieList.length === 0) && (
          <p className="movies-list__message">Ничего не найдено</p>
        )}
        {didSearchFail && (
          <p className="movies-list__message">
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз
          </p>
        )}
      </div>
      {location === "/movies" &&
        movieList.length &&
        movieList.length > currentMoviesChunk.length && (
          <button className="movies-list__btn" onClick={handleMoreBtnClick}>
            Ещё
          </button>
        )}
      {location === "/saved-movies" &&
        savedMovieList.length &&
        savedMovieList.length > currentMoviesChunk.length && (
          <button className="movies-list__btn" onClick={handleMoreBtnClick}>
            Ещё
          </button>
        )}
    </div>
  );
}

export default MoviesCardList;
