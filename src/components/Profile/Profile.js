import "./Profile.css";

function Profile() {
  return (
    <main className="content profile">
      <div className="profile__wrapper">
        <h1 className="profile__title">Привет, Пользователь!</h1>
        <form className="profile__form">
          <div className="profile__form-inputs">
            <label htmlFor="name" className="profile__form-label">
              Имя
              <input
                id="name"
                name="name"
                minLength="2"
                className="profile__form-input"
                defaultValue="Пользователь"
                placeholder="Введите имя"
                required
              ></input>
            </label>
            <label htmlFor="email" className="profile__form-label">
              E-mail
              <input
                id="email"
                name="email"
                type="email"
                className="profile__form-input"
                defaultValue="example@example.ru"
                placeholder="Введите email"
                required
              ></input>
            </label>
          </div>
          <button className="profile__form-btn">Редактировать</button>
        </form>
        <button className="profile__form-btn profile__form-btn_color_red">
          Выйти из аккаунта
        </button>
      </div>
    </main>
  );
}

export default Profile;
