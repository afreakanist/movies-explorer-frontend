import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SavedMovies from "../SavedMovies/SavedMovies";

function SavedMoviesPage({ isLoggedIn, ...props }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <SavedMovies {...props} />
      <Footer />
    </>
  );
}

export default SavedMoviesPage;
