import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

const AdminReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
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

      // ✅ actualizar tabla sin recargar
      setReservas((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <main className="container my-4">
      <h1 className="text-white fw-bold mb-4">Administrar Reservas</h1>

      {cargando && (
        <div className="text-center">
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
                <td>{reserva.estado}</td>
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