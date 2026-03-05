import { Container, Row, Col, Card } from "react-bootstrap";

const imagenes = [
  "/galeria/1.jpg",
  "/galeria/2.jpg",
  "/galeria/3.jpg",
  "/galeria/4.jpg",
  "/galeria/5.jpg",
  "/galeria/6.jpg",
  "/galeria/7.jpg",
  "/galeria/8.jpg",
  "/galeria/9.jpg",
  "/galeria/10.jpg",
  "/galeria/11.jpg",
  "/galeria/12.jpg",
  "/galeria/13.jpg",
  "/galeria/14.jpg",
  "/galeria/15.jpg",
  "/galeria/16.jpg",
];

const Galeria = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-5 fw-bold text-white">
        Galería de Partidos ⚽
      </h2>

      <Row className="g-4">
        {imagenes.map((img, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <Card className="shadow-sm border-0 galeria-card">
              <Card.Img
                variant="top"
                src={img}
                alt={`Partido ${index + 1}`}
                className="galeria-img"
              />
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Galeria;