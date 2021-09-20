import { useState, useEffect } from "react";
import "./Profile.css";

function Profile({ onProfileUpdate, onLogout, user }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData((prev) => ({ ...prev, ...user }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onProfileUpdate(userData);
  };

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
                defaultValue={user.name}
                placeholder="Введите имя"
                required
                onChange={handleChange}
              ></input>
            </label>
            <label htmlFor="email" className="profile__form-label">
              E-mail
              <input
                id="email"
                name="email"
                type="email"
                className="profile__form-input"
                defaultValue={user.email}
                placeholder="Введите email"
                required
                onChange={handleChange}
              ></input>
            </label>
          </div>
          <button className="profile__form-btn">Редактировать</button>
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
