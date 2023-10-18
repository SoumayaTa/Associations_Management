import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Modal } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PdfComponent from './PdfComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash, FaEdit, FaPlus, FaFilePdf } from 'react-icons/fa';
import { stableSort, getComparator } from './TableHelper';
import NavBar from './NavBar';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';

function Factures() {
  const [factures, setFactures] = useState([]);
  const [associationNames, setAssociationNames] = useState({});
  const [pdfComponentVisible, setPdfComponentVisible] = useState(false);
  const [selectedFacture, setSelectedFacture] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFactureId, setSelectedFactureId] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('factureId');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchFactures();
  }, []);

  useEffect(() => {
    loadAssociationNames();
  }, [factures]);

  const fetchFactures = () => {
    axios
      .get('http://localhost:8080/facture/all')
      .then((res) => {
        console.log('Données de facture reçues :', res.data);
        setFactures(res.data);
      })
      .catch((err) => {
        console.log('Erreur lors du chargement des factures : ', err);
      });
  };

  const formatDateWithoutTime = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const notify = (message, type) => {
    toast(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: `bg-${type} text-light`,
    });
  };

  const loadAssociationNames = async () => {
    const namesPromises = factures.map(async (facture) => {
      const [associationName] = await Promise.all([
        getAssociationName(facture.association.associationId),
      ]);
      return { associationName };
    });

    const names = await Promise.all(namesPromises);
    const namesMap = {};

    factures.forEach((facture, index) => {
      namesMap[facture.factureId] = names[index];
    });

    setAssociationNames(namesMap);
  };

  const getAssociationName = async (associationId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/association/look/${associationId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nom de l'association : ",
        error
      );
      return "Association introuvable";
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/facture/delete/${id}`)
      .then((res) => {
        fetchFactures();
        notify('Facture supprimée avec succès !', 'success');
      })
      .catch((err) => {
        console.log('err : ', err);
      });
  };

  const handleDeleteConfirmation = (factureId) => {
    setSelectedFactureId(factureId);
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setSelectedFactureId(null);
    setShowDeleteModal(false);
  };

  const handleGeneratePdf = (factureId) => {
    const selectedFacture = factures.find(
      (facture) => facture.factureId === factureId
    );
    setSelectedFacture(selectedFacture);
    setPdfComponentVisible(true);
  };

  const tableStyle = {
    marginTop: '20px',
    borderCollapse: 'collapse',
    width: '100%',
  };

  const thStyle = {
    backgroundColor: '#0077b6',
    color: 'white',
  };

  const addButtonStyle = {
    backgroundColor: '#0077b6',
    color: 'white',
    border: 'none',
    marginRight: '10px',
  };

  const deleteButtonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    marginRight: '5px',
  };

  const editButtonStyle = {
    backgroundColor: '#17a2b8',
    color: 'white',
    border: 'none',
    marginRight: '5px',
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (isLoggedIn !== 'true') {
    return <Navigate to="/" />;
  }

  const sortedFacture = stableSort(
    factures,
    getComparator(order, orderBy)
  ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleClosePdfModal = () => {
    setSelectedFacture(null);
    setPdfComponentVisible(false);
  };

  return (
    <div style={{ backgroundColor: '#edf6f9', minHeight: '100vh' }}>
      <NavBar />
      <div className="container">
        <div className="my-4">
          <h1>Liste des Factures</h1>
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/create/facture">
              <Button variant="primary" style={addButtonStyle}>
                <FaPlus />
              </Button>
            </Link>
          </div>
          <Table striped bordered hover style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle} className="text-center">
                  <TableSortLabel
                    active={orderBy === 'factureId'}
                    direction={orderBy === 'factureId' ? order : 'asc'}
                    onClick={() => handleRequestSort('factureId')}
                  >
                    ID
                  </TableSortLabel>
                </th>
                <th style={thStyle} className="text-center">
                  Centre
                </th>
                <th style={thStyle} className="text-center">
                  Nom de l'Association
                </th>
                <th style={thStyle} className="text-center">
                  Code de l'Association
                </th>
                <th style={thStyle} className="text-center">
                  Date
                </th>
                <th style={thStyle} className="text-center">
                  Quantité
                </th>
                <th style={thStyle} className="text-center">
                  Estimation
                </th>
                <th style={thStyle} className="text-center">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedFacture.map((facture) => (
                <tr key={facture.factureId}>
                  <td>{facture.factureId}</td>
                  <td className="text-center">
                    {facture.association.centre.name}
                  </td>
                  <td className="text-center">
                    {associationNames[facture.factureId]?.associationName ||
                      'Association introuvable'}
                  </td>
                  <td className="text-center">{facture.association.codeCDP}</td>
                  <td className="text-center">
                    {formatDateWithoutTime(facture.date)}
                  </td>
                  <td className="text-center">{facture.quantity}</td>
                  <td className="text-center">{facture.estimation}</td>
                  <td className="text-center">
                    <Button
                      variant="danger"
                      onClick={() =>
                        handleDeleteConfirmation(facture.factureId)
                      }
                      style={deleteButtonStyle}
                    >
                      <FaTrash />
                    </Button>
                    <Link
                      to={`/update/facture/${facture.factureId}`}
                      className="ml-2"
                    >
                      <Button variant="info" style={editButtonStyle}>
                        <FaEdit />
                      </Button>
                    </Link>
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={factures.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Link to="/home" className="btn btn-secondary">
            <i className="bi bi-arrow-return-left"></i> Retour
          </Link>
          <ToastContainer />
          <Modal show={pdfComponentVisible} onHide={handleClosePdfModal}>
            <Modal.Header closeButton>
              <Modal.Title>PDF généré</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedFacture && (
                <PdfComponent
                  factureId={selectedFacture.factureId}
                  quantity={selectedFacture.quantity}
                  associationName={selectedFacture.association.name}
                  associationCode={selectedFacture.association.codeCDP}
                />
              )}
            </Modal.Body>
          </Modal>
          <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation de suppression</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Êtes-vous sûr de vouloir supprimer cette facture ?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDeleteCancel}>
                Annuler
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDelete(selectedFactureId);
                  handleDeleteCancel();
                }}
              >
                Supprimer
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Factures;
