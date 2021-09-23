import useFormValidation from "../../utils/hooks/useFormValidation";
import UserForm from "../UserForm/UserForm";

function Login({ onLogin, requestStatusMessage }) {
  const { values: userData, errors, handleChange, isValid } = useFormValidation(
    {
      email: "",
      password: "",
    }
  );

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
      isValid={isValid}
    >
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
            ? "Вы успешно авторизовались"
            : "Что-то пошло не так :("}
        </span>
      )}
    </UserForm>
  );
}

export default Login;
