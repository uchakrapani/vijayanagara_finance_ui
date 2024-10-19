import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <Row className="justify-content-md-center text-center mt-5">
        <Col md={6}>
          <h1>Welcome to Vijaya Nagara Finance</h1>
          <p>Please log in to access your dashboard.</p>
          <Link to="/login">
            <Button variant="primary">Login</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
