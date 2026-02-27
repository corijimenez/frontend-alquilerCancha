import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/productos");
      const data = await respuesta.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

const eliminarProducto = async (id) => {
  try {
    const usuarioLogueado =
      JSON.parse(sessionStorage.getItem("usuarioKey")) || {};

    const respuesta = await fetch(`http://localhost:3000/api/productos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${usuarioLogueado.token}`,
      },
    });

    const data = await respuesta.json().catch(() => null);

    if (!respuesta.ok) {
      console.log("Error al borrar:", data);
      return;
    }

    obtenerProductos(); // refresca lista
  } catch (error) {
    console.error("Error al eliminar producto:", error);
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
          {productos.length === 0 ? (
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