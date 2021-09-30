import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({
  movies,
  savedMovies,
  onSaving,
  didSearchFail,
  areAnyResults,
  isFirstVisit,
}) {
  const location = useLocation().pathname;

  const [chunkSize, setChunkSize] = useState(0);
  const windowWidth = document.documentElement.clientWidth;

  useEffect(() => {
    renderCardList();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderCardList = () => {
    switch (true) {
      case windowWidth >= 1280:
        setChunkSize(12);
        break;
      case windowWidth >= 768 && windowWidth < 1280:
        setChunkSize(8);
        break;
      case windowWidth >= 320 && windowWidth < 768:
        setChunkSize(5);
        break;
      default:
        setChunkSize(12);
        break;
    }
  };

  const handleResize = (evt) => {
    if (evt.target.innerWidth === 600) {
      setChunkSize(5);
    } else if (evt.target.innerWidth === 601) {
      setChunkSize(7);
    }
  };

  const handleMoreBtnClick = () => {
    if (chunkSize % 3 === 0) {
      setChunkSize(chunkSize + 3);
    } else {
      setChunkSize(chunkSize + 2);
    }
  };

  return (
    <div className="movies-list">
      <div className="movies-list__grid">
        {location === "/movies" &&
          movies.length > 0 &&
          movies.slice(0, chunkSize).map((movie) => {
            return (
              <MoviesCard
                key={movie.id}
                movie={movie}
                location={location}
                onSaving={onSaving}
              />
            );
          })}
        {location === "/saved-movies" &&
          savedMovies.length > 0 &&
          savedMovies
            .slice(0, chunkSize)
            .map((movie) => (
              <MoviesCard
                key={movie._id}
                movie={movie}
                location={location}
                onSaving={onSaving}
              />
            ))}
        {!areAnyResults &&
          location === "/movies" &&
          !isFirstVisit &&
          movies.length === 0 && (
            <p className="movies-list__message">Ничего не найдено</p>
          )}
        {!areAnyResults &&
          location === "/saved-movies" &&
          savedMovies.length === 0 && (
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
        movies.length &&
        movies.length > chunkSize && (
          <button className="movies-list__btn" onClick={handleMoreBtnClick}>
            Ещё
          </button>
        )) ||
        null}
      {(location === "/saved-movies" &&
        savedMovies.length &&
        savedMovies.length > chunkSize && (
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
