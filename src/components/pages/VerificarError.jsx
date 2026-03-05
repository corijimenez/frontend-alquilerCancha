import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BsXCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const VerificacionError = () => {
  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center px-3 desvanecimiento">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={6} xl={5}>
          <Card className="bg-dark text-white border-0 shadow-lg rounded-4 text-center fade-in">
            <Card.Body className="p-4 p-md-5">

              {/* Icono */}
              <div className="mb-4 text-danger display-3">
                <BsXCircleFill />
              </div>

              {/* Título */}
              <h1 className="h3 fw-bold mb-3">
                Enlace inválido o expirado
              </h1>

              {/* Texto */}
              <p className="text-white-50 mb-4">
                
                El enlace de verificación no es válido o ya expiró.
                <br />
                Podés solicitar uno nuevo desde la pantalla de verificación.
              </p>

              {/* Botón */}
              <div className="d-grid">
                <Button
                  as={Link}
                  to="/verificar-cuenta"
                  className="fw-semibold py-2"
                  style={{
                    backgroundColor: "#1F8A3B",
                    border: "none",
                  }}
                >
                  Solicitar nuevo enlace
                </Button>
              </div>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VerificacionError;