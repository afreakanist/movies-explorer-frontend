import "./MoviesCard.css";

function MoviesCard({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailer,
  nameRU,
  nameEN,
  thumbnail,
  movieId,
  owner,
  location,
  isModified,
}) {
  const modifier =
    location === "/movies" ? "card__btn_saved" : "card__btn_delete";

  return (
    <div className="card">
      <div className="card__poster">
        <img src={image} alt={nameRU || nameEN} className="card__image" />
        <button
          className={`card__btn ${isModified ? modifier : ""} ${
            location === "/saved-movies" ? "card__btn_delete" : ""
          }`}
        >
          {location === "/movies" && !isModified ? "Сохранить" : ""}
        </button>
      </div>
      <div className="card__info">
        <p className="card__title">{nameRU || nameEN}</p>
        <p className="card__duration">{duration}</p>
      </div>
    </div>
  );
}

export default MoviesCard;
