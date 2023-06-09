import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { mesasGet, mesasTodasGet } from "../helpers/mesas";
import { getComandasEntregas } from "../helpers/comandas";
import { Container, Row } from "react-bootstrap";
import TablaMesas from "../components/TablaMesas";
import TablaComandas from "../components/TablaMesasOcup";
import TablaPedidos from "../components/TablaPedidos";

const Mozo = () => {
  const [mesas, setMesas] = useState([]);
  const [mesasOcup, setMesasOcup] = useState(
    JSON.parse(localStorage.getItem("mesas")) || []
  );
  const [mesasFlag, setMesasFlag] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const state = { rol: "" };

  const history = useHistory();

  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("auth")) &&
      JSON.parse(localStorage.getItem("auth")).usuario;
    const redireccion = () =>
      (user && (user.rol === "WAITER_ROLE" || user.rol === "ADMIN_ROLE")) ||
      history.push("/login");
    redireccion();
  }, [history]);

  useEffect(() => {
    mesasGet().then((respuesta) => {
      setMesas(respuesta.mesa);
    });
    setMesasFlag(false);
  }, [mesasFlag]);

  useEffect(() => {
    mesasTodasGet().then((respuesta) => {
      let todas = respuesta.mesa;
      let ocupadas =
        todas &&
        todas.filter((mesa) => {
          return mesa.estado === false;
        });
      setMesasOcup(ocupadas);
      localStorage.setItem("mesas", JSON.stringify(ocupadas));
    });
    setMesasFlag(false);
  }, [mesasFlag]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth")).token;
    getComandasEntregas(token).then((respuesta) => {
      setPedidos(respuesta.comanda);
    });
    setMesasFlag(false);
  }, [mesasFlag]);

  return (
    <>
      <Container fluid className="login-bg py-4 mt-5">
        <h1 className="text-white text-center">{state.nombre}</h1>
        <h1 className="iniciaSesion text-center my-3">Mesas Libres</h1>
        <Row className="text-center">
          <TablaMesas mesas={mesas} setMesasFlag={setMesasFlag} />
        </Row>
        <h1 className="iniciaSesion text-center my-3">Mesas Ocupadas</h1>
        <Row className="mb-5 text-center">
          <TablaComandas mesasOcup={mesasOcup} setMesasFlag={setMesasFlag} />
        </Row>
        <h1 className="iniciaSesion text-center my-3">Pedidos</h1>
        <Row className="mb-5 text-center">
          <TablaPedidos pedidos={pedidos} setMesasFlag={setMesasFlag} />
        </Row>
      </Container>
    </>
  );
};
export default Mozo;
