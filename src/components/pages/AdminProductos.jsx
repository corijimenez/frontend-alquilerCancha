import { useEffect, useState } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
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

  const eliminarProducto = async (producto) => {
    const confirmacion = await Swal.fire({
      title: "¿Eliminar producto?",
      html: `Vas a eliminar <b>${producto.nombre}</b>. Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (!confirmacion.isConfirmed) return;

    const usuario = JSON.parse(sessionStorage.getItem("usuarioKey")) || {};
    const respuesta = await borrarProductoApi(producto._id, usuario.token);

    if (respuesta.ok) {
      await Swal.fire({
        title: "Eliminado",
        text: "El producto fue eliminado correctamente.",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
      obtenerProductos();
    } else {
      await Swal.fire({
        title: "No se pudo eliminar",
        text: respuesta.data?.mensaje || "Ocurrió un error.",
        icon: "error",
      });
    }
  };

  return (
    <main className="container my-4 admin-wrap">
      <div className="admin-header">
        <h1 className="admin-title">Administrar Productos</h1>

        <Button as={Link} to="/administrador/crear" className="btn-admin-crear">
          <i className="bi bi-plus-circle me-2"></i>
          Crear producto
        </Button>
      </div>

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

                  <td className="col-producto">
                    <div className="d-flex flex-column">
                      <span className="fw-semibold">{producto.nombre}</span>

                      {/* ✅ Solo stock (sin “Activo”) */}
                      <div className="mt-2">
                        <Badge
                          bg={Number(producto.stock) === 0 ? "danger" : "info"}
                          className="badge-stock"
                        >
                          Stock: {producto.stock ?? 0}
                        </Badge>
                      </div>
                    </div>
                  </td>

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
                        onClick={() => eliminarProducto(producto)}
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