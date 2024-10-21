import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert, Spinner } from 'react-bootstrap';

const AvailableServices = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://vijayanagara-finance-api.vercel.app/area');
        if (Array.isArray(response.data)) {
          setData(response.data.filter(area => area.status === 'active')); // Only active areas
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
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>City</th>
              <th>State</th>
              <th>ZIP Code</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td>{item.zipcode}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AvailableServices;
