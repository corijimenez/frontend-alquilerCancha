import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Error404.css";

const Error404 = () => {
  return (
  <main className="error404-page">
  <section className="error404-card">
    <div className="error404-badge">404</div>

    <h1 className="error404-title">Página no encontrada</h1>

    <p className="error404-text">
      Podés volver al inicio o reservar una cancha.
    </p>

    <div className="error404-actions">
      <Button
        as={Link}
        to="/"
        variant="outline-light"
        className="btn-404"
      >
        <i className="bi bi-house-door me-2"></i>
        Ir al inicio
      </Button>

      <Button
        as={Link}
        to="/reserva"
        variant="success"
        className="btn-404 btn-404-success"
      >
        <i className="bi bi-calendar-plus me-2"></i>
        Reservar cancha
      </Button>
    </div>
  </section>
</main>
  );
};

export default Error404;