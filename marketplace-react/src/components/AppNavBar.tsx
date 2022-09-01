import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../firebase/auth";

export default function AppNavBar() {
  const { user } = useAuthContext();
  const isLoggedIn = user !== null;

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Marketplace</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Ver Anúncios
            </Nav.Link>
            {isLoggedIn && (
              <NavDropdown title="Meus Anúncios" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="meus-anuncios/lista">
                  Anúncios Publicados
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="meus-anuncios/novo">
                  Publicar Anúncio
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <Nav.Link as={NavLink} to="/logout">
                Sair ({user.displayName || user.email})
              </Nav.Link>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                Entrar
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
