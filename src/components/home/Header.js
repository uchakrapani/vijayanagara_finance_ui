import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GiTakeMyMoney } from 'react-icons/gi';

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setIsSticky(offset > 50); // Adjust threshold as needed
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Navbar
            expand="lg"
            fixed="top"
            className={`shadow-sm ${isSticky ? 'bg-white' : 'bg-transparent'}`}
        >
            <Container>
                <Navbar.Brand as={Link} to="/" className="text-primary">
                    <GiTakeMyMoney style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    Vijaya Nagara Finance
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className="text-primary">Home</Nav.Link>
                        <Nav.Link as={Link} to="/home/services" className="text-primary">Services</Nav.Link>
                        <Nav.Link as={Link} to="/home/repay-loan" className="text-primary">Repay Loan</Nav.Link>
                        <Nav.Link as={Link} to="/home/service-area" className="text-primary">Available Areas</Nav.Link>
                        <Nav.Link as={Link} to="/home/contact" className="text-primary">Contact</Nav.Link>
                    </Nav>
                    <div className="d-flex align-items-center">
                        <Link to="/home/loan-apply">
                            <Button className="btn btn-success">Apply Now</Button>
                        </Link>
                        <Link to="/home/repay-loan">
                            <Button className="btn btn-danger ms-2">Repay Loan Now</Button>
                        </Link>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
