import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminUsuarios = () => {
  return (
    <main className="container my-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
        <div>
          <h1 className="text-white fw-bold mb-1">Administrar Usuarios</h1>
          <p className="text-white-50 mb-0">
            Vista de usuarios + acciones (activar/desactivar y cambiar rol).
          </p>
        </div>

        <div className="d-flex gap-2">
          <Button as={Link} to="/administrador" variant="outline-light">
            <i className="bi bi-arrow-left-circle me-2"></i>
            Volver al panel
          </Button>
        </div>
      </div>

      <div className="alert alert-info mb-0">
        Próximo paso: buscador + tabla.
      </div>
    </main>
  );
};

export default AdminUsuarios;