import { useEffect, useMemo, useState } from "react";
import { Button, Form, InputGroup, Table, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { listarUsuariosApi, cambiarEstadoUsuarioApi } from "../../helpers/queries";

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarUsuarios = async () => {
      const usuarioLogueado =
        JSON.parse(sessionStorage.getItem("usuarioKey")) || {};
      const token = usuarioLogueado.token;

      if (!token) {
        setCargando(false);
        Swal.fire("Sin sesión", "Debés iniciar sesión nuevamente.", "warning");
        return;
      }

      const respuesta = await listarUsuariosApi(token);

      if (respuesta.ok) {
        setUsuarios(respuesta.data);
      } else {
        Swal.fire(
          "Error",
          respuesta.data?.mensaje || "No se pudieron cargar los usuarios.",
          "error"
        );
      }

      setCargando(false);
    };

    cargarUsuarios();
  }, []);

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

  const badgeRol = (role) => {
    if (role === "admin") return <Badge bg="primary">admin</Badge>;
    return <Badge bg="secondary">user</Badge>;
  };

  const badgeEstado = (active) => {
    if (active) return <Badge bg="success">activo</Badge>;
    return <Badge bg="danger">inactivo</Badge>;
  };

  const cambiarEstado = async (usuario) => {
    const usuarioLogueado =
      JSON.parse(sessionStorage.getItem("usuarioKey")) || {};
    const token = usuarioLogueado.token;

    if (!token) {
      Swal.fire("Sin sesión", "Debés iniciar sesión nuevamente.", "warning");
      return;
    }

    const confirmacion = await Swal.fire({
      title: "¿Cambiar estado?",
      html: `Vas a ${usuario.active ? "desactivar" : "activar"} a <b>${
        usuario.nombre
      }</b>.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (!confirmacion.isConfirmed) return;

    const nuevoEstado = !usuario.active;

    const respuesta = await cambiarEstadoUsuarioApi(
      usuario._id,
      nuevoEstado,
      token
    );

    if (!respuesta.ok) {
      Swal.fire(
        "Error",
        respuesta.data?.mensaje || "No se pudo actualizar el estado.",
        "error"
      );
      return;
    }

    // ✅ actualizo la tabla sin volver a pedir todo al back
    setUsuarios((prev) =>
      prev.map((u) =>
        u._id === usuario._id ? { ...u, active: nuevoEstado } : u
      )
    );

    Swal.fire("Listo", "Estado actualizado correctamente.", "success");
  };

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

      {cargando ? (
        <div className="alert alert-info">Cargando usuarios...</div>
      ) : usuariosFiltrados.length === 0 ? (
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
                  <td>{badgeRol(u.role)}</td>
                  <td>{badgeEstado(u.active)}</td>
                  <td>
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleString()
                      : "-"}
                  </td>

                  <td className="text-center">
                    <div className="d-flex gap-2 justify-content-center flex-wrap">
                      <Button
                        size="sm"
                        variant={u.active ? "warning" : "success"}
                        onClick={() => cambiarEstado(u)}
                      >
                        <i className="bi bi-toggle2-on me-2"></i>
                        {u.active ? "Desactivar" : "Activar"}
                      </Button>

                      <Button size="sm" variant="info" disabled>
                        <i className="bi bi-shield-lock me-2"></i>
                        Cambiar rol (paso 3)
                      </Button>
                    </div>
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