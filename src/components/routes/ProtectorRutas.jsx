import { Navigate, Outlet } from "react-router-dom";

const ProtectorRutas = () => {
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioKey")) || {};

  if (!usuarioLogueado.token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ bloquear panel admin si no es admin
  if (usuarioLogueado.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectorRutas;