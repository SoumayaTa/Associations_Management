import React, { useState, useEffect } from "react";
import { Link, useNavigate,Navigate } from "react-router-dom";
import axios from "axios";
import { Button, Form } from 'react-bootstrap';
import NavBar from './NavBar';


function AddAssociation() {
  const navigate = useNavigate();
  const [association, setAssociation] = useState({
    name: "",
    codeCDP: "",
    centreId: "",
  });
  const [centres, setCentres] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/centre/all")
      .then((res) => {
        setCentres(res.data);
      })
      .catch((err) => {
        console.log("Erreur lors du chargement des centres : ", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssociation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ID = Number(association.centreId);

    const { name, codeCDP } = association;

    const data = {
      name: association.name,
      codeCDP: association.codeCDP,
      index_prev: 0,
    };

    console.log("Data : ", association, "Centre ID : ", ID);

    axios
      .post(`http://localhost:8080/association/${ID}/save`, data)
      .then((res) => {
        console.log("Association ajoutée avec succès");

        setAssociation({
          name: "",
          codeCDP: "",
          centreId: null,
        });

        navigate("/list/associations");
      })
      .catch((err) => {
        alert("Erreur : " + err);
      });
  };

  const isButtonDisabled =
    association.name === "" ||
    association.codeCDP === "" ||
    association.centreId === null;

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
    <div  style={containerStyle}>
      <NavBar />
      <div className="container mt-5"  style={containerStyle}>
        <h1>Ajouter une nouvelle association</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
        <Link to="/list/associations" className="btn btn-secondary">
            Liste des associations
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
              value={association.name}
              placeholder="Entrez le nom de l'association..."
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="codeCDP">
            <Form.Label>Code association :</Form.Label>
            <Form.Control
              type="text"
              name="codeCDP"
              value={association.codeCDP}
              placeholder="Entrez le code de l'association..."
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="centreId">
            <Form.Label>Centre :</Form.Label>
            <Form.Control
              as="select"
              name="centreId"
              value={association.centreId ? parseInt(association.centreId, 10) : ""}
              onChange={handleChange}
            >
              <option value="">Sélectionnez un centre</option>
              {centres.map((centre) => (
                <option key={centre.centreId} value={centre.centreId}>
                  {centre.name}
                </option>
              ))}
            </Form.Control>
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

export default AddAssociation;
