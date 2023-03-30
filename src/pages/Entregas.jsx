import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getComandasEntregas } from "../helpers/comandas";
import CardEntregas from "../components/CardEntregas";
import { Container } from "react-bootstrap";

const Entrega = () => {
  const [comandas, setComandas] = useState([]);

  const history = useHistory();

  const user =
    JSON.parse(localStorage.getItem("auth")) &&
    JSON.parse(localStorage.getItem("auth")).usuario;

  useEffect(() => {
    const redireccion = () =>
      (user && (user.rol === "WAITER_ROLE" || user.rol === "ADMIN_ROLE")) ||
      history.push("/login");
    redireccion();
  });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth")).token;
    getComandasEntregas(token).then((respuesta) => {
      setComandas(respuesta.comanda);
    });
  }, []);

  return (
    <>
      <Container fluid className="mt-2 min-height mt-5 pt-3">
        <CardEntregas comandas={comandas} />
      </Container>
    </>
  );
};

export default Entrega;
