import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Administrador = () => {
  return (
    <main className="container my-4">
      <div className="mb-4">
        <h1 className="text-white fw-bold">Panel Administrador</h1>
        <p className="text-white-50 mb-0">
          Gestioná productos, usuarios y reservas desde un solo lugar.
        </p>
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <Card className="border-0 shadow-lg bg-dark text-white h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "44px", height: "44px", background: "#1F8A3B" }}
                >
                  <i className="bi bi-bag-fill"></i>
                </div>
                <div>
                  <h2 className="h5 mb-0">Productos</h2>
                  <small className="text-white-50">CRUD del ecommerce</small>
                </div>
              </div>

              <p className="text-white-50">
                Creá, editá o eliminá productos del catálogo.
              </p>

              <div className="d-flex gap-2 flex-wrap">
                <Button
                  as={Link}
                  to="/admin/productos"
                  className="btn-verde-cancha"
                >
                  Administrar
                </Button>
                <Button
                  as={Link}
                  to="/administrador/crear"
                  variant="outline-light"
                >
                  Crear nuevo
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-12 col-md-6">
          <Card className="border-0 shadow-lg bg-dark text-white h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "44px", height: "44px", background: "#1A73E8" }}
                >
                  <i className="bi bi-people-fill"></i>
                </div>
                <div>
                  <h2 className="h5 mb-0">Usuarios</h2>
                  <small className="text-white-50">Gestión de cuentas</small>
                </div>
              </div>

              <p className="text-white-50">
                Visualizá usuarios y administrá roles (si lo implementan).
              </p>

              <Button as={Link} to="/admin/usuarios" variant="outline-light">
                Ver usuarios
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-12">
          <Card className="border-0 shadow-lg bg-dark text-white">
            <Card.Body className="p-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "#F4B400",
                    color: "#121212",
                  }}
                >
                  <i className="bi bi-calendar-check-fill"></i>
                </div>
                <div>
                  <h2 className="h5 mb-0">Reservas</h2>
                  <small className="text-white-50">Control de turnos</small>
                </div>
              </div>

              <Button as={Link} to="/admin/reservas" variant="outline-light">
                Gestionar reservas
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Administrador;