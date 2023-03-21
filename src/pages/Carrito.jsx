import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import CardFin from "../components/CardFin";
import { getProducto } from "../helpers/productos";
import Loader from "react-loader-spinner";

const Carrito = () => {
  let pedido = [];
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const [pedidos, setPedidos] = useState([]);
  const [eco, setEco] = useState(true);
  const [loadVisible, setLoadVisible] = useState(true);

  const token =
    JSON.parse(localStorage.getItem("auth")) &&
    JSON.parse(localStorage.getItem("auth")).token;

  useEffect(() => {
    cargarCarrito(carrito);
  }, []);

  const cargarCarrito = (c) => {
    c.forEach((producto) => {
      getProducto(producto, token).then((respuesta) => {
        pedido.push(respuesta.producto);
      });
    });
    setTimeout(function () {
      setPedidos(pedido);
      setLoadVisible(false);
    }, 500);
  };

  return (
    <Container className="tituloPag inicioBackground text-center min-height mt-5 pt-5">
      <h1>TU TASTY PEDIDO:</h1>
      <Loader
        type="Circles"
        color="#36504f"
        height="100"
        width="100"
        visible={loadVisible}
      />
      <CardFin
        cargarCarrito={cargarCarrito}
        pedidos={pedidos}
        eco={eco}
        setEco={setEco}
        setPedidos={setPedidos}
      />
    </Container>
  );
};

export default Carrito;
