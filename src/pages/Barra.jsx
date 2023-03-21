import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getComandasBarra } from "../helpers/comandas";
import CardBarra from "../components/CardBarra";
import { Container } from "react-bootstrap";

const Barra = () => {
  const [comandas, setComandas] = useState([]);
  const token =
    JSON.parse(localStorage.getItem("auth")) &&
    JSON.parse(localStorage.getItem("auth")).token;

  const history = useHistory();
  const user =
    JSON.parse(localStorage.getItem("auth")) &&
    JSON.parse(localStorage.getItem("auth")).usuario;

  useEffect(() => {
    const redireccion = () =>
      (user && (user.rol === "WAITER_ROLE" || user.rol === "ADMIN_ROLE")) ||
      history.push("/login");
    redireccion();
  }, );

  useEffect(() => {
    getComandasBarra(token).then((respuesta) => {
      setComandas(respuesta.comanda);
    });
  }, );

  return (
    <>
      <Container fluid className="mt-2 min-height">
        <CardBarra comandas={comandas} />
      </Container>
    </>
  );
};

export default Barra;
