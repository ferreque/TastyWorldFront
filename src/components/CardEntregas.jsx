import React from "react";
//import React from 'react'
import { Card, Row, Col, ListGroup } from "react-bootstrap";

const CardEntregas = ({ comandas }) => {
  return (
    <Row xs={1} md={5} className="mt-5 g-2">
      {comandas &&
        comandas.reverse().map((comanda) => (
          <Col key={comanda._id} className="mt-4 mb-2">
            <Card>
              <Card.Body>
                <Card.Header>{comanda.numeroPedido}</Card.Header>
                <Card.Title className="m-2">{comanda.producto}</Card.Title>
                <ListGroup>
                  <ListGroup.Item>{comanda.cantidad}</ListGroup.Item>
                  <ListGroup.Item>Notas: {comanda.descripcion}</ListGroup.Item>
                  <ListGroup.Item>
                    Cliente: {comanda.nombreCliente}
                  </ListGroup.Item>
                  <ListGroup.Item>Mesa: {comanda.mesa}</ListGroup.Item>
                  <ListGroup.Item>Estado: {comanda.estado}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
    </Row>
  );
};

export default CardEntregas;
