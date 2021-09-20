import { useState } from "react";
import UserForm from "../UserForm/UserForm";

function Register({ onRegister }) {
  const [userData, setUserData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(userData);
  };

  return (
    <UserForm
      title="Добро пожаловать!"
      btnText="Зарегистрироваться"
      optionText="Уже зарегистрированы?"
      optionLink="/signin"
      optionLinkText="Войти"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="user-form__form-label">
        Имя
        <input
          id="name"
          name="name"
          minLength="2"
          maxLength="30"
          className="user-form__form-input"
          required
          onChange={handleChange}
        ></input>
        <span className="user-form__form-error"></span>
      </label>
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

export default Register;
