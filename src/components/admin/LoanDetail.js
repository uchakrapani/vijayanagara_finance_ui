import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Spinner, Table } from 'react-bootstrap';

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
          <h5>Personal Information</h5>
          <Table bordered className="table-border">
            <tbody>
              <tr>
                <td><strong>Full Name:</strong></td>
                <td>{loanDetail.fullName}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{loanDetail.emailId}</td>
              </tr>
              <tr>
                <td><strong>Phone:</strong></td>
                <td>{loanDetail.phone}</td>
              </tr>
              <tr>
                <td><strong>Login ID:</strong></td>
                <td>{loanDetail.loginId}</td>
              </tr>
              <tr>
                <td><strong>PAN Card:</strong></td>
                <td>{loanDetail.pancard}</td>
              </tr>
              <tr>
                <td><strong>Aadhar:</strong></td>
                <td>{loanDetail.aadhar}</td>
              </tr>
            </tbody>
          </Table>
          
          <h5>Loan Information</h5>
          <Table bordered className="table-border">
            <tbody>
              <tr>
                <td><strong>Salary:</strong></td>
                <td>₹{loanDetail.salary}</td>
              </tr>
              <tr>
                <td><strong>Loan Amount Requested:</strong></td>
                <td>₹{loanDetail.loan_amount_req}</td>
              </tr>
              <tr>
                <td><strong>City:</strong></td>
                <td>{loanDetail.city}</td>
              </tr>
              <tr>
                <td><strong>Zip Code:</strong></td>
                <td>{loanDetail.zipcode}</td>
              </tr>
              <tr>
                <td><strong>Status:</strong></td>
                <td>{loanDetail.status}</td>
              </tr>
              <tr>
                <td><strong>Reference No:</strong></td>
                <td>{loanDetail.reference_no}</td>
              </tr>
            </tbody>
          </Table>

          <h5>Additional Information</h5>
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
