import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import RouterDos from "./routes/RouterDos";
import ProtectedRoute from "./routes/ProtectedRoute";
import { TastyNavbar } from "./components/common/navbar/TastyNavbar";
import { TastyFooter } from "./components/common/footer/TastyFooter";
import Registro from "./pages/Registro";
import Error404 from "./pages/Error404";
import Nosotros from "./pages/Nosotros";

const App = () => {
  return (
    <Router>
      <TastyNavbar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/registro" component={Registro} />
        <Route exact path="/error" component={Error404} />
        <Route exact path="/nosotros" component={Nosotros} />
        <ProtectedRoute path="/" component={RouterDos} />
      </Switch>
      <TastyFooter />
    </Router>
  );
};
export default App;
