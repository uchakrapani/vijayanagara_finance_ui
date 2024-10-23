import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, InputGroup, FormControl, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ErrorLog = () => {
  const [errorLogs, setErrorLogs] = useState([]); // State for error logs
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error messages
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [logsPerPage] = useState(5); // Number of logs per page

  // Fetch error logs from the API
  const fetchErrorLogs = async () => {
    try {
      const response = await fetch('https://vijayanagara-finance-api.vercel.app/errorlogs');
      if (!response.ok) {
        throw new Error('Failed to fetch error logs');
      }
      const data = await response.json();
      setErrorLogs(data); // Set the error logs state
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchErrorLogs(); // Fetch error logs when component mounts
  }, []);

  // Filter error logs based on search term
  const filteredLogs = errorLogs.filter(log =>
    log.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    ); // Show loading spinner
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>; // Show error message if fetching fails
  }

  return (
    <Container className="mt-5">
      <Row className="align-items-center mb-3">
        <Col md={8}>
          <h2>Error Logs</h2>
        </Col>
        <Col md={4}>
          <InputGroup>
            <FormControl
              placeholder="Search by message"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.length > 0 ? (
                currentLogs.map((log) => (
                  <tr key={log._id}>
                    <td>
                      <Link to={`/dashboard/error-logs/${log._id}`}>{log._id}</Link>
                    </td>
                    <td>{log.message}</td>
                    <td>{new Date(log.date).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No error logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
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
    </Container>
  );
};

export default ErrorLog;
