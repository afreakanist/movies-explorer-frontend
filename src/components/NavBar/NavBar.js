import "./NavBar.css";

function NavBar({ anchorRef }) {
  const handleMoreBtnClick = () => {
    anchorRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <button type="button" className="navbar" onClick={handleMoreBtnClick}>
      Узнать больше
    </button>
  );
}

export default NavBar;
