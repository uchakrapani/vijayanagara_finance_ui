import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert, Spinner, Form, InputGroup } from 'react-bootstrap';

const AvailableServices = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'city', direction: 'ascending' });

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

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setFilteredData(sortedData);
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
          
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th onClick={() => requestSort('city')} style={{ cursor: 'pointer' }}>
                  City {sortConfig.key === 'city' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                </th>
                <th onClick={() => requestSort('state')} style={{ cursor: 'pointer' }}>
                  State {sortConfig.key === 'state' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                </th>
                <th onClick={() => requestSort('zipcode')} style={{ cursor: 'pointer' }}>
                  ZIP Code {sortConfig.key === 'zipcode' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item._id}>
                  <td>{item.city}</td>
                  <td>{item.state}</td>
                  <td>{item.zipcode}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default AvailableServices;
