import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Table, Modal } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { stableSort, getComparator } from './TableHelper';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import NavBar from './NavBar';


function ListCentre() {
  const [centres, setCentres] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCentreId, setSelectedCentreId] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('centreId');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleShowDeleteModal = (id) => {
    setSelectedCentreId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedCentreId(null);
    setShowDeleteModal(false);
  };

  useEffect(() => {
    fetchCentres();
  }, []);

  const fetchCentres = async () => {
    try {
      const response = await axios.get('http://localhost:8080/centre/all');
      const centresData = response.data;
      setCentres(centresData);
    } catch (err) {
      console.error('Error:', err);
      notify('Error fetching centers', 'danger');
    }
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

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/centre/delete/${id}`)
      .then(() => {
        notify('Centre supprimé avec succès!', 'success');
        fetchCentres();
        handleCloseDeleteModal();
      })
      .catch((err) => {
        console.error('Error:', err);
        notify('Error deleting Center', 'danger');
        handleCloseDeleteModal();
      });
  };

  const containerStyle = {
    backgroundColor: '#edf6f9',
    padding: '20px',
    borderRadius: '10px',
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

  const sortedCentres = stableSort(
    centres,
    getComparator(order, orderBy)
  ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn !== "true") {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ backgroundColor: "#edf6f9", minHeight: "100vh" }}>
      <NavBar />
    <div className="container" style={containerStyle}>
      <div className="my-4">
        <h1>Liste des centres</h1>
        <div className="d-flex justify-content-between align-items-center">
        <Link to="/create/center">
          <Button
            variant="primary"
            style={addButtonStyle}
            component={Link}
            to="/create/centre"
          >
            <AddIcon />
          </Button>
          </Link>
        </div>
      </div>
      <Table striped bordered hover style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>
              <TableSortLabel
                active={orderBy === 'centreId'}
                direction={orderBy === 'centreId' ? order : 'asc'}
                onClick={() => handleRequestSort('centreId')}
              >
                ID
              </TableSortLabel>
            </th>
            
            <th style={thStyle}>Nom du centre</th>
            <th style={thStyle}>Code centre</th>
           <th style = {thStyle}> Options</th>
          </tr>
        </thead>
        <tbody>
          {sortedCentres.map((centre) => (
            <tr key={centre.centreId}>
              <td className="text-center">{centre.centreId}</td>
              <td className="text-center">{centre.name}</td>
              <td className="text-center">{centre.code}</td>
              <td className="text-center">
                <Button
                  variant="danger"
                  style={deleteButtonStyle}
                  onClick={() => handleShowDeleteModal(centre.centreId)}
                >
                  <DeleteIcon />
                </Button>
                <Link
                  to={`/update/centre/${centre.centreId}`}
                  className="ml-2"
                >
                  <Button variant="info" style={editButtonStyle}>
                    <EditIcon />
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={centres.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Link to="/home" className="btn btn-secondary">
            <i className="bi bi-arrow-return-left"></i> Retour
          </Link>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toast-container"
      />
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>Êtes-vous sûr de vouloir supprimer ce centre ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Annuler
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDelete(selectedCentreId);
              handleCloseDeleteModal();
            }}
          >
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
}

export default ListCentre;
