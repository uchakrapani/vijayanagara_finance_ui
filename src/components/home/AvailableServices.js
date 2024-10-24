import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Alert, Spinner, Form, InputGroup, Card, Row, Col } from 'react-bootstrap';
import { FaCity, FaMapMarkerAlt, FaBarcode } from 'react-icons/fa'; // Import icons

const AvailableServices = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://vijayanagara-finance-api.vercel.app/area');
        if (Array.isArray(response.data)) {
          const activeAreas = response.data.filter(area => area.status === 'active');
          setData(activeAreas);
          setFilteredData(activeAreas);
        } else {
          throw new Error('Data is not an array');
        }
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = data.filter(item =>
      item.city.toLowerCase().includes(term) ||
      item.state.toLowerCase().includes(term) ||
      item.zipcode.includes(term)
    );
    setFilteredData(filtered);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Available Cities and ZIP Codes for Loan Services</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <span className="ms-2">Loading...</span>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <InputGroup className="mb-4">
            <Form.Control
              type="text"
              placeholder="Search by city, state, or ZIP code"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </InputGroup>

          <Row>
            {filteredData.map(item => (
              <Col md={4} key={item._id} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title><FaCity /> {item.city}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"><FaMapMarkerAlt /> {item.state}</Card.Subtitle>
                    <Card.Text>
                      <FaBarcode /> {item.zipcode}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default AvailableServices;
