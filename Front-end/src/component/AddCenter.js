import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import axios from "axios";
import NavBar from './NavBar';

function AddCenter() {
  const navigate = useNavigate();
  const [centre, setCentre] = useState({
    name: "",
    code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCentre((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:8080/centre/save`, centre)
      .then((res) => {
        console.log("Envoyé avec succès");

        setCentre({
          name: "",
          code: "",
        });
        navigate('/list/centres');
      })
      .catch((err) => {
        alert("Erreur : " + err);
      });
  };

  const isButtonDisabled = centre.name === "" || centre.code === "";

  const containerStyle = {
    backgroundColor: '#edf6f9', 
    display: 'flex', 
    flexDirection: 'column', 
    minHeight: '100vh',
  };
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn !== "true") {
    return <Navigate to="/" />;
  }

  return (
    <div style={containerStyle}>
      <NavBar />
      <div className="container mt-5" style={containerStyle}>
        <h1>Ajouter un nouveau centre</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
        <Link to="/list/centres" className="btn btn-secondary">
            Liste des centres
          </Link>

          <Link to="/home" className="btn btn-secondary">
            <i className="bi bi-arrow-return-left"></i> Retour
          </Link>
          </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Nom :</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={centre.name}
              placeholder="Entrez le nom du centre..."
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="code">
            <Form.Label>Code centre :</Form.Label>
            <Form.Control
              type="text"
              name="code"
              value={centre.code}
              placeholder="Entrez le code du centre..."
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            disabled={isButtonDisabled}
            style={{ marginTop: '10px' }}
          >
            Ajouter
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddCenter;
