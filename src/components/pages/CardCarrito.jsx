import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router";

const CardProducto = ({producto, agregarAlCarrito}) => {
  return (
    <Col md={4} lg={3} className="mb-3">
      <Card className="h-100 tienda-card">
        <div>
          <img
            src={producto.imagen}
            alt={producto.nombreProducto}
            className="card-img-top-nueva"
          />
        </div>
        <Card.Body>
          <Card.Title className="primary-font">{producto.nombreProducto}</Card.Title>
          <Card.Text>
            {producto.descripcion_breve}
            <br className="mb-2" />
            <span className="fw-bold">Precio: ${producto.precio}</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-end">
          <Button variant="success" className="me-2" onClick={() => agregarAlCarrito(producto)}>
            <i className="bi bi-cart-plus-fill"></i> Agregar
          </Button>
          <Link className="btn btn-primary" to={'/detalle/'+ producto._id}>
            Ver más
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardProducto;
