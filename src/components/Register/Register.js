import UserForm from "../UserForm/UserForm";

function Register() {
  return (
    <UserForm
      title="Добро пожаловать!"
      btnText="Зарегистрироваться"
      optionText="Уже зарегистрированы?"
      optionLink="/signin"
      optionLinkText="Войти"
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

export default Register;
