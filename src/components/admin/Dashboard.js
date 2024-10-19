import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';
import CreateArea from './CreateArea';
import AreaList from './AreaList';
import Home from './Home';
import EditArea from './EditArea';

const Dashboard = () => {
    return (
        <div className="App">
            <Header />
            <Container fluid>
                <Row>
                    {/* Left-side menu */}
                    <Col md={2} className="bg-light p-3">
                        <Nav className="flex-column">
                            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link as={Link} to="/dashboard/transactions">Transactions</Nav.Link>
                            <Nav.Link as={Link} to="/dashboard/reports">Reports</Nav.Link>
                            <Nav.Link as={Link} to="/dashboard/settings">Settings</Nav.Link>
                            <Nav.Link as={Link} to="/dashboard/area">Area</Nav.Link> {/* Link to Area List */}
                        </Nav>
                    </Col>

                    {/* Main body */}
                    <Col md={8} className="p-3">
                        <Routes>
                            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                            <Route path="/area" element={<ProtectedRoute><AreaList /></ProtectedRoute>} />
                            <Route path="/create-area" element={<ProtectedRoute><CreateArea /></ProtectedRoute>} />
                            <Route path="/edit-area/:id" element={<ProtectedRoute><EditArea /></ProtectedRoute>} />
                        </Routes>
                    </Col>

                    {/* Right-side menu */}
                    <Col md={2} className="bg-light p-3">
                        <h5>Quick Actions</h5>
                        <Nav className="flex-column">
                            <Nav.Link as={Link} to="/dashboard/create-area/">Add Area/Location</Nav.Link>
                            <Nav.Link as={Link} to="#manage-finance">Manage Finance</Nav.Link>
                            <Nav.Link as={Link} to="#profile">Profile</Nav.Link>
                        </Nav>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default Dashboard;
