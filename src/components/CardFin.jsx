import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Form, Card, Container, Button } from "react-bootstrap";
import { postComandaAdmin } from "../helpers/comandas";
import { useHistory } from "react-router-dom";

const CardFin = ({ pedidos, setPedidos, setLoadVisible }) => {
  const mesasOcup = JSON.parse(localStorage.getItem("mesas")) || [];
  const [mesa, setMesa] = useState();
  let numMesasOcup = [];
  mesasOcup.forEach((mesa) => numMesasOcup.push(mesa.numero));

  useEffect(() => {
    setLoadVisible(false);
  }, []);

  const token =
    JSON.parse(localStorage.getItem("auth")) &&
    JSON.parse(localStorage.getItem("auth")).token;
  const history = useHistory();
  const usuario = JSON.parse(localStorage.getItem("auth")).usuario;
  let precioTotal = 0;

  // Symbol(pedido).toString + pedido
  const getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  pedidos.forEach(function (pedido) {
    precioTotal += Number(pedido.precio);
    pedido.numPlato = getRandomNumberBetween(1, 10000);
  });

  const confirmarPedido = () => {
    if (!mesa) {
      window.alert("debe introducir un numero de mesa");
    } else if (!numMesasOcup.includes(mesa)) {
      window.alert(
        "Numero de mesa invalido, consulte a un mesero su numero de mesa"
      );
    } else {
      pedidos.forEach((pedido) => {
        let product = {
          hora: Date(),
          mesa: mesa,
          producto: pedido.nombre,
          prodId: pedido._id,
          tipo: pedido.tipo,
          nombreCliente: usuario.nombre,
          estado: "Pendiente",
          numeroPedido: getRandomNumberBetween(1, 100000),
          descripcion:
            pedido?.notas || "No se especificaron notas para este pedido",
        };

        postComandaAdmin(product, token).then((respuesta) => {
          if (respuesta.errors) {
            return window.alert(respuesta.errors[0].msg);
          } else {
            Swal.fire({
              title: "Pedido confirmado",
              icon: "success",
              confirmButtonColor: "#3085d6",
            });
            const redireccion = () => history.push("/");
            redireccion();
          }
        });
      });
      localStorage.setItem("carrito", JSON.stringify([]));
    }
  };

  const borrarProd = (pedido) => {
    let newCarrito = [];
    pedidos.forEach((element) => {
      if (element.numPlato !== pedido.numPlato) {
        newCarrito.push(element);
      }
    });
    localStorage.setItem("carrito", JSON.stringify(newCarrito));
    setPedidos(newCarrito);
  };

  return (
    <Container className="text-center">
      <div className="input-group input-group-lg">
        <span className="input-group-text" id="inputGroup-sizing-lg">
          NUMERO DE MESA
        </span>
        <input
          type="text"
          placeholder="Introduzca el numero de su mesa"
          onChange={(e) => setMesa(e.target.value)}
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
        ></input>
      </div>

      <h1>Precio total:{precioTotal}</h1>
      {pedidos.map((pedido, index) => (
        <Card
          key={getRandomNumberBetween(1, 1000000)}
          className="  mb-3 mi-4 login-card cardcarrito justify-center"
        >
          <Card.Body>
            <Card.Title className="mb-2 ">{pedido.nombre}</Card.Title>
            <Card.Text>$ {pedido.precio}</Card.Text>
            <Form>
              <Form.Control
                onChange={(e) => {
                  pedidos[index] = { ...pedido, notas: e.target.value };
                  setPedidos(pedidos);
                }}
                label="Comments"
                as="textarea"
                maxLength="150"
                placeholder="¿Nos queres aclarar algo sobre tu Tastypedido?"
                style={{ height: "100px" }}
              />
            </Form>
            <Card.Text> {pedido.cantidad}</Card.Text>
          </Card.Body>
          <Button
            className="mb-4 pull-right mt-3"
            variant="light"
            onClick={(e) => borrarProd(pedido)}
          >
            BORRAR
          </Button>
        </Card>
      ))}

      <Button
        className="mb-4 pull-right mt-3"
        variant="light"
        onClick={() => confirmarPedido()}
      >
        CONFIRMAR PEDIDO
      </Button>
    </Container>
  );
};

export default CardFin;
