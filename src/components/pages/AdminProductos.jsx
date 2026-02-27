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
    <main className="container my-4 admin-wrap">
      <div className="admin-header">
        <h1 className="admin-title">Administrar Productos</h1>

        <Button
          as={Link}
          to="/administrador/crear"
          className="btn-admin-crear"
        >
          <i className="bi bi-plus-circle me-2"></i>
          Crear producto
        </Button>
      </div>

      {/* ✅ clave: en mobile NO se comprime, si no entra hace scroll */}
      <div className="table-responsive admin-table">
        <Table striped bordered hover variant="dark" className="mb-0">
          <thead>
            <tr>
              <th className="col-num">#</th>
              <th>Producto</th>
              <th className="col-precio">Precio</th>
              <th className="col-acciones">Acciones</th>
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
                  <td className="col-num">{index + 1}</td>
                  <td className="col-producto">{producto.nombre}</td>
                  <td className="col-precio">${producto.precio}</td>
                  <td className="col-acciones">
                    <div className="acciones-botones">
                      <Button
                        variant="warning"
                        size="sm"
                        className="btn-accion btn-editar"
                        as={Link}
                        to={`/administrador/editar/${producto._id}`}
                      >
                        Editar
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        className="btn-accion btn-eliminar"
                        onClick={() => eliminarProducto(producto._id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </main>
  );
};

export default AdminProductos;