import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listarProductosApi, borrarProductoApi } from "../../helpers/queries";

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    setCargando(true);

    const respuesta = await listarProductosApi();

    if (respuesta.ok) {
      setProductos(respuesta.data);
    } else {
      setProductos([]);
      console.log("Error al listar productos:", respuesta.data);
    }

    setCargando(false);
  };

  const eliminarProducto = async (id) => {
    const usuario = JSON.parse(sessionStorage.getItem("usuarioKey")) || {};

    const respuesta = await borrarProductoApi(id, usuario.token);

    if (respuesta.ok) {
      obtenerProductos();
    } else {
      console.log("Error al borrar:", respuesta.data);
    }
  };

  return (
    <main className="container my-4">
      <h1 className="text-white fw-bold mb-4">Administrar Productos</h1>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {cargando ? (
            <tr>
              <td colSpan="4" className="text-center">
                Cargando productos...
              </td>
            </tr>
          ) : productos.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No hay productos disponibles
              </td>
            </tr>
          ) : (
            productos.map((producto, index) => (
              <tr key={producto._id}>
                <td>{index + 1}</td>
                <td>{producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    as={Link}
                    to={`/administrador/editar/${producto._id}`}
                  >
                    Editar
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => eliminarProducto(producto._id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </main>
  );
};

export default AdminProductos;