import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert, Card, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaCity, FaMapMarkerAlt, FaBarcode } from 'react-icons/fa'; // Import icons

const AreaList = () => {
  const [areas, setAreas] = useState([]); // Initialize areas as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // For success messages
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  // Fetch areas from the API
  const fetchAreas = async () => {
    try {
      const response = await fetch('https://vijayanagara-finance-api.vercel.app/area');
      if (!response.ok) {
        throw new Error('Failed to fetch areas');
      }
      const data = await response.json();
      setAreas(data); // Ensure data is set to an array
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>; // Display error message if fetching fails
  }

  // Handle delete action
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

        setSuccessMessage('Area deleted successfully!'); // Set success message
        setAreas(areas.filter(area => area._id !== id)); // Update the state to remove the deleted area
      } catch (error) {
        setError(error.message); // Set error message if delete fails
      }
    }
  };

  const filteredAreas = areas.filter(area => 
    area.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.zipcode.includes(searchTerm)
  );

  return (
    <Container>
      {successMessage && <Alert variant="success">{successMessage}</Alert>} {/* Display success message */}
      {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}
      
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

      <Row>
        {filteredAreas.map((area) => (
          <Col md={4} key={area.zipcode} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title><FaCity className="me-2" /> {area.city}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"><FaMapMarkerAlt className="me-2" /> {area.state}</Card.Subtitle>
                <Card.Text>
                  <FaBarcode className="me-2" /> {area.zipcode} <br />
                  <Badge bg={area.status === 'active' ? 'success' : 'danger'} className="me-2">
                    {area.status}
                  </Badge>
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Link to={`/dashboard/edit-area/${area._id}`}>
                    <FaEdit style={{ cursor: 'pointer', color: 'blue' }} />
                  </Link>
                  <FaTrash
                    onClick={() => handleDelete(area._id)}
                    style={{ cursor: 'pointer', color: 'red' }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AreaList;
