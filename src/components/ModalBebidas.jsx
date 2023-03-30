import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { postBebida, putBebida } from "../helpers/bebidas";

const ModalBebidas = (props) => {
  const [continenteB, setContinenteB] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [img, setImagen] = useState("");
  const [precio, setPrecio] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bebida = {
      nombre,
      continenteB,
      img,
      precio,
      descripcion,
    };
    if (props.bebidEditar) {
      putBebida(props.bebidEditar._id, bebida, props.token).then(
        (respuesta) => {
          if (respuesta.errors) {
            return Swal.fire({
              title: respuesta.errors[0].msg,
              text: "Opps!",
              icon: "error",
              confirmButtonColor: "#3085d6",
            });
          }
          if (respuesta.msg) {
            props.onHide();
            props.setRender();
            Swal.fire({
              title: respuesta.msg,
              text: "Operacion exitosa",
              icon: "success",
              confirmButtonColor: "#3085d6",
            });
          }
        }
      );
    } else {
      postBebida(bebida, props.token).then((respuesta) => {
        if (respuesta.errors) {
          return Swal.fire({
            title: respuesta.errors[0].msg,
            text: "Opps!",
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
        }
        if (respuesta.msg) {
          props.onHide();
          props.setRender();
          Swal.fire({
            title: respuesta.msg,
            text: "Operacion exitosa",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
        }
      });
    }
  };

  useEffect(() => {
    const obj = props.bebidEditar;
    setContinenteB(obj ? obj.continente : "");
    setNombre(obj ? obj.nombre : "");
    setDescripcion(obj ? obj.descripcion : "");
    setImagen(obj ? obj.img : "");
    setPrecio(obj ? obj.precio : "");
  }, [props.bebidEditar]);

  const continentesB = [
    "Cafeteria",
    "Gaseosas",
    "Vinos",
    "Cervezas",
    "Cocteles",
  ];
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">BEBIDAS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Agregue una bebida</h4>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Bebida</Form.Label>
            <Form.Control
              onChange={(e) => setContinenteB(e.target.value)}
              value={continenteB}
              as="select"
            >
              <option>Elige un tipo</option>
              {continentesB.map((continenteB, index) => (
                <option key={index + 12839}>{continenteB}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre de la bebida</Form.Label>
            <Form.Control
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción de la bebida</Form.Label>
            <Form.Control
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              type="text"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              value={img}
              onChange={(e) => setImagen(e.target.value)}
              type="text"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              type="number"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {props.bebidEditar ? "Editar" : "Agregar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalBebidas;
