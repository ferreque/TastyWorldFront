import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getComandasBarra } from "../helpers/comandas";
import CardBarra from "../components/CardBarra";
import { Container } from "react-bootstrap";

const Barra = () => {
  const [comandas, setComandas] = useState([]);
  const [comandaFlag, setComandaFlag] = useState(false);
  const history = useHistory();
  const user =
    JSON.parse(localStorage.getItem("auth")) &&
    JSON.parse(localStorage.getItem("auth")).usuario;

  useEffect(() => {
    const redireccion = () =>
      (user && (user.rol === "CHEF_ROLE" || user.rol === "ADMIN_ROLE")) ||
      history.push("/login");
    redireccion();
  });

  useEffect(() => {
    getComandasBarra().then((respuesta) => {
      setComandas(respuesta.comanda);
    });
    setComandaFlag(false);
  }, [comandaFlag]);

  return (
    <>
      <Container fluid className="mt-2 min-height">
        <CardBarra
          comandas={comandas}
          comandaFlag={comandaFlag}
          setComandaFlag={setComandaFlag}
        />
      </Container>
    </>
  );
};

export default Barra;
