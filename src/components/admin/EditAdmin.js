import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const EditAdmin = () => {
  const { id } = useParams(); // Get the admin ID from the URL
  const navigate = useNavigate(); // To navigate after updating the admin
  const [admin, setAdmin] = useState({
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
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error messages
  const [success, setSuccess] = useState(false); // State for success message

  // Fetch admin details based on the ID
  const fetchAdminDetails = async () => {
    try {
      const response = await fetch(`https://vijayanagara-finance-api.vercel.app/admin/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch admin details');
      }
      const data = await response.json();
      setAdmin(data); // Set the admin data to the form
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminDetails(); // Fetch admin details when the component loads
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAdmin({
      ...admin,
      [name]: type === 'checkbox' ? checked : value, // Update state for checkbox and other inputs
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://vijayanagara-finance-api.vercel.app/admin/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(admin), // Send the updated admin data
      });
      if (!response.ok) {
        throw new Error('Failed to update admin');
      }
      setSuccess(true); // Show success message
      setTimeout(() => {
        navigate('/dashboard/admin-list'); // Redirect to the admin list page after success
      }, 2000); // Delay the navigation for better UX
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <Container>
      <h2>Edit Admin</h2>
      {error && <Alert variant="danger">{error}</Alert>} {/* Show error message */}
      {success && <Alert variant="success">Admin updated successfully!</Alert>} {/* Show success message */}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="userid" className="mb-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                name="userid"
                value={admin.userid}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="fullname" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={admin.fullname}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={admin.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="phone" className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={admin.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="loginid" className="mb-3">
              <Form.Label>Login ID</Form.Label>
              <Form.Control
                type="text"
                name="loginid"
                value={admin.loginid}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={admin.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="emailverified" className="mb-3">
              <Form.Check
                type="checkbox"
                name="emailverified"
                label="Email Verified"
                checked={admin.emailverified}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="phoneverified" className="mb-3">
              <Form.Check
                type="checkbox"
                name="phoneverified"
                label="Phone Verified"
                checked={admin.phoneverified}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="status" className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            value={admin.status}
            onChange={handleChange}
            required
          >
            <option value="active">Active</option>
            <option value="in-active">Inactive</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Admin
        </Button>
      </Form>
    </Container>
  );
};

export default EditAdmin;
