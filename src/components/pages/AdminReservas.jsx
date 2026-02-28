import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./AdminReservas.css";

const AdminReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const obtenerReservas = async () => {
    try {
      setError("");
      setCargando(true);

      const respuesta = await fetch("http://localhost:3000/api/canchas");
      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error("Error al obtener reservas");
      }

      setReservas(data);
    } catch (err) {
      setError("No se pudieron cargar las reservas");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  const borrarReserva = async (id) => {
    const confirmar = confirm("¿Seguro que querés eliminar esta reserva?");
    if (!confirmar) return;

    try {
      const respuesta = await fetch(`http://localhost:3000/api/canchas/${id}`, {
        method: "DELETE",
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        alert(data?.mensaje || "No se pudo eliminar la reserva");
        return;
      }

      await obtenerReservas();
    } catch (error) {
      alert("Error de conexión con el servidor");
    }
  };

  const cambiarEstado = async (reserva) => {
    const nuevoEstado =
      reserva.estado === "pendiente" ? "confirmada" : "pendiente";

    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/canchas/${reserva._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...reserva,
            estado: nuevoEstado,
          }),
        },
      );

      const data = await respuesta.json();

      if (!respuesta.ok) {
        alert(data?.mensaje || "No se pudo actualizar el estado");
        return;
      }

      await obtenerReservas();
    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <main className="container my-4 adminr-wrap">
      <div className="adminr-header">
        <div className="adminr-titlebox">
          <h1 className="adminr-title">Administrar Reservas</h1>
        </div>

        <div className="adminr-header-actions">
          {/* ✅ volver al panel */}
          <Button
            as={Link}
            to="/administrador"
            variant="outline-light"
            className="adminr-btn adminr-btn-back"
          >
            <i className="bi bi-arrow-left-circle me-2"></i>
            Volver al panel
          </Button>

          <Button
            variant="outline-light"
            onClick={obtenerReservas}
            disabled={cargando}
            className="adminr-btn adminr-btn-refresh"
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            {cargando ? "Actualizando..." : "Actualizar"}
          </Button>
        </div>
      </div>

      {cargando && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="light" />
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!cargando && reservas.length === 0 && (
        <div className="alert alert-info">No hay reservas registradas.</div>
      )}

      {!cargando && reservas.length > 0 && (
        <div className="table-responsive adminr-table">
          <Table striped bordered hover variant="dark" className="mb-0">
            {" "}
            <thead>
              <tr>
                <th className="adminr-col-num">#</th>
                <th>Cancha</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th className="adminr-col-precio">Precio</th>
                <th className="adminr-col-acciones">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva, index) => (
                <tr key={reserva._id}>
                  <td className="adminr-col-num">{index + 1}</td>
                  <td>{reserva.cancha}</td>
                  <td>{new Date(reserva.fecha).toLocaleDateString()}</td>
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

                  <td className="adminr-col-precio">${reserva.precio}</td>

                  {/* ✅ NO poner d-flex en el <td>, poner el wrapper */}
                  <td className="adminr-col-acciones">
                    <div className="adminr-actions">
                      <Button
                        variant={
                          reserva.estado === "pendiente" ? "success" : "warning"
                        }
                        size="sm"
                        className="adminr-action-btn adminr-action-state"
                        onClick={() => cambiarEstado(reserva)}
                      >
                        {reserva.estado === "pendiente"
                          ? "Confirmar"
                          : "Pendiente"}
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        className="adminr-action-btn adminr-action-delete"
                        onClick={() => borrarReserva(reserva._id)}
                      >
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
