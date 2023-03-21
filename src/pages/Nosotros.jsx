import React from "react";
const Nosotros = () => {
  return (
    <body className="body container-fluid min-height mt-5 pt-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2 my-4">
            <h1 className="iniciaSesion2">Conoce nuestra trayectoria</h1>
            <hr className="about" />
            <h3 className="mb-3 iniciaSesion2">Nosotros</h3>
            <h5 className="font-weight-bold">
              Tasty World surge de nuestro fanatismo por los viajes y la
              cultura. Una combinación de Ingredientes de calidad y altos
              estándares es lo que nos diferencia de otros restaurantes del
              mundo. ​Nuestra meta es satisfacer a cada uno de nuestros
              clientes.
            </h5>
          </div>
        </div>
        <hr className="about" />
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2">
            <h1 className="iniciaSesion2">Nuestro compromiso</h1>
            <h5 className="font-weight-bold">
              En cada plato nos comprometemos a dejar un 100% satisfechos a cada
              cliente, brindándoles el mejor servicio y atención, para lograr
              una experiencia Culinaria inolvidable y satisfactoria. Estamos
              entusiasmados por mejorar día con día y ver crecer nuestro
              proyecto.
            </h5>
          </div>
        </div>
        <hr className="about" />
        <section className="row font-weight-bold text-center">
          <div className="col">
            <img
              className="img-avatar"
              src="https://i.postimg.cc/Th41Cdfy/cari.jpg"
              alt="fotoCari"
            />
            <h5>Carina Auteri</h5>
            <p>Desarrollo Web</p>
          </div>

          <div className="col">
            <img
              className="img-avatar"
              src="https://i.postimg.cc/zVHBQsGx/gaby.jpg"
              alt="fotoGaby"
            />
            <h5>Gabriela Navarro</h5>
            <p>Desarrollo Web</p>
          </div>

          <div className="col">
            <img
              className="img-avatar"
              src="https://i.postimg.cc/rD6m2fdM/pablo.jpg"
              alt="fotoPablo"
            />
            <h5>Pablo Giroud</h5>
            <p>Cheff Principal</p>
          </div>

          <div className="col">
            <img
              className="img-avatar"
              src="https://i.postimg.cc/zL8GV3SQ/ro.jpg"
              alt="fotoRocio"
            />
            <h5>Rocio Pereyra</h5>
            <p>Administracion</p>
          </div>

          <div className="col">
            <img
              className="img-avatar"
              src="https://i.postimg.cc/v4WmY599/fer.jpg"
              alt="fotofer"
            />
            <h5>Fernando Requena</h5>
            <p>Cheff Brasas</p>
          </div>
        </section>
      </div>
    </body>
  );
};

export default Nosotros;
