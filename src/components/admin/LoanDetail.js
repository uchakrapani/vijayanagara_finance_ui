import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';

const LoanDetail = () => {
  const { loanId } = useParams(); // Get the loan ID from the URL
  const [loanDetail, setLoanDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoanDetail = async () => {
      try {
        const response = await fetch(`https://vijayanagara-finance-api.vercel.app/loanuser/${loanId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch loan details');
        }
        const data = await response.json();
        setLoanDetail(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanDetail();
  }, [loanId]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Loan Details</h2>
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <h5>Personal Information</h5>
              <p><strong>Full Name:</strong> {loanDetail.fullName}</p>
              <p><strong>Email:</strong> {loanDetail.emailId}</p>
              <p><strong>Phone:</strong> {loanDetail.phone}</p>
              <p><strong>PAN Card:</strong> {loanDetail.pancard}</p>
              <p><strong>Aadhar:</strong> {loanDetail.aadhar}</p>
            </Col>
            <Col md={6}>
              <h5>Loan Information</h5>
              <p><strong>Salary:</strong> ₹{loanDetail.salary}</p>
              <p><strong>Loan Amount Requested:</strong> ₹{loanDetail.loan_amount_req}</p>
              <p><strong>City:</strong> {loanDetail.city}</p>
              <p><strong>Zip Code:</strong> {loanDetail.zipcode}</p>
              <p><strong>Status:</strong> {loanDetail.status}</p>
              <p><strong>Reference No:</strong> {loanDetail.reference_no}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p><strong>Date Created:</strong> {new Date(loanDetail.datecreated).toLocaleString()}</p>
              <p><strong>Date Updated:</strong> {new Date(loanDetail.dateupdated).toLocaleString()}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoanDetail;
