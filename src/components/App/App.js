import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Main from "../Main/Main";
import MoviesPage from "../MoviesPage/MoviesPage";
import NotFound from "../NotFound/NotFound";
import ProfilePage from "../ProfilePage/ProfilePage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Register from "../Register/Register";
import SavedMoviesPage from "../SavedMoviesPage/SavedMoviesPage";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";
import MainApi from "../../utils/MainApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const history = useHistory();

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("jwt");
      Promise.all([MainApi.getUserInfo(token), MainApi.getMovieCards(token)])
        .then(([userData, moviesData]) => {
          setCurrentUser(userData);
          setSavedMovies([...moviesData]);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  const handleRegister = ({ password, email, name }) => {
    auth
      .register(password, email, name)
      .then(({ _id, email, name }) => {
        if (_id && email) {
          /* setInfoTooltip({
            isOpen: true,
            isSuccessful: true,
          }); */
          history.push("/signin");
        } else {
          /* setInfoTooltip({
            isOpen: true,
            isSuccessful: false,
          }); */
        }
        return { _id, email, name };
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = ({ password, email }) => {
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("email", email);
          setIsLoggedIn(true);
          setCurrentUser((prev) => ({ ...prev, email }));
          history.push("/movies");
        }
        return data;
      })
      .catch((err) => console.log(err));
  };

  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            history.push("/movies");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("email");
  };

  const handleProfileUpdate = (userData) => {
    const token = localStorage.getItem("jwt");
    MainApi.editUserInfo(userData, token)
      .then((newUserData) => {
        setCurrentUser((prev) => ({ ...prev, ...newUserData }));
      })
      .catch((err) => console.log(`Error in profile editing: ${err}`));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <Header isLoggedIn={isLoggedIn} />
          <Main />
          <Footer />
        </Route>
        <Route exact path="/signup">
          <Register onRegister={handleRegister} />
        </Route>
        <Route exact path="/signin">
          <Login onLogin={handleLogin} />
        </Route>
        <ProtectedRoute
          exact
          path="/profile"
          component={ProfilePage}
          isLoggedIn={isLoggedIn}
          onProfileUpdate={handleProfileUpdate}
          onLogout={handleLogout}
          user={currentUser}
        />
        <ProtectedRoute
          exact
          path="/movies"
          component={MoviesPage}
          isLoggedIn={isLoggedIn}
        />
        <ProtectedRoute
          exact
          path="/saved-movies"
          component={SavedMoviesPage}
          isLoggedIn={isLoggedIn}
          savedMovies={savedMovies}
        />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
