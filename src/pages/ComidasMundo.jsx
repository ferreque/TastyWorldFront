import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { getProductos } from "../helpers/productos";
import CardContinente from "../components/CardContinente";
import BotonPedido from "../components/BotonPedido";
import CardMenu from "../components/CardMenu";
import { useParams, useHistory } from "react-router";
import { getContinentes } from "../helpers/continentes";

const ComidasMundo = () => {
  const [contadorProductosFlag, setContadorProductosFlag] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const token =
      JSON.parse(localStorage.getItem("auth")) &&
      JSON.parse(localStorage.getItem("auth")).token;
    getProductos(token).then((respuesta) => {
      if (!respuesta.producto) {
        localStorage.removeItem("auth");
        history.push("/login");
      }
    });
  }, [history]);
  let { continente } = useParams();

  const [listaM, setListaM] = useState([]);
  const [listaContinentes, setListaContinentes] = useState([]);
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    const token =
      JSON.parse(localStorage.getItem("auth")) &&
      JSON.parse(localStorage.getItem("auth")).token;
    getContinentes(token).then((respuesta) => {
      setListaContinentes(respuesta.continente);
    });

    getProductos(token).then((respuesta) => {
      let platos = respuesta.producto || [];
      setListaM(platos);
      setMenus(platos);
    });
  }, []);
  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("auth")) &&
      JSON.parse(localStorage.getItem("auth")).usuario;
    const redireccion = () => user || history.push("/login");
    redireccion();
  }, [history]);

  useEffect(() => {
    if (continente) {
      let lista =
        listaM &&
        listaM.filter((menu) => {
          return menu.continente === continente;
        });
      setMenus(lista);
    } else {
      setMenus(listaM);
    }
  }, [continente, listaM]);

  return (
    <>
      <Container
        fluid
        className="inicioBackground min-height continentBackground pt-5 mt-5"
      >
        <h2 className="mb-3 tituloPag text-center pb-3">COMIDAS</h2>

        <Container fluid>
          <CardContinente continentes={listaContinentes} />
        </Container>

        <Container fluid>
          <h2 className="tituloPag text-center mt-4 pb-5">NUESTROS PLATOS</h2>
          <h2 className="tituloPag text-center mb-4 pb-4">
            {continente ? continente : "Todos"}
          </h2>
          <CardMenu
            menus={menus}
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

export default ComidasMundo;
