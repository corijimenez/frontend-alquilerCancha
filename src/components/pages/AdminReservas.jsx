import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

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
        <div className="alert alert-info">
          No hay reservas registradas.
        </div>
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
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </main>
  );
};

export default AdminReservas;