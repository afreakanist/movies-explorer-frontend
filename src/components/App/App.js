import { Switch, Route } from "react-router-dom";
import "./App.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Header isLoggedIn={false} />
          <Main />
          <Footer />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <Route exact path="/profile">
          <Header isLoggedIn={true} />
          <Profile />
        </Route>
        <Route exact path="/movies">
          <Header isLoggedIn={true} />
          <Movies />
          <Footer />
        </Route>
        <Route exact path="/saved-movies">
          <Header isLoggedIn={true} />
          <SavedMovies />
          <Footer />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
