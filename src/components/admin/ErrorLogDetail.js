import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Table } from 'react-bootstrap';

const ErrorLogDetail = () => {
  const { id } = useParams(); // Get ID from the URL
  const [errorLog, setErrorLog] = useState(null); // State for error log details
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error messages

  // Fetch error log details from the API based on the ID
  const fetchErrorLogDetail = async () => {
    try {
      const response = await fetch(`https://vijayanagara-finance-api.vercel.app/errorlogs/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch error log detail');
      }
      const data = await response.json();
      setErrorLog(data); // Set the error log detail
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchErrorLogDetail(); // Fetch error log detail when component mounts
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if fetching fails
  }

  return (
    <Container>
      <h2>Error Log Details</h2>
      <Row>
        <Col>
          {errorLog && (
            <Table striped bordered responsive>
              <tbody>
                <tr>
                  <th>ID</th>
                  <td>{errorLog._id}</td>
                </tr>
                <tr>
                  <th>Message</th>
                  <td style={{ wordWrap: 'break-word' }}>{errorLog.message}</td> {/* Wrap long text */}
                </tr>
                <tr>
                  <th>Stack</th>
                  <td style={{ overflowX: 'auto' }}>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{errorLog.stack}</pre> {/* Scroll for long content */}
                  </td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>{new Date(errorLog.date).toLocaleString()}</td> {/* Format date */}
                </tr>
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorLogDetail;
