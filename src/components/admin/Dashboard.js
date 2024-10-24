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
import ErrorLog from './ErrorLog';
import DashboardNav from './DashboardNav';
import ErrorLogDetail from './ErrorLogDetail';
import AdminList from './AdminList';
import CreateAdmin from './CreateAdmin';
import EditAdmin from './EditAdmin';
import LoanUserList from './LoanUserList';
import ContactUs from './ContactUs';
import LoanDetail from './LoanDetail';
import BackupManager from './BackupManager';

const Dashboard = () => {
    return (
        <div className="App">
            <Header />
            <Container fluid>
                <Row>
                    {/* Left-side menu */}
                    <Col md={2} className="bg-light p-3">
                       <DashboardNav/>
                    </Col>

                    {/* Main body */}
                    <Col md={8} className="p-3">
                        <Routes>
                            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                            <Route path="/area" element={<ProtectedRoute><AreaList /></ProtectedRoute>} />
                            <Route path="/create-area" element={<ProtectedRoute><CreateArea /></ProtectedRoute>} />
                            <Route path="/edit-area/:id" element={<ProtectedRoute><EditArea /></ProtectedRoute>} />
                            <Route path="/error-logs" element={<ProtectedRoute><ErrorLog /></ProtectedRoute>} />
                            <Route path="/admin-list" element={<ProtectedRoute><AdminList /></ProtectedRoute>} /> 
                            <Route path="/create-admin" element={<ProtectedRoute><CreateAdmin /></ProtectedRoute>} />
                            <Route path="/loanuser" element={<ProtectedRoute><LoanUserList /></ProtectedRoute>} />
                            <Route path="/contact" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
                            <Route path="/loan-user-detail/:loanId" element={<ProtectedRoute><LoanDetail /></ProtectedRoute>} />
                            <Route path="/edit-admin/:id" element={<ProtectedRoute><EditAdmin /></ProtectedRoute>} /> 
                            <Route path="/error-logs/:id" element={<ProtectedRoute><ErrorLogDetail /></ProtectedRoute>} />
                            <Route path="/backupdb" element={<ProtectedRoute><BackupManager /></ProtectedRoute>} /> 
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
