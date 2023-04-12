import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { postAuth } from "../helpers/authentication";
import { Container, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const Login = () => {
  const isMounted = useRef(true);
  const history = useHistory();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [btnDisable, setBtnDisable] = useState(false);
  const [login] = useState({});

  const user =
    JSON.parse(localStorage.getItem("auth")) &&
    JSON.parse(localStorage.getItem("auth")).usuario;

  useEffect(() => {
    const ruta =
      user &&
      (user.rol === "ADMIN_ROLE"
        ? "/administracion"
        : user.rol === "CHEF_ROLE"
        ? "/cocina"
        : user.rol === "WAITER_ROLE"
        ? "/mozo"
        : "/");
    const redireccion = () => user && history.push(ruta);
    redireccion();
  });

  useEffect(() => {
    window.alert(
      "Ecommerce prueba. Para ingresar como admin: admin@admin.com, como usuario user@user.com,como cocinero chef@chef.com, como mesero waiter@waiter.com, en todos los casos el password: 123456"
    );
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleChange = ({ target }) => {
    setFormValue({
      ...formValue,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    if (password === "") {
      Swal.fire({
        title: "Debe introducir la contraseña",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
    if (email && password) {
      setBtnDisable(true);
      if (isMounted.current) {
        postAuth(formValue).then((respuesta) => {
          if (respuesta.msg === "Usuario validado") {
            localStorage.setItem("auth", JSON.stringify(respuesta));
            setBtnDisable(false);
            setFormValue({
              email: "",
              password: "",
            });
          } else {
            Swal.fire({
              title: respuesta.msg,
              icon: "error",
              confirmButtonColor: "#3085d6",
            });
            setBtnDisable(false);
          }
        });
      }
    }
  };

  return (
    <Container
      fluid
      className="login-bg min-height d-flex flex-column justify-content-center"
    >
      <Form
        className="col-10 col-md-7 col-lg-5 mx-auto login-card  mt-5 pb-4"
        onSubmit={handleSubmit}
      >
        <Form.Label className="iniciaSesion d-flex justify-content-center mt-2">
          INICIA SESIÓN
        </Form.Label>
        <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
          <Form.Label className="text-white">E-mail</Form.Label>
          <Form.Control
            type="email"
            className="form-control"
            name="email"
            value={formValue.email}
            onChange={handleChange}
            maxLength={50}
          />
        </Form.Group>
        <Form.Group
          className="mb-3 mx-auto text-white"
          controlId="formBasicPassword"
        >
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            className="form-control"
            name="password"
            value={formValue.password}
            onChange={handleChange}
            maxLength={50}
            minLength={6}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="mt-2 btn btn-success rounded login-btn"
          disabled={btnDisable}
        >
          Ingresar
        </Button>
        <Form.Text className="row text-left text-white mb-4 mt-4 ms-1">
          ¿Aún no tienes una cuenta?
        </Form.Text>
        <div className="row">
          <div className="mt-2 fs-6">
            <a href="./registro" className="login-regis">
              REGISTRATE
            </a>
          </div>
        </div>
        {login.ok === false && (
          <div className="alert alert-danger mt-3" role="alert">
            {login.msg}
          </div>
        )}
      </Form>
    </Container>
  );
};

export default Login;
