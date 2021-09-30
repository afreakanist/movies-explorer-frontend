import { useState, useEffect } from "react";
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
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
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [movieSeacrhKeyword, setMovieSearchKeyword] = useState("");
  const [savedMovieSeacrhKeyword, setSavedMovieSearchKeyword] = useState("");
  const [areAnyResults, setAreAnyResults] = useState(true);
  const [areShortFilmsIncluded, setAreShortFilmsIncluded] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [didSearchFail, setDidSearchFail] = useState(false);
  const [requestStatusMessage, setRequestStatusMessage] = useState({
    isVisible: false,
    isSuccessful: false,
  });
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("jwt");
      Promise.all([mainApi.getUserInfo(token), mainApi.getMovieCards(token)])
        .then(([userData, moviesData]) => {
          setCurrentUser(userData);
          const mySavedMovies = moviesData.filter((movie) => {
            return movie.owner === userData._id;
          });
          setSavedMovies(mySavedMovies);
          localStorage.setItem("savedMovieList", JSON.stringify(mySavedMovies));
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setRequestStatusMessage({
      isVisible: false,
    });
  }, [isLoggedIn]);

  const handleRegister = ({ password, email, name }) => {
    auth
      .register(password, email, name)
      .then(({ _id, email, name }) => {
        if (_id && email) {
          handleLogin({ password, email });
        } else {
          setRequestStatusMessage({
            isVisible: true,
            isSuccessful: false,
          });
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
          setRequestStatusMessage({
            isVisible: true,
            isSuccessful: true,
          });
          history.push("/movies");
        }
        return data;
      })
      .catch((err) => {
        setRequestStatusMessage({
          isVisible: true,
          isSuccessful: false,
        });
        console.log(err);
      });
  };

  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            history.push(location.pathname);
          } else {
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    setMovies([]);
    setSavedMovies([]);
    setCurrentUser({});
    history.push("/");
  };

  const handleProfileUpdate = (userData) => {
    const token = localStorage.getItem("jwt");
    mainApi
      .editUserInfo(userData, token)
      .then((newUserData) => {
        setCurrentUser((prev) => ({ ...prev, ...newUserData }));
        setRequestStatusMessage({
          isVisible: true,
          isSuccessful: true,
        });
      })
      .catch((err) => {
        setRequestStatusMessage({
          isVisible: true,
          isSuccessful: true,
        });
        console.log(`Error in profile editing: ${err}`);
      });
  };

  const filterByDuration = (list, shortIncluded) => {
    let results = [];
    if (list) {
      results = shortIncluded
        ? list
        : list.filter((movie) => movie.duration > 40);
    }
    setAreAnyResults(results.length !== 0);
    return results;
  };

  const filterByKeyword = (list, value) => {
    let results = [];
    if (list) {
      results = list.filter((movie) =>
        movie.nameRU.toLowerCase().includes(value.trim().toLowerCase())
      );
    }
    setAreAnyResults(results.length !== 0);
    return results;
  };

  const search = (list, value, shortIncluded) => {
    return filterByKeyword(filterByDuration(list, shortIncluded), value);
  };

  const handleFilter = (shortIncluded) => {
    if (movieSeacrhKeyword && location.pathname === "/movies") {
      const list = JSON.parse(localStorage.getItem("movieList"));
      const results = search(list, movieSeacrhKeyword, shortIncluded);
      setMovies(results);
    } else if (location.pathname === "/saved-movies") {
      const list = JSON.parse(localStorage.getItem("savedMovieList"));
      const results = search(list, savedMovieSeacrhKeyword, shortIncluded);
      setSavedMovies(results);
    }
  };

  const handleMovieSearch = async (movieValue) => {
    setDidSearchFail(false);
    setMovieSearchKeyword(movieValue);

    try {
      const movieList = JSON.parse(localStorage.getItem("movieList"));
      let results = [];
      if (!movieList) {
        const moviesData = await moviesApi.getMovies();
        localStorage.setItem("movieList", JSON.stringify(moviesData));
        results = filterByKeyword(
          filterByDuration(moviesData, areShortFilmsIncluded),
          movieValue
        );
      } else {
        results = filterByKeyword(
          filterByDuration(movieList, areShortFilmsIncluded),
          movieValue
        );
      }
      setMovies(results);
    } catch (err) {
      console.log(err);
      setDidSearchFail(true);
    } finally {
      setIsPending(false);
    }
  };

  const handleSavedMovieSearch = (movieValue) => {
    setSavedMovieSearchKeyword(movieValue);
    let results = [];
    const movieList = JSON.parse(localStorage.getItem("savedMovieList"));
    if (!movieList) {
      setAreAnyResults(false);
    } else {
      results = filterByKeyword(
        filterByDuration(savedMovies, areShortFilmsIncluded),
        movieValue
      );
      setAreAnyResults(results.length !== 0);
    }
    setSavedMovies(results);
    setIsPending(false);
  };

  const handleMovieSaving = (movie, isSaved, location) => {
    const token = localStorage.getItem("jwt");
    const findMovieToDelete = () => {
      if (isSaved) {
        if (location === "/movies") {
          return savedMovies.find((m) => m.movieId === String(movie.id));
        } else {
          return savedMovies.find((m) => m.movieId === movie.movieId);
        }
      }
      return null;
    };
    const movieToDelete = findMovieToDelete();

    isSaved
      ? mainApi
          .deleteMovieCard(movieToDelete._id, token)
          .then(() => {
            setSavedMovies((prev) =>
              prev.filter((m) => m._id !== movieToDelete._id)
            );
          })
          .catch((err) => console.log(err))
      : mainApi
          .postMovieCard(
            {
              country: movie.country ?? "Страна не указана",
              description: movie.description ?? "Описание не предоставлено",
              director: movie.director ?? "Режиссёр не указан",
              duration: movie.duration ?? 0,
              nameEN: movie.nameEN ?? "No name provided",
              nameRU: movie.nameRU ?? "Имя не указано",
              year: movie.year ?? "Год не указан",
              image: `https://api.nomoreparties.co${movie.image.url}`,
              trailer: movie.trailerLink.startsWith("http")
                ? movie.trailerLink
                : "https://www.youtube.com",
              thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
              movieId: String(movie.id),
            },
            token
          )
          .then((savedMovie) => {
            setSavedMovies((prev) => [...prev, savedMovie]);
          })
          .catch((err) => console.log(err));
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
          {!isLoggedIn ? (
            <Register
              onRegister={handleRegister}
              requestStatusMessage={requestStatusMessage}
              setRequestStatusMessage={setRequestStatusMessage}
            />
          ) : (
            <Redirect to="/movies" />
          )}
        </Route>
        <Route exact path="/signin">
          {!isLoggedIn ? (
            <Login
              onLogin={handleLogin}
              requestStatusMessage={requestStatusMessage}
              setRequestStatusMessage={setRequestStatusMessage}
            />
          ) : (
            <Redirect to="/movies" />
          )}
        </Route>
        <ProtectedRoute
          exact
          path="/profile"
          component={ProfilePage}
          isLoggedIn={isLoggedIn}
          onProfileUpdate={handleProfileUpdate}
          onLogout={handleLogout}
          requestStatusMessage={requestStatusMessage}
          setRequestStatusMessage={setRequestStatusMessage}
          user={currentUser}
        />
        <ProtectedRoute
          exact
          path="/movies"
          component={MoviesPage}
          isLoggedIn={isLoggedIn}
          movies={movies}
          savedMovies={savedMovies}
          onSearchMovie={handleMovieSearch}
          onSaving={handleMovieSaving}
          onFilter={handleFilter}
          areShortFilmsIncluded={areShortFilmsIncluded}
          setAreShortFilmsIncluded={setAreShortFilmsIncluded}
          isPending={isPending}
          setIsPending={setIsPending}
          didSearchFail={didSearchFail}
          areAnyResults={areAnyResults}
          setAreAnyResults={setAreAnyResults}
        />
        <ProtectedRoute
          exact
          path="/saved-movies"
          component={SavedMoviesPage}
          isLoggedIn={isLoggedIn}
          movies={movies}
          savedMovies={savedMovies}
          onSearchMovie={handleSavedMovieSearch}
          onSaving={handleMovieSaving}
          onFilter={handleFilter}
          areShortFilmsIncluded={areShortFilmsIncluded}
          setAreShortFilmsIncluded={setAreShortFilmsIncluded}
          isPending={isPending}
          setIsPending={setIsPending}
          didSearchFail={didSearchFail}
          areAnyResults={areAnyResults}
          setAreAnyResults={setAreAnyResults}
        />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
