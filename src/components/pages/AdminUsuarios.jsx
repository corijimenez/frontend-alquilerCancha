import { useEffect, useMemo, useState } from "react";
import { Button, Form, InputGroup, Table, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  listarUsuariosApi,
  cambiarEstadoUsuarioApi,
  cambiarRolUsuarioApi,
} from "../../helpers/queries";

// ✅ helper: sacar el id del token (payload trae { id, role })
const obtenerIdDesdeToken = (token) => {
  try {
    if (!token) return null;
    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    return payload.id || null;
  } catch (error) {
    console.error("No se pudo leer el token:", error);
    return null;
  }
};

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  // ✅ loading por acción (para no spammear los PUT)
  const [accionandoEstadoId, setAccionandoEstadoId] = useState(null);
  const [accionandoRolId, setAccionandoRolId] = useState(null);

  const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioKey")) || {};
  const token = usuarioLogueado.token;
  const miId = obtenerIdDesdeToken(token);

  const cargarUsuarios = async () => {
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

  useEffect(() => {
    cargarUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const esMiUsuario = (idUsuario) => miId && idUsuario === miId;

  const cambiarEstado = async (usuario) => {
    if (!token) {
      Swal.fire("Sin sesión", "Debés iniciar sesión nuevamente.", "warning");
      return;
    }

    // ✅ regla: no permitir desactivarte a vos mismo
    if (esMiUsuario(usuario._id)) {
      Swal.fire(
        "Acción bloqueada",
        "No podés desactivar tu propio usuario administrador.",
        "info"
      );
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

    try {
      setAccionandoEstadoId(usuario._id);

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

      // ✅ actualizo local (rápido)
      setUsuarios((prev) =>
        prev.map((u) =>
          u._id === usuario._id ? { ...u, active: nuevoEstado } : u
        )
      );

      Swal.fire("Listo", "Estado actualizado correctamente.", "success");
    } finally {
      setAccionandoEstadoId(null);
    }
  };

  const cambiarRol = async (usuario) => {
    if (!token) {
      Swal.fire("Sin sesión", "Debés iniciar sesión nuevamente.", "warning");
      return;
    }

    // ✅ regla: no permitir cambiarte el rol a vos mismo
    if (esMiUsuario(usuario._id)) {
      Swal.fire(
        "Acción bloqueada",
        "No podés cambiar tu propio rol desde el panel.",
        "info"
      );
      return;
    }

    const nuevoRol = usuario.role === "admin" ? "user" : "admin";

    const confirmacion = await Swal.fire({
      title: "¿Cambiar rol?",
      html: `Vas a cambiar el rol de <b>${usuario.nombre}</b> a <b>${nuevoRol}</b>.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (!confirmacion.isConfirmed) return;

    try {
      setAccionandoRolId(usuario._id);

      const respuesta = await cambiarRolUsuarioApi(
        usuario._id,
        nuevoRol,
        token
      );

      if (!respuesta.ok) {
        Swal.fire(
          "Error",
          respuesta.data?.mensaje || "No se pudo actualizar el rol.",
          "error"
        );
        return;
      }

      setUsuarios((prev) =>
        prev.map((u) => (u._id === usuario._id ? { ...u, role: nuevoRol } : u))
      );

      Swal.fire("Listo", "Rol actualizado correctamente.", "success");
    } finally {
      setAccionandoRolId(null);
    }
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

          <Button variant="outline-info" onClick={cargarUsuarios} disabled={cargando}>
            <i className="bi bi-arrow-clockwise me-2"></i>
            Recargar
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
              {usuariosFiltrados.map((u, index) => {
                const bloqueado = esMiUsuario(u._id);

                return (
                  <tr key={u._id}>
                    <td>{index + 1}</td>
                    <td>
                      {u.nombre}{" "}
                      {bloqueado && (
                        <Badge bg="light" text="dark" className="ms-2">
                          vos
                        </Badge>
                      )}
                    </td>
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
                          disabled={bloqueado || accionandoEstadoId === u._id}
                        >
                          <i className="bi bi-toggle2-on me-2"></i>
                          {accionandoEstadoId === u._id
                            ? "Procesando..."
                            : u.active
                            ? "Desactivar"
                            : "Activar"}
                        </Button>

                        <Button
                          size="sm"
                          variant="info"
                          onClick={() => cambiarRol(u)}
                          disabled={bloqueado || accionandoRolId === u._id}
                        >
                          <i className="bi bi-shield-lock me-2"></i>
                          {accionandoRolId === u._id
                            ? "Procesando..."
                            : "Cambiar rol"}
                        </Button>
                      </div>

                      {bloqueado && (
                        <small className="text-white-50 d-block mt-1">
                          * No se permite modificar tu propio usuario.
                        </small>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </main>
  );
};

export default AdminUsuarios;