import { useEffect, useMemo, useState } from "react";
import { Table, Button, Form, InputGroup, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { listarProductosApi, borrarProductoApi } from "../../helpers/queries";
import "./AdminProductos.css";

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // ✅ NUEVO: buscador
  const [busqueda, setBusqueda] = useState("");

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
    }

    setCargando(false);
  };

  // ✅ NUEVO: lista filtrada por nombre
  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return productos;

    return productos.filter((p) =>
      (p.nombre || "").toLowerCase().includes(texto),
    );
  }, [busqueda, productos]);

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
  <div>
    <h1 className="admin-title">Administrar Productos</h1>
  </div>

  <div className="admin-header-actions">
    <Button
      as={Link}
      to="/administrador"
      variant="outline-light"
      className="btn-admin-top"
    >
      <i className="bi bi-arrow-left-circle me-2"></i>
      Volver al panel
    </Button>

    <Button
      as={Link}
      to="/administrador/crear"
      className="btn-admin-crear"
    >
      <i className="bi bi-plus-circle me-2"></i>
      Crear producto
    </Button>
  </div>
</div>

      {/* ✅ NUEVO: buscador */}
      <div className="admin-search">
        <InputGroup>
          <InputGroup.Text>
            <i className="bi bi-search"></i>
          </InputGroup.Text>

          <Form.Control
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <Button
            variant="outline-light"
            onClick={() => setBusqueda("")}
            disabled={!busqueda}
          >
            Limpiar
          </Button>
        </InputGroup>

        {/* mini feedback */}
        {!cargando && (
          <small className="admin-search-info">
            Mostrando <b>{productosFiltrados.length}</b> de{" "}
            <b>{productos.length}</b>
          </small>
        )}
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
            ) : productosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  {busqueda.trim()
                    ? "No se encontraron productos con esa búsqueda"
                    : "No hay productos disponibles"}
                </td>
              </tr>
            ) : (
              productosFiltrados.map((producto, index) => (
                <tr key={producto._id}>
                  <td className="col-num">{index + 1}</td>

                  <td className="col-producto">
                    <div className="d-flex flex-column">
                      <span className="fw-semibold">{producto.nombre}</span>

                      {/* ✅ Stock (solo stock, sin “activo”) */}
                      <div className="d-flex gap-2 mt-2 flex-wrap">
                        <Badge bg="info">Stock: {producto.stock ?? 0}</Badge>
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
                        <i className="bi bi-pencil-square me-2"></i>
                        Editar
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        className="btn-accion btn-eliminar"
                        onClick={() => eliminarProducto(producto)}
                      >
                        <i className="bi bi-trash3 me-2"></i>
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
