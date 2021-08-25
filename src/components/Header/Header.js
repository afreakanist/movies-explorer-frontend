import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useMediaQuery from "../../utils/hooks/useMediaQuery";
import "./Header.css";
import logo from "../../images/logo.svg";
import profileIcon from "../../images/profile-icon.svg";

function Header({ isLoggedIn }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const location = useLocation();
  const isAllMovies = location.pathname === "/movies";
  const isSavedMovies = location.pathname === "/saved-movies";
  /* const isRegisterPage = location.pathname === "/signup";
  const isLoginPage = location.pathname === "/signin"; */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={`header ${!isLoggedIn ? "header_dark" : ""}`}>
      <div className="header__wrapper">
        <Link to="/">
          <img
            src={logo}
            alt="Логотип"
            className={`logo ${!isLoggedIn ? "logo_shadowed" : ""}`}
          />
        </Link>
        {isLoggedIn ? (
          <>
            {isDesktop ? (
              <nav>
                <ul className="header__link-list">
                  <li>
                    <Link
                      to="/movies"
                      className={`header__link ${
                        isAllMovies ? "header__link_active" : ""
                      }`}
                    >
                      Фильмы
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/saved-movies"
                      className={`header__link ${
                        isSavedMovies ? "header__link_active" : ""
                      }`}
                    >
                      Сохранённые фильмы
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className="header__profile-link">
                      <img
                        src={profileIcon}
                        alt="Иконка с человечком :)"
                        className="header__profile-icon"
                      />
                      <p className="header__link">Аккаунт</p>
                    </Link>
                  </li>
                </ul>
              </nav>
            ) : (
              <nav>
                <button
                  className="header__burger-btn"
                  onClick={handleBurgerClick}
                ></button>
                {isMenuOpen && (
                  <div className="header__overlay">
                    <div className="header__dropdown">
                      <button
                        className="header__burger-btn header__burger-btn_open"
                        onClick={handleBurgerClick}
                      ></button>
                      <ul className="header__dropdown-list">
                        <li>
                          <ul className="header__link-list header__link-list_dropdown">
                            <li>
                              <Link
                                to="/movies"
                                className={`header__link ${
                                  isAllMovies ? "header__link_active" : ""
                                }`}
                              >
                                Фильмы
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/saved-movies"
                                className={`header__link ${
                                  isSavedMovies ? "header__link_active" : ""
                                }`}
                              >
                                Сохранённые фильмы
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link to="/profile" className="header__profile-link">
                            <img
                              src={profileIcon}
                              alt="Иконка с человечком :)"
                              className="header__profile-icon"
                            />
                            <p className="header__link">Аккаунт</p>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </nav>
            )}
          </>
        ) : (
          <nav>
            <ul className="header__link-list">
              <li>
                <Link
                  to="/signup"
                  className="header__link header__link_landing"
                >
                  Регистрация
                </Link>
              </li>
              <li>
                <Link
                  to="/signin"
                  className="header__link header__link_landing header__link_landing_active"
                >
                  Войти
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
