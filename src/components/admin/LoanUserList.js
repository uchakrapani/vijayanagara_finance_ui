import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Spinner, Alert, InputGroup, FormControl, Row, Col, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const LoanUserList = () => {
  const [loanUsers, setLoanUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoanUsers = async () => {
      try {
        const response = await axios.get('https://vijayanagara-finance-api.vercel.app/loanuser');
        setLoanUsers(response.data);
      } catch (err) {
        console.error('Error fetching loan user data:', err);
        setError('Failed to load loan user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLoanUsers();
  }, []);

  const filteredLoanUsers = loanUsers.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.zipcode.includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredLoanUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredLoanUsers.length / usersPerPage);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this loan user?');
    if (confirmDelete) {
      try {
        await axios.delete(`https://vijayanagara-finance-api.vercel.app/loanuser/${id}`);
        setLoanUsers(loanUsers.filter(user => user._id !== id));
      } catch (err) {
        console.error('Error deleting loan user:', err);
        setError('Failed to delete loan user.');
      }
    }
  };

  const renderStatusBadge = (status) => {
    const badgeVariants = {
      submitted: 'info',
      'document-verification': 'warning',
      'in-progress': 'primary',
      'docs-required': 'secondary',
      approved: 'success',
      rejected: 'danger',
    };

    return (
      <Badge bg={badgeVariants[status] || 'light'}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace(/-/g, ' ')}
      </Badge>
    );
  };

  return (
    <Container className="mt-5">
      <Row className="mb-3 align-items-center">
        <Col md={8}>
          <h2>Loan User List</h2>
        </Col>
        <Col md={4}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search by full name, city, or ZIP code"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Reference No</th>
                <th>Full Name</th>
                <th>City</th>
                <th>ZIP Code</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map(user => (
                  <tr key={user._id}>
                    <td>{user.reference_no}</td>
                    <td>{user.fullName}</td>
                    <td>{user.city}</td>
                    <td>{user.zipcode}</td>
                    <td>{renderStatusBadge(user.status)}</td>
                    <td>
                      <FaEdit
                        onClick={() => navigate(`/dashboard/loan-user-detail/${user._id}`)}
                        style={{ cursor: 'pointer', color: 'blue', marginRight: '10px' }}
                      />
                      <FaTrash
                        onClick={() => handleDelete(user._id)}
                        style={{ cursor: 'pointer', color: 'red' }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No loan users found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Pagination Controls */}
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
        </>
      )}
    </Container>
  );
};

export default LoanUserList;
