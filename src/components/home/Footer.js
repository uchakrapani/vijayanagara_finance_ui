import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'; // Import social icons

const Footer = () => {
    return (
        <footer className="bg-light text-dark text-center p-4 mt-4" style={{ borderTop: '2px solid #007bff' }}>
            <Container>
                <Row>
                    <Col md={4} className="mb-4">
                        <h5>Vijaya Nagara Finance</h5>
                        <p>Your trusted financial partner.</p>
                    </Col>
                    <Col md={4} className="mb-4">
                        <h5>Quick Links</h5>
                        <p><a href="#services" className="text-dark">Services</a></p>
                        <p><a href="#about" className="text-dark">About Us</a></p>
                        <p><a href="#contact" className="text-dark">Contact</a></p>
                    </Col>
                    <Col md={4} className="mb-4">
                        <h5>Follow Us</h5>
                        <div className="d-flex justify-content-center">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2">
                                <FaFacebookF />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2">
                                <FaTwitter />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="mx-2">
                                <FaLinkedinIn />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2">
                                <FaInstagram />
                            </a>
                        </div>
                    </Col>
                </Row>
                <p className="mt-4">© 2024 Vijaya Nagara Finance. All rights reserved.</p>
            </Container>
        </footer>
    );
};

export default Footer;
