import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import { Button, Form } from 'react-bootstrap';

function UpdateCentre() {
  const navigate = useNavigate();
  const { centreId } = useParams();

  const [centre, setCentre] = useState({
    name: '',
    code: '',
  });

  useEffect(() => {
    handleDisplay();
  }, []);

  const handleDisplay = () => {
    axios
      .get(`http://localhost:8080/centre/find/${centreId}`)
      .then((res) => {
        console.log('centre : ', res.data);
        setCentre(res.data);
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCentre((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('centre : ', centre);

    axios
      .put('http://localhost:8080/centre/update', centre)
      .then((res) => {
        console.log('modifié avec succès');
        setCentre({
          name: '',
          code: '',
        });
        navigate('/list/centres');
      })
      .catch((err) => {
        alert('Erreur : ' + err);
      });
  };

  const button =
    centre.name === '' || centre.code === '' ? (
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
          <h1>Modifier centre</h1>
          <br/>
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
          <form  onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="name" className="form-label">
                Nom :
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={centre.name}
                className="form-control"
                placeholder="Saisir la marque de Produit"
                onChange={handleChange}
              />
            </div>

            <div className="">
              <label htmlFor="code" className="form-label">
                code:
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={centre.code}
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
export default UpdateCentre;
