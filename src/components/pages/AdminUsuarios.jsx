import { useMemo, useState } from "react";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminUsuarios = () => {
  const [usuarios] = useState([
    {
      _id: "1",
      nombre: "Admin Principal",
      email: "admin2@canchas.com",
      role: "admin",
      active: true,
      createdAt: "2026-02-28T03:03:29.035Z",
    },
    {
      _id: "2",
      nombre: "gaston",
      email: "gastongomez875@gmail.com",
      role: "user",
      active: false,
      createdAt: "2026-03-01T06:44:29.367Z",
    },
  ]);

  const [busqueda, setBusqueda] = useState("");

  const usuariosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return usuarios;

    return usuarios.filter((u) => {
      const nombre = (u.nombre || "").toLowerCase();
      const email = (u.email || "").toLowerCase();
      const role = (u.role || "").toLowerCase();
      const estado = u.active ? "activo" : "inactivo";

      return (
        nombre.includes(texto) ||
        email.includes(texto) ||
        role.includes(texto) ||
        estado.includes(texto)
      );
    });
  }, [busqueda, usuarios]);

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

      <div className="mb-3">
        <InputGroup>
          <InputGroup.Text>
            <i className="bi bi-search"></i>
          </InputGroup.Text>

          <Form.Control
            placeholder="Buscar por nombre, email, rol o estado..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <Button
            variant="outline-light"
            onClick={() => setBusqueda("")}
            disabled={!busqueda}
          >
            Limpiar
          </Button>
        </InputGroup>

        <small className="text-white-50">
          Mostrando <b>{usuariosFiltrados.length}</b> de <b>{usuarios.length}</b>
        </small>
      </div>

      {usuariosFiltrados.length === 0 ? (
        <div className="alert alert-info">
          {busqueda.trim()
            ? "No se encontraron usuarios con esa búsqueda."
            : "No hay usuarios para mostrar."}
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover variant="dark" className="mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Creado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {usuariosFiltrados.map((u, index) => (
                <tr key={u._id}>
                  <td>{index + 1}</td>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.active ? "activo" : "inactivo"}</td>
                  <td>
                    {u.createdAt ? new Date(u.createdAt).toLocaleString() : "-"}
                  </td>
                  <td className="text-center">
                    <small className="text-white-50">
                      Próximo paso: botones
                    </small>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </main>
  );
};

export default AdminUsuarios;