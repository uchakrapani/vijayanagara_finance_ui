import React, { useContext } from 'react';
import { Navbar, Container, Nav, Dropdown, Button } from 'react-bootstrap';
import { AuthContext } from '../../AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const { auth, logout } = useContext(AuthContext); // Get auth details and logout function from context
    const navigate = useNavigate(); // Hook to navigate on logout

    const handleLogout = () => {
        logout(); // Call the logout function to clear user data
        navigate('/login'); // Redirect to the login page after logout
    };

    const handleProfile = () => {
        navigate('/profile'); // Navigate to the profile page
    };

    const handleResetPassword = () => {
        navigate('/reset-password'); // Navigate to reset password page
    };

    return (
        <Navbar bg="dark" variant="dark" className="mb-4">
            <Container fluid>
            <Navbar.Brand as={Link} to="/dashboard">Vijaya Nagara Finance</Navbar.Brand>
                <Nav className="ms-auto">
                    {auth?.loginid ? (
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
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
                        <Button variant="outline-light" onClick={() => navigate('/login')}>
                            Login
                        </Button>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
