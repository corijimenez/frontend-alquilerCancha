import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

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

      // ✅ vuelve a pedir GET para sincronizar con la DB real
      await obtenerReservas();
    } catch (error) {
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <main className="container my-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">
        <div>
          <h1 className="text-white fw-bold mb-1">Administrar Reservas</h1>
          <p className="text-white-50 mb-0">
            Endpoint actual del backend: <span className="text-white">/api/canchas</span>
          </p>
        </div>

        <Button variant="outline-light" onClick={obtenerReservas} disabled={cargando}>
          {cargando ? "Actualizando..." : "Actualizar"}
        </Button>
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
        <Table striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Cancha</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estado</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {reservas.map((reserva, index) => (
              <tr key={reserva._id}>
                <td>{index + 1}</td>
                <td>{reserva.cancha}</td>
                <td>{new Date(reserva.fecha).toLocaleDateString()}</td>
                <td>{reserva.hora}</td>
                <td className={reserva.estado === "confirmada" ? "text-success" : "text-warning"}>
                  {reserva.estado}
                </td>
                <td>${reserva.precio}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => borrarReserva(reserva._id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </main>
  );
};

export default AdminReservas;