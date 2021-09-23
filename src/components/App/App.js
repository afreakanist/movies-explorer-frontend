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
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [areShortFilmsIncluded, setAreShortFilmsIncluded] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [didSearchFail, setDidSearchFail] = useState(false);
  const [requestStatusMessage, setRequestStatusMessage] = useState({
    isVisible: false,
    isSuccessful: false,
    message: "",
  });
  const history = useHistory();

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("jwt");
      Promise.all([mainApi.getUserInfo(token), mainApi.getMovieCards(token)])
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
          setRequestStatusMessage({
            isVisible: true,
            isSuccessful: true,
          });
          history.push("/signin");
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
      const movieList = localStorage.getItem("movieList");
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
      if (movieList) {
        setMovies(JSON.parse(movieList));
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("email");
    localStorage.removeItem("movieList");
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

  const handleMovieSearch = (movieValue, movieList, location) => {
    setDidSearchFail(false);
    if (movieList.length > 0) {
      const results = movieList.filter((movie) =>
        movie.nameRU.toLowerCase().includes(movieValue.trim().toLowerCase())
      );
      location === "/movies" ? setMovies(results) : setSavedMovies(results);
      setIsPending(false);
    } else {
      moviesApi
        .getMovies()
        .then((moviesData) => {
          setMovies([...moviesData]);
          localStorage.setItem("movieList", JSON.stringify(moviesData));
        })
        .catch((err) => {
          console.log(err);
          setDidSearchFail(true);
        })
        .finally(() => {
          setIsPending(false);
        });
    }
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
              country: movie.country,
              description: movie.description,
              director: movie.director,
              duration: movie.duration,
              nameEN: movie.nameEN,
              nameRU: movie.nameRU,
              year: movie.year,
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
          <Register
            onRegister={handleRegister}
            requestStatusMessage={requestStatusMessage}
          />
        </Route>
        <Route exact path="/signin">
          <Login
            onLogin={handleLogin}
            requestStatusMessage={requestStatusMessage}
          />
        </Route>
        <ProtectedRoute
          exact
          path="/profile"
          component={ProfilePage}
          isLoggedIn={isLoggedIn}
          onProfileUpdate={handleProfileUpdate}
          onLogout={handleLogout}
          requestStatusMessage={requestStatusMessage}
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
          areShortFilmsIncluded={areShortFilmsIncluded}
          setAreShortFilmsIncluded={setAreShortFilmsIncluded}
          isPending={isPending}
          setIsPending={setIsPending}
          didSearchFail={didSearchFail}
        />
        <ProtectedRoute
          exact
          path="/saved-movies"
          component={SavedMoviesPage}
          isLoggedIn={isLoggedIn}
          movies={movies}
          savedMovies={savedMovies}
          onSearchMovie={handleMovieSearch}
          onSaving={handleMovieSaving}
          areShortFilmsIncluded={areShortFilmsIncluded}
          setAreShortFilmsIncluded={setAreShortFilmsIncluded}
          isPending={isPending}
          setIsPending={setIsPending}
          didSearchFail={didSearchFail}
        />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
