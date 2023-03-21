import React from "react";
import { putComanda } from "../helpers/comandas";

const TablaPedidos = ({ pedidos, setMesasFlag }) => {
  const token =
    JSON.parse(localStorage.getItem("auth")) &&
    JSON.parse(localStorage.getItem("auth")).token;

  const cambiarComanda = (id) => {
    let comanda = { estado: "Entregado" };
    putComanda(id, comanda, token).then((respuesta) => {});
    setMesasFlag(true);
  };

  return (
    <div className="col-10 col-md-8 col-lg-5 mx-auto login-card ">
      <div className="row">
        <table className="table">
          <thead>
            <tr className="text-white mt-2">
              <th scope="col-6">N° mesa</th>
              <th scope="col-6">N° pedido</th>
              <th scope="col-6">Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidos &&
              pedidos.map((pedido) => (
                <tr className="text-white" key={pedido._id}>
                  <td>{pedido.mesa}</td>
                  <td>{pedido.numeroPedido}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => cambiarComanda(pedido._id)}
                    >
                      Entregado
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaPedidos;
