import { Container, Row, Col, Card, Modal} from "react-bootstrap";
import { useState } from "react";

const imagenes = [
  "/public/galeria/F10 JOCKEY-38.webp",
  "/public/galeria/F10 JOCKEY-112.webp",
  "/public/galeria/F10 JOCKEY-170.webp",
  "/public/galeria/f10-6.webp",
  "/public/galeria/f10-11.webp",
  "/public/galeria/f12-2.webp",
  "/public/galeria/f12-15.webp",
  "/public/galeria/selec-42.webp",
  "/public/galeria/SeleccionadaCañasF5-12.webp",
  "/public/galeria/SeleccionadaCañasF5-17.webp",
  "/public/galeria/Seleccionadas.Cañas.15.11-2.webp",
  "/public/galeria/Seleccionadas.Cañas.15.11-5.webp",
  "/public/galeria/Seleccionadas.Cañas.15.11-20.webp",
  "/public/galeria/Seleccionadas.Cañas.15.11-26.webp",
  "/public/galeria/Seleccionadas.Cañas.15.11-27.webp",
  "/public/galeria/SeleccionadasF7-2.webp",
];

const Galeria = () => {
    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  return (
  <Container className="py-5">
    
    
    {/* 🔥 Header mejorado */}
    <div className="text-center mb-5">
      <h1 className="fw-bold text-white display-4 mb-3">
        Galería de Partidos ⚽
      </h1>
      <p className="text-light fs-5">
        Momentos únicos dentro de la cancha. Pasión, amigos y fútbol.
      </p>
    </div>

    {/* 📸 Grid */}
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

    {/* 🔍 Modal */}
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
