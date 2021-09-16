import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Movies from "../Movies/Movies";

function MoviesPage(props) {
  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} />
      <Movies />
      <Footer />
    </>
  );
}

export default MoviesPage;
