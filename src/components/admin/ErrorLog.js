import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ErrorLog = () => {
  const [errorLogs, setErrorLogs] = useState([]); // State for error logs
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error messages

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

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if fetching fails
  }

  return (
    <Container>
      <h2>Error Logs</h2>
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
              {errorLogs.map((log) => (
                <tr key={log._id}>
                  <td>
                    <Link to={`/dashboard/error-logs/${log._id}`}>{log._id}</Link> {/* Make ID clickable */}
                  </td>
                  <td>{log.message}</td>
                  <td>{new Date(log.date).toLocaleString()}</td> {/* Format date */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorLog;
