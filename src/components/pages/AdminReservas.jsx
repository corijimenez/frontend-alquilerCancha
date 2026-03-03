import { useEffect, useMemo, useState } from "react";
import { Table, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import {
  listarReservasApi,
  borrarReservaApi,
  cambiarEstadoReservaApi,
} from "../../helpers/queries";
import "./AdminReservas.css";

const AdminReservas = () => {
  const location = useLocation();
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");

  // ✅ Función para formatear fechas evitando problemas de timezone
  const formatearFecha = (fechaString) => {
    if (!fechaString) return "-";
    // Si la fecha viene como "YYYY-MM-DD", la mostramos tal cual o la manipulamos controladamente
    return fechaString; 
  };

  const obtenerReservas = async () => {
    setError("");
    setCargando(true);

    const respuesta = await listarReservasApi();

    if (respuesta.ok) {
      setReservas(respuesta.data);
    } else {
      setReservas([]);
      setError("No se pudieron cargar las reservas");
    }

    setCargando(false);
  };

  useEffect(() => {
    // Priorizar datos que vengan por navegación, si no, consultar API
    if (location.state?.reservas) {
      setReservas(location.state.reservas);
      setCargando(false);
    } else {
      obtenerReservas();
    }
  }, [location.state]);

  const reservasFiltradas = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return reservas;

    return reservas.filter((r) => {
      const cancha = (r.cancha || "").toLowerCase();
      const estado = (r.estado || "").toLowerCase();
      const hora = (r.hora || "").toLowerCase();
      const fecha = formatearFecha(r.fecha).toLowerCase();
      
      // Datos de usuario (si el objeto está populado)
      const usuarioNombre = 
        typeof r.usuario === "object" ? (r.usuario?.nombre || "").toLowerCase() : "";
      const usuarioEmail = 
        typeof r.usuario === "object" ? (r.usuario?.email || "").toLowerCase() : "";

      return (
        cancha.includes(texto) ||
        estado.includes(texto) ||
        hora.includes(texto) ||
        fecha.includes(texto) ||
        usuarioNombre.includes(texto) ||
        usuarioEmail.includes(texto)
      );
    });
  }, [busqueda, reservas]);

  const borrarReserva = async (reserva) => {
    const confirmacion = await Swal.fire({
      title: "¿Eliminar reserva?",
      html: `Vas a eliminar la reserva de <b>${reserva.cancha}</b>.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (!confirmacion.isConfirmed) return;

    const usuario = JSON.parse(sessionStorage.getItem("usuarioKey")) || {};
    const respuesta = await borrarReservaApi(reserva._id, usuario.token);

    if (respuesta.ok) {
      await Swal.fire({
        title: "Eliminada",
        text: "La reserva fue eliminada correctamente.",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
      obtenerReservas();
    } else {
      await Swal.fire({
        title: "No se pudo eliminar",
        text: respuesta.data?.mensaje || "Ocurrió un error.",
        icon: "error",
      });
    }
  };

  const cambiarEstado = async (reserva) => {
    const nuevoEstado =
      reserva.estado === "pendiente" ? "confirmada" : "pendiente";

    const usuario = JSON.parse(sessionStorage.getItem("usuarioKey")) || {};
    const respuesta = await cambiarEstadoReservaApi(
      reserva,
      nuevoEstado,
      usuario.token
    );

    if (respuesta.ok) {
      obtenerReservas();
    } else {
      Swal.fire({
        title: "No se pudo actualizar",
        text: respuesta.data?.mensaje || "No se pudo actualizar el estado",
        icon: "error",
      });
    }
  };

  return (
    <main className="container my-4 reservas-wrap">
      <div className="reservas-header">
        <div>
          <h1 className="reservas-title">Administrar Reservas</h1>
        </div>

        <div className="reservas-header-actions">
          <Button
            as={Link}
            to="/reserva"
            variant="outline-light"
            className="reservas-btn-top"
          >
            <i className="bi bi-calendar-plus me-2"></i>
            Reservar cancha
          </Button>

          <Button
            as={Link}
            to="/administrador"
            variant="outline-light"
            className="reservas-btn-top"
          >
            <i className="bi bi-arrow-left-circle me-2"></i>
            Volver al panel
          </Button>

          <Button
            variant="outline-light"
            onClick={obtenerReservas}
            disabled={cargando}
            className="reservas-btn-top"
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            {cargando ? "Actualizando..." : "Actualizar"}
          </Button>
        </div>
      </div>

      <div className="reservas-search">
        <InputGroup>
          <InputGroup.Text className="reservas-search-icon">
            <i className="bi bi-search"></i>
          </InputGroup.Text>

          <Form.Control
            className="reservas-search-input"
            placeholder="Buscar por cancha, usuario, estado, fecha u hora..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <Button
            variant="outline-light"
            className="reservas-search-clear"
            onClick={() => setBusqueda("")}
            disabled={!busqueda}
          >
            Limpiar
          </Button>
        </InputGroup>

        {!cargando && (
          <small className="reservas-search-info">
            Mostrando <b>{reservasFiltradas.length}</b> de <b>{reservas.length}</b>
          </small>
        )}
      </div>

      {cargando && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="light" />
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!cargando && reservasFiltradas.length === 0 && (
        <div className="alert alert-info">
          {busqueda.trim()
            ? "No se encontraron reservas con esa búsqueda."
            : "No hay reservas registradas."}
        </div>
      )}

      {!cargando && reservasFiltradas.length > 0 && (
        <div className="table-responsive reservas-table">
          <Table striped bordered hover variant="dark" className="mb-0">
            <thead>
              <tr>
                <th className="col-num">#</th>
                <th>Cancha</th>
                <th>Usuario</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th className="col-precio">Precio</th>
                <th className="col-acciones text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {reservasFiltradas.map((reserva, index) => (
                <tr key={reserva._id}>
                  <td className="col-num">{index + 1}</td>
                  <td>{reserva.cancha}</td>
                  <td>
                    {typeof reserva.usuario === "object" && reserva.usuario ? (
                      <div className="d-flex flex-column">
                        <span className="fw-semibold">
                          {reserva.usuario?.nombre || "Sin nombre"}
                        </span>
                        <small className="text-white-50">
                          {reserva.usuario?.email || ""}
                        </small>
                      </div>
                    ) : (
                      <span className="text-white-50">Sin usuario</span>
                    )}
                  </td>
                  <td>{formatearFecha(reserva.fecha)}</td>
                  <td>{reserva.hora}</td>
                  <td
                    className={
                      reserva.estado === "confirmada"
                        ? "text-success fw-semibold"
                        : "text-warning fw-semibold"
                    }
                  >
                    {reserva.estado}
                  </td>
                  <td className="col-precio">${reserva.precio}</td>

                  <td className="col-acciones">
                    <div className="reservas-actions">
                      <Button
                        variant={reserva.estado === "pendiente" ? "success" : "warning"}
                        size="sm"
                        className="btn-accion"
                        onClick={() => cambiarEstado(reserva)}
                      >
                        <i className="bi bi-arrow-repeat me-2"></i>
                        {reserva.estado === "pendiente"
                          ? "Confirmar"
                          : "Marcar pendiente"}
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        className="btn-accion"
                        onClick={() => borrarReserva(reserva)}
                      >
                        <i className="bi bi-trash3 me-2"></i>
                        Eliminar
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

export default AdminReservas;