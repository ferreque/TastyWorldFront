import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { getBebidas } from "../helpers/bebidas";
import CardContinenteB from "../components/CardContinenteB";
import BotonPedido from "../components/BotonPedido";
import CardMenu from "../components/CardMenu";
import { useParams, useHistory } from "react-router";
import { getContinentesB } from "../helpers/continentesB";

const BebidasMundo = () => {
  const [contadorProductosFlag, setContadorProductosFlag] = useState(false);
  const history = useHistory();
  useEffect(() => {
    getBebidas(token).then((respuesta) => {
      console.log(respuesta);
    });
  }, []);
  let { continenteB } = useParams();

  const [listaB, setListaB] = useState([]);
  const [listaBebidas, setListaBebidas] = useState([]);
  const [menuBebidas, setMenuBebidas] = useState([]);
  const token =
    JSON.parse(localStorage.getItem("auth")) &&
    JSON.parse(localStorage.getItem("auth")).token;
  useEffect(() => {
    getContinentesB(token).then((respuesta) => {
      setListaBebidas(respuesta.bebida);
    });

    getBebidas(token).then((respuesta) => {
      let tragos = respuesta.bebida || [];
      setListaB(tragos);
      setMenuBebidas(tragos);
    });
  }, []);
  const user =
    JSON.parse(localStorage.getItem("auth")) &&
    JSON.parse(localStorage.getItem("auth")).usuario;
  useEffect(() => {
    const redireccion = () => user || history.push("/login");
    redireccion();
  }, []);

  useEffect(() => {
    if (continenteB) {
      let lista =
        listaB &&
        listaB.filter((menuB) => {
          return menuB.continenteB === continenteB;
        });
      setMenuBebidas(lista);
    } else {
      setMenuBebidas(listaB);
    }
  }, [continenteB]);

  return (
    <>
      <Container
        fluid
        className="inicioBackground continentBackground  pt-5 mt-5"
      >
        <h1 className="tituloPag text-center  mb-5 ">BEBIDAS</h1>

        <Container fluid>
          <CardContinenteB listaBebidas={listaBebidas} />
        </Container>

        <Container fluid>
          <h2 className="tituloPag text-center mt-4 pb-5">NUESTRAS BEBIDAS</h2>
          <h2 className="tituloPag text-center mb-4 pb-4">
            {continenteB ? continenteB : "Todas"}
          </h2>
          <CardMenu
            menuBebidas={menuBebidas}
            setContadorProductosFlag={setContadorProductosFlag}
          />
        </Container>
        <BotonPedido
          setContadorProductosFlag={setContadorProductosFlag}
          contadorProductosFlag={contadorProductosFlag}
        />
      </Container>
    </>
  );
};

export default BebidasMundo;
