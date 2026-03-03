import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Error404.css";

const Error404 = () => {
  return (
    <main className="error404-page">
      <section className="error404-card">
        <h1 className="error404-title">404</h1>
        <p className="error404-text">
          Página no encontrada.
        </p>

        <Button as={Link} to="/" variant="outline-light">
          Volver al inicio
        </Button>
      </section>
    </main>
  );
};

export default Error404;