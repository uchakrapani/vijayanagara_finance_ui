import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaMapMarkedAlt, FaExclamationTriangle, FaUserCircle } from 'react-icons/fa'; // Import desired icons

const DashboardNav = () => {
  return (
    <Nav className="flex-column">
      {/* Dashboard Link */}
      <Nav.Link as={Link} to="/dashboard">
        <FaTachometerAlt style={{ marginRight: '8px' }} /> Dashboard
      </Nav.Link>
      
      {/* Area Link */}
      <Nav.Link as={Link} to="/dashboard/area">
        <FaMapMarkedAlt style={{ marginRight: '8px' }} /> Area
      </Nav.Link>
      
      {/* Divider */}
      <hr />

      {/* Admin List Link */}
      <Nav.Link as={Link} to="/dashboard/admin-list">
        <FaUserCircle style={{ marginRight: '8px' }} /> Administrators
      </Nav.Link>

      {/* Error Logs Link */}
      <Nav.Link as={Link} to="/dashboard/error-logs">
        <FaExclamationTriangle style={{ marginRight: '8px' }} /> Error Logs
      </Nav.Link>
    </Nav>
  );
};

export default DashboardNav;
