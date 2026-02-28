import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const [errores, setErrores] = useState({ email: "", password: "" });
  const [enviando, setEnviando] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevosErrores = { email: "", password: "" };

    if (!email.trim()) {
      nuevosErrores.email = "El email es obligatorio";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nuevosErrores.email = "Debe ser un email válido";
    }

    if (!password.trim()) {
      nuevosErrores.password = "La contraseña es obligatoria";
    } else if (password.length < 8) {
      nuevosErrores.password = "Mínimo 8 caracteres";
    }

    setErrores(nuevosErrores);
    const hayErrores = nuevosErrores.email || nuevosErrores.password;
    if (hayErrores) return;

    setEnviando(true);
    setErrorGeneral("");

    try {
      const respuesta = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        setErrorGeneral(data?.mensaje || "Error al iniciar sesión");
        setEnviando(false);
        return;
      }

      const usuario = {
        nombre: data.nombre,
        role: data.role,
        token: data.token,
      };
      sessionStorage.setItem("usuarioKey", JSON.stringify(usuario));

      setEnviando(false);
      navigate("/administrador");
    } catch (error) {
      setErrorGeneral("No se pudo conectar con el servidor");
      setEnviando(false);
    }
  };

  return (
    <Container className="my-5 login-wrap">
      <Card className="login-card border-0 shadow-lg">
        <Card.Body className="p-4 p-md-5">
          <div className="text-center mb-4">
            <div className="login-badge mx-auto mb-3">
              <i className="bi bi-trophy-fill"></i>
            </div>
            <h1 className="h3 mb-1 text-white">Iniciar sesión</h1>
            <p className="text-white-50 mb-0">
              Accedé para administrar productos y gestionar la tienda.
            </p>
          </div>

          {errorGeneral && (
            <div className="alert alert-danger py-2 mb-3" role="alert">
              {errorGeneral}
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="text-white-50">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresá tu email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrores({ ...errores, email: "" });
                  setErrorGeneral("");
                }}
              />
              {errores.email && (
                <Form.Text className="text-danger">{errores.email}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3 position-relative" controlId="password">
              <Form.Label className="text-white-50">Contraseña</Form.Label>

              <Form.Control
                type={mostrarPassword ? "text" : "password"}
                placeholder="Ingresá tu contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrores({ ...errores, password: "" });
                  setErrorGeneral("");
                }}
                style={{ paddingRight: "44px" }}
              />

              <button
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                aria-label={
                  mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                className="btn btn-link p-0"
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "38px",
                  color: "#1F8A3B",
                  textDecoration: "none",
                }}
              >
                <i
                  className={`bi ${mostrarPassword ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </button>

              {errores.password && (
                <Form.Text className="text-danger">{errores.password}</Form.Text>
              )}
            </Form.Group>

            <div className="d-grid mt-4">
              <Button
                className="btn-verde-cancha py-2"
                type="submit"
                disabled={enviando}
              >
                {enviando ? "Enviando..." : "Entrar"}
              </Button>
            </div>

            <div className="text-center mt-3">
              <p className="text-white-50 mb-0">
                ¿No tenés cuenta?{" "}
                <button
                  type="button"
                  className="login-register-link"
                  onClick={() => navigate("/registro")}
                >
                  Registrate
                </button>
              </p>

              <Button
                variant="outline-light"
                size="sm"
                className="mt-3"
                onClick={() => navigate("/")}
              >
                Volver al inicio
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;