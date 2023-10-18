import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, Navigate } from 'react-router-dom';
import { Button, Table, Modal, Row, Col } from 'react-bootstrap';
import PdfReleve from './PdfReleve';
import PdfComponent from './PdfComponent';
import NavBar from './NavBar';
import { FaTrash, FaFilePdf } from 'react-icons/fa';

function Releve() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [factures, setFactures] = useState([]);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [pdfComponentVisible, setPdfComponentVisible] = useState(false);
  const [selectedFacture, setSelectedFacture] = useState(null);
  const [selectedReleveData, setSelectedReleveData] = useState([]);
  const [relevePdfVisible, setRelevePdfVisible] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [factureToDelete, setFactureToDelete] = useState(null);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const fetchFacturesByDate = () => {
    if (selectedMonth && selectedYear) {
      axios
        .get(`http://localhost:8080/facture/find/${selectedMonth}/${selectedYear}`)
        .then((res) => {
          console.log('Factures by date:', res.data);
          setFactures(res.data);
        })
        .catch((err) => {
          console.log('Error fetching factures:', err);
        });
    } else {
      setFactures([]);
    }
  };

  useEffect(() => {
    fetchFacturesByDate();
  }, [selectedMonth, selectedYear]);

  const formatDateWithoutTime = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const notify = () => {
    toast.success('Facture supprimée avec succès !', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: 'bg-success text-light',
    });
  };

  const handleDeleteFacture = (factureId) => {
    if (factureId) {
      setFactureToDelete(factureId);
      setShowDeleteConfirmation(true);
    }
  };

  const confirmDeleteFacture = () => {
    if (factureToDelete) {
      axios
        .delete(`http://localhost:8080/facture/delete/${factureToDelete}`)
        .then(() => {
          fetchFacturesByDate();
          notify();
          console.log(`Facture with ID ${factureToDelete} deleted.`);
          setFactureToDelete(null);
          setShowDeleteConfirmation(false);
        })
        .catch((err) => {
          console.error('Error deleting facture:', err);
          setFactureToDelete(null);
          setShowDeleteConfirmation(false);
        });
    }
  };

  const handleGeneratePdf = (factureId) => {
    const selectedFacture = factures.find(
      (facture) => facture.factureId === factureId
    );
    setSelectedFacture(selectedFacture);
    setPdfComponentVisible(true);
  };

  const handleClosePdfModal = () => {
    setSelectedFacture(null);
    setPdfComponentVisible(false);
  };

  const handleGenerateReleve = () => {
    const releveData = factures.map((facture) => ({
     centre : facture.association.centre.name,
      associationName: facture.association.name,
     
      oldIndex: facture.index_prev_prev,
      newIndex: facture.index_prev,
      quantity: facture.quantity,
      estimation: facture.estimation,

    }));

    setSelectedReleveData(releveData);
    setRelevePdfVisible(true);
    setPdfGenerated(true);
  };

  const handleCloseRelevePdfModal = () => {
    setRelevePdfVisible(false);
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn !== "true") {
    return <Navigate to="/" />;
  }
  return (
    <div style={{ backgroundColor: '#edf6f9', height: "100vh" }}>
      <NavBar />
      <div className="container mt-4">
        <Row>
          <Col md={6}>
            <h2>Générer Relevé</h2>
            <label htmlFor="monthSelect"></label>
            <select
              id="monthSelect"
              className="form-control"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              <option value="">-- Sélectionnez le mois --</option>
              <option value="1">Janvier</option>
              <option value="2">Février</option>
              <option value="3">Mars</option>
              <option value="4">Avril</option>
              <option value="5">Mai</option>
              <option value="6">Juin</option>
              <option value="7">Juillet</option>
              <option value="8">Août</option>
              <option value="9">Septembre</option>
              <option value="10">Octobre</option>
              <option value="11">Novembre</option>
              <option value="12">Décembre</option>
            </select>

            <label htmlFor="yearInput"></label>
            <input
              type="number"
              id="yearInput"
              className="form-control"
              value={selectedYear}
              onChange={handleYearChange}
              placeholder="Entrez l'année"
            />

            <Button
              variant="primary"
              onClick={handleGenerateReleve}
              className="mt-3"
            >
              Générer Relevé
            </Button>
          </Col>
        </Row>

        <div className="mt-4">
          <h2>Factures :</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center">ID Facture</th>
                <th className="text-center">Centre</th>
                <th className="text-center">Nom de l'association</th>
                <th className="text-center">Code de l'association</th>
                <th className="text-center">Quantité</th>
                <th className="text-center">Estimation</th>
                <th className="text-center">Date</th>
                <th className="text-center">Options</th>
              </tr>
            </thead>
            <tbody>
              {factures.map((facture) => (
                <tr key={facture.factureId}>
                  <td className="text-center">{facture.factureId}</td>
                  <td className="text-center">{facture.association.centre.name}</td>
                  <td className="text-center">{facture.association.name}</td>
                  <td className="text-center">{facture.association.codeCDP}</td>
                  <td className="text-center">{facture.quantity}</td>
                  <td className="text-center">{facture.estimation}</td>
                  <td className="text-center">{formatDateWithoutTime(facture.date)}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteFacture(facture.factureId)}
                    >
                      <FaTrash />
                    </button>
                    <Button
                      variant="success"
                      onClick={() => handleGeneratePdf(facture.factureId)}
                      className="ml-2"
                      
                    >
                      <FaFilePdf />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <Link to="/home" className="btn btn-secondary">
          <i className="bi bi-arrow-return-left"></i> Retour
        </Link>
        <ToastContainer />
        <Modal show={relevePdfVisible} onHide={handleCloseRelevePdfModal}>
          <Modal.Header closeButton>
            <Modal.Title>Releve généré</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {pdfGenerated && selectedReleveData.length > 0 && (
              <PdfReleve
                factures={selectedReleveData}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
              />
            )}
          </Modal.Body>
        </Modal>

        <Modal show={pdfComponentVisible} onHide={handleClosePdfModal}>
          <Modal.Header closeButton>
            <Modal.Title>PDF généré</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedFacture && (
              <PdfComponent
                quantity={selectedFacture.quantity}
                associationName={selectedFacture.association.name}
                associationCode={selectedFacture.association.codeCDP}
              />
            )}
          </Modal.Body>
        </Modal>

        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation de suppression</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Êtes-vous sûr de vouloir supprimer cette facture ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>
              Annuler
            </Button>
            <Button variant="danger" onClick={confirmDeleteFacture}>
              Supprimer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Releve;
