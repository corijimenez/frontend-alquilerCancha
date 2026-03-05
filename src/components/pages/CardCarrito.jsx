import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardProducto = ({producto, agregarAlCarrito}) => {
  const precioFormateado = Number(producto.precio || 0).toLocaleString("es-AR");

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
        <Card.Body className="d-flex flex-column">
          <Card.Title className="primary-font">{producto.nombreProducto}</Card.Title>
          <Card.Text className="text-light small flex-grow-1">
            {producto.descripcion_breve || "Sin descripción disponible."}
          </Card.Text>
          <div className="fw-bold fs-5 text-warning">${precioFormateado}</div>
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
