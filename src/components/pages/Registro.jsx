import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const validar = () => {
    let nuevosErrores = {};

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    } else if (form.nombre.length < 2) {
      nuevosErrores.nombre = "Debe tener al menos 2 caracteres";
    }

    if (!form.email.trim()) {
      nuevosErrores.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nuevosErrores.email = "Email inválido";
    }

    if (!form.password) {
      nuevosErrores.password = "La contraseña es obligatoria";
    } else if (form.password.length < 8) {
      nuevosErrores.password = "Debe tener al menos 8 caracteres";
    }

    if (!form.repeatPassword) {
      nuevosErrores.repeatPassword = "Debés repetir la contraseña";
    } else if (form.password !== form.repeatPassword) {
    nuevosErrores.repeatPassword = "Las contraseñas no coinciden";
    }

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccess("");

    if (!validar()) return;

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:3000/api/usuarios/registro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          password: form.password, 
       }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Si express-validator manda array de errores
        if (data.errors) {
          setServerError(data.errors[0].msg);
        } else {
          setServerError(data.message || "Error al registrar");
        }
        return;
      }

      //mensaje exitoso y redireccion a login
      setSuccess("Usuario registrado correctamente 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

      //mensaje de error de conexión
    } catch (error) {
      setServerError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
   
  <div
    className="d-flex justify-content-center align-items-center vh-100 position-relative"
  >
    <div
  className="card shadow p-4 text-white position-relative"
  style={{
    width: "100%",
    maxWidth: "420px",
    borderRadius: "12px",
    backgroundImage: "url('/noche.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
    border: "none",
  }}
>
  {/* Overlay oscuro */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.65)",
      zIndex: 1,
    }}
  ></div>

  {/* Contenido encima */}
  <div style={{ position: "relative", zIndex: 2 }}>
      <h1
        className="text-center text-white mb-4"
         style={{ fontWeight: "600" }}
      >
        Crear Cuenta
      </h1>

      {serverError && (
        <div
          className="alert py-2"
          style={{
            backgroundColor: "#FDECEA",
            color: "#D93025",
            border: "1px solid #D93025",
          }}
        >
          {serverError}
        </div>
      )}

      {success && (
        <div
          className="alert py-2"
          style={{
            backgroundColor: "#E6F4EA",
            color: "#1F8A3B",
            border: "1px solid #1F8A3B",
          }}
        >
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label text-white">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            placeholder="Ingresá tu nombre"
            className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
            value={form.nombre}
            onChange={handleChange}
            style={{ borderColor: "#E5E5E5" }}
          />
          {errors.nombre && (
            <div
              className="invalid-feedback"
              style={{ color: "#D93025" }}
            >
              {errors.nombre}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Ingresá tu email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={form.email}
            onChange={handleChange}
            style={{ borderColor: "#E5E5E5" }}
          />
          {errors.email && (
            <div
              className="invalid-feedback"
              style={{ color: "#D93025" }}
            >
              {errors.email}
            </div>
          )}
        </div>

        <div className="mb-3">
  <label className="form-label text-white">
    Contraseña
  </label>

  <div className="input-group">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="Ingresá tu contraseña"
      className={`form-control ${errors.password ? "is-invalid" : ""}`}
      value={form.password}
      onChange={handleChange}
    />
    <button
      type="button"
      className="btn btn-outline-light"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? "🕶️" : "👁"}
    </button>
  </div>

      {errors.password && (
    <div className="invalid-feedback d-block">
      {errors.password}
    </div>
    )}
    </div>

  <div className="mb-4">
  <label className="form-label text-white">
    Repetir contraseña
  </label>

  <div className="input-group">
    <input
      type={showRepeatPassword ? "text" : "password"}
      name="repeatPassword"
      placeholder="Repetí tu contraseña"
      className={`form-control ${errors.repeatPassword ? "is-invalid" : ""}`}
      value={form.repeatPassword}
      onChange={handleChange}
    />
    <button
      type="button"
      className="btn btn-outline-light"
      onClick={() => setShowRepeatPassword(!showRepeatPassword)}
    >
      {showRepeatPassword ? "🕶️" : "👁"}
    </button>
  </div>

  {errors.repeatPassword && (
    <div className="invalid-feedback d-block">
      {errors.repeatPassword}
    </div>
  )}
</div>

        <button
          type="submit"
          className="btn w-100"
          disabled={loading}
          style={{
            backgroundColor: "#1F8A3B",
            color: "#FFFFFF",
            fontWeight: "500",
          }}
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      <div className="text-center mt-3 text-white">
        <small>
          ¿Ya tenés cuenta?{" "}
          <span
            style={{ color: "#1A73E8", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </span>
        </small>
      </div>
    </div>
  </div>
  </div>
);
}

export default Registro;