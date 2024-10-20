import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GiTakeMyMoney } from 'react-icons/gi';

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setIsSticky(offset > 50); // Change threshold as needed
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Navbar
            expand="lg"
            className={`fixed-top shadow-sm ${isSticky ? 'bg-white text-dark' : 'bg-transparent text-white'}`}
        >
            <Container className="mx-auto max-w-screen-xl px-2.5 md:px-20">
                <Navbar.Brand as={Link} to="/">
                    <GiTakeMyMoney style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    Vijaya Nagara Finance
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className={isSticky ? 'text-dark' : 'text-white'} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className={`nav-link ${isSticky ? 'text-dark' : 'text-white'}`}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/service" className={`nav-link ${isSticky ? 'text-dark' : 'text-white'}`}>Services</Nav.Link>
                        <Nav.Link as={Link} to="/repay" className={`nav-link ${isSticky ? 'text-dark' : 'text-white'}`}>Repay Loan</Nav.Link>
                        <Nav.Link as={Link} to="/grievance" className={`nav-link ${isSticky ? 'text-dark' : 'text-white'}`}>Grievance</Nav.Link>
                        <Nav.Link as={Link} to="/contact" className={`nav-link ${isSticky ? 'text-dark' : 'text-white'}`}>Contact</Nav.Link>
                    </Nav>
                    <div className="d-flex align-items-center">
                        <Link to="/home/loan-apply">
                            <Button className="btn btn-success">Apply Now</Button>
                        </Link>
                        <Link to="/home/loan-apply">
                            <Button className="btn btn-danger ms-2">Repay Loan Now</Button>
                        </Link>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
