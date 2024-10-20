import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const RepayLoan = () => {
  const [formData, setFormData] = useState({
    loanId: '',
    repaymentAmount: '',
    paymentMethod: 'Bank Transfer',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.loanId || !formData.repaymentAmount) {
      setError('Loan ID and Repayment Amount are required.');
      return;
    }

    // Here you would typically handle the repayment process (e.g., API call)
    console.log('Repayment submitted:', formData);
    setSuccess('Repayment processed successfully!');
    setFormData({ loanId: '', repaymentAmount: '', paymentMethod: 'Bank Transfer' }); // Reset form
  };

  return (
    <Container className="my-5 p-3" style={{ border: '1px solid #007bff', borderRadius: '0.5rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2 className="text-center mb-4">Repay Your Loan</h2>
      <p className="text-center">
        Please fill out the form below to initiate your loan repayment. Ensure that all details are correct to avoid any issues.
      </p>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        <Col md={6} className="mx-auto" >
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="loanId">
              <Form.Label>Loan ID</Form.Label>
              <Form.Control
                type="text"
                name="loanId"
                value={formData.loanId}
                onChange={handleChange}
                placeholder="Enter your Loan ID"
                required
              />
            </Form.Group>
            <Form.Group controlId="repaymentAmount" className="mt-3">
              <Form.Label>Repayment Amount</Form.Label>
              <Form.Control
                type="number"
                name="repaymentAmount"
                value={formData.repaymentAmount}
                onChange={handleChange}
                placeholder="Enter amount to repay"
                required
              />
            </Form.Group>
            <Form.Group controlId="paymentMethod" className="mt-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control
                as="select"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="UPI">UPI</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              Submit Repayment
            </Button>
          </Form>
        </Col>
      </Row>
      
      <Row className="mt-5">
        <Col className="text-center">
          <h5>Important Information</h5>
          <p>
            - Ensure to keep a record of your repayment transaction for future reference.
          </p>
          <p>
            - If you face any issues during repayment, please contact our customer service for assistance.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default RepayLoan;
