import React from "react";

const Error404 = () => {
  return (
    <div className="body min-height d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col mt-5 mb-1 iniciaSesion">
            <h1 className="text-center">ERROR 404!!</h1>
          </div>
        </div>
        <div className="row text-center font-weight-bold">
          <div className="col-12 col-lg-8 offset-lg-2 mt-5 mb-1">
            <p className="errorP">
              Lo lamentamos, la pagina solicitada se encuentra en mantenimiento
              para un mejor funcionamiento
            </p>
          </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-center">
            <p className="text-white errorP">
              Regresar al{" "}
              <a href="./">
                <button type="button" class="btn btnHome btn-lg text-center">
                  INICIO
                </button>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Error404;
