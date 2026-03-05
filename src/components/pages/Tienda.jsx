import { useEffect, useMemo, useState } from "react";
import { Row, Spinner } from "react-bootstrap";
import CardProducto from "./CardCarrito";
import { listarProductosApi } from "../../helpers/queries";

export default function Tienda({ agregarAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      setCargando(true);
      const resp = await listarProductosApi();
      if (resp.ok) {
        const lista = Array.isArray(resp.data) ? resp.data : resp.data?.productos || [];
        setProductos(lista);
      }
      else setProductos([]);
      setCargando(false);
    };

    fetchProductos();
    
  }, []);

  const productosNormalizados = useMemo(
    () =>
      productos.map((p) => ({
        _id: p._id,
        nombreProducto: p.nombre || p.nombreProducto,
        descripcion_breve: p.descripcion_breve || p.descripcion || "",
        precio: p.precio,
        imagen: p.imagen || p.img || "",
        categoria: (p.categoria || "sin-categoria").toLowerCase(),
      })),
    [productos],
  );

  const productosAgrupados = useMemo(() => {
    return productosNormalizados.reduce((acc, producto) => {
      const categoria = producto.categoria || "sin-categoria";
      if (!acc[categoria]) acc[categoria] = [];
      acc[categoria].push(producto);
      return acc;
    }, {});
  }, [productosNormalizados]);

  const categoriasOrdenadas = useMemo(
    () => Object.keys(productosAgrupados).sort((a, b) => a.localeCompare(b)),
    [productosAgrupados],
  );

  const formatearCategoria = (categoria) =>
    categoria
      .split("-")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ");

  if (cargando) return (
    <div className="text-center my-5">
      <Spinner animation="border" />
    </div>
  );

  return (
    <main className="container my-4">
      <h1 className="display-5 text-white mb-4">Tienda</h1>
      {categoriasOrdenadas.length === 0 ? (
        <p className="text-white-50">No hay productos disponibles por el momento.</p>
      ) : (
        categoriasOrdenadas.map((categoria) => (
          <section key={categoria} className="mb-5">
            <h2 className="h4 text-white mb-3 border-bottom pb-2">
              {formatearCategoria(categoria)}
            </h2>
            <Row>
              {productosAgrupados[categoria].map((producto) => (
                <CardProducto
                  key={producto._id}
                  producto={producto}
                  agregarAlCarrito={agregarAlCarrito}
                />
              ))}
            </Row>
          </section>
        ))
      )}
    </main>
  );
}
