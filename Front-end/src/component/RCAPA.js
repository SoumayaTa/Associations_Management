import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, Navigate } from 'react-router-dom';
import { Button, Table, Modal, Row, Col } from 'react-bootstrap';
import PdfRcap from './PdfRcap';
import PdfComponent from './PdfComponent';
import NavBar from './NavBar';
import { FaTrash, FaFilePdf } from 'react-icons/fa';

function RCAPA() {
  const [selectedYear, setSelectedYear] = useState('');
  const [factures, setFactures] = useState([]);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [pdfComponentVisible, setPdfComponentVisible] = useState(false);
  const [selectedFacture, setSelectedFacture] = useState(null);
  const [selectedRcapData, setSelectedRcapData] = useState([]);
  const [rcapPdfVisible, setRcapPdfVisible] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [factureToDelete, setFactureToDelete] = useState(null);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const fetchFacturesByDate = () => {
    if (selectedYear) {
      axios
        .get(`http://localhost:8080/facture/findbyyear/${selectedYear}`)
        .then((res) => {
          console.log('Factures par date:', res.data);
          setFactures(res.data);
        })
        .catch((err) => {
          console.log('Erreur lors de la récupération des factures :', err);
        });
    } else {
      setFactures([]);
    }
  };

  useEffect(() => {
    fetchFacturesByDate();
  }, [selectedYear]);

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
    axios
      .delete(`http://localhost:8080/facture/delete/${factureId}`)
      .then(() => {
        fetchFacturesByDate();
        notify();
        console.log(`Facture with ID ${factureId} deleted.`);
        setShowDeleteConfirmation(false);
      })
      .catch((err) => {
        console.error('Error deleting facture:', err);
      });
  };

  const handleDeleteConfirmation = (factureId) => {
    setFactureToDelete(factureId);
    setShowDeleteConfirmation(true);
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

  const handleGenerateRcap = () => {
    const rcapData = factures.map((facture) => ({
      centre:facture.association.centre.name,
      associationName: facture.association.name,
      associationCode: facture.association.codeCDP,
      oldIndex: facture.association.index_prev_prev,
      newIndex: facture.association.index_prev,
      quantity: facture.quantity,
    }));

    setSelectedRcapData(rcapData);
    setRcapPdfVisible(true);
    setPdfGenerated(true);
  };

  const handleCloseRcapPdfModal = () => {
    setRcapPdfVisible(false);
  };

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

      <div className="container mt-4">
        <Row>
          <Col md={6}>
            <h2>Générer RCAP Annuel</h2>

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
              onClick={handleGenerateRcap}
              className="mt-3"
            >
              Générer RCAP
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
                      onClick={() => handleDeleteConfirmation(facture.factureId)}
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

        <Link to="/" className="btn btn-secondary">
          <i className="bi bi-arrow-return-left"></i> Retour
        </Link>
        <ToastContainer />
        <Modal
          show={rcapPdfVisible}
          onHide={handleCloseRcapPdfModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>RCAP généré</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {pdfGenerated && selectedRcapData.length > 0 && (
              <PdfRcap factures={selectedRcapData} selectedYear={selectedYear} />
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

        <Modal
          show={showDeleteConfirmation}
          onHide={() => setShowDeleteConfirmation(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmation de suppression</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Êtes-vous sûr de vouloir supprimer cette facture ?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteConfirmation(false)}
            >
              Annuler
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDeleteFacture(factureToDelete)}
            >
              Supprimer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default RCAPA;
