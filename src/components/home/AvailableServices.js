import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert, Spinner, InputGroup, FormControl } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const CitiesAndZipCodes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');

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

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter(item => 
    item.city.toLowerCase().includes(searchText.toLowerCase()) ||
    item.state.toLowerCase().includes(searchText.toLowerCase()) ||
    item.zipcode.includes(searchText)
  );

  const columns = [
    {
      dataField: '_id',
      text: '#',
      formatter: (cell, row, rowIndex) => rowIndex + 1,
      sort: false,
    },
    {
      dataField: 'city',
      text: 'City',
      sort: true,
    },
    {
      dataField: 'state',
      text: 'State',
      sort: true,
    },
    {
      dataField: 'zipcode',
      text: 'ZIP Code',
      sort: true,
    },
  ];

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
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search by city, state, or ZIP code"
              value={searchText}
              onChange={handleSearch}
            />
          </InputGroup>
          <BootstrapTable
            keyField="_id"
            data={filteredData}
            columns={columns}
            striped
            hover
            condensed
            pagination={true}
          />
        </>
      )}
    </Container>
  );
};

export default CitiesAndZipCodes;
