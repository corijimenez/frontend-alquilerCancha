import { Row, Col } from "react-bootstrap";

export default function BienvenidaInicio() {
  return (
    
    <Row className="mb-4 mt-5 align-items-center w-100 mx-0">
      
      <Col md={12} className="p-5 rounded bg-dark shadow-sm text-center">
        <h2 className="display-5 fw-bold text-success">
          Bienvenidos a TucuGol
        </h2>
        <p className="lead text-white">
          Unite al club donde la pasión por la redonda no tiene límites. Reservá
          tu lugar, compartí con amigos y formá parte de la comunidad futbolera
          más grande.
        </p>
      </Col>
    </Row>
  );
}