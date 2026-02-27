import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listarProductosApi, borrarProductoApi } from "../../helpers/queries";
import "./AdminProductos.css";

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
    <main className="container my-4 admin-productos">

      <div className="admin-header">
        <h1 className="admin-title">
          Administrar Productos
        </h1>

        <Button
          as={Link}
          to="/administrador/crear"
          className="btn-crear-producto"
        >
          <i className="bi bi-plus-circle me-2"></i>
          Crear producto
        </Button>
      </div>

      <Table striped bordered hover variant="dark" className="admin-table">
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
                    as={Link}
                    to={`/administrador/editar/${producto._id}`}
                    className="btn-editar"
                    size="sm"
                  >
                    Editar
                  </Button>

                  <Button
                    onClick={() => eliminarProducto(producto._id)}
                    className="btn-eliminar ms-2"
                    size="sm"
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