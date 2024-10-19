import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { GiTakeMyMoney } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg" className="shadow-sm">
            <Container>
            <Navbar.Brand as={Link} to="/home">
                    <GiTakeMyMoney style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    Vijaya Nagara Finance
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#services">Services</Nav.Link>
                        <Nav.Link href="#about">About Us</Nav.Link>
                        <Nav.Link href="#contact">Contact</Nav.Link>
                    </Nav>
                    <div className="d-flex">
                        <Button variant="outline-primary" className="me-2">Apply Now</Button>
                        <Button variant="outline-success">Repay</Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
