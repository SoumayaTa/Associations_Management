import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link , Navigate} from "react-router-dom";
import NavBar from "./NavBar";
import PdfComponent from "./PdfComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddFacture() {
  const [facture, setFacture] = useState({
    date: new Date().toISOString().split("T")[0],
    associationId: "",
    indexPrev: "",
  });
  const [associations, setAssociations] = useState([]);
  const [selectedAssociation, setSelectedAssociation] = useState(null);
  const [difference, setDifference] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/association/all")
      .then((res) => {
        setAssociations(res.data);
      })
      .catch((err) => {
        console.log("Erreur lors du chargement des associations : ", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacture((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "associationId") {
      setSelectedAssociation(null);
      setDifference(null);

      const selectedId = Number(value);
      const selectedAssoc = associations.find(
        (assoc) => assoc.associationId === selectedId
      );
      setSelectedAssociation(selectedAssoc);

      if (selectedAssoc) {
        axios
          .get(
            `http://localhost:8080/association/find/${selectedAssoc.associationId}`
          )
          .then((res) => {
            setFacture((prev) => ({
              ...prev,
              indexPrev: res.data.index_prev.toString(),
            }));
          })
          .catch((err) => {
            console.log(
              "Erreur lors de la récupération de l'ancien index : ",
              err
            );
          });
      }
    }
  };

  const handleSaveClick = () => {
    if (selectedAssociation && facture.indexPrev !== "") {
      const newIndex = Number(facture.indexPrev);
      const oldIndex = Number(selectedAssociation.index_prev);

      // Calculer la différence entre le nouveau index et l'ancien index
      const difference = newIndex - oldIndex;

      // Mettre à jour l'ancien index dans la base de données
      axios
        .put(
          `http://localhost:8080/association/update/${selectedAssociation.associationId}/${newIndex}/${oldIndex}`
        )
        .then((res) => {
          console.log("Index mis à jour avec succès");

          setSuccessMessage("Index mis à jour avec succès");
          setErrorMessage("");

          // Maintenant, enregistrez la facture avec les anciens et nouveaux index
          axios
            .post(`http://localhost:8080/facture/${selectedAssociation.associationId}/save`, {
              date: facture.date,
              associationId: selectedAssociation.associationId,
              quantity: difference,
              index_prev: oldIndex, // Ancien index
              index_prev_prev: newIndex, // Nouveau index
            })
            .then((res) => {
              notify();
            })
            .catch((err) => {
              console.error(
                "Erreur lors de l'enregistrement de la facture : ",
                err
              );
            });
        })
        .catch((err) => {
          console.log("Erreur lors de la mise à jour de l'index : ", err);
          setSuccessMessage("");
          setErrorMessage("Erreur lors de la mise à jour de l'index");
        });
    } else {
      setErrorMessage("Sélectionnez une association et entrez un index valide.");
    }
  };

  const notify = () => {
    toast.success("Facture enregistrée avec succès !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "bg-success text-light",
    });
  };

  const containerStyle = {
    backgroundColor: "#edf6f9",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn !== "true") {
    return <Navigate to="/" />;
  }
  return (
    <div style={containerStyle}>
      <NavBar />
      <div className="container">
        <h1>Ajouter une Facture</h1>
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
        <form>
          <div className="mb-3">
            <label htmlFor="associationId" className="form-label">
              Association :
            </label>
            <select
              id="associationId"
              name="associationId"
              value={facture.associationId}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Sélectionnez une association</option>
              {associations.map((association) => (
                <option
                  key={association.associationId}
                  value={association.associationId}
                >
                  {association.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date :
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={facture.date}
              className="form-control"
              disabled
            />
          </div>

          <div className="mb-3">
            <label htmlFor="indexPrev" className="form-label">
              Nouveau Index :
            </label>
            <input
              type="number"
              id="indexPrev"
              name="indexPrev"
              value={facture.indexPrev}
              className="form-control"
              placeholder="Entrez le nombre..."
              onChange={handleChange}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSaveClick}
          >
            Enregistrer
          </button>

          {difference !== null && (
            <div>
              <p>Différence : {difference}</p>
              <PdfComponent
                quantity={difference}
                associationName={selectedAssociation.name}
                associationCode={selectedAssociation.codeCDP}
              />
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success mt-3">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger mt-3">{errorMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddFacture;
