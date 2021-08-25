import "./AboutMe.css";
import photo from "../../images/photo.jpg";
import { Link } from "react-router-dom";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  const calculateMyAge = () => {
    const today = new Date();
    const bd = new Date("May 4, 1995");
    let age = today.getFullYear() - bd.getFullYear();
    const m = today.getMonth() - bd.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bd.getDate())) {
      age -= 1;
    }
    return age;
  };

  return (
    <section className="student">
      <div className="student__wrapper">
        <h2 className="student__title">Студент</h2>
        <div className="student__content">
          <div className="student__bio">
            <p className="student__name">Аня</p>
            <p className="student__subtitle">
              {`Фронтенд-разработчик, ${calculateMyAge()}`}
            </p>
            <p className="student__description">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <ul className="student__link-list">
              <li>
                <Link to="/" className="student__link">
                  Facebook
                </Link>
              </li>
              <li>
                <Link to="/" className="student__link">
                  Github
                </Link>
              </li>
            </ul>
          </div>
          <img
            src={photo}
            alt="Фотография студента"
            className="student__photo"
          />
        </div>
        <Portfolio />
      </div>
    </section>
  );
}

export default AboutMe;
