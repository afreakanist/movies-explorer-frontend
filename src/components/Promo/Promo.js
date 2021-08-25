import "./Promo.css";
import landingImg from "../../images/landing-logo.svg";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__wrapper">
        <div className="promo__banner">
          <div className="promo__title-group">
            <h1 className="promo__title">
              Учебный проект студента факультета Веб-разработки.
            </h1>
            <p className="promo__subtitle">
              Листайте ниже, чтобы узнать больше про этот проект и его
              создателя.
            </p>
          </div>
          <img
            src={landingImg}
            alt="Схематическое изображение глобуса, где вместо мировых океанов много-много слов 'WEB'"
            className="promo__img"
          ></img>
        </div>
        <button className="promo__btn">Узнать больше</button>
      </div>
    </section>
  );
}

export default Promo;
