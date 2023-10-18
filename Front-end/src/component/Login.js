import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField, Paper, Typography, Container, CssBaseline, Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/utilisateur/login/${formData.username}/${formData.password}`)
      .then((res) => {
        if (res.data === true) {
          localStorage.setItem("isLoggedIn", "true");
          console.log(localStorage.getItem("isLoggedIn"));
          navigate("/home");
        } else {
          alert("Authentification échouée.");
        }
      })
      .catch((err) => {
        alert("Erreur : " + err);
      });
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };

  const logoStyle = {
    backgroundColor: "#1976D2",
  };

  const imageStyle = {
    width: "70%",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "16px",
  };

  const headingStyle = {
    textAlign: "center",
    fontSize: "2rem", // Taille de sous-titre de grande taille
    marginBottom: "16px",
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={containerStyle}>
        <img src="logoONEE.png" style={imageStyle} alt="Logo" />
        <Typography style={headingStyle}>Gestion des associations et de facturation</Typography>
        <Avatar style={{ ...logoStyle, margin: "0 auto", marginBottom: "16px" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Paper elevation={3} style={{ padding: "16px", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <form style={{ width: "100%", marginTop: "16px" }} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nom d'utilisateur"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: "24px 0 16px" }}
            >
              Se connecter
            </Button>
          </form>
        </Paper>
      </div>
    </Container>
  );
}

export default Login;
