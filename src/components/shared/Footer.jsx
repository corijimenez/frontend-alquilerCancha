import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-negro-brand text-white p-3 mt-auto">
      <Container>
        <Row className="gy-3 justify-content-between">
          
          {/* Columna 1: Logo y Eslogan */}
          <Col md={4} className="d-flex flex-column align-items-center">
            <img
              src="../img/logo2.png"
              alt="Logo"
              width="70"
              height="70"
              className="bg-white rounded-circle logo-footer"
            />
            <p className="small text-white text-center text-md-start my-3 ">
              Donde nace la pasión de cada partido.
            </p>
          </Col>

          {/* Columna 2: Enlaces (Aquí estaba el error) */}
          <Col md={4} className="text-center">
            <h6 className="fw-bold mb-2 text-uppercase">Enlaces</h6>
            <ul className="list-unstyled small mb-0 d-flex flex-column gap-1">
              <li><Link to="/nosotros" className="text-white-50 text-decoration-none footer-link">Sobre Nosotros</Link></li>
              <li><Link to="/contacto" className="text-white-50 text-decoration-none footer-link">Contacto</Link></li>
              <li><Link to="/reserva" className="text-white-50 text-decoration-none footer-link">Reservas</Link></li>
            </ul>
          </Col>

          {/* Columna 3: Contacto y Redes */}
          <Col md={4} className="text-center text-md-end">
            <h6 className="fw-bold mb-2 text-uppercase">Contactanos</h6>
            <ul className="list-unstyled small text-white-50 mb-2">
              <li className="mb-1"><i className="bi bi-geo-alt-fill me-1"></i> Av. General Paz 576, Tucumán</li>
              <li className="mb-1"><i className="bi bi-whatsapp me-1"></i> +54 381 552 334</li>
            </ul>
            <div>
              <a href="https://web.facebook.com/" className="text-white me-3 social-icon" aria-label="Visita nuestro Facebook" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://www.instagram.com/" className="text-white me-3 social-icon" aria-label="Visita nuestro instagram" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
      <hr className="border-light opacity-25 my-2" />
      <div className="text-center">
        <p className="mb-0 text-white-50" style={{ fontSize: '0.75rem' }}>
          &copy; 2026 Rolling Canchas – Alquiler de Canchas
        </p>
      </div>
    </footer>
  );
};

export default Footer;