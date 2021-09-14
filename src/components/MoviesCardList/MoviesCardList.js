import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

import { cardsData } from "../../utils/dummies/cardsData";
const savedCards = cardsData.filter((item, idx) => idx % 2 !== 0);

function MoviesCardList() {
  const location = useLocation().pathname;

  return (
    <div className="movies-list">
      <div className="movies-list__grid">
        {location === "/movies"
          ? cardsData.map((card, idx) => {
              return (
                <MoviesCard
                  key={card._id}
                  {...card}
                  location={location}
                  isModified={idx % 2 !== 0}
                />
              );
            })
          : savedCards.map((card) => {
              return (
                <MoviesCard key={card._id} {...card} location={location} />
              );
            })}
      </div>
      <button className="movies-list__btn">Ещё</button>
    </div>
  );
}

export default MoviesCardList;
