import { Link } from "react-router-dom";
import "./UserForm.css";
import logo from "../../images/logo.svg";

function UserForm({
  title,
  children,
  btnText,
  optionText,
  optionLink,
  optionLinkText,
  onSubmit,
  isValid,
}) {
  return (
    <main className="user-form">
      <div className="user-form__wrapper">
        <Link to="/">
          <img src={logo} alt="Логотип" className="logo" />
        </Link>
        <h1 className="user-form__title">{title}</h1>
        <form className="user-form__form" onSubmit={onSubmit} noValidate>
          <div className="user-form__form-inputs">{children}</div>
          <button className="user-form__form-btn" disabled={!isValid}>
            {btnText}
          </button>
        </form>
        <p className="user-form__option">
          {optionText}{" "}
          <Link className="user-form__link" to={optionLink}>
            {optionLinkText}
          </Link>
        </p>
      </div>
    </main>
  );
}

export default UserForm;
