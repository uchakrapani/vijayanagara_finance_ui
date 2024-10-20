import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Badge, Alert } from 'react-bootstrap'; // Import Alert for success/error messages
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AreaList = () => {
  const [areas, setAreas] = useState([]); // Initialize areas as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // For success messages

  // Fetch areas from the API
  const fetchAreas = async () => {
    try {
      const response = await fetch('https://vijayanagara-finance-api.vercel.app/area');
      if (!response.ok) {
        throw new Error('Failed to fetch areas');
      }
      const data = await response.json();
      console.log(data); // Log the data for debugging
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
    return <div>Error: {error}</div>; // Display error message if fetching fails
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Status</th>
            <th>Actions</th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {areas.map((area) => (
            <tr key={area.zipcode}>
              <td>{area.city}</td>
              <td>{area.state}</td>
              <td>{area.zipcode}</td>
              <td>
                <Badge 
                  bg={area.status === 'active' ? 'success' : 'danger'} // Green badge for active, red for inactive
                >
                  {area.status}
                </Badge>
              </td>
              <td>
                <Link to={`/dashboard/edit-area/${area._id}`}>
                  <FaEdit style={{ marginRight: '10px', cursor: 'pointer', color: 'blue' }} />
                </Link>
                <FaTrash
                  onClick={() => handleDelete(area._id)}
                  style={{ cursor: 'pointer', color: 'red' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AreaList;
