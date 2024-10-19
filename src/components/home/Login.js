import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext'; // Import the context
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext); // Get the login function from context
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      loginid: loginId,
      password: password,
    };

    try {
      const response = await fetch('https://vijayanagara-finance-api.vercel.app/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        // On successful login, use the context's login function
        login(loginData);
        navigate('/dashboard'); // Redirect to the dashboard after successful login
      } else {
        const result = await response.json();
        setErrorMessage(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setErrorMessage('Error connecting to the server. Please try again later.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Login</h2>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formLoginId">
              <Form.Label>Login ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter login ID"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
