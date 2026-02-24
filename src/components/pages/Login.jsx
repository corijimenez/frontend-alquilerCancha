import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ errores por campo
  const [errores, setErrores] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ limpiamos errores antes de validar
    const nuevosErrores = { email: "", password: "" };

    // ✅ validación email
    if (!email.trim()) {
      nuevosErrores.email = "El email es obligatorio";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nuevosErrores.email = "Debe ser un email válido";
    }

    // ✅ validación password
    if (!password.trim()) {
      nuevosErrores.password = "La contraseña es obligatoria";
    } else if (password.length < 8) {
      nuevosErrores.password = "Mínimo 8 caracteres";
    }

    // ✅ guardamos errores
    setErrores(nuevosErrores);

    // ✅ si hay errores, no seguimos
    const hayErrores = nuevosErrores.email || nuevosErrores.password;
    if (hayErrores) return;

    // ✅ si está ok, seguimos
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <main className="container my-4">
      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresá tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errores.email && (
            <Form.Text className="text-danger">{errores.email}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresá tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errores.password && (
            <Form.Text className="text-danger">{errores.password}</Form.Text>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </main>
  );
};

export default Login;