import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import './ContactUs.css'; // Import the CSS file

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://vijayanagara-finance-api.vercel.app/contact', formData);
      setSuccessMessage(response.data.message);
      setFormData({ fullName: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError('Failed to submit your message. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Contact Us</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="fullName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="phone" className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="message" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
            </Button>
          </Form>
        </Col>

        <Col md={4} className="d-none d-md-block text-center border-start">
          <div className="content-section">
            <h5>Your Financial Queries Matter</h5>
            <p>
              At Vijaya Nagara Finance, we understand the importance of your financial goals.
              Whether you have questions about our services or need assistance with a loan application,
              our team is here to help you every step of the way. Reach out to us today!
            </p>
            <img 
              src={`${process.env.PUBLIC_URL}/contact.png`}
              alt="Contact Us" 
              className="img-fluid" 
              style={{ maxWidth: '50%', height: 'auto', marginTop: '20px' }} 
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
