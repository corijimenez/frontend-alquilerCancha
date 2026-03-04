import React from "react";
import { Button, Row, Col, Card, Container, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { crearOrdenCarritoAPI } from "../../helpers/queriesPagos";
import { Link, useNavigate } from "react-router-dom";
import "./Carrito.css";

const Carrito = ({ carrito, setCarrito }) => {
  const navigate = useNavigate();

  const handlePagar = async () => {
    const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioKey")) || {};
    if (!usuarioLogueado?.token) {
      const resultado = await Swal.fire({
        title: "Iniciá sesión para continuar",
        text: "Para pagar tu carrito necesitás ingresar con tu cuenta.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ir a login",
        cancelButtonText: "Cancelar",
      });

      if (resultado.isConfirmed) {
        navigate("/login");
      }
      return;
    }

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

  const formatearMoneda = (valor) =>
    Number(valor || 0).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    });

  const actualizarCantidad = (id, cantidad) => {
    const nuevaCantidad = Number(cantidad);
    if (isNaN(nuevaCantidad) || nuevaCantidad < 1) return;
    const nuevoCarrito = carrito.map((item) =>
      item._id === id ? { ...item, quantity: nuevaCantidad } : item
    );
    setCarrito(nuevoCarrito);
  };

  const incrementar = (id) => {
    const producto = carrito.find((p) => p._id === id);
    if (producto) {
      actualizarCantidad(id, producto.quantity + 1);
    }
  };

  const decrementar = (id) => {
    const producto = carrito.find((p) => p._id === id);
    if (producto && producto.quantity > 1) {
      actualizarCantidad(id, producto.quantity - 1);
    }
  };

  return (
    <Container className="mainSection my-4 admin-wrap">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Carrito de Compras</h1>
        </div>
        <div className="admin-header-actions">
          <Button
            as={Link}
            to="/tienda"
            className="btn-admin-crear"
          >
            <i className="bi bi-cart3 me-2"></i>
            Ver productos
          </Button>
        </div>
      </div>

      {carrito.length === 0 ? (
        <Card className="reservar-cancha-card shadow carrito-empty">
          <Card.Body>
            <h4>Tu carrito está vacío</h4>
            <p>Agrega productos para poder continuar con la compra.</p>
          </Card.Body>
        </Card>
      ) : (
        <>
          <div className="table-responsive admin-table d-none d-md-block">
            <Table striped bordered hover variant="dark" className="mb-0 text-center align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item, idx) => (
                  <tr key={item._id || idx}>
                    <td>{idx + 1}</td>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img src={item.imagen} alt={item.nombreProducto} className="cart-img" />
                        <div>
                          <div className="fw-semibold">{item.nombreProducto}</div>
                        </div>
                      </div>
                    </td>
                    <td>{formatearMoneda(item.precio)}</td>
                    <td className="align-middle text-center">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <Button variant="outline-light" size="sm" onClick={() => decrementar(item._id)} disabled={item.quantity <= 1}>
                          <i className="bi bi-dash"></i>
                        </Button>
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          className="form-control form-control-sm text-center"
                          style={{ width: "60px", height: "32px" }}
                          onChange={(e) => actualizarCantidad(item._id, e.target.value)}
                        />
                        <Button variant="outline-light" size="sm" onClick={() => incrementar(item._id)}>
                          <i className="bi bi-plus"></i>
                        </Button>
                      </div>
                    </td>
                    <td>{formatearMoneda(item.precio * item.quantity)}</td>
                    <td>
                      <div className="acciones-botones">
                        <Button variant="danger" size="sm" onClick={() => handleBorrarProducto(item._id)}>
                          <i className="bi bi-trash3 me-2"></i>Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="d-md-none">
            {carrito.map((item, idx) => (
              <Card key={item._id || idx} className="mb-3 carrito-item-mobile bg-dark text-white border-0 shadow">
                <Card.Body>
                  <div className="d-flex gap-3">
                    <img src={item.imagen} alt={item.nombreProducto} className="cart-img" />
                    <div className="flex-grow-1">
                      <div className="fw-semibold">{item.nombreProducto}</div>
                      <div className="text-white-50 small">
                        Precio: {formatearMoneda(item.precio)}
                      </div>
                      <div className="text-warning fw-bold">
                        Subtotal: {formatearMoneda(item.precio * item.quantity)}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between gap-2 mt-3">
                    <div className="d-flex align-items-center gap-2">
                      <Button variant="outline-light" size="sm" onClick={() => decrementar(item._id)} disabled={item.quantity <= 1}>
                        <i className="bi bi-dash"></i>
                      </Button>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        className="form-control form-control-sm text-center carrito-cantidad-input"
                        onChange={(e) => actualizarCantidad(item._id, e.target.value)}
                      />
                      <Button variant="outline-light" size="sm" onClick={() => incrementar(item._id)}>
                        <i className="bi bi-plus"></i>
                      </Button>
                    </div>

                    <Button variant="danger" size="sm" onClick={() => handleBorrarProducto(item._id)}>
                      <i className="bi bi-trash3 me-1"></i>Eliminar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>

          <Card className="mt-3 carrito-total-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Total del carrito:</h5>
                <h5 className="mb-0 text-warning">{formatearMoneda(calcularTotal())}</h5>
              </div>
              <Button variant="success" className="w-100 mt-3" onClick={handlePagar}>
                Pagar con Mercado Pago
              </Button>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default Carrito;
