import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert, InputGroup, FormControl, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPhone, FaEnvelope, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [adminsPerPage] = useState(5);
  const navigate = useNavigate();

  const fetchAdmins = async () => {
    try {
      const response = await fetch('https://vijayanagara-finance-api.vercel.app/admin');
      if (!response.ok) {
        throw new Error('Failed to fetch admins');
      }
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this admin?');
    if (confirmDelete) {
      try {
        const response = await fetch(`https://vijayanagara-finance-api.vercel.app/admin/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete admin');
        }
        fetchAdmins();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const filteredAdmins = admins.filter(admin =>
    admin.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.phone.includes(searchTerm)
  );

  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = filteredAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);
  const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  return (
    <Container>
      <Row className="mb-3">
        <Col md={8}>
          <h2>Admin List</h2>
        </Col>
        <Col md={4} className="text-end">
          <Link to="/dashboard/create-admin">
            <Button variant="primary">Create New Admin</Button>
          </Link>
        </Col>
      </Row>
      <InputGroup className="mb-4">
        <FormControl
          placeholder="Search by name, email, or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAdmins.map((admin) => (
            <tr key={admin._id}>
              <td>{admin.fullname}</td>
              <td>
                <FaEnvelope className="me-2" /> {admin.email}
              </td>
              <td>
                <FaPhone className="me-2" /> {admin.phone}
              </td>
              <td>
                <span className={`badge ${admin.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                  {admin.status === 'active' ? <FaCheckCircle /> : <FaTimesCircle />} {admin.status}
                </span>
              </td>
              <td>
                <FaEdit
                  onClick={() => navigate(`/dashboard/edit-admin/${admin._id}`)}
                  style={{ cursor: 'pointer', color: 'blue', marginRight: '10px' }}
                />
                <FaTrash
                  onClick={() => handleDelete(admin._id)}
                  style={{ cursor: 'pointer', color: 'red' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between mt-3">
        <Button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <Button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default AdminList;
