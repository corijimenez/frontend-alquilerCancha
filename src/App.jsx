import { BrowserRouter, Routes, Route } from "react-router";
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
          <Route path="/administrador" element={<Administrador />} />
          <Route path="/administrador/crear" element={<FormularioProducto />} />
         <Route path="/administrador/editar/:id" element={<FormularioProducto />} />
          <Route path="/admin/reservas" element={<AdminReservas />} />
        </Route>
        <Route path="/admin/productos" element={<AdminProductos />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
