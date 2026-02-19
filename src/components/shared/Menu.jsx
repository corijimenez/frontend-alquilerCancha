import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router";

const Menu = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <b>
            <i className="bi bi-code-slash"></i> canchas
          </b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink className="nav-link" to={'/'}>Inicio</NavLink>
            <NavLink className="nav-link" to={'/administrador'}>Administrador</NavLink>
            <Button className="nav-link">Logout</Button>
            <NavLink className="nav-link" to={'/login'}>Login</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;