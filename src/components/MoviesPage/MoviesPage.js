import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Movies from "../Movies/Movies";

function MoviesPage({ isLoggedIn, ...props }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Movies {...props} />
      <Footer />
    </>
  );
}

export default MoviesPage;
