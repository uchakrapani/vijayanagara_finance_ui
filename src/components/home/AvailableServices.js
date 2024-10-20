import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';

const AvailableServices = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch areas where service is available
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get(
          'https://vijayanagara-finance-api.vercel.app/area'
        );
        const activeAreas = response.data.data.filter(area => area.status === 'active');
        setAreas(activeAreas);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching area data:', err);
        setError('Failed to load service area data. Please try again later.');
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Our Service is Available in These Areas</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : areas.length === 0 ? (
        <Alert variant="info">No service areas are currently active.</Alert>
      ) : (
        <Row>
          {areas.map(area => (
            <Col key={area._id} md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-center">{area.city}</Card.Title>
                  <Card.Text>
                    <strong>State:</strong> {area.state} <br />
                    <strong>ZIP Code:</strong> {area.zipcode}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-center">
                  <small className="text-muted">Service Available</small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default AvailableServices;
