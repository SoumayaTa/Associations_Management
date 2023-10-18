import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import { Button, Form } from 'react-bootstrap';

function UpdateAssociation() {
  const navigate = useNavigate();
  const { associationId } = useParams();

  const [association, setAssociation] = useState({
    name: '',
    codeCDP: '',
    centreName: '',
  });

  useEffect(() => {
    handleDisplay();
  }, []);

  const handleDisplay = () => {
    axios
      .get(`http://localhost:8080/association/find/${associationId}`)
      .then((res) => {
        console.log('association : ', res.data);
        setAssociation(res.data);
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAssociation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('association : ', association);

    axios
      .put('http://localhost:8080/association/update', association)
      .then((res) => {
        console.log('modifié avec succès');
        setAssociation({
          name: '',
          codeCDP: '',
          centreName: '',
        });
        navigate('/');
      })
      .catch((err) => {
        alert('Erreur : ' + err);
      });
  };

  const button =
    association.name === '' || association.codeCDP === '' || association.centreName === '' ? (
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
          <h1>Modifier une association</h1>
          <br/>
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
          <form  onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="name" className="form-label">
                Nom :
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={association.name}
                className="form-control"
                placeholder="Saisir la marque de Produit"
                onChange={handleChange}
              />
            </div>

            <div className="">
              <label htmlFor="codeCDP" className="form-label">
                codeCDP :
              </label>
              <input
                type="text"
                id="codeCDP"
                name="codeCDP"
                value={association.codeCDP}
                className="form-control"
                placeholder="Entrer une description..."
                onChange={handleChange}
              />
            </div>

            <div className="">
              <label htmlFor="centreName" className="form-label">
                Centre :
              </label>
              <input
                type="text"
                id="centreName"
                name="centreName"
                value={association.centreName}
                className="form-control"
                placeholder="Saisir le centre"
                onChange={handleChange}
              />
            </div>
            <div style={{marginTop:"10px"}}>{button}</div>
          </form>
        </div>
</div>
  );
}
export default UpdateAssociation;
