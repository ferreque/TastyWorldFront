import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { usuarioPost, usuarioPut } from "../helpers/usuarios";

const ModalUsuarios = (props) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState("");
  const [rol, setRol] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuario = {
      nombre,
      email,
      password,
      img,
      rol,
    };
    if (props.usuarioEditar) {
      usuarioPut(props.usuarioEditar.uid, usuario).then((respuesta) => {
        if (respuesta.errors) {
          return Swal.fire({
            title: "Hubo un problema, por favor intentalo de nuevo",
            text: "Opps!",
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
        }
        if (respuesta.msg) {
          props.onHide();
          props.setRender();
          Swal.fire({
            title: "Tasty usuario editado correctamente!",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
        }
      });
    } else {
      usuarioPost(usuario).then((respuesta) => {
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
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
        }
      });
    }
  };

  useEffect(() => {
    const obj = props.usuarioEditar;
    setNombre(obj ? obj.nombre : "");
    setEmail(obj ? obj.email : "");
    setPassword(obj ? obj.password : "");
    setImg(obj ? obj.img : "");
    setRol(obj ? obj.rol : "");
  }, [props.usuarioEditar]);

  const roles = ["USER_ROLE", "ADMIN_ROLE", "WAITER_ROLE", "CHEF_ROLE"];

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">USUARIOS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Administre los usuarios</h4>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              type="text"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
            />
          </Form.Group>
          <Form.Group className={`mb-3 ${props.usuarioEditar && "d-none"}`}>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
          </Form.Group>

          <Form.Group className={`mb-3 ${props.usuarioEditar && "d-none"}`}>
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              value={img}
              onChange={(e) => setImg(e.target.value)}
              type="text"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Control
              onChange={(e) => setRol(e.target.value)}
              value={rol}
              as="select"
            >
              <option>Elige el rol</option>
              {roles.map((rol, index) => (
                <option key={index + 52737}>{rol}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            {props.usuarioEditar ? "Editar" : "Agregar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalUsuarios;
