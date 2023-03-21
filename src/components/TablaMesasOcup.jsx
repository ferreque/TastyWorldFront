import React from "react";
import { mesasDelete, mesasPut } from "../helpers/mesas";

const TablaComandas = ({ mesasOcup, setMesasFlag }) => {
  const liberarMesa = (id) => {
    let mesa = { estado: true };
    mesasPut(id, mesa).then((respuesta) => {});
    setMesasFlag(true);
  };

  const deleteMesa = (id) => {
    mesasDelete(id).then((respuesta) => {});
    setMesasFlag(true);
  };

  return (
    <div className="col-10 col-md-8 col-lg-5 mx-auto login-card ">
      <div className="row">
        <table className="table">
          <thead>
            <tr className="text-white mt-2">
              <th scope="col-4">N° mesa</th>
              <th scope="col-4">Capacidad</th>
              <th scope="col-4">Estado</th>
            </tr>
          </thead>
          <tbody>
            {mesasOcup &&
              mesasOcup.map((mesa) => (
                <tr className="text-white" key={mesa.id}>
                  <td>{mesa.numero}</td>
                  <td>{mesa.capacidad}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => liberarMesa(mesa.id)}
                    >
                      Desocup
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteMesa(mesa.id)}
                    >
                      X
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

export default TablaComandas;
