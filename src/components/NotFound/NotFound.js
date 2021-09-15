import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="content not-found">
      <div className="not-found__wrapper">
        <div className="not-found__error">
          <h1 className="not-found__status">404</h1>
          <p className="not-found__message">Страница не найдена</p>
        </div>
        <Link to="/" className="not-found__link">
          Назад
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
