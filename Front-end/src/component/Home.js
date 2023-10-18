import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Container, Typography, Box, List, ListItem, ListItemIcon, ListItemText, CssBaseline } from '@mui/material';
import { FormatListBulleted as ListIcon, AccountBalance as FactureIcon, Group as AssociationsIcon, Business as CentresIcon } from '@mui/icons-material';
import NavBar from './NavBar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate

function Home() {
  const containerStyle = {
    padding: '20px',
    borderRadius: '10px',
    height: '82vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };
  

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn !== "true") {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ backgroundColor: "#edf6f9", minHeight: "100vh" }}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="md">
        <Box style={containerStyle} textAlign="center">
          <img src="logoONEE.png" alt="Logo ONEE" style={{ marginBottom: '10px', width: '400px' }} />
          <Typography variant="h4" gutterBottom>
            Bienvenue sur notre plateforme
          </Typography>
          <Typography variant="body1" gutterBottom>
            Consultez ...
          </Typography>
          <List>
            <Link to="/list/centres" style={linkStyle}>
              <ListItem button>
                <ListItemIcon>
                  <CentresIcon />
                </ListItemIcon>
                <ListItemText primary="Liste des centres" />
              </ListItem>
            </Link>
            <Link to="/list/associations" style={linkStyle}>
              <ListItem button>
                <ListItemIcon>
                  <AssociationsIcon />
                </ListItemIcon>
                <ListItemText primary="Liste des associations" />
              </ListItem>
            </Link>
            <Link to="/facture/all" style={linkStyle}>
              <ListItem button>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Liste des factures" />
              </ListItem>
            </Link>
          </List>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}

export default Home;
