import { BrowserRouter, Routes, Route } from "react-router";
import Inicio from "./components/pages/Inicio";
import Login from "./components/pages/Login";
import Administrador from "./components/pages/Administrador";
import DetalleProducto from "./components/pages/DetalleProducto";
import FormularioProducto from "./components/pages/FormularioProducto";
import Error404 from "./components/pages/Error404";
import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <BrowserRouter>
      <Menu></Menu>
      <Routes>
        <Route path="/" element={<Inicio></Inicio>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/detalle" element={<DetalleProducto></DetalleProducto>} />
        <Route
          path="/administrador"
          element={<Administrador></Administrador>}
        />
        <Route
          path="/administrador/crear"
          element={<FormularioProducto></FormularioProducto>}
        />
        <Route
          path="/administrador/editar"
          element={<FormularioProducto></FormularioProducto>}
        />
        <Route path="*" element={<Error404></Error404>} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
