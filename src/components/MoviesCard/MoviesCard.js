import { useState } from "react";
import "./MoviesCard.css";

function MoviesCard({ movie, onSaving, location }) {
  const modifier =
    location === "/movies" ? "card__btn_saved" : "card__btn_delete";

  const renderDuration = (dur) => {
    const hours = Math.floor(dur / 60);
    const minutes = dur % 60;
    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  };

  const [isSaved, setIsSaved] = useState(
    location === "/movies"
      ? JSON.parse(localStorage.getItem("savedMovieList")).some(
          (m) => m.movieId === String(movie.id)
        )
      : true
  );

  const handleSaving = () => {
    setIsSaved(!isSaved);
    onSaving(movie, isSaved, location);
  };

  const trailerURL = location === "/movies" ? movie.trailerLink : movie.trailer;

  return (
    <div className="card">
      <div className="card__poster">
        <a
          href={`${
            trailerURL && trailerURL.startsWith("http")
              ? trailerURL
              : "https://www.youtube.com"
          }`}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={
              location === "/movies"
                ? `https://api.nomoreparties.co${movie.image.url}`
                : movie.image
            }
            alt={movie.nameRU || movie.nameEN}
            className="card__image"
          />
        </a>
        <button
          className={`card__btn ${isSaved ? modifier : ""}`}
          onClick={handleSaving}
        >
          {location === "/movies" && !isSaved ? "Сохранить" : ""}
        </button>
      </div>
      <div className="card__info">
        <p className="card__title">{movie.nameRU || movie.nameEN}</p>
        <p className="card__duration">{renderDuration(movie.duration)}</p>
      </div>
    </div>
  );
}

export default MoviesCard;
