import { useState } from "react";
import { Container } from "react-bootstrap";
import CardFin from "../components/CardFin";
import Loader from "react-loader-spinner";

const Carrito = () => {
  let pedido = JSON.parse(localStorage.getItem("carrito")) || [];
  const [pedidos, setPedidos] = useState(pedido);
  const [loadVisible, setLoadVisible] = useState(true);

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
      {pedidos.length === 0 ? (
        <h1>NO TIENE NINGUN PRODUCTO EN SU CARRITO</h1>
      ) : (
        <CardFin
          pedidos={pedidos}
          setPedidos={setPedidos}
          setLoadVisible={setLoadVisible}
        />
      )}
    </Container>
  );
};

export default Carrito;
