import { Link } from "react-router-dom";
import "./Portfolio.css";
import linkIcon from "../../images/link-icon.svg";

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__link-list">
        <li>
          <a
            href="https://github.com/afreakanist/how-to-learn"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link"
          >
            <p className="portfolio__link-text">Статичный сайт</p>
            <img
              src={linkIcon}
              alt="Иконка со стрелочкой"
              className="portfolio__link-icon"
            />
          </a>
        </li>
        <li>
          <a
            href="https://afreakanist.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link"
          >
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <img
              src={linkIcon}
              alt="Иконка со стрелочкой"
              className="portfolio__link-icon"
            />
          </a>
        </li>
        <li>
          <a
            href="https://mestoshmesto.nomoredomains.monster/"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link"
          >
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <img
              src={linkIcon}
              alt="Иконка со стрелочкой"
              className="portfolio__link-icon"
            />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
