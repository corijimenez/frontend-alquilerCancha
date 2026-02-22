import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-negro-brand text-white text-center p-3 mt-5">
      <Container>
      <Row className="gy-3 justify-content-between">
        <Col md={4} className="d-flex flex-column align-items-center align-items-md-start">
        <p>hola</p>
        </Col>
         <Col md={4} className="d-flex flex-column align-items-center align-items-md-start">
        <p>hola</p>
        </Col>
         <Col md={4} className="d-flex flex-column align-items-center align-items-md-start">
        <p>hola</p>
        </Col>

      </Row>

      </Container>
      <p>&copy; 2026 Rolling Canchas – Alquiler de Canchas</p>
    </footer>
  );
};

export default Footer;