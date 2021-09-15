import { useRef } from "react";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";

function Main() {
  const anchorRef = useRef();

  return (
    <>
      <main className="content">
        <Promo anchorRef={anchorRef} />
        <AboutProject anchorRef={anchorRef} />
        <Techs />
        <AboutMe />
      </main>
    </>
  );
}

export default Main;
