import "./Footer.css";

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
              <a
                href="https://practicum.yandex.ru/"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                href="https://github.com/afreakanist"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
