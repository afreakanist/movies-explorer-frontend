import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <p className="footer__caption">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__content">
          <p className="footer__copyright">© 2021</p>
          <ul className="footer__link-list">
            <li>
              <Link className="footer__link">Яндекс.Практикум</Link>
            </li>
            <li>
              <Link className="footer__link">Github</Link>
            </li>
            <li>
              <Link className="footer__link">Facebook</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
