import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import { Button, Form } from 'react-bootstrap';

function UpdateFacture() {
  const navigate = useNavigate();
  const { factureId } = useParams();

  const [facture, setFacture] = useState({
    quantite: 0,
    estimation: '',

  });

  useEffect(() => {
    handleDisplay();
  }, []);

  const handleDisplay = () => {
    axios
      .get(`http://localhost:8080/facture/find/${factureId}`)
      .then((res) => {
        console.log('facture : ', res.data);
        setFacture(res.data);
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFacture((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put('http://localhost:8080/facture/update', facture)
      .then((res) => {
        console.log('modifié avec succès');
        setFacture({
          quantite: 0,
          estimation: '',

        });
        navigate('/facture/all');
      })
      .catch((err) => {
        alert('Erreur : ' + err);
      });
  };

  const button =
    facture.quantite === '' || facture.estimation === '' ? (
      <button type="submit" className="btn btn-primary" disabled>
      Modifier
      </button>
    ) : (
      <button type="submit" className="btn btn-primary">
      Modifier
      </button>
    );
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
          <div className="container mt-5">
          <h1>Modifier la facture {facture.factureId}</h1>
          <br/>
          <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <Link to="/facture/all" className="btn btn-secondary">
            Liste des factures
          </Link>

          <Link to="/home" className="btn btn-secondary">
            <i className="bi bi-arrow-return-left"></i> Retour
          </Link>
        </div>
          <form  onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="quantite" className="form-label">
                quantité :
              </label>
              <input
                type="text"
                id="quantite"
                name="quantite"
                value={facture.quantite}
                className="form-control"
                placeholder="..."
                onChange={handleChange}
              />
            </div>

            <div className="">
              <label htmlFor="estimation" className="form-label">
                Estimation :
              </label>
              <input
                type="text"
                id="estimation"
                name="estimation"
                value={facture.estimation}
                className="form-control"
                placeholder="Entrer une description..."
                onChange={handleChange}
              />
            </div>

          
            <div style={{marginTop:"10px"}}>{button}</div>
          </form>
        </div>
</div>
  );
}
export default UpdateFacture;
