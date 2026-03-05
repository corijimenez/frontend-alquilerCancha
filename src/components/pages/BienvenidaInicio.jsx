import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function BienvenidaInicio() {
  const navigate = useNavigate();

  return (
    <Row className="mb-4 mt-5 align-items-center w-100 mx-0 justify-content-center">
      <Col md={10} lg={8} className="p-5 rounded bg-dark shadow text-center">
        <h2 className="display-5 fw-bold text-success mb-3">
          Bienvenidos a TucuGol ⚽
        </h2>

        <p className="lead text-white mb-4">
          Unite al club donde la pasión por la redonda no tiene límites.
          Reservá tu lugar, compartí con amigos y formá parte de la comunidad
          futbolera más grande.
        </p>

        <Button
          variant="outline-success"
          size="lg"
          className="px-4 py-2 fw-bold"
          onClick={() => navigate("/galeria")}
        >
          Ver Galería ⚽
        </Button>
      </Col>
    </Row>
  );
  
}