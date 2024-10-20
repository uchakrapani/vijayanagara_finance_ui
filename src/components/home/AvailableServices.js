import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';

const RepayLoan = () => {
  const [loanDetails, setLoanDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch loan repayment details
  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const response = await axios.get('https://vijayanagara-finance-api.vercel.app/loan-details'); // Example API endpoint
        setLoanDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching loan details:', err);
        setError('Failed to load loan details. Please try again later.');
        setLoading(false);
      }
    };

    fetchLoanDetails();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Loan Repayment Details</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : loanDetails.length === 0 ? (
        <Alert variant="info">No loan details available.</Alert>
      ) : (
        <Row>
          {loanDetails.map((loan) => (
            <Col key={loan._id} md={4} className="mb-4">
              <Card className="h-100" style={{ border: '1px solid #007bff', borderRadius: '0.5rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <Card.Body>
                  <Card.Title className="text-center">{loan.loanType}</Card.Title>
                  <Card.Text>
                    <strong>Loan Amount:</strong> ₹{loan.amount} <br />
                    <strong>Due Date:</strong> {loan.dueDate} <br />
                    <strong>Status:</strong> {loan.status}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-center">
                  <Button variant="primary">Repay Now</Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default RepayLoan;
