import { useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { BsEnvelopeAtFill } from "react-icons/bs";

const VerificacionCuenta = () => {
  const location = useLocation();
  const email = location.state?.email || "";
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //protección de flujo
  if (!location.state?.email) {
  return <Navigate to="/registro" replace />;
}

  const handleReenviar = async (e) => {
  e.preventDefault();

  if (!email) {
    setError("No se encontró el email para reenviar.");
    return;
  }

  setMensaje("");
  setError("");
  setLoading(true);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/usuarios/reenviar-verificacion`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    setMensaje(data.message);
  } catch (err) {
    setError(err.message || "Error al reenviar verificación");
  } finally {
    setLoading(false);
  }
};

  return (
  <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center px-3">
    <Row className="w-100 justify-content-center">
      <Col xs={12} sm={10} md={7} lg={5} xl={4}>
        <Card className="shadow-lg border-0 text-center rounded-4 desvanecimiento">
          <Card.Body className="p-4 p-md-5">

            {/* Icono */}
            <div className="mb-4 text-success display-4">
              <BsEnvelopeAtFill />
            </div>

            {/* Título */}
            <h1 className="h3 h-md-2 fw-bold mb-3 text-white">
              Verificá tu cuenta
            </h1>

            <p className="mb-4 text-white">
              Te enviamos un enlace de verificación a tu correo.
              <br className="d-none d-md-block" />
              Revisá tu bandeja de entrada o spam.
            </p>

            <div className="bg-light rounded-3 p-3 small mb-4">
              ¿No recibiste el correo? Podés solicitar uno nuevo abajo.
            </div>

            <Form onSubmit={handleReenviar}>
              <p className="text-white small mb-3">
                Correo registrado: <strong>{email}</strong>
                </p>

              <div className="d-grid">
                <Button
                  type="submit"
                  disabled={loading}
                  className="py-2 fw-semibold"
                  style={{ backgroundColor: "#1F8A3B", border: "none" }}
                >
                  {loading ? "Enviando..." : "Reenviar correo"}
                </Button>
              </div>
            </Form>

            {mensaje && (
              <Alert variant="success" className="mt-4 text-center rounded-3">
                {mensaje}
              </Alert>
            )}

            {error && (
              <Alert variant="danger" className="mt-4 text-center rounded-3">
                {error}
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
};

export default VerificacionCuenta;