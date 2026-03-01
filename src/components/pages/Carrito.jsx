import React from "react";
import { Button, ListGroup, Row, Col, Card, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { crearOrdenCarritoAPI } from "../../helpers/queriesPagos";
import { Link } from "react-router";

const Carrito = ({ carrito, setCarrito }) => {
  const handlePagar = async () => {
    // 1. Formatear los productos del carrito según lo esperado por el backend
    const productosFormateados = carrito.map((item) => ({
      id: item._id, // Asegúrate de que el backend espera el _id como 'id'
      quantity: item.quantity,
    }));

    // 2. Enviar la petición al backend
    try {
      const respuesta = await crearOrdenCarritoAPI(productosFormateados);

      if (respuesta && respuesta.status === 201) {
        const data = await respuesta.json();
        // 3. Redirigir al init_point de Mercado Pago
        window.location.href = data.init_point;
      } else {
        const errorData = await respuesta.json();
        Swal.fire({
          title: "Ocurrió un error",
          text:
            errorData.mensaje ||
            "No se pudo procesar el pago. Intente nuevamente en unos minutos.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      Swal.fire({
        title: "Ocurrió un error",
        text: "No se pudo conectar con el servidor para procesar el pago. Por favor, verifique su conexión e intente de nuevo.",
        icon: "error",
      });
    }
  };

  const handleBorrarProducto = (idProducto) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El producto será eliminado de tu carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevoCarrito = carrito.filter((item) => item._id !== idProducto);
        setCarrito(nuevoCarrito);
        Swal.fire({
          title: "Eliminado",
          text: "El producto fue eliminado del carrito.",
          icon: "success",
        });
      }
    });
  };

  const calcularTotal = () => {
    return carrito.reduce(
      (total, item) => total + item.precio * item.quantity,
      0
    );
  };

  return (
    <Container className="mainSection">
      <h1 className="display-4 mt-5">Carrito de Compras</h1>
      <hr />
      {carrito.length === 0 ? (
        <div className="text-center">
          <h4>Tu carrito está vacío</h4>
          <p>Agrega productos para poder continuar con la compra.</p>
          <Link to="/tienda" className="btn btn-primary">
            Ver productos
          </Link>
        </div>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup>
              {carrito.map((item) => (
                <ListGroup.Item key={item._id} className="d-flex justify-content-between align-items-center">
                  <img src={item.imagen} alt={item.nombreProducto} className="img-thumbnail " />
                  <div className="ms-3 me-auto">
                    <div className="fw-bold">{item.nombreProducto}</div>
                    Cantidad: {item.quantity}
                  </div>
                  <span className="fw-bold me-3">${(item.precio * item.quantity).toFixed(2)}</span>
                  <div>
                    <Button variant="danger" onClick={() => handleBorrarProducto(item._id)}>
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4} className="mt-3 mt-md-0">
            <Card>
              <Card.Body>
                <Card.Title>Resumen del Pedido</Card.Title>
                <hr />
                <div className="d-flex justify-content-between">
                  <h5>Total:</h5>
                  <h5>${calcularTotal().toFixed(2)}</h5>
                </div>
                <Button variant="success" className="w-100 mt-3" onClick={handlePagar}>
                  Pagar con Mercado Pago
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Carrito;
