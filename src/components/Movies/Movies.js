import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies() {
  return (
    <main className="content movies">
      <div className="movies__wrapper">
        <SearchForm />
        <MoviesCardList />
      </div>
    </main>
  );
}

export default Movies;
