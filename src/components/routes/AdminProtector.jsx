import { Navigate, Outlet } from "react-router-dom";

const AdminProtector = () => {
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioKey")) || {};

  if (!usuarioLogueado.token) {
    return <Navigate to="/login" replace />;
  }

  if (usuarioLogueado.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
  
};

export default AdminProtector