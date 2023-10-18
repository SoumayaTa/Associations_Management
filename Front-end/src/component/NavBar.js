import React from 'react';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ExitToApp as ExitToAppIcon } from '@mui/icons-material'; // Importez l'icône de déconnexion
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function NavBar() {
  const navbarStyle = {
    paddingLeft: "20px",
    backgroundColor: '#0077b6',
  };

  const navLinkStyle = {
    textDecoration: 'none',
  };

  const buttonStyle = {
    border: 'none',
  };
  const navigate = useNavigate(); // Déplacez la déclaration de navigate ici

  const handleLogout = () => {
    axios.get('http://localhost:8080/utilisateur/logout')
      .then(() => {
        localStorage.setItem("isLoggedIn", "false");
        console.log(localStorage.getItem("isLoggedIn"));
        navigate("/");
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Navbar style={navbarStyle} variant="dark" expand="lg">
      <Navbar.Brand href="/">G.Association</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto mx-auto"> 
        <NavLink to="/create/center" className="nav-link" style={navLinkStyle}>
            <Button variant="outline-light" style={buttonStyle}>
              Ajouter Centre
            </Button>
          </NavLink>
          <NavLink to="/create/association" className="nav-link" style={navLinkStyle}>
            <Button variant="outline-light" style={buttonStyle}>
              Ajouter Association
            </Button>
          </NavLink>
          <NavLink to="/create/facture" className="nav-link" style={navLinkStyle}>
            <Button variant="outline-light" style={buttonStyle}>
              Ajouter Facture
            </Button>
          </NavLink>
          <NavLink to="/generate/releve" className="nav-link" style={navLinkStyle}>
            <Button variant="outline-light" style={buttonStyle}>
              Relevé
            </Button>
          </NavLink>
          <NavDropdown title="RCAP" id="basic-nav-dropdown" className="mx-auto"> 
            <NavLink to="/generate/rcapm" className="dropdown-item" style={navLinkStyle}>
              RCAP Mensuel
            </NavLink>
            <NavLink to="/generate/rcapa" className="dropdown-item" style={navLinkStyle}>
              RCAP Annuel
            </NavLink>
          </NavDropdown>
        </Nav>
        <NavLink className="nav-link" style={navLinkStyle}>
          <Button variant="outline-light" style={buttonStyle} onClick={handleLogout}>
            <ExitToAppIcon /> Déconnexion
          </Button>
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
