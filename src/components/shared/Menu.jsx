import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router";
import "../../index.css";

const Menu = () => {
  return (
    <Navbar
      expand="lg"
      variant="dark"
      className="bg-negro-brand shadow-sm py-3"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <i className="bi bi-trophy-fill text-verde-cancha me-2 fs-3"></i>
          <span className="fw-bold tracking-tight text-white">
            LOGO<span className="text-verde-cancha">CANCHA</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <NavLink className="nav-link px-3" to="/">
              Inicio
            </NavLink>
            <NavLink className="nav-link px-3" to="/reservas">
              Reservar canchas
            </NavLink>
            <NavLink className="nav-link px-3" to="/productos">
              Tienda
            </NavLink>
            <NavLink className="nav-link px-3" to="/administrador">
              Panel Admin
            </NavLink>

            <div className="d-flex align-items-center ms-lg-3 mt-3 mt-lg-0">
              <NavLink className="nav-link me-3" to="/carrito">
                <i className="bi bi-cart3 fs-5 position-relative">
                  {/* prueba de carrito */}
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.6rem" }}
                  >
                    0
                  </span>
                </i>
              </NavLink>

              <NavLink
                className="btn btn-outline-light rounded-pill px-4 me-2"
                to="/login"
              >
                Login
              </NavLink>

              <Button className="btn btn-verde-cancha rounded-pill px-4 shadow-sm">
                Logout
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
