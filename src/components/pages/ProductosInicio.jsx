import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductosInicio() {
  const productos = [
    {
      nombre: "Pelota de Fútbol",
      descripcion: "Pelota oficial para partidos de fútbol 5 y 7.",
      img: "/pelotafutbol2.jpg",
      link: "/tienda",
    },
    {
      nombre: "Kits de entrenamiento", // Corregido: Mayúscula inicial
      descripcion: "Conos, petos y más para mejorar tu juego.",
      img: "/kitentrenamiento1.jpg",
      link: "/tienda",
    },
    {
      nombre: "Camisetas de fútbol",
      descripcion: "Llevá los colores de tu equipo en cada partido.",
      img: "/argentina.jpg",
      link: "/tienda",
    },
  ];

  return (
    <Row className="mb-5">
      <h3 className="display-5 text-center my-4 fw-bold text-white">
        Algunos de nuestros productos
      </h3>
      <hr className="border-success opacity-50 mb-4" />

      {productos.map((producto, idx) => (
        <Col md={4} key={idx} className="mb-4">
          <Card className="producto-card text-center h-100 border-0 shadow-none">
            <div className="p-0">
              <Card.Img
                variant="top"
                src={producto.img}
                alt={producto.nombre}
                className="producto-img"
              />
            </div>

            <Card.Body className="d-flex flex-column">
              <Card.Title className="fw-bold">{producto.nombre}</Card.Title>

              <hr className="border-secondary opacity-50" />

              
              <Card.Text className="text-light small flex-grow-1">
                {producto.descripcion}
              </Card.Text>

              <div className="d-flex justify-content-center gap-2 mt-3">
                <Link
                  to={producto.link}
                  className="btn btn-success btn-sm px-3"
                >
                  Comprar
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}