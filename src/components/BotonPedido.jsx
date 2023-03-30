import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import botonPed from "../assets/botonPedido.svg";

const BotonPedido = ({ setContadorProductosFlag, contadorProductosFlag }) => {
  let productos = JSON.parse(localStorage.getItem("carrito"))
    ? JSON.parse(localStorage.getItem("carrito")).length
    : 0;
  const [cantidad, setCantidad] = useState(productos);

  useEffect(() => {
    setCantidad(productos);
    setContadorProductosFlag(false);
  }, [productos, contadorProductosFlag, setContadorProductosFlag]);

  return (
    <section>
      <div id="botonPedStick">
        <h4>{cantidad}</h4>
        <Link to="/carrito">
          <div>
            <img src={botonPed} alt="boton Confirmar" />
          </div>
        </Link>
      </div>
    </section>
  );
};
export default BotonPedido;
