import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert, Table, InputGroup, FormControl, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaCity, FaMapMarkerAlt, FaBarcode } from 'react-icons/fa';

const AreaList = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [areasPerPage] = useState(5);

  const fetchAreas = async () => {
    try {
      const response = await fetch('https://vijayanagara-finance-api.vercel.app/area');
      if (!response.ok) {
        throw new Error('Failed to fetch areas');
      }
      const data = await response.json();
      setAreas(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this area?');
    if (confirmDelete) {
      try {
        const response = await fetch(`https://vijayanagara-finance-api.vercel.app/area/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete the area');
        }
        setSuccessMessage('Area deleted successfully!');
        setAreas(areas.filter(area => area._id !== id));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const filteredAreas = areas.filter(area => 
    area.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.zipcode.includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastArea = currentPage * areasPerPage;
  const indexOfFirstArea = indexOfLastArea - areasPerPage;
  const currentAreas = filteredAreas.slice(indexOfFirstArea, indexOfLastArea);
  const totalPages = Math.ceil(filteredAreas.length / areasPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  return (
    <Container>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row className="mb-3">
        <Col md={8}>
          <h2>Areas List</h2>
        </Col>
        <Col md={4} className="text-end">
          <Link to="/dashboard/create-area">
            <Button variant="primary">Create New Area</Button>
          </Link>
        </Col>
      </Row>

      <InputGroup className="mb-4">
        <FormControl
          placeholder="Search by city, state, or ZIP code"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>City</th>
            <th>State</th>
            <th>ZIP Code</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAreas.map((area) => (
            <tr key={area.zipcode}>
              <td>
                <FaCity className="me-2" /> {area.city}
              </td>
              <td>
                <FaMapMarkerAlt className="me-2" /> {area.state}
              </td>
              <td>
                <FaBarcode className="me-2" /> {area.zipcode}
              </td>
              <td>
                <Badge bg={area.status === 'active' ? 'success' : 'danger'} className="me-2">
                  {area.status}
                </Badge>
              </td>
              <td>
                <Link to={`/dashboard/edit-area/${area._id}`}>
                  <FaEdit style={{ cursor: 'pointer', color: 'blue' }} />
                </Link>
                <FaTrash
                  onClick={() => handleDelete(area._id)}
                  style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}
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

export default AreaList;
