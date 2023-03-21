import React from "react";

const Categoria = ({ categorias }) => {
  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {categorias &&
          categorias.map((categoria) => (
            <div className="col" key={categoria._id}>
              <div className="card h-100">
                <img
                  src={categoria.img}
                  className="card-img-top"
                  alt={categoria.nombre}
                />
                <div className="card-body">
                  <h5 className="card-title">{categoria.nombre}</h5>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Categoria;
