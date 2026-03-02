import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminUsuarios from "./components/pages/AdminUsuarios";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detalle" element={<DetalleProducto />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/nosotros" element={<QuienesSomos />} />

        {/* 🔒 Rutas protegidas */}
        <Route element={<ProtectorRutas />}>
          <Route path="/reserva" element={<ReservarCancha />} />

          {/* Panel admin */}
          <Route path="/administrador" element={<Administrador />} />
          <Route path="/admin/productos" element={<AdminProductos />} />
          <Route path="/admin/reservas" element={<AdminReservas />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />

          {/* CRUD productos */}
          <Route path="/administrador/crear" element={<FormularioProducto />} />
          <Route path="/administrador/editar/:id" element={<FormularioProducto />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}