import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProprietaire from "./components/AddProprietaire";
import Proprietaire from "./components/Proprietaire";
import ProprietairesList from "./components/ProprietairesList";
import AnimauxList from"./components/AnimauxList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/proprietaire" className="navbar-brand">
          GVet
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/proprietaire"} className="nav-link">
              Proprietaires
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/animaux"} className="nav-link">
              Animaux
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/proprietaire"]} component={ProprietairesList} />
          <Route exact path={["/", "/animaux"]} component={AnimauxList} />
          <Route exact path="/add" component={AddProprietaire} />
          <Route path="/proprietaire/:id" component={Proprietaire} />
        </Switch>
      </div>
    </div>
  );
}

export default App;