import { Container, Row, Col, Card, Modal } from "react-bootstrap";
import { useState } from "react";

const nombresImagenes = [
  "F10 JOCKEY-38.webp",
  "F10 JOCKEY-112.webp",
  "F10 JOCKEY-170.webp",
  "f10-6.webp",
  "f10-11.webp",
  "f12-2.webp",
  "f12-15.webp",
  "selec-42.webp",
  `SeleccionadaCa\u00F1asF5-12.webp`,
  `SeleccionadaCa\u00F1asF5-17.webp`,
  `Seleccionadas.Ca\u00F1as.15.11-2.webp`,
  `Seleccionadas.Ca\u00F1as.15.11-5.webp`,
  `Seleccionadas.Ca\u00F1as.15.11-20.webp`,
  `Seleccionadas.Ca\u00F1as.15.11-26.webp`,
  `Seleccionadas.Ca\u00F1as.15.11-27.webp`,
  "SeleccionadasF7-2.webp",
];

const imagenes = nombresImagenes.map(
  (nombre) => `/galeria/${encodeURIComponent(nombre)}`,
);

const Galeria = () => {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-white display-4 mb-3">Galeria de Partidos</h1>
        <p className="text-light fs-5">
          Momentos unicos dentro de la cancha. Pasion, amigos y futbol.
        </p>
      </div>

      <Row className="g-4">
        {imagenes.map((img, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <Card
              className="shadow border-0 galeria-card"
              onClick={() => setImagenSeleccionada(img)}
              style={{ cursor: "pointer" }}
            >
              <Card.Img
                variant="top"
                src={img}
                alt={`Partido ${index + 1}`}
                className="galeria-img"
                loading="lazy"
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        show={!!imagenSeleccionada}
        onHide={() => setImagenSeleccionada(null)}
        centered
        size="lg"
      >
        <Modal.Body className="p-0 bg-dark">
          <img
            src={imagenSeleccionada}
            alt="Imagen ampliada"
            style={{ width: "100%", height: "auto" }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Galeria;
