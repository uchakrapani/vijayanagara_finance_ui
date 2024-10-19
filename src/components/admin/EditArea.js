import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const EditArea = () => {
  const { id } = useParams(); // Get the area ID from the URL parameters
  const navigate = useNavigate(); // Hook for navigation
  const [area, setArea] = useState({
    city: '',
    state: '',
    zipcode: '',
    status: 'active',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch the area data by ID
  useEffect(() => {
    const fetchArea = async () => {
      try {
        const response = await fetch(`https://vijayanagara-finance-api.vercel.app/area/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch area');
        }
        const data = await response.json();
        setArea(data); // Set the area state with fetched data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArea();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://vijayanagara-finance-api.vercel.app/area/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(area),
      });

      if (!response.ok) {
        throw new Error('Failed to update area');
      }

      alert('Area updated successfully!');
      navigate('/dashboard/area'); // Redirect after successful update
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if fetching fails
  }

  return (
    <Container>
      <h2>Edit Area</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={area.city}
            onChange={(e) => setArea({ ...area, city: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="formState">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            value={area.state}
            onChange={(e) => setArea({ ...area, state: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="formZipcode">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="text"
            value={area.zipcode}
            onChange={(e) => setArea({ ...area, zipcode: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            value={area.status}
            onChange={(e) => setArea({ ...area, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Area
        </Button>
      </Form>
    </Container>
  );
};

export default EditArea;
