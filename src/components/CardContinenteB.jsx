import React from "react";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import Slider from "react-slick";

const CardContinenteB = ({ listaBebidas }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    initialSlide: 1,
    arrows: false,
    centerPadding: "10px",
    slide: "Card",
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 4.2,
          slidesToScroll: 3,
          initialSlide: 2,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.6,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 2,
          initialSlide: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <Card className=" cardConti">
          <Link style={{ textDecoration: "none" }} to={`/bebidasmundo/`}>
            <Card.Body className="cardCont">
              <Card.Img
                src="https://cdn-icons-png.flaticon.com/512/814/814513.png"
                itemID="imgCon"
                alt="Drinks"
              />
              <h5 className="card-title text-center nombreCont">Todos</h5>
            </Card.Body>
          </Link>
        </Card>
      </div>{" "}
      <div>
        <Slider {...settings}>
          {listaBebidas.map((bebida) => (
            <Container className="d-flex flex-col" key={bebida.nombre}>
              <Card className="cardConti">
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/bebidasmundo/${bebida.nombre}`}
                >
                  <Card.Img
                    src={bebida.img}
                    itemID="imgCon"
                    alt={bebida.nombre}
                  />
                </Link>
              </Card>
            </Container>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default CardContinenteB;
