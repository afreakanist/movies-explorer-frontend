import { useState } from "react";
import UserForm from "../UserForm/UserForm";

function Login({ onLogin }) {
  const [userData, setUserData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(userData);
  };

  return (
    <UserForm
      title="Рады видеть!"
      btnText="Войти"
      optionText="Ещё не зарегистрированы?"
      optionLink="/signup"
      optionLinkText="Регистрация"
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="user-form__form-label">
        E-mail
        <input
          id="email"
          name="email"
          type="email"
          className="user-form__form-input"
          required
          onChange={handleChange}
        ></input>
        <span className="user-form__form-error"></span>
      </label>
      <label htmlFor="password" className="user-form__form-label">
        Пароль
        <input
          id="password"
          name="password"
          type="password"
          minLength="8"
          className="user-form__form-input"
          required
          onChange={handleChange}
        ></input>
        <span className="user-form__form-error"></span>
      </label>
    </UserForm>
  );
}

export default Login;
