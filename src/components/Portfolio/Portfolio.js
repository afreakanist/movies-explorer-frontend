import { Link } from "react-router-dom";
import "./Portfolio.css";
import linkIcon from "../../images/link-icon.svg";

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__link-list">
        <li>
          <Link to="/" className="portfolio__link">
            <p className="portfolio__link-text">Статичный сайт</p>
            <img
              src={linkIcon}
              alt="Иконка со стрелочкой"
              className="portfolio__link-icon"
            />
          </Link>
        </li>
        <li>
          <Link to="/" className="portfolio__link">
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <img
              src={linkIcon}
              alt="Иконка со стрелочкой"
              className="portfolio__link-icon"
            />
          </Link>
        </li>
        <li>
          <Link to="/" className="portfolio__link">
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <img
              src={linkIcon}
              alt="Иконка со стрелочкой"
              className="portfolio__link-icon"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
