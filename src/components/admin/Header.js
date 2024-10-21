import React, { useContext } from 'react';
import { Navbar, Container, Nav, Dropdown, Button } from 'react-bootstrap'; // Ensure Button is imported
import { AuthContext } from '../../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { GiTakeMyMoney } from 'react-icons/gi';
import RunningTime from './RunningTime';

const Header = () => {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/home/login');
    };

    return (
        <Navbar style={{ backgroundColor: '#003366' }} variant="dark" className="mb-4">
            <Container fluid>
                <Navbar.Brand as={Link} to="/dashboard">
                    <GiTakeMyMoney style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    Vijaya Nagara Finance
                </Navbar.Brand>
                <Nav className="ms-auto">
                    <RunningTime />
                    {auth?.loginid ? (
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                                Welcome, {auth.loginid}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <Button variant="outline-light" onClick={() => navigate('/home/login')}>
                            Login
                        </Button>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
