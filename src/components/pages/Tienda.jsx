import { useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import CardProducto from "./CardCarrito";
import { listarProductosApi } from "../../helpers/queries";

export default function Tienda({ agregarAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      setCargando(true);
      const resp = await listarProductosApi();
      if (resp.ok) setProductos(resp.data || []);
      else setProductos([]);
      setCargando(false);
    };

    fetchProductos();
  }, []);

  if (cargando) return (
    <div className="text-center my-5">
      <Spinner animation="border" />
    </div>
  );

  return (
    <main className="container my-4">
      <h1 className="display-5 text-white mb-4">Tienda</h1>
      <Row>
        {productos.map((p) => {
          const producto = {
            _id: p._id,
            nombreProducto: p.nombre || p.nombreProducto,
            descripcion_breve: p.descripcion_breve || p.descripcion || "",
            precio: p.precio,
            imagen: p.imagen || p.img || "",
          };

          return (
            <CardProducto
              key={producto._id}
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
            />
          );
        })}
      </Row>
    </main>
  );
}
