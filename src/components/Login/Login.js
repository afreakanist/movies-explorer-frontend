import UserForm from "../UserForm/UserForm";

function Login() {
  return (
    <UserForm
      title="Рады видеть!"
      btnText="Войти"
      optionText="Ещё не зарегистрированы?"
      optionLink="/signup"
      optionLinkText="Регистрация"
    >
      <label htmlFor="email" className="user-form__form-label">
        E-mail
        <input
          id="email"
          name="email"
          type="email"
          className="user-form__form-input"
          required
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
        ></input>
        <span className="user-form__form-error"></span>
      </label>
    </UserForm>
  );
}

export default Login;
