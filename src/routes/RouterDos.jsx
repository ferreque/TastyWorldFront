import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TastyNavbar } from "../components/common/navbar/TastyNavbar";
import "bootstrap/dist/css/bootstrap.css";
import Inicio from "../pages/Inicio";
import Login from "../pages/Login";
import Cocina from "../pages/Cocina";
import Barra from "../pages/Barra";
import Entregas from "../pages/Entregas";
import ComidasMundo from "../pages/ComidasMundo";
import BebidasMundo from "../pages/BebidasMundo";
import Carrito from "../pages/Carrito";
import Administracion from "../components/Administracion";
import Mozo from "../pages/Mozo";

const RouterDos = () => {
  return (
    <Router>
      <TastyNavbar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Inicio} />
        <Route exact path="/ComidasMundo" component={ComidasMundo} />
        <Route
          exact
          path="/ComidasMundo/:continente"
          component={ComidasMundo}
        />
        <Route exact path="/BebidasMundo" component={BebidasMundo} />
        <Route
          exact
          path="/BebidasMundo/:continenteB"
          component={BebidasMundo}
        />
        <Route exact path="/carrito" component={Carrito} />
        <Route exact path="/Administracion" component={Administracion} />
        <Route exact path="/cocina" component={Cocina} />
        <Route exact path="/barra" component={Barra} />
        <Route exact path="/Entregas" component={Entregas} />
        <Route exact path="/mozo" component={Mozo} />
      </Switch>
    </Router>
  );
};

export default RouterDos;
