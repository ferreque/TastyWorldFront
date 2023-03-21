import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { postProducto, putProducto } from "../helpers/productos";

const ModalProductos = (props) => {
  const [pais, setPais] = useState("");
  const [continente, setContinente] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [img, setImagen] = useState("");
  const [precio, setPrecio] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const producto = {
      nombre,
      tipo,
      pais,
      continente,
      img,
      precio,
      descripcion,
    };
    if (props.productEditar) {
      putProducto(props.productEditar._id, producto, props.token).then(
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
      postProducto(producto, props.token).then((respuesta) => {
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
    const obj = props.productEditar;
    setPais(obj ? obj.pais : "");
    setContinente(obj ? obj.continente : "");
    setNombre(obj ? obj.nombre : "");
    setTipo(obj ? obj.tipo : "");
    setDescripcion(obj ? obj.descripcion : "");
    setImagen(obj ? obj.img : "");
    setPrecio(obj ? obj.precio : "");
  }, [props.productEditar]);

  const continentes = [
    "Europa",
    "Norteamérica",
    "Latinoamérica",
    "Oceanía",
    "Asia",
    "Africa",
  ];

  const tipos = ["Plato", "Bebida", "Promo"];
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">PRODUCTOS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Agregue un producto</h4>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del País</Form.Label>
            <Form.Control
              onChange={(e) => setPais(e.target.value)}
              value={pais}
              type="text"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Continente</Form.Label>
            <Form.Control
              onChange={(e) => setContinente(e.target.value)}
              value={continente}
              as="select"
            >
              <option>Elige un continente</option>
              {continentes.map((continente, index) => (
                <option key={index + 12839}>{continente}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre del producto</Form.Label>
            <Form.Control
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción del producto</Form.Label>
            <Form.Control
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              as="select"
            >
              <option>Elige un tipo de producto</option>
              {tipos.map((tipo, index) => (
                <option key={index + 12679}>{tipo}</option>
              ))}
            </Form.Control>
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
            {props.productEditar ? "Editar" : "Agregar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalProductos;
