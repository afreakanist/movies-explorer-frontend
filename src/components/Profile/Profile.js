import { useEffect } from "react";
import useFormValidation from "../../utils/hooks/useFormValidation";
import "./Profile.css";

function Profile({
  onProfileUpdate,
  requestStatusMessage,
  setRequestStatusMessage,
  onLogout,
  user,
}) {
  const { values: userData, errors, handleChange, isValid } = useFormValidation(
    {
      name: user.name,
      email: user.email,
    }
  );

  const isSameUserData =
    user.name === userData.name && user.email === userData.email;

  const handleSubmit = (e) => {
    e.preventDefault();
    onProfileUpdate(userData);
  };

  useEffect(() => {
    setRequestStatusMessage({
      isVisible: false,
    });
  }, [userData]);

  return (
    <main className="content profile">
      <div className="profile__wrapper">
        <h1 className="profile__title">Привет, {user.name}!</h1>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__form-inputs">
            <label htmlFor="name" className="profile__form-label">
              Имя
              <input
                id="name"
                name="name"
                minLength="2"
                className="profile__form-input"
                value={userData.name}
                placeholder={user.name}
                autoComplete="false"
                required
                onChange={handleChange}
              ></input>
              {errors.name && (
                <span className="profile__form-error">{errors.name}</span>
              )}
            </label>
            <label htmlFor="email" className="profile__form-label">
              E-mail
              <input
                id="email"
                name="email"
                type="email"
                className="profile__form-input"
                value={userData.email}
                placeholder={user.email}
                autoComplete="false"
                required
                onChange={handleChange}
                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
              ></input>
              {errors.email && (
                <span className="profile__form-error">{errors.email}</span>
              )}
            </label>
            {requestStatusMessage.isVisible && (
              <span className="profile__message">
                {requestStatusMessage.isSuccessful
                  ? "Ваши данные сохранены"
                  : "Что-то пошло не так :("}
              </span>
            )}
          </div>
          <button
            className="profile__form-btn"
            disabled={!isValid || isSameUserData}
          >
            Редактировать
          </button>
        </form>
        <button
          className="profile__form-btn profile__form-btn_color_red"
          onClick={onLogout}
        >
          Выйти из аккаунта
        </button>
      </div>
    </main>
  );
}

export default Profile;
