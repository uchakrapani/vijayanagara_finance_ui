import React, { useState } from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    userid: '',
    fullname: '',
    email: '',
    phone: '',
    emailverified: false,
    phoneverified: false,
    loginid: '',
    password: '',
    status: 'active',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.userid || !formData.fullname || !formData.email || !formData.phone) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch('https://vijayanagara-finance-api.vercel.app/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create admin');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard/admin'); // Redirect after 2 seconds
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <h2>Create New Admin</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Admin created successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formUserId" className="mb-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                name="userid"
                value={formData.userid}
                onChange={handleChange}
                placeholder="Enter User ID"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formFullName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter Full Name"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formLoginId" className="mb-3">
              <Form.Label>Login ID</Form.Label>
              <Form.Control
                type="text"
                name="loginid"
                value={formData.loginid}
                onChange={handleChange}
                placeholder="Enter Login ID"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formEmailVerified" className="mb-3">
              <Form.Check
                type="checkbox"
                name="emailverified"
                label="Email Verified"
                checked={formData.emailverified}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPhoneVerified" className="mb-3">
              <Form.Check
                type="checkbox"
                name="phoneverified"
                label="Phone Verified"
                checked={formData.phoneverified}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formStatus" className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="in-active">Inactive</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Admin
        </Button>
      </Form>
    </Container>
  );
};

export default CreateAdmin;
