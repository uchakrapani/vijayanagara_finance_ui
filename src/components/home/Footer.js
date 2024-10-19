import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-light text-dark text-center p-4 mt-4">
            <Container>
                <Row>
                    <Col>
                        <h5>Vijaya Nagara Finance</h5>
                        <p>Your trusted financial partner.</p>
                    </Col>
                    <Col>
                        <h5>Quick Links</h5>
                        <p><a href="#services" className="text-dark">Services</a></p>
                        <p><a href="#about" className="text-dark">About Us</a></p>
                        <p><a href="#contact" className="text-dark">Contact</a></p>
                    </Col>
                </Row>
                <p>© 2024 Vijaya Nagara Finance. All rights reserved.</p>
            </Container>
        </footer>
    );
};

export default Footer;
