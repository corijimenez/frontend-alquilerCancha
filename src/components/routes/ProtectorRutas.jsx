import { Navigate, Outlet } from "react-router-dom";

const ProtectorRutas = () => {
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioKey")) || {};

  if (!usuarioLogueado.token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectorRutas;