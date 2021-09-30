import { useEffect } from "react";
import useFormValidation from "../../utils/hooks/useFormValidation";
import UserForm from "../UserForm/UserForm";

function Register({
  onRegister,
  requestStatusMessage,
  setRequestStatusMessage,
}) {
  const { values: userData, errors, handleChange, isValid } = useFormValidation(
    {
      name: "",
      email: "",
      password: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(userData);
  };

  useEffect(() => {
    setRequestStatusMessage({
      isVisible: false,
    });
  }, []);

  return (
    <UserForm
      title="Добро пожаловать!"
      btnText="Зарегистрироваться"
      optionText="Уже зарегистрированы?"
      optionLink="/signin"
      optionLinkText="Войти"
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label htmlFor="name" className="user-form__form-label">
        Имя
        <input
          id="name"
          name="name"
          minLength="2"
          maxLength="30"
          autoComplete="false"
          className="user-form__form-input"
          required
          value={userData.name}
          onChange={handleChange}
        ></input>
        {errors.name && (
          <span className="user-form__form-error">{errors.name}</span>
        )}
      </label>
      <label htmlFor="email" className="user-form__form-label">
        E-mail
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="false"
          className="user-form__form-input"
          required
          value={userData.email}
          onChange={handleChange}
        ></input>
        {errors.email && (
          <span className="user-form__form-error">{errors.email}</span>
        )}
      </label>
      <label htmlFor="password" className="user-form__form-label">
        Пароль
        <input
          id="password"
          name="password"
          type="password"
          minLength="8"
          autoComplete="false"
          className="user-form__form-input"
          required
          value={userData.password}
          onChange={handleChange}
        ></input>
        {errors.password && (
          <span className="user-form__form-error">{errors.password}</span>
        )}
      </label>
      {requestStatusMessage.isVisible && (
        <span className="user-form__message">
          {requestStatusMessage.isSuccessful
            ? "Вы успешно зарегистрировались"
            : "Что-то пошло не так :("}
        </span>
      )}
    </UserForm>
  );
}

export default Register;
