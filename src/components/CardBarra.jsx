import React from "react";
import {
  Card,
  Row,
  Col,
  ListGroup,
  Button,
  ButtonToolbar,
} from "react-bootstrap";
import { putComanda } from "../helpers/comandas";

const CardBarra = ({ comandas }) => {
  const token =
    JSON.parse(localStorage.getItem("auth")) &&
    JSON.parse(localStorage.getItem("auth")).token;
  const pedidoRealizado = (id) => {
    let comanda = { estado: "Realizado" };
    putComanda(id, comanda, token);
  };

  const pedidoAnulado = (id) => {
    let comanda = { estado: "Anulado" };
    putComanda(id, comanda, token);
  };
  return (
    <Row xs={1} md={5} className="mt-5 g-2">
      {comandas &&
        comandas.reverse().map((comanda) => (
          <Col key={comanda._id} className="mt-4 mb-2">
            <Card>
              <Card.Body>
                <Card.Header>Pedido: {comanda.numeroPedido}</Card.Header>
                <Card.Title className="m-2">{comanda.producto}</Card.Title>
                <ListGroup>
                  <ListGroup.Item>Cantidad: {comanda.cantidad}</ListGroup.Item>
                  <ListGroup.Item>Notas: {comanda.descripcion}</ListGroup.Item>
                  <ListGroup.Item>
                    Cliente: {comanda.nombreCliente}
                  </ListGroup.Item>
                  <ListGroup.Item>Mesa: {comanda.mesa}</ListGroup.Item>
                  <ListGroup.Item>Estado: {comanda.estado}</ListGroup.Item>
                </ListGroup>
                {/* <TimerComandas /> */}
              </Card.Body>
              <Card.Footer>
                <ButtonToolbar
                  className="justify-content-center"
                  size="xl"
                  aria-label="Basic example"
                >
                  <Button
                    className="me-5"
                    variant="danger"
                    onClick={() => pedidoAnulado(comanda._id)}
                  >
                    Rechazar
                  </Button>
                  <Button
                    className="mi-5"
                    variant="success"
                    onClick={() => pedidoRealizado(comanda._id)}
                  >
                    Realizado
                  </Button>
                </ButtonToolbar>
              </Card.Footer>
            </Card>
          </Col>
        ))}
    </Row>
  );
};

export default CardBarra;
