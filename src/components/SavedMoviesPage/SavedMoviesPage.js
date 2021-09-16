import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SavedMovies from "../SavedMovies/SavedMovies";

function SavedMoviesPage(props) {
  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} />
      <SavedMovies />
      <Footer />
    </>
  );
}

export default SavedMoviesPage;
