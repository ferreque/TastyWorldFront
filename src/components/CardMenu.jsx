import React from "react";
import Swal from "sweetalert2";

const CardMenu = ({ menus, setContadorProductosFlag }) => {
  let lista = JSON.parse(localStorage.getItem("carrito")) || [];
  const agregarACarrito = async (prod) => {
    setContadorProductosFlag(true);
    lista.push(prod);
    localStorage.setItem("carrito", JSON.stringify(lista));
    Swal.fire({
      title: "Producto agregado",
      icon: "success",
      confirmButtonColor: "#3085d6",
    });
  };

  return (
    <>
      <div className="row  row-cols-md-3 row-cols-lg-4 g-4">
        {menus.map((menu) => (
          <div
            className="col mt-2 mb-4 d-flex justify-content-center "
            key={menu._id}
          >
            <div className=" wrapper">
              <div className="card front-face">
                <img
                  src={menu.img}
                  className="card-img-top"
                  alt={menu.nombre}
                />
                <div className="card-body">
                  <h5 className="card-title nombrePlato">{menu.nombre}</h5>

                  <strong>{menu.categoria}</strong>
                  <div className="precioyBot">
                    <h5 className="precioPlato text-center">${menu.precio}</h5>
                    <h2>{menu.pais}</h2>
                  </div>
                </div>
              </div>

              <div className="card back-face">
                <img src={menu.img} alt={menu.nombre} />
                <div className="info">
                  <div className="title">
                    <h4>{menu.nombre}</h4>
                  </div>
                  <p>{menu.descripcion}</p>
                </div>
                <div className="precioyBot">
                  <h5>${menu.precio}</h5>
                  <button
                    className="btn btn-info botonAgrBa"
                    onClick={() => agregarACarrito(menu)}
                  >
                    Agregar +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardMenu;
