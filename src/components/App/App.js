import { Switch, Route } from "react-router-dom";
import "./App.css";
//import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="page">
      <Header isLoggedIn={false} />
      <main className="content">
        <Switch>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
