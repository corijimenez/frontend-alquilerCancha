import { BrowserRouter, Routes, Route } from "react-router";
import { useState } from "react";
import Inicio from "./components/pages/Inicio";
import Login from "./components/pages/Login";
import Administrador from "./components/pages/Administrador";
import DetalleProducto from "./components/pages/DetalleProducto";
import FormularioProducto from "./components/pages/FormularioProducto";
import Error404 from "./components/pages/Error404";
import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";
import Contacto from "./components/pages/Contacto";
import QuienesSomos from "./components/pages/QuienesSomos";
import ReservarCancha from "./components/pages/ReservarCancha";
import AdminReservas from "./components/pages/AdminReservas";
import ProtectorRutas from "./components/routes/ProtectorRutas";
import AdminProductos from "./components/pages/AdminProductos";
import Carrito from "./components/pages/Carrito";
import Tienda from "./components/pages/Tienda";
import AdminUsuarios from "./components/pages/AdminUsuarios";

function App() {
  const [carrito, setCarrito] = useState([]);
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const id = producto._id || producto.id || producto.nombreProducto || producto.nombre || JSON.stringify(producto.nombre || producto);
      const nombre = producto.nombreProducto || producto.nombre || "Producto";
      const precio = Number(producto.precio) || 0;
      const imagen = producto.imagen || producto.img || "";

      const existente = prev.find((p) => p._id === id);
      if (existente) {
        return prev.map((p) =>
          p._id === id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }

      const nuevo = {
        _id: id,
        nombreProducto: nombre,
        precio,
        imagen,
        quantity: 1,
      };

      return [...prev, nuevo];
    });
  };
  return (
    <BrowserRouter>
      <Menu carrito={carrito} />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detalle" element={<DetalleProducto />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/nosotros" element={<QuienesSomos />} />
        <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
        <Route path="/tienda" element={<Tienda agregarAlCarrito={agregarAlCarrito} />} />
        
        

        {/* 🔒 Rutas protegidas */}
        <Route element={<ProtectorRutas />}>
         <Route path="/reserva" element={<ReservarCancha />} />
          <Route path="/administrador" element={<Administrador />} />
          <Route path="/administrador/crear" element={<FormularioProducto />} />
         <Route path="/administrador/editar/:id" element={<FormularioProducto />} />
          <Route path="/admin/reservas" element={<AdminReservas />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        </Route>
        <Route path="/admin/productos" element={<AdminProductos />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
