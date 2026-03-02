import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../index.css";

const Menu = ({ usuarioLogueado, setUsuarioLogueado }) => {
  const navegacion = useNavigate();

  const logout = () => {
    setUsuarioLogueado({});
    navegacion("/");
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      className="bg-negro-brand shadow-sm py-3"
    >
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="logo-brand d-flex align-items-center text-decoration-none"
        >
          <img
            src="/img/logo2.png"
            alt="Logo TucuGol"
            className="logo-img me-2"
          />

          <span className="logo-text fw-bold fs-4">
            Tucu<span className="text-verde-cancha">Gol</span>
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

            <NavLink className="nav-link px-3" to="/tienda">
              Tienda
            </NavLink>

            {usuarioLogueado?.nombre ? (
              <>
                <NavLink className="nav-link px-3" to="/administrador">
                  Panel Admin
                </NavLink>

                <div className="d-flex align-items-center ms-lg-3 mt-3 mt-lg-0">
                  <NavLink className="nav-link me-3" to="/carrito">
                    <i className="bi bi-cart3 fs-5 position-relative">
                      <span className="badge-carrito position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        0
                      </span>
                    </i>
                  </NavLink>

                  <Button
                    className="btn btn-verde-cancha rounded-pill px-4 shadow-sm"
                    onClick={logout}
                  >
                    Cerrar sesión
                  </Button>
                </div>
              </>
            ) : (
              <div className="d-flex align-items-center ms-lg-3 mt-3 mt-lg-0">
                <NavLink
                  className="btn btn-outline-light rounded-pill px-4"
                  to="/login"
                >
                  Iniciar sesión
                </NavLink>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
