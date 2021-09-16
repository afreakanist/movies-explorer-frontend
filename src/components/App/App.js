import { useState } from "react";
import { Switch, Route } from "react-router-dom";
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Switch>
      <Route exact path="/">
        <Header isLoggedIn={isLoggedIn} />
        <Main />
        <Footer />
      </Route>
      <Route exact path="/signup">
        <Register />
      </Route>
      <Route exact path="/signin">
        <Login />
      </Route>
      <ProtectedRoute
        exact
        path="/profile"
        component={ProfilePage}
        isLoggedIn={isLoggedIn}
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
      />
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
