import React, { useContext } from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { AuthContext } from '../../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { GiTakeMyMoney } from 'react-icons/gi';
import { FaUserCircle } from 'react-icons/fa'; // Import user icon

const Header = () => {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/home/login');
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    const handleResetPassword = () => {
        navigate('/reset-password');
    };

    return (
        <Navbar style={{ backgroundColor: '#003366' }} variant="dark" className="mb-4">
            <Container fluid>
                <Navbar.Brand as={Link} to="/dashboard">
                    <GiTakeMyMoney style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    Vijaya Nagara Finance
                </Navbar.Brand>
                <Nav className="ms-auto">
                    {auth?.loginid ? (
                        <Dropdown align="end">
                            <Dropdown.Toggle
                                variant="link" // Use 'link' variant to remove button styling
                                id="dropdown-basic"
                                style={{
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0',
                                }}
                            >
                                <FaUserCircle style={{ marginRight: '8px', fontSize: '1.5em' }} /> {/* User Icon */}
                                Welcome, {auth.loginid}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item>
                                <Dropdown.Item onClick={handleResetPassword}>Reset Password</Dropdown.Item>
                                <Dropdown.Divider />
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
