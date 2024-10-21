import React from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'; // Import social icons
import { GiTakeMyMoney } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-light text-dark text-center p-4 mt-4" style={{ borderTop: '2px solid #007bff' }}>
            <Container>
                <Row>
                    <Col md={4} className="mb-4">
                        <h3 className="text-primary">
                            <GiTakeMyMoney style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                            Vijaya Nagara Finance
                        </h3>
                        <p>Get quick access to funds with our Instant Loan service. 
                            Designed for your urgent financial needs, our seamless application 
                            process ensures that you receive the amount you need without the hassle. 
                            Apply now and experience financial 
                            relief in no time!</p>
                    </Col>
                    <Col md={4} className="mb-4">
                        <h5>Quick Links</h5>
                        <p><Link to="/home/services" className="text-dark">Services</Link></p>
                        <p><a href="#about" className="text-dark">About Us</a></p>
                        <p><Link to="/home/contact" className="text-dark">Contact</Link></p>
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
