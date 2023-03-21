import React, { useState, useEffect } from "react";
import BotonPedido from "../components/BotonPedido";
import CardMenu from "../components/CardMenu";
import { Container } from "react-bootstrap";
import { getProductos } from "../helpers/productos";

const token =
  JSON.parse(localStorage.getItem("auth")) &&
  JSON.parse(localStorage.getItem("auth")).token;

const Bebidas = () => {
  const [listaB, setListaB] = useState([]);
  
  useEffect(() => {
    getProductos(token).then((respuesta) => {
      let Bebid = respuesta.producto?.filter((plato) => {
        return plato.tipo === "Bebida";
      });
      setListaB(Bebid);
    });
  }, []);

  return (
    <>
      <Container
        fluid
        className="inicioBackground continentBackground  pt-5 mt-5"
      >
        <h1 className="tituloPag text-center  mb-5 ">Bebidas</h1>

        <CardMenu menus={listaB} />

        <BotonPedido />
      </Container>
    </>
  );
};

export default Bebidas;
