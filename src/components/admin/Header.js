import React, { useContext } from 'react';
import { Navbar, Container, Nav, Dropdown, Button } from 'react-bootstrap'; 
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
            <Container fluid className="d-flex justify-content-between align-items-center">
                <Navbar.Brand as={Link} to="/dashboard">
                    <GiTakeMyMoney style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    Vijaya Nagara Finance
                </Navbar.Brand>
                <div className="d-flex align-items-center">
                    <RunningTime />
                    <div className="ms-3">
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
                    </div>
                </div>
            </Container>
        </Navbar>
    );
};

export default Header;
