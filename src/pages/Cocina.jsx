import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getComandasCocina } from "../helpers/comandas";
import CardCocina from "../components/CardCocina";
import { Container } from "react-bootstrap";

const Cocina = () => {
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
    getComandasCocina().then((respuesta) => {
      setComandas(respuesta.comanda);
    });
    setComandaFlag(false);
    // const intervalo = setInterval(() => {
    //   getComandasCocina().then((respuesta) => {
    //     setComandas(respuesta.comanda);
    //   });
    // }, 30000);
    // return () => clearInterval(intervalo);
  }, [comandaFlag]);

  return (
    <>
      <Container fluid className="mt-2 min-height">
        <CardCocina
          comandas={comandas}
          comandaFlag={comandaFlag}
          setComandaFlag={setComandaFlag}
        />
      </Container>
    </>
  );
};

export default Cocina;
